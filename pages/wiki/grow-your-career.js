import React from 'react';
import Nav from '../../components/unzipped/header';
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';
import Document from '../../components/Documentation/documentation';

const docsData = [
    {
      title: 'Growing Your Freelance Career with Unzipped',
      content: `
        <p>In today's digital age, freelancing has become an attractive career path for many. <strong>Unzipped</strong> provides an incredible platform for freelancers to showcase their skills and connect with clients. This guide is tailored to help freelancers thrive on <strong>Unzipped</strong>.</p>
      `,
    },
    {
      title: '1. Getting Started on Unzipped',
      content: `
        <p><strong>Sign Up:</strong> Begin by creating an account, ensuring you provide accurate and authentic details.</p>
        <p><strong>Verification:</strong> Complete any identity verification processes to increase your trustworthiness among potential clients.</p>
      `,
    },
    {
      title: '2. Creating a Compelling Profile',
      content: `
        <p><strong>Profile Picture:</strong> Opt for a professional and clear photo of yourself.</p>
        <p><strong>Tagline:</strong> Summarize your expertise in a memorable sentence.</p>
        <p><strong>Description:</strong> Provide details about your experience, unique skills, and the value you offer.</p>
        <p><strong>Skills:</strong> Enumerate your top competencies.</p>
        <p><strong>Portfolio:</strong> Displaying examples of your past work can significantly influence client decisions.</p>
      `,
    },
    {
      title: '3. Securing Your First Job',
      content: `
        <p><strong>Applying:</strong> Start by applying for smaller projects that align with your skills to gain experience and build your reputation.</p>
        <p><strong>Proposal:</strong> Each job deserves a tailored proposal. Avoid using generic messages.</p>
        <p><strong>Communication:</strong> Maintain clear and prompt communication once a client shows interest.</p>
      `,
    },
    {
      title: '4. Leveraging Feedback and Testimonials',
      content: `
        <p><strong>Quality Over Quantity:</strong> Prioritize delivering excellent work that garners positive feedback.</p>
        <p><strong>Request Feedback:</strong> After project completion, don't hesitate to ask clients for their reviews.</p>
        <p><strong>Respond to Feedback:</strong> Express gratitude for feedback received and handle any negative comments with professionalism.</p>
      `,
    },
    {
      title: '5. Amplifying Your Freelance Career on Unzipped',
      content: `
        <p><strong>Project Management:</strong> Utilize <strong>Unzipped</strong> tools to manage tasks, deadlines, and deliverables efficiently.</p>
        <p><strong>Collaboration:</strong> Engage with other freelancers or clients in real-time using <strong>Unzipped</strong>.</p>
        <p><strong>Invoicing:</strong> Streamline your invoicing and payment processes with <strong>Unzipped</strong> for timely compensation.</p>
        <p><strong>Showcasing:</strong> Continuously update and refine your <strong>Unzipped</strong> portfolio to attract more clients.</p>
      `,
    },
    {
      title: '6. Continuous Learning and Development',
      content: `
        <p><strong>Skill Development:</strong> Regularly seek out courses or training to enhance your skills.</p>
        <p><strong>Market Research:</strong> Stay updated on the market's demands and adjust your offerings accordingly.</p>
        <p><strong>Networking:</strong> Use <strong>Unzipped</strong> to connect with industry professionals and broaden your network.</p>
      `,
    },
    {
      title: 'Conclusion',
      content: `
        <p>With determination, a commitment to quality, and the right tools like <strong>Unzipped</strong>, a flourishing freelance career awaits. Follow this guide to navigate and excel in the world of freelancing on <strong>Unzipped</strong>.</p>
      `,
    }
  ];
  const Account = () => {
    const MobileDisplayBox = styled.div`
        position: relative;
        @media(min-width: 680px) {
            display: none;
        }
    `;

    return (
        <React.Fragment>
            <Nav />
            <Document docs={docsData}/>
            <MobileDisplayBox>
                <MobileFreelancerFooter defaultSelected="Account"/>
            </MobileDisplayBox>
        </React.Fragment>
    )
}

export default Account
  