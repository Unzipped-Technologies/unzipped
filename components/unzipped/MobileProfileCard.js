import React, { useState } from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../utils'
import IconComponent from '../ui/icons/IconComponent'
import Link from 'next/link'
import { Badge, Icon } from '../ui'
import ProfileTab from './ProfileTab'

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

const OtherInformationBox = styled.div`
  width: 100%;
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
const ProjectCard = styled.div`
  border-bottom: 2px solid #d9d9d9;
  padding: 19px 13px;
`

function MobileProfileCard({ user, handleProfilePage }) {
  const [selected, setSelected] = useState(0)
  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(inputDate).toLocaleDateString(undefined, options)
  }

  return (
    <>
      <div className="text-center">
        <div
          className="py-3 px-2 d-flex align-items-center"
          style={{
            background: 'white',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            gap: '11px',
            position: 'fixed',
            width: '-webkit-fill-available',
            zIndex: '2'
          }}>
          <Link href="/freelancers">
            <span onClick={() => {}} style={{ cursor: 'pointer' }}>
              <IconComponent name="backArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
            </span>
          </Link>
          <span style={{ fontWeight: '500', fontSize: '16px' }}>Profile</span>
        </div>
        <div style={{ padding: '75px 16px 16px 16px' }}>
          <img
            src={user?.user?.profileImage}
            width={125}
            height={125}
            alt="Picture of the author"
            style={{ borderRadius: '15px' }}
          />
          <P fontSize="26px" margin="0">
            {user?.user?.FirstName || '' + ' ' + user?.user?.LastName || ''}
          </P>
          <P fontSize="15px" fontWeight="400" margin="0">
            {user?.category}
          </P>
          <div style={{ position: 'relative' }}>
            {user?.likeTotal !== 0 && (
              <div style={{ position: 'absolute', right: '30px', display: 'flex', alignItems: 'center' }}>
                <IconComponent name="thumbUp" width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
                <P margin="0px 3px">{user?.likeTotal}</P>
              </div>
            )}
            <P fontSize="14px" fontWeight="300">
              {user?.user?.AddressLineCountry || 'United States'}
            </P>
          </div>
          <P fontSize="22px" fontWeight="600">
            ${user?.rate} / HOUR
          </P>
          <div className="d-flex justify-content-around align-items-center py-4 mb-2">
            <Icon name="colorUser" />
            <Icon name="colorEmail" />
            <Icon name="colorSheild" />
            <Icon name="colorPhone" />
          </div>

          <P align="start" fontSize="13px" fontWeight="400">
            {user?.likeTotal} UPVOTES BY CLIENTS
          </P>
          <div className="d-flex" style={{ textAlign: 'start', gap: '10px' }}>
            <div>
              <P fontSize="14px">LAST UPDATE</P>
              <P fontSize="14px">EQUITY</P>
            </div>
            <div>
              <P fontSize="14px" fontWeight="300">
                {formatDate(user?.updatedAt)}
              </P>
              <P fontSize="14px">YES</P>
            </div>
          </div>
          <div
            className="d-flex"
            onClick={e => {
              e.preventDefault()
              handleProfilePage(false)
            }}>
            <div style={{ background: '#37DEC5', width: '-webkit-fill-available' }}>
              <button
                style={{
                  background: '#37DEC5',
                  color: 'white',
                  fontSize: '16px',
                  border: '0',
                  padding: '16px 0px',
                  fontWeight: '600'
                }}>
                Schedule an Interview
              </button>
            </div>
            <div style={{ borderLeft: '1.3px solid #B5B5B5', background: '#37DEC5' }}>
              <button
                style={{
                  background: '#37DEC5',
                  color: 'white',
                  fontSize: '16px',
                  border: '0',
                  padding: '16px 13px',
                  fontWeight: '600'
                }}>
                <IconComponent name="downArrow" width="20" height="20" viewBox="0 0 20 20" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileTab tabs={['PROJECTS']} selected={selected} setSelected={setSelected} />
      <ProfileTab tabs={['PROJECTS']} selected={selected} setSelected={setSelected} />
      <ProjectCard>
        <P margin="0 0 5px" color="#0057FF" fontSize="16px" fontWeight="500">
          Create a Landing page for a react site
        </P>
        <P margin="0 0 5px" fontSize="15px">
          {user?.category}
        </P>
        <P margin="0 0 14px" fontSize="14px" fontWeight="300">
          {user?.user?.AddressLineCountry || 'United States'}
        </P>
        <div style={{ marginBottom: '29px' }}>
          {user?.user?.freelancerSkills?.length > 0 &&
            user?.user?.freelancerSkills.map((item, index) => <Badge key={index}>{item?.skill}</Badge>)}
        </div>
        <div style={{ padding: '0px 19px', display: 'flex' }}>
          <img
            src="/img/projectImages.png"
            style={{ marginRight: '7px', width: '70%', height: 'auto' }}
            alt={`Image`}
          />
          <div style={{ width: '27%', height: 'auto', gap: '9px 0' }}>
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
          </div>
        </div>
      </ProjectCard>
      <ProjectCard>
        <P margin="0 0 5px" color="#0057FF" fontSize="16px" fontWeight="500">
          Create a Landing page for a react site
        </P>
        <P margin="0 0 5px" fontSize="15px">
          {user?.category}
        </P>
        <P margin="0 0 14px" fontSize="14px" fontWeight="300">
          {user?.user?.AddressLineCountry || 'United States'}
        </P>
        <div style={{ marginBottom: '29px' }}>
          {user?.user?.freelancerSkills?.length > 0 &&
            user?.user?.freelancerSkills.map((item, index) => <Badge key={index}>{item?.skill}</Badge>)}
        </div>
        <div style={{ padding: '0px 19px', display: 'flex' }}>
          <img
            src="/img/projectImages.png"
            style={{ marginRight: '7px', width: '70%', height: 'auto' }}
            alt={`Image`}
          />
          <div style={{ width: '27%', height: 'auto', gap: '9px 0' }}>
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
          </div>
        </div>
      </ProjectCard>
      <ProjectCard>
        <P margin="0 0 5px" color="#0057FF" fontSize="16px" fontWeight="500">
          Create a Landing page for a react site
        </P>
        <P margin="0 0 5px" fontSize="15px">
          {user?.category}
        </P>
        <P margin="0 0 14px" fontSize="14px" fontWeight="300">
          {user?.user?.AddressLineCountry || 'United States'}
        </P>
        <div style={{ marginBottom: '29px' }}>
          {user?.user?.freelancerSkills?.length > 0 &&
            user?.user?.freelancerSkills.map((item, index) => <Badge key={index}>{item?.skill}</Badge>)}
        </div>
        <div style={{ padding: '0px 19px', display: 'flex' }}>
          <img
            src="/img/projectImages.png"
            style={{ marginRight: '7px', width: '70%', height: 'auto' }}
            alt={`Image`}
          />
          <div style={{ width: '27%', height: 'auto', gap: '9px 0' }}>
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
            <img src="/img/projectImages.png" style={{ width: '100%', height: '50%' }} alt={`Image`} />
          </div>
        </div>
      </ProjectCard>
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
    </>
  )
}

export default MobileProfileCard
