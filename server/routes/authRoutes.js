const express = require('express')
const router = express.Router()
const token = require('../../services/jwt')
const delToken = require('../../services/delCookie')
const passport = require('passport')
const keys = require('../../config/keys')
const userHelper = require('../helpers/user')
const requireLogin = require('../middlewares/requireLogin')
const Mailer = require('../../services/Mailer')
const verifyTemplate = require('../../services/emailTemplates/verify')
const resetTemplate = require('../../services/emailTemplates/reset-password')
const contact = require('../../services/emailTemplates/contact')
const API = require('../helpers/axios')
const AuthService = require('../helpers/authentication')
const messageHelper = require('../helpers/message')

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id } = req.user

    res.cookie('access_token', token.signToken(_id), { httpOnly: true })
    res.redirect(`/signup`)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const existingUser = await AuthService.isExistingUser(req.body?.email, false)

    if (existingUser) {
      if (existingUser.googleId) {
        return res.send('Login with Google')
      } else {
        throw Error('User with this email already exists')
      }
    } else {
      const registerUser = await userHelper.registerUser(req.body)
      if (registerUser?.isLoginWithGoogle) throw Error('Please login with google')
      const existingUsers = await AuthService.isExistingUser(req.body?.email, false)
      await userHelper.setUpNotificationsForUser()

      res.cookie('access_token', token.signToken(registerUser._id), { httpOnly: true })
      res.send({ ...existingUsers._doc, cookie: token.signToken(registerUser._id) })
      next()
    }
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/verify/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await AuthService.verifyUser(id)
    const supportUser = await userHelper.getSingleUser({ email: keys.supportEmail })
    if (!supportUser) {
      const hash = await AuthService.bcryptAndHashing(keys.supportAccountPassword)
      let newSupportUser = await userHelper.createUser(
        {
          email: keys.supportEmail,
          FirstName: keys.supportFirstName,
          LastName: keys.supportLastName,
          FullName: keys.supportFullName,
          role: keys.supportRole
        },
        hash
      )
      const message = {
        conversationId: null,
        sender: {
          userId: newSupportUser._id,
          isInitiated: true
        },
        receiver: {
          userId: id
        },
        attachment: null,
        message:
          'Welcome to the Unzipped platform. Here you can Post projects, hire freelancers, or even find work. If you run into any problems while using the site, feel free to message our support team here to receive assistance. If you do run into issues, go easy on us, we’re a relatively new platform, and are working hard to get everything right.'
      }
      await messageHelper.sendMessage(message, newSupportUser._id)
    } else {
      const message = {
        conversationId: null,
        sender: {
          userId: supportUser._id,
          isInitiated: true
        },
        receiver: {
          userId: id
        },
        attachment: null,
        message:
          'Welcome to the Unzipped platform. Here you can Post projects, hire freelancers, or even find work. If you run into any problems while using the site, feel free to message our support team here to receive assistance. If you do run into issues, go easy on us, we’re a relatively new platform, and are working hard to get everything right.'
      }
      await messageHelper.sendMessage(message, supportUser._id)
    }
    res.send({ message: 'SUCCESS' })
  } catch {
    res.status(400).send('verify failed')
  }
})

router.get('/reset/:id', async (req, res, next) => {
  const id = req.params.id
  const existingUser = await AuthService.isExistingUser(id, true)
  await AuthService.modifyExistingUser(existingUser, false)

  res.cookie('access_token', token.signToken(id), { httpOnly: true })
  res.redirect(`/change-password`)
})

router.post('/change-password', requireLogin, async (req, res, next) => {
  try {
    const existingUser = await userHelper.getSingleUser({ _id: req.user.sub }, 'password email')
    if (!existingUser) throw new Error('User not found')

    const isCorrectPassword = await AuthService.passwordComparing(existingUser?.email, req.body?.currentPassword)
    if (!isCorrectPassword) throw new Error('Incorrect password')

    if (!token.signToken(existingUser._id)) throw new Error('Invalid Password')

    if (req.body?.newPassword === req.body?.currentPassword)
      throw new Error('New password must be different from current password')

    if (req.body?.newPassword !== req.body?.confirmNewPassword)
      throw new Error('Password and confirm password do not match')

    const hash = await AuthService.bcryptAndHashing(req.body?.newPassword)
    if (!hash) throw new Error('Something went wrong hashing the password')

    const result = await userHelper.updateUser(existingUser?._id, { password: hash })

    // if (result) {
    //   await Mailer.sendMailWithSG({ email: result?.email, templateName: 'RESET_PASSWORD' })
    // }

    const existingUsers = await AuthService.isExistingUser(req.user.sub, true)
    res.cookie('access_token', token.signToken(req.user.sub), { httpOnly: true })
    res.send({ ...existingUsers._doc, cookie: token.signToken(existingUser._id) })
  } catch (err) {
    res.status(400).json({ message: err?.message ?? 'Something went wrong' })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const send = await Mailer.sendMailWithSG(req.body)
    if (send) {
      res.send({ send: 'Email sent successfully.' })
    } else {
      res.send({ send: 'Failed to send an email.' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/resend', requireLogin, async (req, res, next) => {
  const { email } = req.body
  const existinguser = await AuthService.isExistingUser(req.user.sub, true)
  if (email !== existinguser.email) {
    const exuser = await AuthService.isExistingUser(req.user.sub, true)
    if (exuser) {
      res.status(400).send('user with that email already exists')
    }
    await AuthService.modifyExistingUser({ id: req.user.sub, mail: email }, true)
  }
  const existinguser2 = await AuthService.isExistingUser(req.user.sub, true)
  const msg = {
    id: existinguser2._doc._id,
    name: existinguser2._doc.email,
    recipients: [{ email }],
    from: 'schedule@vohnt.com',
    subject: 'Verify your email to start using',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  }
  try {
    const mailer = new Mailer(msg, verifyTemplate(msg))
    mailer.send()
  } catch {
    res.status(400).send('An error has occured')
  }

  res.send({ ...existinguser2._doc, cookie: req.header('access_token') })
})

router.post('/reset', async (req, res, next) => {
  const existinguser = await AuthService.isExistingUser(req.body.email, false)

  if (!existinguser || existinguser === null) {
    res.send({ message: 'User with that email does not exist' })
  }
  if (existinguser) {
    const msg = {
      id: existinguser._id,
      recipients: [{ email }],
      name: existinguser.email,
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

//login
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const existingUser = await AuthService.isExistingUser(email, false)

    if (!existingUser) throw Error('User does not exist')

    const isMatch = await AuthService.passwordComparing(email, password)

    if (!isMatch) throw Error('Invalid credentials')
    if (!token.signToken(existingUser._id)) throw Error('Invalid Credentials')

    res.cookie('access_token', token.signToken(existingUser._id), { httpOnly: true })
    res.json({ ...existingUser._doc, msg: 'success', cookie: token.signToken(existingUser._id) })
    // next()
  } catch (e) {
    res.status(400).send('Email and Password do not match')
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  res.cookie('access_token', delToken.signToken(123), { httpOnly: true }),
    res.json({
      msg: 'success',
      cookie: delToken.signToken(123)
    })
})

router.get('/current_user', requireLogin, async (req, res) => {
  try {
    const existinguser = await userHelper.getUserById(req.user.sub)
    if (!existinguser) throw Error('user does not exist')
    res.json({ ...existinguser._doc, cookie: token.signToken(existinguser._id) })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/addMailing', async (req, res) => {
  let { email, firstName, lastName } = req.body
  try {
    const existingEmail = await AuthService.isExistingMail(email)
    if (!existingEmail) {
      await AuthService.createMail(email, firstName, lastName)
    }
    res.send({ message: 'success' })
  } catch (e) {
    res.status(400).send({ message: 'please try again' })
  }
})

router.post('/test', async (req, res) => {
  let { email, firstName, lastName } = req.body
  try {
    await AuthService.createMail(email, firstName, lastName)
    res.send({ message: keys.mongoURI })
  } catch (e) {
    res.status(400).send({ message: 'please try again' })
  }
})

router.get('/github', async (req, res) => {
  console.log('Auth_routes GITHUB_REDIRECT_URL', process.env.GITHUB_REDIRECT_URL)
  // 1) use the code to get token from github
  const { code } = req.query
  let githubToken
  try {
    const body = {
      client_id: keys.nextPublicGithubClientId,
      client_secret: keys.githubClientSecret,
      redirect_uri:  process.env.GITHUB_REDIRECT_URL,
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
    let isGithubVerified = false
    const existingUser = await AuthService.isExistingUser(githubUser.email, false)
    if (existingUser) {
      await AuthService.updateUsersGithubDetails(existingUser.id)
      await AuthService.addThirdPartyAppDetails({
        userId: existingUser.id,
        github: {
          githubId: githubUser.id,
          userName: githubUser.login,
          avatarUrl: githubUser.avatar_url
        }
      })
      isGithubVerified = true
    }
    res.redirect(`/create-your-business?github-connect=${isGithubVerified}`)
  } catch (error) {
    res.status(400).send({ message: 'Exception occured when retrieving github user details' })
  }
})

module.exports = router
