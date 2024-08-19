import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import ScheduleInterview from './ScheduleInterview'
import { TitleText, DarkText, WhiteCard, Dismiss } from './style'
import { nextPublicGithubClientId } from '../../../config/keys'

const help = [
  {
    name: 'Help Center',
    icon: 'glasses',
    text: 'Find documentation and tutorials on how to use Unzipped.',
    link: {
      text: 'See our help docs',
      to: '/'
    }
  },
  {
    name: 'Unzipped Learn',
    icon: 'compass',
    text: 'Get step-by-step guidance on how to best set up your business online.',
    link: {
      text: 'Get started',
      to: '/'
    }
  },
  {
    name: 'Courses',
    icon: 'play',
    text: 'Learn how to run a successful business with video courses taught by industry experts',
    link: {
      text: 'Learn more',
      to: 'https://www.udemy.com/'
    }
  },
  {
    name: 'Ask us about a topic',
    icon: 'questionCircle',
    text: 'Find answers to your questions and review Unzipped resources.',
    link: {
      text: 'Ask about a topic.',
      to: '/'
    }
  }
]

const InnerCard = styled.div`
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid #d8d8d8;
  background: #f1f0f0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 100%;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 2px;
`

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  color: #000;
  border: 1px solid #d8d8d8;
`

const NotificationDismissalContainer = styled.div`
  display: flex;
`

const NotificationIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MobileNotification = ({ type, children, noButton, user }) => {
  const router = useRouter()

  function handleGithub() {
    router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
  }

  switch (type) {
    case 'plan':
      return (
        <InnerCard
          data-testid="pick_plan_notification"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'end',
            background: '#000',
            color: '#fff',
            borderRadius: '5px',
            marginTop: '20px'
          }}>
          <div style={{ padding: '20px', fontSize: '19px' }}>
            Build your dream business, grow your following, and collaborate with other professionals to make your vision
            a reality. Start your free trial now.
          </div>
          <div>
            <Button style={{ margin: '5px' }} noBorder type="black" onClick={() => router.push('/pick-a-plan')}>
              PICK A PLAN
            </Button>
          </div>
        </InnerCard>
      )
    case 'paymentMethod':
      return (
        !user?.stripeAccountId && (
          <WhiteCard size="small" data-testid="stripe_connected_notification">
            <DarkText>You haven’t connected your stripe account!</DarkText>
            <Button icon="github" noBorder type="dark" normal onClick={() => router.push('manage-payment-method')}>
              CONNECT YOUR STRIPE ACCOUNT
            </Button>
          </WhiteCard>
        )
      )
    case 'github':
      return (
        !user?.isGithubConnected && (
          <WhiteCard size="large" style={{ marginTop: 20 }} data-testid="github_connected_notification">
            <DarkText style={{ paddingTop: 20, marginTop: 20 }}>
              You haven’t connected your Github account yet, connect it now so we can begin work building your project!
              <Button
                icon="github"
                webKit
                noBorder
                type="dark"
                normal
                style={{ marginTop: '20px', marginRight: '10px' }}
                onClick={handleGithub}>
                CONNECT YOUR GITHUB ACCOUNT
              </Button>
            </DarkText>
          </WhiteCard>
        )
      )
    case 'browse':
      return (
        <NotificationContainer data-testid="browse_projects_notification">
          <div style={{ padding: 5 }}>
            <p> Browse other projects to inspire ideas </p>
          </div>
          <div>
            <Button
              noBorder
              type="default"
              normal
              small
              onClick={() => {
                router.push('/projects')
              }}>
              {' '}
              BROWSE{' '}
            </Button>
          </div>
        </NotificationContainer>
      )
    case 'dismiss':
      return (
        <NotificationContainer>
          <div style={{ padding: 5 }}>
            <p> {children} </p>
          </div>
          <NotificationDismissalContainer>
            <Dismiss>Dismiss</Dismiss>
            <Button noBorder type="default" normal small>
              {' '}
              UPDATE{' '}
            </Button>
          </NotificationDismissalContainer>
        </NotificationContainer>
      )
    case 'faq':
      return (
        <NotificationContainer data-testid="faq_notification">
          <div style={{ padding: 5 }}>
            <p> Investors are asking about your business. Update Frequently asked questions now. </p>
          </div>
          <div>
            <Button noBorder type="default" normal small>
              {' '}
              UPDATE{' '}
            </Button>
          </div>
        </NotificationContainer>
      )
    case 'freeTrial':
      return (
        <WhiteCard
          row
          data-testid={`free_trial_notification`}
          background="#F8FAFF"
          style={{
            borderRadius: '5px 5px 0px 0px',
            border: '1px solid #0029FF',
            paddingLeft: '30px',
            marginTop: '20px',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}>
          <Icon name="question" />
          <DarkText noMargin paddingLeft>
            Your free trial will end in 5 days on 12/02/2022
          </DarkText>
        </WhiteCard>
      )
    case 'createBusiness':
      return (
        !user?.totalBusiness && (
          <WhiteCard size="large" data-testid="create_business_notification">
            <DarkText fontSize={'16'} style={{ paddingTop: 20 }}>
              You haven't created your first Project yet, create one now so you can begin Collaborating! Need Ideas?
              View existing projects here.
              <Button
                noBorder
                webKit
                type="dark"
                normal
                style={{ marginTop: '20px', marginRight: '20px' }}
                onClick={() => {
                  router.push('create-your-business')
                }}>
                CREATE FIRST PROJECT
              </Button>
            </DarkText>
          </WhiteCard>
        )
      )
    case 'explore':
      return (
        <WhiteCard
          padding="200px 3px"
          marginBottom="70px"
          size="extraLarge"
          background="#FAFAFA"
          style={{ padding: '5px 10px' }}
          data-testid="explore_notification">
          <TitleText noMargin paddingLeft="8px" marginTop={'5px'} marginLeft="10px">
            Explore more support
          </TitleText>
          <DarkText topPadding={'5px'}>
            Check out these resources for answers to your questions, videos, and best practices.
          </DarkText>
          {help.map((item, index) => (
            <InnerCard
              key={`${item.name}_${index}`}
              data-testid={`${item.name}_${index}`}
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                gap: 15,
                background: '#EAEAEA',
                padding: 15
              }}>
              <div>
                <Icon name={item.icon} />
              </div>
              <div>
                <TitleText noMargin small style={{ paddingLeft: 10 }}>
                  {item.name}
                </TitleText>
                <DarkText noMargin small>
                  {item.text} <Link href={item.link.to}>{item.link.text}</Link>
                </DarkText>
              </div>
            </InnerCard>
          ))}
        </WhiteCard>
      )
    case 'blue':
      return (
        <NotificationContainer data-testid="blue_type_notification">
          <div style={{ padding: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <NotificationIconContainer>
                <Icon name="question" />
              </NotificationIconContainer>
              <div style={{ marginLeft: 5 }}>
                <div> {children} </div>
              </div>
            </div>
          </div>
          {!noButton && (
            <NotificationDismissalContainer>
              <Dismiss>Dismiss</Dismiss>
              <Button noBorder type="default" normal small>
                {' '}
                UPDATE{' '}
              </Button>
            </NotificationDismissalContainer>
          )}
        </NotificationContainer>
      )
    case 'meetingCalender':
      return (
        <>
          <ScheduleInterview />
        </>
      )
    default:
      return <></>
  }
}
export default MobileNotification
