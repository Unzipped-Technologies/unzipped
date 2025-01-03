import React from 'react'
import { MdFlag } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { MdCreditCard } from 'react-icons/md'
import { MdAccessTime } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import styled from 'styled-components'
import { MdDesktopWindows } from 'react-icons/md'
import { MdMonetizationOn } from 'react-icons/md'
import { TEXT, DIV } from '../style'
import { Image } from '../../../ui'
import { ConverterUtils } from '../../../../utils'
import Carousel from 'react-material-ui-carousel'

import Button from '../../../ui/Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import Badge from '../../../ui/Badge'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'

const MobileView = styled(DIV)`
  @media (min-width: 680px) {
    display: none;
  }
`

const ProjectRequirements = styled.ul`
  margin-left: 10px;
  margin-top: 10px;
  /* Use a more specific selector to override Materialize CSS */
  && li {
    list-style-type: disc !important;
  }
`

const MobileProjectDetail = ({
  projectDetails,
  isClientPaymentVerified,
  clientBusinessCount,
  role,
  setBusinessDetail,
  deleteImage
}) => {
  return (
    <>
      <DIV display="flex" margin="15px 0px 0px 0px" overflow="hidden" alignItems="flex-end" justifyContent="flex-end">
        {role === 0 && (
          <Button
            width="58.25px"
            extraWide
            margin="0px 10px 0px 0px"
            contentMargin="0px !important"
            type="black"
            buttonHeight="25px"
            fontSize="15px"
            colors={{
              text: '#FFF',
              background: '#1976D2',
              border: '1px',
              wideBorder: '#1976D2',
              borderRadius: '8px'
            }}
            onClick={setBusinessDetail}>
            Edit
          </Button>
        )}
      </DIV>
      <MobileView
        flexWrap="wrap"
        background="#fff"
        padding="10px 15px 80px 15px !important"
        data-testid="mobile_project_detail">
        <TEXT
          fontSize="16px"
          lineHeight="18.75px"
          color="#12151B
          
">
          Budget: ${projectDetails?.budgetRange || 0}
        </TEXT>
        <div className="d-flex justify-content-start mt-3">
          <TEXT width="40%" fontSize="16px" fontWeight="bold" lineHeight="18.75px" color=" #12151B">
            Project Length:
          </TEXT>
          <TEXT padding="0px 0px 0px 10px" fontWeight="300" fontSize="16px" lineHeight="18.75px" color="#12151B">
            {projectDetails?.projectType || 'N/A'}
          </TEXT>
        </div>
        <TEXT margin="10px 0px 0px 0px" fontSize="16px" fontWeight="bold" lineHeight="18.75px" color=" #12151B">
          Description
        </TEXT>
        <TEXT
          textAlign="justify"
          margin="10px 0px 0px 0px"
          fontWeight="300"
          fontSize="16px"
          lineHeight="18.75px"
          color="#12151B">
          {projectDetails?.challenge || projectDetails?.role || 'N/A'}
        </TEXT>
        <TEXT margin="10px 0px 0px 0px" noMargin fontSize="16px" fontWeight="bold" lineHeight="23px" color=" #12151B">
          Requirements
        </TEXT>
        <ProjectRequirements>
          {projectDetails?.objectives?.length
            ? projectDetails?.objectives?.map((objective, index) => (
                <li key={`${objective}_${index}`}>
                  <TEXT textAlign="justify" fontWeight="300" fontSize="16px" lineHeight="18.75px" color="#12151B">
                    {objective}
                  </TEXT>{' '}
                </li>
              ))
            : 'N/A'}
        </ProjectRequirements>
        <TEXT
          margin="10px 0px 10px 0px"
          noMargin
          fontSize="16px"
          fontWeight="bold"
          lineHeight="18.75px"
          color=" #12151B">
          Skills Required
        </TEXT>{' '}
        {projectDetails?.requiredSkills?.length
          ? projectDetails?.requiredSkills?.map((skill, index) => {
              return <Badge key={`${skill}_${index}`}>{skill}</Badge>
            })
          : 'N/A'}
        <TEXT fontSize="13px" padding="5px 0px 0px 0px">
          Project ID: {projectDetails?._id || 'N/A'}
        </TEXT>
        <TEXT
          margin="10px 0px 10px 0px"
          noMargin
          fontSize="16px"
          fontWeight="bold"
          lineHeight="18.75px"
          color=" #12151B">
          Project Goals
        </TEXT>{' '}
        <TEXT textAlign="justify" fontWeight="300" fontSize="16px" lineHeight="18.75px" color="#12151B">
          {projectDetails?.goals || 'N/A'}
        </TEXT>
        <TEXT
          margin="10px 0px 10px 0px"
          noMargin
          fontSize="16px"
          fontWeight="bold"
          lineHeight="18.75px"
          color=" #12151B">
          Project {projectDetails?.projectImagesUrl?.length > 0 ? `Images` : `Image`}
        </TEXT>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            width: '80%',
            margin: 'auto',
            gap: '10px'
          }}>
          <Carousel
            autoPlay={false}
            fullHeightHover={false}
            NavButton={({ onClick, className, style, next, prev }) => {
              return (
                <>
                  <button onClick={onClick} className="Carousel-button" style={style} aria-label="navigate">
                    {next && <span className="fa fa-angle-right" id="fix-b-right" />}
                    {prev && <span className="fa fa-angle-left" id="fix-b-left" />}
                  </button>
                </>
              )
            }}>
            {projectDetails &&
              projectDetails?.projectImagesUrl?.length > 0 &&
              projectDetails.projectImagesUrl.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      height: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}>
                    {role !== 1 && (
                      <AiOutlineCloseCircle
                        style={{
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          cursor: 'pointer',
                          color: 'red',
                          outlineColor: 'black'
                        }}
                        onClick={() => deleteImage(projectDetails._id, item._id)}
                      />
                    )}
                    <img
                      alt="..."
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      src={item.url}></img>
                  </div>
                )
              })}
          </Carousel>
        </div>
        <div className="mt-3" data-testid="mobile_about_client">
          <TEXT textColor="#123456" fontSize="20px" fontWeight="600">
            About client
          </TEXT>
          <DIV margin="15px 0px 0px 0px">
            <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
              <MdLocationOn style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <TEXT textColor="#123456" fontSize="18px" fontWeight="500" lineHeight="18.75px" padding="3px 0px 0px 5px">
                {projectDetails?.businessCity || 'N/A'}
              </TEXT>
            </DIV>
            <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
              <MdFlag style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <TEXT textColor="#123456" fontSize="18px" fontWeight="500" lineHeight="18.75px" padding="5px 0px 0px 5px">
                {projectDetails?.businessCountry || 'N/A'}
              </TEXT>
            </DIV>
            <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
              <MdPerson style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <TEXT textColor="#123456" fontSize="18px" fontWeight="300" lineHeight="18.75px" padding="8px 0px 0px 5px">
                {projectDetails?.likeTotal} upvotes
              </TEXT>
            </DIV>
            <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
              <MdAccessTime style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <TEXT textColor="#123456" fontSize="18px" fontWeight="300" lineHeight="18.75px" padding="8px 0px 0px 5px">
                Member since {ConverterUtils.toMonthDateYear(projectDetails?.userId?.createdAt)}
              </TEXT>
            </DIV>
          </DIV>

          <DIV margin="10px 0px 0px 0px">
            <TEXT textColor="#123456" fontSize="20px" fontWeight="500" lineHeight="18.75px" padding="10px 0px 0px 5px">
              Client Verification
            </TEXT>
            <DIV display="flex" margin="10px 0px 0px 0px">
              <MdCreditCard
                style={{
                  marginTop: '4px',
                  fontSize: '24px',
                  color: projectDetails?.userId?.isIdentityVerified === 'SUCCESS' ? '#8EDE64' : 'red'
                }}
              />{' '}
              <TEXT
                textColor="#123456"
                fontSize="18px"
                fontWeight="300"
                lineHeight="18.75px"
                padding="3px 0px 0px 10px">
                Identity Verified
              </TEXT>
            </DIV>

            <DIV display="flex" margin="10px 0px 0px 0px">
              <MdMonetizationOn
                style={{
                  marginTop: '4px',
                  fontSize: '24px',
                  color: isClientPaymentVerified ? '#8EDE64' : 'red'
                }}
              />{' '}
              <TEXT
                textColor="#123456"
                fontSize="18px"
                fontWeight="300"
                lineHeight="18.75px"
                padding="3px 0px 0px 10px">
                Payment Verified
              </TEXT>
            </DIV>

            <DIV display="flex" margin="10px 0px 0px 0px">
              <MdDesktopWindows style={{ marginTop: '4px', fontSize: '24px', color: '#8EDE64' }} />{' '}
              <TEXT
                textColor="#123456"
                fontSize="18px"
                fontWeight="300"
                lineHeight="18.75px"
                padding="3px 0px 0px 10px">
                Completed {clientBusinessCount} projects
              </TEXT>
            </DIV>
          </DIV>
        </div>
        <MobileFreelancerFooter defaultSelected="Projects" />
      </MobileView>
    </>
  )
}

export default MobileProjectDetail
