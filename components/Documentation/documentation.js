import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DocumentationContainer = styled.div`
    display: flex;
    margin-top: 78px;
`;

const DocSidebar = styled.div`
    width: 25%;
    border-right: 1px solid #e0e0e0;
    padding: 10px;
    box-sizing: border-box;
    max-height: calc(100vh - 78px);  // Subtracting the margin-top value
    overflow-y: auto;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;

    &:hover {
      text-decoration: none;
      background-color: #f7f7f7;
    }

    &.selected {
      background-color: #e0e0e0;
      color: #333;
    }

    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-color: #e0e0e0;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      margin-right: 10px;
    }
  }
`;

const DocContent = styled.div`
    width: 75%;
    padding: 10px;
    box-sizing: border-box;
    max-height: calc(100vh - 78px);  // Subtracting the margin-top value
    overflow-y: auto;
    position: relative;
`;

function Documentation({ docs }) {
    const [selectedDocIndex, setSelectedDocIndex] = useState(0);
    const sectionsRef = useRef([]);
    const contentDiv = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = contentDiv.current.scrollTop;
            const currentSection = sectionsRef.current.findIndex((section, index) => {
              const nextSectionTop = sectionsRef.current[index + 1]
                ? sectionsRef.current[index + 1].offsetTop
                : Number.MAX_VALUE;
              return section.offsetTop <= currentScrollPosition && currentScrollPosition < nextSectionTop;
            });
      
            if (currentSection !== -1) {
              setSelectedDocIndex(currentSection);
            }
          };
        
        if (contentDiv.current) {
          contentDiv.current.addEventListener('scroll', handleScroll);
        }
      
        return () => {
          if (contentDiv.current) {
            contentDiv.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);
  
    const scrollToSection = (index) => {
      setSelectedDocIndex(index);
      contentDiv.current.scrollTop = sectionsRef.current[index].offsetTop;
    };
  
    return (
      <DocumentationContainer>
        <DocSidebar>
          <ul>
            {docs.map((doc, index) => (
              <li
                key={index}
                onClick={() => scrollToSection(index)}
                className={selectedDocIndex === index ? "selected" : ""}
              >
                <span>{index + 1}</span>
                {doc.title}
              </li>
            ))}
          </ul>
        </DocSidebar>
        <DocContent ref={contentDiv}>
          {docs.map((doc, index) => (
            <div key={index} ref={el => sectionsRef.current[index] = el}>
              <h2>{doc.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: doc.content }} />
            </div>
          ))}
        </DocContent>
      </DocumentationContainer>
    );
}
  
export default Documentation;