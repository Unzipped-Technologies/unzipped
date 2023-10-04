import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from '../components/unzipped/header';
import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter';

const HelpCenterContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  margin-top: 110px;
`;

const MobileDisplayBox = styled.div`
    position: relative;
    @media(min-width: 680px) {
        display: none;
    }
`;

const SearchBar = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 16px;
  }
`;

const DocList = styled.div`
  margin-bottom: 30px;

  a {
    display: block;
    padding: 10px 0;
    color: #007BFF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FAQSection = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 15px;
  }
`;

function HelpCenter({ wikiPages=[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = wikiPages.filter(page => page.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <React.Fragment>
        <Nav />
        <HelpCenterContainer>
        <SearchBar>
            <input 
            type="text" 
            placeholder="Search for help topics..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            />
        </SearchBar>

        <DocList>
            {filteredPages.map((page, index) => (
            <Link key={index} href={`/wiki/${page.slug}`}>
                {page.title}
            </Link>
            ))}
        </DocList>

        <FAQSection>
            <h2>Frequently Asked Questions</h2>
            {/* Mock FAQ. Replace with real questions and answers. */}
            <p><strong>How do I start as a freelancer?</strong> Visit our Getting Started guide to learn more.</p>
            <p><strong>How long are the contracts?</strong> We focus on long-term contracts, but the exact duration can vary.</p>
            {/* ... More FAQ items */}
        </FAQSection>
        </HelpCenterContainer>
        <MobileDisplayBox>
            <MobileFreelancerFooter defaultSelected="Account"/>
        </MobileDisplayBox>
    </React.Fragment>
  );
}

export default HelpCenter;
