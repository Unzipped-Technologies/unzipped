import React, { useState } from 'react';
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import Link from 'next/link'
import { BlackCard, WhiteText, TitleText, DarkText, Absolute, WhiteCard, Dismiss } from './style'

import { useRouter } from 'next/router';
import styled from 'styled-components';
import ScheduleMeetingModal from './ScheduleMeetingModal';
import { useDispatch, useSelector } from 'react-redux'
import { updateWizardSubmission } from '../../../redux/actions'

const ExploreContainer = styled.div`
  display: flex;
  width: 100%;
  background: #FAFAFA;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #D8D8D8;
  padding: 10px;
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
  padding: 10px;
  align-items: center;
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
  padding: 5px 10px;
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
`;

const WizardSuccessMessageDisplay = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    background: #f4fcef;
    border: 1px solid #8EDE64;
    border-radius: 8px;
    margin-top: 20px;
`;

const NotificationDismissalContainer = styled.div`
    display: flex;
    justify-content: flex-end;

`
const Notification = ({ type, children, noButton }) => {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { wizardSubmission } = useSelector((state) => state.Business);
    const handleNotificationDismissal = () => {
        dispatch(updateWizardSubmission({ isSuccessfull: false, projectName: '', error: '' }));
    }
    const handleMeetingModal = () => {
        setIsModalOpen(true);
    }

    switch (type) {
        case 'plan':
            return (
                <>
                    {wizardSubmission?.isSuccessfull && (
                        <WizardSuccessMessageDisplay>
                            <DarkText noMargin><span>{`Project ${wizardSubmission?.projectName} successfully created!`}</span></DarkText>
                            <NotificationDismissalContainer>
                                <Dismiss onClick={handleNotificationDismissal} >Dismiss</Dismiss>
                            </NotificationDismissalContainer>
                        </WizardSuccessMessageDisplay>
                    )}
                    <InnerCard style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'end',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '5px',
                        marginTop: '20px'
                    }}>
                        <div style={{ padding: '20px', fontSize: "19px" }}>
                            Build your dream business, grow your following, and collaborate with other professionals to
                            make your vision a reality. Start your free trial now.
                        </div>
                        <div>
                            <Button style={{ margin: '5px' }} noBorder type="black" onClick={() => router.push('/pick-a-plan')}>PICK A PLAN</Button>
                        </div>
                    </InnerCard>
                </>
            )
        case 'github':
            return (
                <WhiteCard size="large" style={{ marginTop: 20 }}>
                    <DarkText style={{ paddingTop: 20, marginTop: 20 }}>You haven't created your first Business yet, create one now so
                        you can begin Collaborating! Need Ideas? View existing projects here.

                        <Button icon="github" webKit noBorder type="dark" normal style={{ marginTop: "20px", marginRight: "10px" }}>CONNECT YOUR GITHUB ACCOUNT</Button>
                    </DarkText>
                </WhiteCard>
            )
        case 'browse':
            return (
                <WhiteCard row display='block'>
                    {/* Browse other projects to inspire ideas */}
                    <DarkText noMargin marginLeft={"5px"}>Browse other projects to inspire ideas</DarkText>
                    <Absolute justifyContent='end' ><Button noBorder type="default" normal small>BROWSE</Button></Absolute>
                </WhiteCard>
            )
        case 'dismiss':
            return (
                <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', border: '1px solid #D8D8D8', borderRadius: 5, padding: 10, marginBottom: 20 }}>
                    <div>
                        <DarkText noMargin>{children}</DarkText>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Dismiss>Dismiss</Dismiss>
                        <Button noBorder type="default" normal small>UPDATE</Button>
                    </div>
                </div>

            )
        case 'faq':
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    border: '1px solid #d8d8d8',
                    padding: '5px',
                    borderRadius: '5px',
                    marginBottom: '5px'
                }}>
                    <div>
                        <DarkText noMargin>Investors are asking about your businss. Update Frequently asked  questions now.</DarkText>
                    </div>
                    <div>
                        <Button noBorder type="default" normal small>UPDATE</Button>
                    </div>
                </div>
            )
        case 'freeTrial':
            return (
                <WhiteCard row background="#F8FAFF" style={{ borderRadius: "5px 5px 0px 0px", border: "1px solid #0029FF", paddingLeft: "30px", marginTop: "20px", paddingTop: "20px", paddingBottom: "20px" }}>
                    <Icon name="question" />
                    <DarkText noMargin paddingLeft>Your free trial will end in 5 days on
                        12/02/2022</DarkText>
                </WhiteCard>
            )
        case 'createBusiness':
            return (
                <WhiteCard size="large">
                    <DarkText fontSize={'16'} style={{ paddingTop: 20 }}>You haven't created your first Business yet, create one now so
                        you can begin Collaborating! Need Ideas? View existing projects here.
                        <Button noBorder webKit type="dark" normal style={{ marginTop: "20px", marginRight: "20px" }}>CREATE FIRST PROJECT</Button>
                    </DarkText>
                </WhiteCard>
            )

        case 'explore':
            return (
                <WhiteCard padding="200px 3px" marginBottom='70px' size="extraLarge" background="#FAFAFA" style={{ padding: "5px 10px" }}>
                    <TitleText noMargin paddingLeft="8px" marginTop={"5px"} marginLeft="10px" >Explore more support</TitleText>
                    <DarkText topPadding={'5px'}>Check out these resources for answers to your questions, videos, and best practices.</DarkText>
                    {help.map((item, index) => (
                        <InnerCard style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: 15,
                            background: "#EAEAEA",
                            padding: 15
                        }}>
                            <div>
                                <Icon name={item.icon} />
                            </div>
                            <div>
                                <TitleText noMargin small style={{ paddingLeft: 10 }}>{item.name}</TitleText>
                                <DarkText noMargin small>{item.text} <Link href={item.link.to}>{item.link.text}</Link></DarkText>
                            </div>
                        </InnerCard>
                    ))}
                </WhiteCard>
            )
        default:
            return <></>
    }
}

export default Notification
