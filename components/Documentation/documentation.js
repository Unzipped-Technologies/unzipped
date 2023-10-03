import React, { useState } from 'react';
import styled from 'styled-components';

const DocumentationContainer = styled.div`
  display: flex;
`;

const DocSidebar = styled.div`
  width: 25%;
  border-right: 1px solid #e0e0e0;
  padding: 10px;
  box-sizing: border-box;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 8px 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DocContent = styled.div`
  width: 75%;
  padding: 10px;
  box-sizing: border-box;
`;

function Documentation({ docs }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <DocumentationContainer>
      <DocSidebar>
        <ul>
          {docs.map((doc, index) => (
            <li key={index} onClick={() => setSelectedDoc(doc)}>
              {doc.title}
            </li>
          ))}
        </ul>
      </DocSidebar>
      <DocContent>
        {selectedDoc && (
          <div>
            <h2>{selectedDoc.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedDoc.content }} />
          </div>
        )}
      </DocContent>
    </DocumentationContainer>
  );
}

export default Documentation;
