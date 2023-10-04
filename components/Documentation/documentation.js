import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DocumentationContainer = styled.div`
  display: flex;
  margin-top: 78px;
  font-family: 'Arial', sans-serif;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const DocSidebar = styled.div`
  width: 25%;
  border-right: 1px solid #eaeaea;
  padding: 20px 20px;
  box-sizing: border-box;
  max-height: calc(100vh - 78px);
  overflow-y: auto;
  background-color: #f9f9f9;

  display: ${({ isSidebarVisible }) => (isSidebarVisible ? 'block' : 'none')};

  @media (max-width: 850px) {
    display: none;
    width: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 12px 16px;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s, color 0.2s;
    color: #555;
    font-weight: 400;

    &:hover {
      background-color: #e5e5e5;
    }

    &.selected {
      background-color: #007BFF;
      color: #fff;
      font-weight: 600;

      span {
        background-color: #fff;
        color: #007BFF;
      }
    }

    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-color: #bbb;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      margin-right: 15px;
    }
  }
`;

const SidebarToggle = styled.button`
  background-color: #007BFF;
  color: white;
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: absolute;
  top: 85px;
  left: 20px;
  z-index: 10;

  &:focus {
    outline: none;
  }
`;

const DocContent = styled.div`
  width: ${({ isSidebarVisible }) => (isSidebarVisible ? '75%' : '100%')};
  padding: 20px;
  box-sizing: border-box;
  max-height: calc(100vh - 78px);
  overflow-y: auto;
  position: relative;
  background-color: #fff;
  padding-bottom: 250px;

  h2 {
    margin-top: 40px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    font-size: 1.5em;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 1.5em;
    line-height: 1.6;
    color: #555;
  }

  div {
    margin-bottom: 40px;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const TableOfContents = styled.div`
  display: block;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 10px;
    font-weight: 600;
    color: #333;
  }

  ul {
    list-style-type: none;
    margin-left: 20px;
    padding-left: 0;
  }

  li {
    margin-bottom: 5px;
    cursor: pointer;
    transition: color 0.3s;
    color: #007BFF;
    position: relative;

    &::before {
      content: '•';
      color: #007BFF;
      display: inline-block;
      width: 20px;
      marginLeft: -20px;
    }

    &:hover {
      color: #0056b3;
    }
  }
`;


function Documentation({ docs }) {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const scrollToSection = (index) => {
    setSelectedDocIndex(index);
    contentDiv.current.scrollTop = sectionsRef.current[index].offsetTop;
  };

  return (
    <DocumentationContainer>
      {isSidebarVisible ? null : (
        <SidebarToggle onClick={toggleSidebar}>Show Menu</SidebarToggle>
      )}
      <DocSidebar isSidebarVisible={isSidebarVisible}>
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
        <button onClick={toggleSidebar}>Hide Menu</button>
      </DocSidebar>
      <DocContent ref={contentDiv} isSidebarVisible={isSidebarVisible}>
      <TableOfContents>
          <h3>Table of Contents</h3>
          <ul>
            {docs.map((doc, index) => (
              <li key={index} onClick={() => scrollToSection(index)}>
                {doc.title}
              </li>
            ))}
          </ul>
        </TableOfContents>
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