import React from 'react'
import styled from 'styled-components'
import { Badge } from '../ui'

const Container = styled.div`
  overflow: overlay;
  margin-top: 42px;
  margin-left: 10%;
  max-width: 1300px;
  display: flex;
  gap: 27px;
`
const ProjectCard = styled.div`
  min-width: 830px;
  max-width: 830px;
  border: 1px solid #d9d9d9;
  margin-bottom: 24px;
`

const OtherInformationBox = styled.div`
  min-width: 441px;
  max-width: 441px;
  background-color: rgba(217, 217, 217, 0.15);
`

const ProjectInnerCard = styled.div`
  padding: 19px 50px 19px 50px;
`

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-radius: ${({ radius }) => (radius ? radius : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  border: ${({ border }) => (border ? border : '')};
`
const OtherInformationCard = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px !important;
  margin: 10px;
  overflow: hidden;
  display: ${({ display }) => (display ? display : '')};
`

function ProjectsCard({ user }) {
  const images = []
  for (let i = 0; i < 3; i++) {
    images.push(<img src="/img/projectImages.png" style={{ marginRight: '21px' }} key={i} alt={`Image ${i}`} />)
  }
  return (
    <Container>
      <div>
        <ProjectCard>
          <ProjectInnerCard>
            <P margin="0" color="#0057FF" fontSize="16px" fontWeight="500">
              Create a Landing page for a react site
            </P>
            <P margin="0" fontSize="15px">
              {user?.category}
            </P>
            <P fontSize="14px" fontWeight="300">
              {user?.AddressLineCountry || 'United States'}
            </P>
            <div>
              {user?.freelancerSkills?.length > 0 &&
                user?.freelancerSkills.map((item, index) => <Badge key={item._id}>{item?.skill}</Badge>)}
            </div>
            <div style={{ gap: '21px' }}>{images}</div>
          </ProjectInnerCard>
        </ProjectCard>
        <ProjectCard>
          <ProjectInnerCard>
            <P margin="0" color="#0057FF" fontSize="16px" fontWeight="500">
              Create a Landing page for a react site
            </P>
            <P margin="0" fontSize="15px">
              {user?.category}
            </P>
            <P fontSize="14px" fontWeight="300">
              {user?.AddressLineCountry || 'United States'}
            </P>
            <div>
              {user?.freelancerSkills?.length > 0 &&
                user?.freelancerSkills.map((item, index) => <Badge key={item._id}>{item?.skill}</Badge>)}
            </div>
            <div>{images}</div>
          </ProjectInnerCard>
        </ProjectCard>
        <ProjectCard>
          <ProjectInnerCard>
            <P margin="0" color="#0057FF" fontSize="16px" fontWeight="500">
              Create a Landing page for a react site
            </P>
            <P margin="0" fontSize="15px">
              {user?.category}
            </P>
            <P fontSize="14px" fontWeight="300">
              {user?.AddressLineCountry || 'United States'}
            </P>
            <div>
              {user?.freelancerSkills?.length > 0 &&
                user?.freelancerSkills.map((item, index) => <Badge key={item._id}>{item?.skill}</Badge>)}
            </div>
            <div>{images}</div>
          </ProjectInnerCard>
        </ProjectCard>
      </div>
      <OtherInformationBox>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px">
            Top Skills
          </P>
          <P padding="0 10px">C Programming</P>
          <P padding="0 10px">Algorithm</P>
          <P padding="0 10px">C++ Programming</P>
          <P padding="0 10px">Database Development</P>
          <P padding="0 10px">Cryptocurrency</P>
        </OtherInformationCard>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px" margin="0">
            Browse Similar Freelancers
          </P>
          <div style={{ gap: '6px', display: 'flex', padding: '20px 10px', flexWrap: 'wrap' }}>
            <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
              C Programmers in France
            </P>
            <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
              C Programmers
            </P>
            <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
              Algorithm Experts
            </P>
            <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
              C++ Programming
            </P>
          </div>
        </OtherInformationCard>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px">
            Education
          </P>
          <P padding="0 10px" fontWeight="500">
            Engineer
          </P>
          <P padding="0 10px" margin="0">
            Ecole centrale de Lyon, France
          </P>
          <P padding="0 10px">1984-1987 (3 years)</P>
        </OtherInformationCard>
      </OtherInformationBox>
    </Container>
  )
}

export default ProjectsCard
