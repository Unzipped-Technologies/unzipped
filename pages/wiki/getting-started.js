import React from 'react';
import Nav from '../../components/unzipped/header';
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';
import Document from '../../components/Documentation/documentation';

const docsData = [
    {
      title: 'Getting Started as a Freelancer on Unzipped',
      content: `
        <p>Welcome to the world of freelancing on Unzipped! Whether you're new to the freelancing game or looking for a new platform to showcase your skills, this guide will walk you through the steps to get started on Unzipped.</p>
        <h2>Table of Contents:</h2>
        <ol>
          <li>Creating an Account</li>
          <li>Setting Up Your Profile</li>
          <li>Finding and Applying for Jobs</li>
          <li>Maintaining a Strong Reputation</li>
          <li>Final Thoughts</li>
        </ol>
      `,
    },
    {
      title: '1. Creating an Account',
      content: `
        <p><strong>Step 1:</strong> Navigate to the Unzipped website.</p>
        <p><strong>Step 2:</strong> Click on the “Sign Up” or "Join Now" button, typically located at the top right corner of the page.</p>
        <p><strong>Step 3:</strong> Choose the option to sign up as a “Freelancer” and fill in the required details.</p>
        <p><strong>Step 4:</strong> Complete the verification process by confirming your email address.</p>
      `,
    },
    {
      title: '2. Setting Up Your Profile',
      content: `
        <p><strong>Step 1:</strong> Upload a professional photo. This helps potential clients feel connected and gives a face to the name.</p>
        <p><strong>Step 2:</strong> Fill out your summary. Describe your expertise, experience, and what makes you unique in the marketplace.</p>
        <p><strong>Step 3:</strong> List your skills. Ensure you only list the skills you are proficient in.</p>
        <p><strong>Step 4:</strong> Set your hourly rate. It's okay to start lower as you're building your reputation, but make sure you're still valuing your work.</p>
        <p><strong>Step 5:</strong> Add your employment history, education, and other credentials. The more complete your profile is, the more trustworthy it appears to potential clients.</p>
        <p><strong>Step 6:</strong> Consider taking proficiency tests available on Unzipped to showcase your skills further.</p>
      `,
    },
    {
      title: '3. Finding and Applying for Jobs',
      content: `
        <p><strong>Step 1:</strong> Navigate to the "Find Jobs" section on Unzipped.</p>
        <p><strong>Step 2:</strong> Use filters to narrow down job postings that match your skills and interests.</p>
        <p><strong>Step 3:</strong> Read the job description carefully. Only apply if you're sure you can fulfill the client's needs.</p>
        <p><strong>Step 4:</strong> Write a personalized proposal. Address the client's needs specifically and explain why you're the best fit.</p>
        <p><strong>Step 5:</strong> Set a competitive price. While you want to earn what you're worth, consider setting a competitive rate to increase your chances of landing the job.</p>
      `,
    },
    {
      title: '4. Maintaining a Strong Reputation',
      content: `
        <p><strong>Step 1:</strong> Always communicate promptly and professionally.</p>
        <p><strong>Step 2:</strong> Meet or exceed project deadlines.</p>
        <p><strong>Step 3:</strong> Produce high-quality work. Your reputation on Unzipped will largely be determined by the feedback from your clients.</p>
        <p><strong>Step 4:</strong> After completing a project, politely ask your client for feedback or a review.</p>
        <p><strong>Step 5:</strong> Handle any disputes or misunderstandings with grace and professionalism.</p>
      `,
    },
    {
      title: '5. Final Thoughts',
      content: `
        <p>Freelancing on Unzipped can be a lucrative and rewarding experience. As you continue to grow your profile, gain reviews, and establish a reputation on the platform, you'll find more opportunities opening up for you.</p>
        <p>Remember to always update your skills and profile as you grow in your profession. The freelance world is competitive, but with dedication and quality work, you can stand out on Unzipped.</p>
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