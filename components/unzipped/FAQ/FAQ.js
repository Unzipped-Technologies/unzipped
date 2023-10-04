import styled from 'styled-components';
import { COLORS, FONT_SIZE, LETTER_SPACING, getFontStyled } from '../../ui/TextMaskInput/core/utilities';

const FAQHeading = styled.h1`
    margin: 0;
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_28,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})}
`;

const QuestionStyled = styled.h5`
    margin: 0;
    margin-top: 5px;
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 500,
    fontStyle: FONT_SIZE.PX_23,
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})}
`;
const AnsStyled = styled.p`
    margin: 0;
    margin-top: 5px;
    margin-bototm: 6px;
    ${getFontStyled({
    color: COLORS.gray,
    fontSize: FONT_SIZE.PX_12,
    fontWeight: 500,
    fontStyle: FONT_SIZE.PX_23,
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})}
`;

const Span = styled.span`
    margin-top: ${FONT_SIZE.PX_11};
    ${getFontStyled({
    color: COLORS.royalBlue,
    fontSize: FONT_SIZE.PX_12,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})
    }
`;

const AnswerSection = styled.div`
    display: flex; 
    flex-direction: column; 
    width: 24.188rem; 
    margin-top: 0.813rem;
`;

const HrSection = styled.div`
padding: 0 13px 0 13px ;
:not(:nth-child(7))::after{
    margin-top: ${FONT_SIZE.PX_13};
    margin-bottom: ${FONT_SIZE.PX_6};
    content: '';
    width: 19rem;
    height: 1px;
    background: ${COLORS.faqColor};
    display: block;
}
`;

const faqs = [
    {
        question: "Is it free to join Unzipped as a freelancer?",
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
]
const FAQ = () => {
    return (
        <div style={{ display: 'flex', width: 810, background: COLORS.lightGreengray, gap: 170 }}>
            <div style={{ width: '24rem', padding: 15 }}>
                <FAQHeading> Frequently asked questions </FAQHeading>
            </div>
            <AnswerSection>
                {
                    faqs.map((item) => (
                        <HrSection>
                            <QuestionStyled>{item.question}</QuestionStyled>
                            <AnsStyled>{item.answer}</AnsStyled>
                            <Span>Read more</Span>
                        </HrSection>
                    ))
                }
            </AnswerSection>
        </div>
    )
}

export default FAQ;
