import React from 'react'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'

import { BlackCard, WhiteText, TitleText, DarkText, Absolute, WhiteCard, Dismiss } from './style'
import ScheduleInterview from './ScheduleInterview'

import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { updateWizardSubmission } from '../../../redux/actions'

const ExploreContainer = styled.div`
  display: flex;
  width: 100%;
  background: #FAFAFA;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D8D8D8;
  padding: 25px;
`;

const TextContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ExploreItems = styled.div`
  display: flex;
  width: 100%;
  border-radius:  ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  // border-radius: 10px 10px 0px 0px;
  border: 1px solid #D8D8D8;
  background: #F1F0F0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ExploreIconContainer = styled.div`
  display: flex;
  padding: 20px;
`

const HeadingStyled = styled.p`
  margin: 0px !important;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
  display: block;
`;

const ExploreItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
`;

const FontStyled = styled.span`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
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


const Notification = ({ type, children, noButton }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wizardSubmission } = useSelector((state) => state.Business);
  const handleNotificationDismissal = () => {
    dispatch(updateWizardSubmission({ isSuccessfull: false, projectName: '', error: '' }));
  }
  switch (type) {
    case 'plan':
      return (
        <>
          {wizardSubmission?.isSuccessfull && (<WhiteCard row borderColor="#8EDE64" background="#f4fcef">
            <DarkText noMargin><span>{`Project ${wizardSubmission?.projectName} successfully created!`}</span></DarkText>
            <Absolute>
              <Dismiss onClick={handleNotificationDismissal} >Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>)}
          <BlackCard>
            <WhiteText>
              Build your dream business, grow your following, and collaborate with other professionals to <br />
              make your vision a reality. Start your free trial now.
            </WhiteText>
            <Absolute>
              <Button noBorder type="black" onClick={() => router.push('/pick-a-plan')}>
                PICK A PLAN
              </Button>
            </Absolute>
          </BlackCard>
        </>
      )
    case 'github':
      return (
        <WhiteCard size="large">
          <DarkText>
            Build your dream business, grow your following, and collaborate with other professionals to <br />
            make your vision a reality. Start your free trial now.
          </DarkText>
          <Button icon="github" noBorder type="dark" normal>
            CONNECT YOUR GITHUB ACCOUNT
          </Button>
        </WhiteCard>
      )
    case 'browse':
      return (

        <WhiteCard row>
          <DarkText noMargin>Browse other projects to inspire ideas</DarkText>
          <Absolute>
            <Button noBorder type="default" normal small>
              BROWSE
            </Button>
          </Absolute>
        </WhiteCard>
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
          <WhiteCard row>
            <DarkText noMargin>{children}</DarkText>
            <Absolute>
              <Dismiss>Dismiss</Dismiss>
              <Button noBorder type="default" normal small>
                UPDATE
              </Button>
            </Absolute>
          </WhiteCard>
        </>
      )
    case 'faq':
      return (
        <WhiteCard row>
          <DarkText noMargin>Investors are asking about your businss. Update Frequently asked questions now.</DarkText>
          <Absolute>
            <Dismiss>Dismiss</Dismiss>
            <Button noBorder type="default" normal small>
              UPDATE
            </Button>
          </Absolute>
        </WhiteCard>
      )
    case 'blue':
      return (
        <WhiteCard row borderColor="#0029FF" background="#F8FAFF">
          <Icon name="question" />
          <DarkText noMargin paddingLeft>
            {children}
          </DarkText>
          {!noButton && (
            <Absolute>
              <Dismiss>Dismiss</Dismiss>
              <Button noBorder type="default" normal small>
                UPDATE
              </Button>
            </Absolute>
          )}
        </WhiteCard>
      )
    case 'createBusiness':
      return (
        <WhiteCard size="large">
          <DarkText>
            You haven't created your first Business yet, create one now so you can begin Collaborating! Need Ideas? View
            existing projects here.
          </DarkText>
          <Button noBorder type="dark" normal>
            CREATE YOUR FIRST BUSINESS
          </Button>
        </WhiteCard>
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
            <ExploreItems borderRadius={(index === 0) ? "10px 10px 0px 0px" : "0px"}>
              <div style={{ display: 'flex' }}>

                <ExploreIconContainer>
                  <Icon name={item.icon} />
                </ExploreIconContainer>

                <ExploreItemTextContainer>

                  <HeadingStyled fontWeight={400}>
                    {item.name}
                  </HeadingStyled>
                  <div>
                    <span style={{ display: 'inline' }}> {item.text} </span>
                    <span
                      style={{
                        color: "#001AFF",
                        cursor: "pointer",
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
