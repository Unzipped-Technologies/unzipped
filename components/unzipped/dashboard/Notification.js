import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import ScheduleInterview from './ScheduleInterview'
import { nextPublicGithubClientId } from '../../../config/keys'
import { updateWizardSubmission } from '../../../redux/actions'
import { DarkText, Absolute, WhiteCard, Dismiss } from './style'

const ExploreContainer = styled.div`
  display: flex;
  width: 100%;
  background: #fafafa;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
  padding: 25px;
`

const TextContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
`

const ExploreItems = styled.div`
  display: flex;
  width: 100%;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  // border-radius: 10px 10px 0px 0px;
  border: 1px solid #d8d8d8;
  background: #f1f0f0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const ExploreIconContainer = styled.div`
  display: flex;
  padding: 20px;
`

const HeadingStyled = styled.p`
  margin: 0px !important;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
  display: block;
`

const ExploreItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`

const FontStyled = styled.span`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
`
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
const DismissTextStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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

const Notification = ({ type, children, noButton, user }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { wizardSubmission } = useSelector(state => state.Business)
  const handleNotificationDismissal = () => {
    dispatch(updateWizardSubmission({ isSuccessfull: false, projectName: '', error: '' }))
  }

  function handleGithub() {
    router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
  }

  switch (type) {
    case 'plan':
      return (
        <>
          {wizardSubmission?.isSuccessfull && (
            <WhiteCard row borderColor="#8EDE64" background="#f4fcef">
              <DarkText noMargin>
                <span>{`Project ${wizardSubmission?.projectName} successfully created!`}</span>
              </DarkText>
              <Absolute>
                <Dismiss onClick={handleNotificationDismissal}>Dismiss</Dismiss>
              </Absolute>
            </WhiteCard>
          )}
          <NotificationContainer background={'#000'} color="#fff" borderColor="0px">
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
        </>
      )
    case 'github':
      return (
        !user?.isGithubConnected && (
          <WhiteCard size="large">
            <DarkText>
              You haven’t connected your Github account yet, connect it now so we can begin work building your project!
            </DarkText>
            <Button icon="github" noBorder type="dark" normal onClick={handleGithub}>
              CONNECT YOUR GITHUB ACCOUNT
            </Button>
          </WhiteCard>
        )
      )
    case 'browse':
      return (
        <NotificationContainer>
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
              <DismissTextStyled>
                <Dismiss>Dismiss</Dismiss>
              </DismissTextStyled>
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
        <NotificationContainer>
          <div style={{ padding: 5 }}>
            <p> Investors are asking about your businss. Update Frequently asked questions now. </p>
          </div>
          <NotificationDismissalContainer>
            <DismissTextStyled>
              <Dismiss>Dismiss</Dismiss>
            </DismissTextStyled>
            <Button noBorder type="default" normal small>
              {' '}
              UPDATE{' '}
            </Button>
          </NotificationDismissalContainer>
        </NotificationContainer>
      )
    case 'blue':
      return (
        <NotificationContainer>
          <div style={{ padding: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Icon name="question" />
              </div>
              <div style={{ marginLeft: 5 }}>
                <p> {children} </p>
              </div>
            </div>
          </div>
          {!noButton && (
            <NotificationDismissalContainer>
              <DismissTextStyled>
                <Dismiss>Dismiss</Dismiss>
              </DismissTextStyled>
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
        user?.totalBusiness < 1 && (
          <WhiteCard size="large">
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
              CREATE FIRST PROJECT{' '}
            </Button>
          </WhiteCard>
        )
      )
    case 'updateBusiness':
      return (
        <WhiteCard size="large">
          <DarkText>
            You created your first business. Hooray! Now you need to customize your business homepage to attract better
            talent.
          </DarkText>
          <Button noBorder type="dark" normal>
            CUSTOMIZE YOUR BUSINESS PAGE
          </Button>
        </WhiteCard>
      )
    case 'explore':
      return (
        <ExploreContainer>
          <TextContent>
            <div>
              <FontStyled fontWeight={500} fontSize={'16px'}>
                Explore more support
              </FontStyled>
            </div>
            <div>
              <FontStyled>
                Check out these resources for answers to your questions, videos, and best practices.
              </FontStyled>
            </div>
          </TextContent>
          {help.map((item, index) => (
            <ExploreItems borderRadius={index === 0 ? '10px 10px 0px 0px' : '0px'} key={`${item.name}_${index}`}>
              <div style={{ display: 'flex' }}>
                <ExploreIconContainer>
                  <Icon name={item.icon} />
                </ExploreIconContainer>

                <ExploreItemTextContainer>
                  <HeadingStyled fontWeight={400}>{item.name}</HeadingStyled>
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
                </ExploreItemTextContainer>
              </div>
            </ExploreItems>
          ))}
        </ExploreContainer>
      )
    default:
      return <></>
  }
}

export default Notification
