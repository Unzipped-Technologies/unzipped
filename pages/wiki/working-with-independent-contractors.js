import React from 'react';
import Nav from '../../components/unzipped/header';
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';
import Document from '../../components/Documentation/documentation';

const docsData = [
    {
      title: 'Comprehensive Guide to Hiring and Working with Independent Talent on Unzipped',
      content: `
        <h2>Table of Contents</h2>
        <ol>
          <li>Introduction to Unzipped</li>
          <li>Comprehensive Account Setup on Unzipped</li>
          <li>Crafting an Effective Job Posting on Unzipped</li>
          <li>Diligent Screening and In-depth Interviewing of Talent</li>
          <li>Streamlined Hiring Process and Contract Agreement</li>
          <li>Proactive Management and Transparent Communication with Talent</li>
          <li>The Importance of Concluding Contracts and Providing Constructive Feedback</li>
          <li>Unzipped Best Practices and Recommendations</li>
        </ol>
      `,
    },
    {
      title: 'Introduction to Unzipped',
      content: `
        <p>Unzipped has emerged as a premier platform, fostering connections between businesses, individuals, and top-tier freelancers from across the globe. By leveraging the power of Unzipped, you can access a wide pool of talent, suitable for diverse project requirements.</p>
      `,
    },
    {
      title: 'Comprehensive Account Setup on Unzipped',
      content: `
        <p><strong>Registration:</strong> Begin by registering on the Unzipped platform.</p>
        <p><strong>Profile Completion:</strong> Fill out your profile comprehensively. This includes adding your company logo, a detailed description of your business, and links to your website or portfolio.</p>
        <p><strong>Payment Methods:</strong> Ensure you've configured reliable payment methods. Unzipped offers a range of options to cater to different geographical and financial preferences.</p>
      `,
    },
    {
        title: 'Crafting an Effective Job Posting on Unzipped',
        content: `
          <p><strong>Title:</strong> Opt for a clear and concise job title.</p>
          <p><strong>Description:</strong> Dive into specifics—what's the project about, what are the expected outcomes, and what does success look like?</p>
          <p><strong>Skills & Expertise:</strong> Highlight key skills and experiences you're targeting.</p>
          <p><strong>Budgeting:</strong> Decide if you prefer an hourly engagement or a fixed-price contract. Be transparent about your budget range.</p>
          <p><strong>Visibility:</strong> You can choose to make your post public or limit visibility to only invited freelancers.</p>
        `,
      },
      {
        title: 'Diligent Screening and In-depth Interviewing of Talent',
        content: `
          <p><strong>Proposal Review:</strong> Take time to assess each proposal, weighing them against your requirements.</p>
          <p><strong>Profile Exploration:</strong> Delve deep into freelancer profiles. Their history, ratings, and portfolio provide insights into their expertise.</p>
          <p><strong>Initial Conversations:</strong> Shortlist and initiate dialogues. Preliminary chats can help gauge fitment and expertise.</p>
          <p><strong>Testing & Tasks:</strong> For specialized roles, consider setting up a test task (paid, if applicable) to understand their practical skills.</p>
        `,
      },
      {
        title: 'Streamlined Hiring Process and Contract Agreement',
        content: `
          <p><strong>Hiring Button:</strong> After finalizing a candidate, initiate the hiring process with the “Hire” button.</p>
          <p><strong>Contractual Details:</strong> Outline every aspect of the contract—payment terms, milestones, deliverables, and any other specifics. A clear contract minimizes future discrepancies.</p>
          <p><strong>Initiation:</strong> Once both parties are in agreement, kick off the project!</p>
        `,
      },
      {
        title: 'Proactive Management and Transparent Communication with Talent',
        content: `
          <p><strong>Built-in Communication:</strong> Utilize Unzipped's messaging system. This ensures you have a clear record of all interactions.</p>
          <p><strong>Expectation Setting:</strong> From the outset, make sure both parties are aligned in terms of expectations and deliverables.</p>
          <p><strong>Milestone Monitoring:</strong> Regularly check-in on progress, ensuring that the project is on track.</p>
        `,
      },
      {
        title: 'The Importance of Concluding Contracts and Providing Constructive Feedback',
        content: `
          <p><strong>Contract Termination:</strong> Upon project completion, navigate to the contract and select “End Contract”.</p>
          <p><strong>Feedback Exchange:</strong> Offer a fair evaluation of the freelancer's performance. This feedback system helps maintain the quality of the Unzipped community. Expect feedback on your collaboration as well.</p>
        `,
      },
      {
        title: 'Unzipped Best Practices and Recommendations',
        content: `
          <p><strong>Detailed Job Postings:</strong> Clarity attracts quality. The more specific you are in your job post, the higher the quality of proposals you'll receive.</p>
          <p><strong>Platform-Exclusive Communication:</strong> Engaging on the platform ensures you're protected by Unzipped's terms of service.</p>
          <p><strong>Promptness:</strong> Timely responses and feedback speed up the hiring process and foster positive relationships.</p>
          <p><strong>Dispute Resolution:</strong> In case of disagreements, leverage Unzipped’s dispute resolution mechanisms.</p>
          <p><strong>Community Engagement:</strong> Participate in Unzipped's forums and communities. It’s a great way to understand common practices and gather tips from other employers.</p>
        `,
      },
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