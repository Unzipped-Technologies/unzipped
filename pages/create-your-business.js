import React, { useState } from 'react'
import styled from 'styled-components'
import OptionTileGroup from '../components/ui/OptionTileGroup'
import CreateABusiness from '../components/unzipped/CreateABusiness'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import { ValidationUtils } from '../utils'
import { countriesList } from '../utils/constants'
import { Grid, Grid2 } from '../components/unzipped/dashboard/style'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateBusinessForm, createBusiness } from '../redux/actions'
import router from 'next/router'
import { parseCookies } from '../services/cookieHelper'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: 100vh;
  width: 100vw;
`

const CardContainer = styled.div`
  display: flex;
  width: 952px;
  height: 611px;
`

function handleGithub() {
  router.push(
    `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`
  )
}

const GetCard = ({
  stage,
  isFirstBusiness,
  incomePlatform,
  isExistingAudience,
  socialMediaPlatforms = [],
  numberOfSocialFollowing,
  businessNiche,
  name,
  businessAddressLineOne,
  businessAddressLineTwo,
  businessCountry,
  businessCity,
  isEquity,
  typesOfHires,
  equity,
  budget,
  businessZip,
  submitForm,
  updateForm,
  goBack,
  loading
}) => {
  const isGithubConnected = !!router?.query?.['github-connect'] || false
  switch (stage) {
    case 1:
      return (
        <CreateABusiness
          title={`Let’s get started. Which of these best describes this business?`}
          sub={`We’ll help you get started based on your business needs.`}
          onUpdate={updateForm}
          onBack={goBack}
          disabled={isFirstBusiness === ''}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid>
            <OptionTileGroup
              selectedValue={isFirstBusiness}
              type="radio"
              tileList={[
                {
                  label: `I'M JUST STARTING`,
                  iconName: 'profileNew',
                  value: 'true'
                },
                {
                  label: `I already have a business`,
                  iconName: 'desktop',
                  value: 'false'
                }
              ]}
              onChange={e => updateForm({ isFirstBusiness: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 2:
      return (
        <CreateABusiness
          title="Let’s get started. Which of these best describes this business?"
          sub="We’ll help you get started based on your business needs."
          onBack={goBack}
          onSubmit={submitForm}
          disabled={incomePlatform.length === 1}
          noMargin
          progress={stage * 7.15}
          stage={stage}>
          <Grid margin="10px 0px">
            <OptionTileGroup
              selectedValue={[...incomePlatform]}
              type="check"
              tileList={[
                {
                  label: `An online store`,
                  sub: `Build a fully customizable website`,
                  iconName: 'profileNew',
                  value: 'An online store'
                },
                {
                  label: `An existing website or blog`,
                  sub: `Add a Buy Button to your website`,
                  iconName: 'desktop',
                  value: `An existing website or blog`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  incomePlatform: incomePlatform.find(i => i === e.target.value)
                    ? incomePlatform.filter(i => i !== e.target.value)
                    : [...incomePlatform, e.target.value]
                })
              }
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={[...incomePlatform]}
              type="check"
              tileList={[
                {
                  label: `Social Media`,
                  sub: `Reach customers through Facebook, TikTok and more`,
                  iconName: 'profileNew',
                  value: 'Social Media'
                },
                {
                  label: `Online marketplaces`,
                  sub: `List products on google, Amazon, and more`,
                  iconName: 'desktop',
                  value: `Online marketplaces`
                }
              ]}
              margin="5px 0px"
              onChange={e => {
                updateForm({
                  incomePlatform: incomePlatform.find(i => i === e.target.value)
                    ? incomePlatform.filter(i => i !== e.target.value)
                    : [...incomePlatform, e.target.value]
                })
              }}
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={incomePlatform}
              type="check"
              tileList={[
                {
                  label: `In person`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'In person'
                },
                {
                  label: `I’m not sure`,
                  sub: '',
                  iconName: 'desktop',
                  value: `I’m not sure`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  incomePlatform: incomePlatform.find(i => i === e.target.value)
                    ? incomePlatform.filter(i => i !== e.target.value)
                    : [...incomePlatform, e.target.value]
                })
              }
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 3:
      return (
        <CreateABusiness
          title="Do you have an online audience or following?"
          sub="If you’re engaging with an audience on online platforms like YouTube, Instagram, Twitter, Substack, Patreon,
                    or elsewhere, we can set you up to sell to them."
          onUpdate={updateForm}
          onBack={goBack}
          disabled={isExistingAudience === ''}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={isExistingAudience !== 'true' ? stage + 2 : stage}>
          <Grid>
            <OptionTileGroup
              selectedValue={isExistingAudience}
              type="radio"
              tileList={[
                {
                  label: `YES`,
                  iconName: 'profileNew',
                  value: 'true'
                },
                {
                  label: `NO`,
                  iconName: 'desktop',
                  value: 'false'
                }
              ]}
              onChange={e => updateForm({ isExistingAudience: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 4:
      return (
        <CreateABusiness
          title="Where is your existing audience?"
          sub="Choose all online platforms that apply."
          onUpdate={updateForm}
          onBack={() => goBack()}
          onSubmit={submitForm}
          disabled={socialMediaPlatforms.length <= 1}
          progress={stage * 7.15}
          stage={stage}>
          <Grid margin="10px 0px">
            <OptionTileGroup
              selectedValue={socialMediaPlatforms}
              type="check"
              tileList={[
                {
                  label: `FACEBOOK`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'FACEBOOK'
                },
                {
                  label: `YOUTUBE`,
                  sub: '',
                  iconName: 'desktop',
                  value: `YOUTUBE`
                },
                {
                  label: `INSTAGRAM`,
                  sub: '',
                  iconName: 'desktop',
                  value: `INSTAGRAM`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value)
                    ? socialMediaPlatforms.filter(i => i !== e.target.value)
                    : [...socialMediaPlatforms, e.target.value]
                })
              }
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={socialMediaPlatforms}
              type="check"
              tileList={[
                {
                  label: `TIKTOK`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'TIKTOK'
                },
                {
                  label: `SNAPCHAT`,
                  sub: '',
                  iconName: 'desktop',
                  value: `SNAPCHAT`
                },
                {
                  label: `PINTEREST`,
                  sub: '',
                  iconName: 'desktop',
                  value: `PINTEREST`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value)
                    ? socialMediaPlatforms.filter(i => i !== e.target.value)
                    : [...socialMediaPlatforms, e.target.value]
                })
              }
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={socialMediaPlatforms}
              type="check"
              tileList={[
                {
                  label: `TWITTER`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'TWITTER'
                },
                {
                  label: `LINKEDIN`,
                  sub: '',
                  iconName: 'desktop',
                  value: `LINKEDIN`
                },
                {
                  label: `EMAIL LIST`,
                  sub: '',
                  iconName: 'desktop',
                  value: `EMAIL LIST`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  socialMediaPlatforms: socialMediaPlatforms.find(i => i === e.target.value)
                    ? socialMediaPlatforms.filter(i => i !== e.target.value)
                    : [...socialMediaPlatforms, e.target.value]
                })
              }
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 5:
      return (
        <CreateABusiness
          title="Let’s get started. Which of these best describes your business?"
          sub="We’ll help you get started based on your business needs."
          onUpdate={updateForm}
          onBack={goBack}
          disabled={numberOfSocialFollowing.length <= 1}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid margin="10px 0px">
            <OptionTileGroup
              selectedValue={numberOfSocialFollowing}
              type="radio"
              margin="5px"
              tileList={[
                {
                  label: `1-1,000`,
                  iconName: 'profileNew',
                  value: '1-1,000'
                },
                {
                  label: `1,001-10,000`,
                  iconName: 'desktop',
                  value: '1,001-10,000'
                }
              ]}
              onChange={e => updateForm({ numberOfSocialFollowing: e.target.value })}
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={numberOfSocialFollowing}
              type="radio"
              margin="5px"
              tileList={[
                {
                  label: `10,001-100,000`,
                  iconName: 'profileNew',
                  value: '10,001-100,000'
                },
                {
                  label: `100,001-1 MILLION`,
                  iconName: 'desktop',
                  value: '100,001-1 MILLION'
                }
              ]}
              onChange={e => updateForm({ numberOfSocialFollowing: e.target.value })}
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={numberOfSocialFollowing}
              type="radio"
              margin="5px"
              tileList={[
                {
                  label: `1 MILLION OR MORE`,
                  iconName: 'profileNew',
                  value: '1 MILLION OR MORE'
                },
                {
                  label: `I'M NOT SURE`,
                  iconName: 'desktop',
                  value: `I'M NOT SURE`
                }
              ]}
              onChange={e => updateForm({ numberOfSocialFollowing: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 6:
      return (
        <CreateABusiness
          title="Which of the following best describes your content niche or field?"
          sub="Choose all that apply, and we’ll use this information to identify features to tailor your experience to your niche."
          onUpdate={updateForm}
          onBack={() => goBack(isExistingAudience !== 'true' ? stage - 2 : stage)}
          onSubmit={submitForm}
          progress={stage * 7.15}
          disabled={businessNiche.length <= 1}
          stage={stage}>
          <Grid margin="10px 0px">
            <OptionTileGroup
              selectedValue={businessNiche}
              type="radio"
              tileList={[
                {
                  label: `BEAUTY`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'BEAUTY'
                },
                {
                  label: `FASHION`,
                  sub: '',
                  iconName: 'desktop',
                  value: `FASHION`
                },
                {
                  label: `HOME`,
                  sub: '',
                  iconName: 'desktop',
                  value: `HOME`
                }
              ]}
              margin="5px 0px"
              onChange={e => updateForm({ businessNiche: e.target.value })}
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={businessNiche}
              type="radio"
              tileList={[
                {
                  label: `ANIMALS & PETS`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'ANIMALS & PETS'
                },
                {
                  label: `ARTS & ENTETAINMENT`,
                  sub: '',
                  iconName: 'desktop',
                  value: `ARTS & ENTETAINMENT`
                },
                {
                  label: `CAREER & ENTREPRENEURSHIP`,
                  sub: '',
                  iconName: 'desktop',
                  value: `CAREER & ENTREPRENEURSHIP`
                }
              ]}
              margin="5px 0px"
              onChange={e => updateForm({ businessNiche: e.target.value })}
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={businessNiche}
              type="radio"
              tileList={[
                {
                  label: `CRAFTS & DIY`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'CRAFTS & DIY'
                },
                {
                  label: `ELECTRONICS`,
                  sub: '',
                  iconName: 'desktop',
                  value: `ELECTRONICS`
                },
                {
                  label: `FINANCE`,
                  sub: '',
                  iconName: 'desktop',
                  value: `FINANCE`
                }
              ]}
              margin="5px 0px"
              onChange={e => updateForm({ businessNiche: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 7:
      return (
        <CreateABusiness
          title="What would you like to name your business?"
          sub="You can skip this for now if you’re still working on it."
          disabled={name.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="80%"
              onChange={e => updateForm({ name: e.target.value })}
              // onBlur={() => updateForm({ name: businessName })}
              value={name}>
              Business Name (you can change this later)
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    case 8:
      return (
        <CreateABusiness
          title="Where is your business located?"
          sub="We’ll use your location to help ensure you are compliant 
                    with any local regulations."
          disabled={
            !(
              businessAddressLineOne.length > 0 &&
              businessCity.length > 0 &&
              businessZip.length > 0 &&
              businessCountry.length > 0
            )
          }
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid margin="0px 0px 20px 0px" left>
            <FormField
              fieldType="input"
              width="80%"
              noMargin
              fontSize="14px"
              onChange={e => updateForm({ businessAddressLineOne: e.target.value })}
              // onBlur={() => updateForm({ name: businessName })}
              value={businessAddressLineOne}>
              Address line 1
            </FormField>
            <FormField
              fieldType="input"
              fontSize="14px"
              width="80%"
              noMargin
              onChange={e => updateForm({ businessAddressLineTwo: e.target.value })}
              // onBlur={() => updateForm({ name: businessName })}
              value={businessAddressLineTwo}>
              Address line 2
            </FormField>
            <Grid2 margin="0px">
              <FormField
                fieldType="input"
                fontSize="14px"
                noMargin
                width="80%"
                onChange={e => updateForm({ businessCity: e.target.value })}
                // onBlur={() => updateForm({ name: businessName })}
                value={businessCity}>
                City
              </FormField>
              <FormField
                fieldType="input"
                fontSize="14px"
                noMargin
                width="80%"
                onChange={e => updateForm({ businessZip: e.target.value })}
                // onBlur={() => updateForm({ name: businessName })}
                value={businessZip}>
                Zip Code
              </FormField>
            </Grid2>
            <FormField
              fieldType="input"
              fontSize="14px"
              width="80%"
              placeholder="Select Country"
              options={countriesList.map(country => {
                const newCountry = {
                  ...country,
                  label: country.name,
                  value: country.name
                }

                return newCountry
              })}
              noMargin
              onChange={e => updateForm({ businessCountry: e.target.value })}
              // onBlur={() => updateForm({ name: businessName })}
              value={businessCountry}>
              Country/Region
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    case 9:
      return (
        <CreateABusiness
          title="Will this business participate in equity sharing?"
          sub="If you want to compensate your employees with equity in the company, select yes to 
                    continue set up of this feature."
          onUpdate={updateForm}
          disabled={isEquity.length === 0}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={isEquity !== 'true' ? stage + 1 : stage}>
          <Grid>
            <OptionTileGroup
              selectedValue={isEquity}
              type="radio"
              tileList={[
                {
                  label: `YES`,
                  iconName: 'profileNew',
                  value: 'true'
                },
                {
                  label: `NO`,
                  iconName: 'desktop',
                  value: 'false'
                }
              ]}
              onChange={e => updateForm({ isEquity: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 10:
      return (
        <CreateABusiness
          title="What percent of equity would you like to spend distribute?"
          sub="You can skip this for now if you’re still working on it. Select a percentage between 1
                    and 100 of your company that will be distributed to your employees after MVP releases. "
          onUpdate={updateForm}
          disabled={equity === 0}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="80%"
              onChange={e => {
                e.target.value >= 100
                ValidationUtils._percentValidate(e.target.value) && updateForm({ equity: e.target.value })
              }}
              value={equity}>
              Business Equity (1 - 100%)
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    case 11:
      return (
        <CreateABusiness
          title="What is your total budget on this project?"
          sub="How much do you plan to spend on building this project? The higher your budget, 
                    the more likely you are to attract top talent on the site. "
          onUpdate={updateForm}
          onBack={() => goBack(isExistingAudience !== 'true' ? stage - 1 : stage)}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="80%"
              // currency
              onChange={e => {
                ValidationUtils._isNumber(e.target.value.replace(',', '').replace('$', '')) &&
                  updateForm({ budget: e.target.value.replace('$', '').replace(',', '') })
              }}
              value={'$' + budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}>
              Budget (in USD)
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    case 12:
      return (
        <CreateABusiness
          title="Do you currently have a github account?"
          sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
          onUpdate={updateForm}
          onBack={() => goBack(isExistingAudience !== 'true' ? stage - 1 : stage)}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}
          skip={!isGithubConnected}>
          <Grid>
            <Button
              icon="github"
              extraTall
              extraWide
              noBorder
              type="dark"
              normal
              onClick={handleGithub}
              disabled={isGithubConnected}>
              CONNECT YOUR GITHUB ACCOUNT
            </Button>
          </Grid>
        </CreateABusiness>
      )
    case 13:
      return (
        <CreateABusiness
          title="What type of talent do you plan to hire?"
          sub="Choose all that apply, and we’ll use this information to identify features to tailor your store to your niche."
          onUpdate={updateForm}
          onBack={() => goBack()}
          submit
          loading={loading}
          disabled={typesOfHires.length === 1}
          onSubmit={submitForm}
          progress={stage * 7.15}
          stage={stage}>
          <Grid margin="10px 0px">
            <OptionTileGroup
              selectedValue={typesOfHires}
              type="check"
              tileList={[
                {
                  label: `DEVELOPER`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'DEVELOPER'
                },
                {
                  label: `SALES`,
                  sub: '',
                  iconName: 'desktop',
                  value: `SALES`
                },
                {
                  label: `CONTENT WRITER`,
                  sub: '',
                  iconName: 'desktop',
                  value: `CONTENT WRITER`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  typesOfHires: typesOfHires.find(i => i === e.target.value)
                    ? typesOfHires.filter(i => i !== e.target.value)
                    : [...typesOfHires, e.target.value]
                })
              }
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={typesOfHires}
              type="check"
              tileList={[
                {
                  label: `LEGAL`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'LEGAL'
                },
                {
                  label: `MARKETING`,
                  sub: '',
                  iconName: 'desktop',
                  value: `MARKETING`
                },
                {
                  label: `ACCOUNTING`,
                  sub: '',
                  iconName: 'desktop',
                  value: `ACCOUNTING`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  typesOfHires: typesOfHires.find(i => i === e.target.value)
                    ? typesOfHires.filter(i => i !== e.target.value)
                    : [...typesOfHires, e.target.value]
                })
              }
              stage={stage}
            />
            <OptionTileGroup
              selectedValue={typesOfHires}
              type="check"
              tileList={[
                {
                  label: `RESEARCH`,
                  sub: `Pick as many as you like – you can always change these later.`,
                  iconName: 'profileNew',
                  value: 'RESEARCH'
                },
                {
                  label: `GRAPHIC DESIGN`,
                  sub: '',
                  iconName: 'desktop',
                  value: `GRAPHIC DESIGN`
                },
                {
                  label: `ENGINEERING`,
                  sub: '',
                  iconName: 'desktop',
                  value: `ENGINEERING`
                }
              ]}
              margin="5px 0px"
              onChange={e =>
                updateForm({
                  typesOfHires: typesOfHires.find(i => i === e.target.value)
                    ? typesOfHires.filter(i => i !== e.target.value)
                    : [...typesOfHires, e.target.value]
                })
              }
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    default:
      return <></>
  }
}

const CreateBusiness = ({
  stage,
  updateBusinessForm,
  isFirstBusiness,
  incomePlatform,
  isExistingAudience,
  socialMediaPlatforms = [],
  numberOfSocialFollowing,
  businessAddressLineOne,
  businessAddressLineTwo,
  businessCountry,
  businessCity,
  equity,
  loading,
  budget,
  typesOfHires,
  businessState,
  businessZip,
  businessNiche,
  isEquity,
  name,
  createBusiness,
  token
}) => {
  const submitForm = step => {
    if (step < 13) {
      // submit form
      // if step is true then go forward 1 step
      updateBusinessForm({
        stage: step ? step + 1 : stage
      })
    } else {
      createBusiness(
        {
          name,
          isFirstBusiness,
          budget,
          isExistingAudience,
          isEquity,
          equity,
          typesOfHires,
          incomePlatform,
          numberOfSocialFollowing,
          socialMediaPlatforms,
          businessNiche,
          businessAddressLineOne,
          businessAddressLineTwo,
          businessCountry,
          businessCity,
          businessState,
          businessZip,
          businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        },
        token.access_token
      )
        .then(() => {
          router.push('/dashboard?success=true')
        })
        .catch(e => {
          console.log('error: ', e)
        })
    }
  }

  const updateForm = data => {
    // update form
    updateBusinessForm({
      ...data
    })
  }

  const goBack = step => {
    // update form step
    // if on 1st page go back to dashboard
    if (stage > 1) {
      updateBusinessForm({
        stage: (step || stage) - 1
      })
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <Container>
      <GetCard
        stage={stage}
        submitForm={submitForm}
        updateForm={updateForm}
        goBack={goBack}
        loading={loading}
        isFirstBusiness={isFirstBusiness}
        incomePlatform={incomePlatform}
        equity={equity}
        budget={budget}
        isExistingAudience={isExistingAudience}
        socialMediaPlatforms={socialMediaPlatforms}
        typesOfHires={typesOfHires}
        numberOfSocialFollowing={numberOfSocialFollowing}
        businessAddressLineOne={businessAddressLineOne}
        businessAddressLineTwo={businessAddressLineTwo}
        businessCountry={businessCountry}
        businessCity={businessCity}
        businessState={businessState}
        businessZip={businessZip}
        businessNiche={businessNiche}
        isEquity={isEquity}
        name={name}
      />
    </Container>
  )
}

CreateBusiness.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    name: state.Business?.businessForm.name,
    isFirstBusiness: state.Business?.businessForm.isFirstBusiness,
    budget: state.Business?.businessForm.budget,
    isExistingAudience: state.Business?.businessForm.isExistingAudience,
    isEquity: state.Business?.businessForm.isEquity,
    equity: state.Business?.businessForm.equity,
    deadline: state.Business?.businessForm.deadline,
    typesOfHires: state.Business?.businessForm.typesOfHires,
    incomePlatform: state.Business?.businessForm.incomePlatform,
    numberOfSocialFollowing: state.Business?.businessForm.numberOfSocialFollowing,
    socialMediaPlatforms: state.Business?.businessForm.socialMediaPlatforms,
    businessNiche: state.Business?.businessForm.businessNiche,
    businessAddressLineOne: state.Business?.businessForm.businessAddressLineOne,
    businessAddressLineTwo: state.Business?.businessForm.businessAddressLineTwo,
    businessCountry: state.Business?.businessForm.businessCountry,
    businessCity: state.Business?.businessForm.businessCity,
    businessState: state.Business?.businessForm.businessState,
    businessZip: state.Business?.businessForm.businessZip,
    description: state.Business?.businessForm.description,
    businessImage: state.Business?.businessForm.businessImage,
    stage: state.Business?.businessForm.stage,
    loading: state.Business?.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    createBusiness: bindActionCreators(createBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness)
