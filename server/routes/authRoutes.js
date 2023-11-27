const express = require('express')
const router = express.Router()
const user = require('../../models/User')
const thirdPartyApplications = require('../../models/ThirdPartyApplications')
const emailList = require('../../models/email')
const token = require('../../services/jwt')
const delToken = require('../../services/delCookie')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')
const userHelper = require('../helpers/user')
const requireLogin = require('../middlewares/requireLogin')
const Mailer = require('../../services/Mailer')
const verifyTemplate = require('../../services/emailTemplates/verify')
const resetTemplate = require('../../services/emailTemplates/reset-password')
const contact = require('../../services/emailTemplates/contact')
const API = require('../helpers/axios')
const User = require('../../models/User')

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id } = req.user
    const t = token.signToken(_id)
    res.cookie('access_token', t, { httpOnly: true })
    res.redirect(`/signup`)
  }
})

// router.post('/register', (req, res) => {
//     passport.authenticate('local');
//     res.redirect('/');
// });

router.post(
  '/register',
  async (req, res, next) => {

    const { user } = req.body
    const decodedCredentials = Buffer.from(user, 'base64');
    const decodedTokenString = decodedCredentials.toString('utf-8');
    const parsedTokenString = JSON.parse(decodedTokenString);
    const { email, password } = parsedTokenString
    const data = parsedTokenString

    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        if (existingUser.googleId) {
          return res.send('Login with Google')
        } else {
          throw Error('User with this email already exists')
        }
      } else {
        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error('Something went wrong with bcrypt')

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error('Something went wrong hashing the password')

        data.isEmailVerified = true;
        let newuser = await userHelper.createUser(data, hash)
        const existingUsers = await User.findOne({ email }).select('-password')

        await userHelper.setUpNotificationsForUser()

        let t = token.signToken(newuser._id)

        res.cookie('access_token', t, { httpOnly: true })
        res.send({ ...existingUsers._doc, cookie: t })
        next()
      }
    } catch (e) {
      res.status(400).send(e.message)
    }
  }
)

router.get('/verify/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await user.findByIdAndUpdate(id, { $set: { isEmailVerified: true } })
    const t = token.signToken(id)
    res.cookie('access_token', t, { httpOnly: true })
    res.redirect(`/`)
  } catch {
    res.status(400).send('verify failed')
  }
})

router.get('/reset/:id', async (req, res, next) => {
  const id = req.params.id
  const existingUser = await user.findById(id).select('-password')
  await user.updateOne({ email: existingUser._doc.email }, { $set: { emailVerified: true } })
  const t = token.signToken(id)
  const existingUsers = await user.findById(id).select('-password')
  res.cookie('access_token', t, { httpOnly: true })
  res.redirect(`/change-password`)
})

router.post('/password', requireLogin, async (req, res, next) => {
  const password = req.body.password
  const existingUser = await user.findById(req.user.sub)
  //salt password
  try {
    const salt = await bcrypt.genSalt(10)
    if (!salt) throw Error('Something went wrong with bcrypt')

    const hash = await bcrypt.hash(password, salt)
    if (!hash) throw Error('Something went wrong hashing the password')

    await user.updateOne({ email: existingUser._doc.email }, { $set: { password: hash } })
    const t = token.signToken(req.user.sub)
    const existingUsers = await user.findById(req.user.sub).select('-password').select('-stripeId')
    res.cookie('access_token', t, { httpOnly: true })
    res.send({ ...existingUsers._doc, cookie: token })
  } catch {
    res.status(400).send('Bad request')
  }
})

router.post('/verify', async (req, res) => {
  try {
    const send = await Mailer.sendVerificationMail(req.body)
    if (send) {
      res.send({ send: "Email sent successfully." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/resend', requireLogin, async (req, res, next) => {
  const { email } = req.body
  const existinguser = await user.findById(req.user.sub).select('-password')
  if (email !== existinguser.email) {
    const exuser = await user.findById(req.user.sub).select('-password')
    if (exuser) {
      res.status(400).send('user with that email already exists')
    }
    const sub = req.user.sub
    await user.updateOne({ _id: sub }, { $set: { email: email } })
  }
  const existinguser2 = await user.findById(req.user.sub).select('-password')
  //send verification email
  const msg = {
    id: existinguser2._doc._id,
    // recipients: [email],
    name: existinguser2._doc.email,
    recipients: [{ email }],
    from: 'schedule@vohnt.com',
    subject: 'Verify your email to start using',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }
  const token = req.header('access_token')
  try {
    const mailer = new Mailer(msg, verifyTemplate(msg))
    mailer.send()
  } catch {
    res.status(400).send('An error has occured')
  }

  res.send({ ...existinguser2._doc, cookie: token })
})

router.post('/reset', async (req, res, next) => {
  const existinguser = await user.findOne({ email: req.body.email })
  if (!existinguser || existinguser === null) {
    res.send({ message: 'User with that email does not exist' })
  }
  if (existinguser) {
    //send verification email
    const msg = {
      id: existinguser._id,
      recipients: [{ email }],
      name: existinguser.email,
      // recipients: [{email: "noreplyvohnt@gmail.com"}],
      from: 'schedule@vohnt.com',
      subject: 'Reset your Vohnt password'
    }
    const mailer = new Mailer(msg, resetTemplate(msg))
    mailer.send()
    res.send({ message: 'Check your email for instructions' })
  }
})

router.post('/contact', async (req, res, next) => {
  const msg = {
    recipients: [...req.body.email],
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
    type: req.body.type,
    // recipients: [{email: "noreplyvohnt@gmail.com"}],
    from: 'schedule@vohnt.com',
    subject: `${req.body.type} contact submission`
  }
  try {
    const mailer = new Mailer(msg, contact(msg))
    mailer.send()
    res.send({ message: 'success' })
  } catch {
    res.status(400).send({ message: 'Please try again' })
  }
})
// router.post('/login', (req, res) => {
//     passport.authenticate('local');
//     res.redirect('/');
// });
//login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  ///check if user exists
  try {
    const existingUser = await user.findOne({ email })
    const existingUsers = await user.findOne({ email }).select('-password').select('-stripeId')
    if (!existingUser) throw Error('User does not exist')

    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (!isMatch) throw Error('Invalid credentials')

    let t = token.signToken(existingUser._id)
    if (!t) throw Error('Invalid Credentials')
      res.cookie('access_token', t, { httpOnly: true }),
      res.json({ ...existingUsers._doc, msg: 'success', cookie: t }),
      next()
  } catch (e) {
    res.status(400).send('Email and Password do not match')
  }
})

router.get('/logout', (req, res) => {
  let t = delToken.signToken(123)
  req.logout()
  res.cookie('access_token', t, { httpOnly: true }), res.json({ msg: 'success', cookie: t })
})

router.get('/current_user', requireLogin, async (req, res) => {
  try {
    const existinguser = await userHelper.getUserById(req.user.sub)
    if (!existinguser) throw Error('user does not exist')
    res.json(existinguser)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/addMailing', async (req, res) => {
  let { email, firstName, lastName } = req.body
  try {
    const existingEmail = await emailList.findOne({ email })
    if (!existingEmail) {
      await emailList.create({ email, firstName, lastName })
    }
    res.send({ message: 'success' })
  } catch (e) {
    res.status(400).send({ message: 'please try again' })
  }
})

router.post('/test', async (req, res) => {
  let { email, firstName, lastName } = req.body
  try {
    await emailList.create({ email, firstName, lastName })
    res.send({ message: keys.mongoURI })
  } catch (e) {
    res.status(400).send({ message: 'please try again' })
  }
})

router.get('/github', async (req, res) => {
  // 1) use the code to get token from github
  const { code } = req.query
  let githubToken
  try {
    const body = {
      client_id: keys.nextPublicGithubClientId,
      client_secret: keys.githubClientSecret,
      redirect_uri: keys.githubRedirectUrl,
      code
    }
    const headers = {
      Accept: 'application/json'
    }
    const res = await API.POST('https://github.com/login/oauth/access_token', headers, body)
    githubToken = res?.access_token
  } catch (error) {
    res.status(400).send({ message: 'Exception occured while parsing github token' })
  }
  // 2) use the github token to get user details
  try {
    const githubUser = await API.GET('https://api.github.com/user', {
      Authorization: `Bearer ${githubToken}`
    })
    if (githubUser.email === null) {
      const emails = await API.GET('https://api.github.com/user/emails', {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${githubToken}`,
        'X-GitHub-Api-Version': '2022-11-28'
      })
      let userPrimaryEmail
      // check if we have an user record with any of the emails, if we do then the user is not new and he is just signing in, if not then the user is new and we need to save his details in db. In this flow we need to update the user record with the new primary email if the user has changed his primary email in github
      userPrimaryEmail = emails?.find(email => email.primary === true)?.email
      if (!userPrimaryEmail) {
        res.status(400).send({ message: 'No primary email found for this user on github' })
      }
      githubUser.email = userPrimaryEmail
      githubUser.emails = emails.map(x => x.email)
    } else {
      githubUser.emails = [githubUser.email]
    }
    const existingUser = await user.findOne({ email: githubUser.email })
    await user.findByIdAndUpdate(existingUser.id, { $set: { isGithubConnected: true } })
    await thirdPartyApplications.create({ userId: existingUser.id, payload: { ...res, githubToken } })
    res.redirect(`/create-your-business?github-connect=true`)
  } catch (error) {
    res.status(400).send({ message: 'Exception occured when retrieving github user details' })
  }
})

module.exports = router
