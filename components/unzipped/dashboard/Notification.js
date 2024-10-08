import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import ScheduleInterview from './ScheduleInterview'
import { nextPublicGithubClientId } from '../../../config/keys'
import { updateWizardSubmission } from '../../../redux/actions'
import { DarkText, Absolute, WhiteCard, Dismiss, DIV, TEXT } from './style'

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ background }) => (background ? background : '#fff')};
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  color: ${({ color }) => (color ? color : '#000')};
  border: ${({ borderColor }) => (borderColor ? borderColor : '1px solid #d8d8d8')};
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const NotificationDismissalContainer = styled.div`
  display: flex;
`

export const help = [
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

const Notification = ({ type, children, noButton, user }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { wizardSubmission } = useSelector(state => state.Business)
  const handleNotificationDismissal = () => {
    dispatch(updateWizardSubmission({ isSuccessfull: false, projectName: '', error: '' }))
  }

  setTimeout(() => {
    wizardSubmission?.isSuccessfull && hideSuccessAlert()
  }, 5000)

  const hideSuccessAlert = () => {
    dispatch({
      type: 'UPDATE_WIZARD_SUBMISSION',
      payload: {
        isSuccessfull: false,
        error: '',
        projectName: ''
      }
    })
  }

  function handleGithub() {
    router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
  }

  switch (type) {
    case 'plan':
      return (
        <>
          {wizardSubmission?.isSuccessfull && (
            <WhiteCard row borderColor="#8EDE64" background="#f4fcef" data-testid="project_created_notification">
              <DarkText noMargin>
                <span>{`Project ${wizardSubmission?.projectName} successfully created!`}</span>
              </DarkText>
              <Absolute>
                <Dismiss onClick={handleNotificationDismissal}>Dismiss</Dismiss>
              </Absolute>
            </WhiteCard>
          )}
          {user?.role !== 1 && (
            <NotificationContainer
              background={'#000'}
              color="#fff"
              borderColor="0px"
              id="pick_plan_notification"
              data-testid="pick_plan_notification">
              <div style={{ padding: 5 }}>
                <p>
                  Build your dream business, grow your following, and collaborate with other professionals to make your
                  vision a reality. Start your free trial now.
                </p>
              </div>
              <div>
                <Button noBorder type="black" onClick={() => router.push('/pick-a-plan')}>
                  PICK A PLAN
                </Button>
              </div>
            </NotificationContainer>
          )}
        </>
      )
    case 'github':
      return (
        !user?.isGithubConnected && (
          <WhiteCard size="large" data-testid="github_connected_notification" id="github_connected_notification">
            <DarkText>
              You haven’t connected your Github account yet, connect it now so we can begin work building your project!
            </DarkText>
            <Button icon="github" noBorder type="dark" normal onClick={handleGithub}>
              CONNECT YOUR GITHUB ACCOUNT
            </Button>
          </WhiteCard>
        )
      )
    case 'paymentMethod':
      return (
        !user?.stripeAccountId && (
          <WhiteCard size="large" data-testid="stripe_connected_notification" id="stripe_connected_notification">
            <DarkText>You haven’t connected your stripe account!</DarkText>
            <Button icon="github" noBorder type="dark" normal onClick={() => router.push('manage-payment-method')}>
              CONNECT YOUR STRIPE ACCOUNT
            </Button>
          </WhiteCard>
        )
      )
    case 'browse':
      return (
        <NotificationContainer data-testid="browse_projects_notification" id="browse_projects_notification">
          <div style={{ padding: 5 }}>
            <p>Browse other projects to inspire ideas</p>
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
              BROWSE
            </Button>
          </div>
        </NotificationContainer>
      )
    case 'meetingCalender':
      return (
        <>
          <ScheduleInterview />
        </>
      )
    case 'dismiss':
      return (
        <>
          <NotificationContainer>
            <div style={{ padding: 5 }}>
              <p> {children} </p>
            </div>
            <NotificationDismissalContainer>
              <DIV display="flex" flexDirection="column" flexFlow="column" alignItems="center" justifyContent="center">
                <Dismiss>Dismiss</Dismiss>
              </DIV>
              <Button noBorder type="default" normal small>
                {' '}
                UPDATE{' '}
              </Button>
            </NotificationDismissalContainer>
          </NotificationContainer>
        </>
      )
    case 'faq':
      return (
        user?.role !== 1 && (
          <NotificationContainer data-testid="faq_notification">
            <div style={{ padding: 5 }}>
              <p> Investors are asking about your businss. Update Frequently asked questions now. </p>
            </div>
            <NotificationDismissalContainer>
              <DIV display="flex" flexDirection="column" flexFlow="column" alignItems="center" justifyContent="center">
                <Dismiss>Dismiss</Dismiss>
              </DIV>
              <Button noBorder type="default" normal small>
                {' '}
                UPDATE{' '}
              </Button>
            </NotificationDismissalContainer>
          </NotificationContainer>
        )
      )
    case 'blue':
      return (
        <NotificationContainer data-testid="blue_type_notification">
          <div style={{ padding: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Icon name="question" />
              </div>
              <div style={{ marginLeft: 5 }}>
                <div> {children} </div>
              </div>
            </div>
          </div>
          {!noButton && (
            <NotificationDismissalContainer>
              <DIV display="flex" flexDirection="column" flexFlow="column" alignItems="center" justifyContent="center">
                <Dismiss>Dismiss</Dismiss>
              </DIV>
              <Button noBorder type="default" normal small>
                {' '}
                UPDATE{' '}
              </Button>
            </NotificationDismissalContainer>
          )}
        </NotificationContainer>
      )
    case 'createBusiness':
      return (
        !user?.totalBusiness &&
        user?.role !== 1 && (
          <WhiteCard size="large" data-testid="create_business_notification" id="create_business_notification">
            <DarkText>
              You haven't created your first Project yet, create one now so you can begin Collaborating! Need Ideas?
              View existing projects here.
            </DarkText>
            <Button
              noBorder
              type="dark"
              normal
              onClick={() => {
                router.push('create-your-business')
              }}>
              CREATE FIRST PROJECT
            </Button>
          </WhiteCard>
        )
      )
    case 'updateBusiness':
      return (
        user?.role !== 1 && (
          <WhiteCard size="large" data-testid="business_page_notification" id="business_page_notification">
            <DarkText>
              You created your first business. Hooray! Now you need to customize your business homepage to attract
              better talent.
            </DarkText>
            <Button noBorder type="dark" normal>
              CUSTOMIZE YOUR BUSINESS PAGE
            </Button>
          </WhiteCard>
        )
      )
    case 'explore':
      return (
        <DIV
          width="93.3%"
          display="flex"
          flexDirection="column"
          flexFlow="column"
          background="#fafafa"
          borderRadius="5px"
          border="1px solid #d8d8d8"
          padding="25px"
          id="explore_notification"
          data-testid="explore_notification">
          <DIV display="flex" width="100%" flexDirection="column" margin="0px 0px 20px 0px" flexFlow="column">
            <div>
              <TEXT fontWeight="500">Explore more support</TEXT>
            </div>
            <div>
              <TEXT font-weight="300">
                Check out these resources for answers to your questions, videos, and best practices.
              </TEXT>
            </div>
          </DIV>
          {help.map((item, index) => (
            <DIV
              display="flex"
              width="100%"
              borderRadius={index === 0 ? '10px 10px 0px 0px' : '0px'}
              border="1px solid #d8d8d8"
              background="#f1f0f0"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              key={`${item.name}_${index}`}
              id={`explore_${index}`}
              data-testid={`${item.name}_${index}`}>
              <div style={{ display: 'flex' }}>
                <DIV display="flex" padding="20px">
                  <Icon name={item.icon} />
                </DIV>

                <DIV display="flex" flexDirection="column" flexFlow="column" padding="5px 20px">
                  <TEXT margin="0px !important" fontWeight="400" display="block">
                    {item.name}
                  </TEXT>
                  <div>
                    <span style={{ display: 'inline' }}> {item.text} </span>
                    <span
                      style={{
                        color: '#001AFF',
                        cursor: 'pointer',
                        display: 'inline',
                        fontSize: 13
                      }}
                      onClick={() => router.push(item.link.to)}>
                      {item.link.text}
                    </span>
                  </div>
                </DIV>
              </div>
            </DIV>
          ))}
        </DIV>
      )
    default:
      return <></>
  }
}

export default Notification
