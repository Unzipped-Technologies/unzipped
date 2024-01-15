import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 57.5%;
  margin-left: 9%;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: 680px) {
    width: 100%;
    margin: 0px !important;
    background: transparent !important;
    border: none !important;
    box-shadow: 0px;
  }
`

const HeadingContainer = styled.div`
  border-bottom: 1px solid #bcc5d3;
`

const ApplyHeading = styled.div`
  padding-bottom: 20px;
  color: #12151b;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 23px; /* 95.833% */
  letter-spacing: 0.15px;
  margin: 20px 0px 10px 20px;
  @media (max-width: 680px) {
    margin: 0px 0px 10px 10px;
  }
`

const ApplySection = styled.div`
  margin: 20px 0px 60px 20px;
  @media (max-width: 680px) {
    margin: 20px 0px 60px 10px;
  }
`

const Caption = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 127.778% */
  letter-spacing: 0.15px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 216px;
  height: 36px;
  flex-shrink: 0;
  border: 1px solid #a5a0a0 !important;
  border-radius: 4px;
  padding-left: 5px;
`

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  background: #fff;
  text-align: right;
  width: 60%;
  outline: none !important;
  border: none !important;
  padding-top: 10px !important;
  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    margin-left: 15px;
    font-size: 20px;
  }

  @media (max-width: 680px) {
    width: 70%;
  }
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const FieldHeading = styled.div`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '23px')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  color: ${({ color }) => (color ? color : '#000')};
  text-transform: ${({ textTransform }) => (textTransform ? textTransform : 'normal')};
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  letter-spacing: 0.4px;
`

const TextArea = styled.textarea`
  width: 97%;
  padding: 10px;
  height: 147px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 2px solid #ced4da;
  background: rgba(255, 255, 255, 0.15);
  margin-top: 10px;
`

const ShowCaseProjects = styled.div`
  border-top: 1px solid #bcc5d3;
  padding-bottom: 50px;
`

const ProjectContainer = styled.div`
  @media (max-width: 680px) {
    margin: 0px;
  }
`

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  gap: 10;
  padding-bottom: 60px;
  @media (max-width: 680px) {
    flex-direction: column;
  }
`

const Project = styled.div`
  width: 251px;
  flex-shrink: 0;
  border: 1px solid #d9d9d9;
  background: rgba(217, 217, 217, 0);
  flex-direction: column;
  padding: 5px 5px 5px 5px;
  margin: ${({ margin }) => (margin ? margin : '0px')};

  margin-top: 5px;
  @media (max-width: 680px) {
    width: 96%;
    margin: 0px auto;
    margin-top: 10px;
    flex-direction: column;
  }
`

const ProjectImages = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ margin }) => (margin ? margin : '0px')};
`

const SubmitButton = styled.button`
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  width: 184px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #1976d2 !important;
  outline: none !important;
  border: none !important;
  ${({ active }) =>
    active &&
    css`
      outline: none !important;
      border: none !important;
    `};
`

const ProjectApplyForm = ({ applyToProject, projectDetails }) => {
  const [data, setData] = useState({
    coverLetter: '',
    rate: 0,
    questions: []
  })

  useEffect(() => {
    const questions = []
    projectDetails?.questionsToAsk?.map(question => {
      questions.push({
        questionText: question.question,
        question: question._id,
        answer: ''
      })
    })
    setData(prevData => ({
      ...prevData,
      questions: questions
    }))
  }, [projectDetails])

  const updateAnswer = (value, questionId) => {
    setData(prevState => ({
      ...prevState,
      questions: prevState.questions.map(q => (q.question === questionId ? { ...q, answer: value } : q))
    }))
  }

  return (
    <Container>
      <HeadingContainer>
        <ApplyHeading>Apply to this project</ApplyHeading>
      </HeadingContainer>
      <ApplySection>
        <Caption>You will be able to edit your application until the client has interacted with it.</Caption>
        <FieldContainer>
          <FieldHeading
            fontSize="16px"
            fontWeight="600"
            lineHeight="24.5px"
            textTransform="uppercase"
            padding="0px 0px 10px 0px">
            Desired Rate
          </FieldHeading>
          <InputContainer>
            <span>$</span>
            <StyledInput
              type="number"
              onChange={e => {
                setData(prevData => ({
                  ...prevData,
                  rate: e.target.value
                }))
              }}
              value={data.rate}
            />
          </InputContainer>
        </FieldContainer>
        <FieldContainer>
          <FieldHeading>Cover Letter</FieldHeading>
          <TextArea
            value={data.coverLetter}
            onChange={e => {
              setData(prevData => ({
                ...prevData,
                coverLetter: e.target.value
              }))
            }}
          />
        </FieldContainer>
        {data?.questions?.length &&
          data.questions?.map(question => {
            return (
              <FieldContainer key={question.question}>
                <FieldHeading>{question?.questionText}</FieldHeading>
                <TextArea value={question.answer} onChange={e => updateAnswer(e.target.value, question.question)} />
              </FieldContainer>
            )
          })}
        {/* <FieldContainer>
          <FieldHeading>
            Describe yourself here, and why you are a good fit for the role (min 200 characters)
          </FieldHeading>
          <TextArea />
        </FieldContainer>
        <FieldContainer>
          <FieldHeading>
            This is one of the custom questions the client added when making the project
            <TextArea />
          </FieldHeading>
        </FieldContainer>
        <FieldContainer>
          <FieldHeading>This is another one of the custom questions that were added at that time.</FieldHeading>
          <TextArea />
        </FieldContainer> */}
      </ApplySection>
      <ShowCaseProjects>
        <ProjectContainer>
          <FieldHeading padding="20px 0px 10px 20px">
            Would you like to highlight any of these projects to the client?
          </FieldHeading>
          <Projects>
            <Project margin="0px 0px 0px 10px">
              <FieldHeading fontSize="14px" color="#0057FF" fontWeight="500" textTransform="normal">
                Create a Landing page for a react site
              </FieldHeading>
              <FieldHeading fontSize="14px" color="#000" fontWeight="400" textTransform="normal">
                Full stack web developer
              </FieldHeading>
              <ProjectImages>
                <img src="/img/projectImages.png" style={{ width: '70%', height: '90px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                </div>
              </ProjectImages>
            </Project>
            <Project margin="0px 0px 0px 0px">
              <FieldHeading fontSize="14px" color="#0057FF" fontWeight="500" textTransform="normal">
                Create a Landing page for a react site
              </FieldHeading>
              <FieldHeading fontSize="14px" color="#000" fontWeight="400" textTransform="normal">
                Full stack web developer
              </FieldHeading>
              <ProjectImages>
                <img src="/img/projectImages.png" style={{ width: '70%', height: '90px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                </div>
              </ProjectImages>
            </Project>
            <Project margin="0px 10px 0px 0px">
              <FieldHeading fontSize="14px" color="#0057FF" fontWeight="500" textTransform="normal">
                Create a Landing page for a react site
              </FieldHeading>
              <FieldHeading fontSize="14px" color="#000" fontWeight="400" textTransform="normal">
                Full stack web developer
              </FieldHeading>
              <ProjectImages>
                <img src="/img/projectImages.png" style={{ width: '70%', height: '90px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                  <img
                    src="/img/projectImages.png"
                    style={{ width: window.innerWidth >= 680 ? '100%' : '120%', height: '42.875px' }}
                  />
                </div>
              </ProjectImages>
            </Project>
          </Projects>
          <SubmitButtonContainer margin="0px 20px 0px 0px">
            <SubmitButton
              onClick={() => {
                applyToProject(data)
              }}>
              SUBMIT APPLICATION
            </SubmitButton>
          </SubmitButtonContainer>
        </ProjectContainer>
      </ShowCaseProjects>
    </Container>
  )
}

export default ProjectApplyForm
