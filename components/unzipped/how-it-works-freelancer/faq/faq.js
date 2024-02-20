
import { DownArrow } from '../../../icons';
import useWindowWidthEventListener from '../../../../hooks/windowWidth';
import { useState, useEffect } from 'react';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import {
    Heading_1,
    Heading_2,
    ParagraphTextStyled,
    ReadMoreTextStyled,
    FaqStyled,
    FaqContainer,
    Wrapper,
    ContentContainer,
    ContentBody,
    HeaderContainer
} from './styled';

const faqArray = [
    {
        question: 'Is it free to join Unzipped as a freelancer?',
        answer: "Yes, joining Unzipped is absolutely free. Complete your profile, search for long-term contract opportunities, and connect with clients at no upfront cost. We charge a flat 10% service fee on your earnings once you've been paid."
    },
    {
        question: "Can I advance my career with Unzipped?",
        answer: "Absolutely. Unzipped is ideal for professionals seeking stable, long-term contracts. Our comprehensive guides offer step-by-step tips to grow your freelance career."
    },
    {
        question: "What are the benefits of freelancing with Unzipped?",
        answer: "More professionals are choosing freelancing for its flexibility and autonomy. Unzipped specializes in offering longer-term contracts, providing more stability compared to project-based platforms."
    },
    {
        question: "Is Unzipped suitable for building a freelancing business?",
        answer: "Yes, Unzipped is an excellent platform for those looking to establish a freelancing business. Our focus on long-term contracts allows you to build stronger relationships with clients, leading to consistent, dependable income streams."
    },
    {
        question: "What types of contracts can I find on Unzipped?",
        answer: "Unzipped is geared towards long-term, hourly contracts. We cover a wide range of industries and skill sets, allowing you to find work that aligns with your expertise and career goals."
    },
    {
        question: "How does payment work on Unzipped?",
        answer: "Payments are processed weekly and can be received via Stripe, PayPal, or Payoneer. Our platform is designed to ensure freelancers are paid on time, every time."
    },
    {
        question: "What do Unzipped's performance badges mean?",
        answer: "Our performance badges help you stand out and gain visibility. They're awarded based on your achievements and client feedback."
    }
];

const Faq = () => {
    const isSmallWindow = useWindowWidthEventListener(600);
    const [isShortText, setIsShortText] = useState(false);

    useEffect(() => {
        isSmallWindow ? setIsShortText(true) : setIsShortText(false);
    }, [isSmallWindow]);

    const [expandedStates, setExpandedStates] = useState(new Array(faqArray.length).fill(false));

    const toggleAnswer = (index) => {
        const newExpandedStates = expandedStates.map((state, i) => (i === index ? !state : false));
        setExpandedStates(newExpandedStates);
    };


    return (
        <>
            <Wrapper>
                <ContentContainer>
                    <ContentBody>
                        <HeaderContainer> <Heading_1> Frequently asked questions</Heading_1>  </HeaderContainer>
                        <FaqContainer>
                            {faqArray.map((item, index) => (
                                <FaqStyled key={index}>
                                    <Heading_2>{item.question}</Heading_2>
                                    <ParagraphTextStyled>
                                        {!isSmallWindow || expandedStates[index]
                                            ? item.answer
                                            : item.answer.substring(0, 100)}
                                    </ParagraphTextStyled>
                                    {isSmallWindow && (
                                        <ReadMoreTextStyled onClick={() => toggleAnswer(index)}>
                                            {expandedStates[index] ? 'Read Less' : 'Read More'}
                                            {expandedStates[index] ? <ExpandLessOutlinedIcon /> : <DownArrow />}
                                        </ReadMoreTextStyled>
                                    )}
                                </FaqStyled>
                            ))}
                        </FaqContainer>
                    </ContentBody>
                </ContentContainer>
            </Wrapper>
        </>
    )
}


export default Faq;