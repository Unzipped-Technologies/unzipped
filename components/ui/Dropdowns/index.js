import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { RightArrow } from './../../icons'

const MenuDropdown = styled.div`
  position: absolute;
  width: 220px;
  top: ${({ right }) => (right ? '50px' : '84px')};
  right: ${({ right }) => (right ? '0px' : 'unset')};
  border-radius: 5px;
  box-shadow: 0 0 12px #00000029, 0 8px 24px #0003;
  padding: 10px 10px;
  background-color: #fff;
  z-index: 99;
`

const Row = styled.span`
    display: flex;
    flex-flow: row;
    align-items center;
`

const Span3 = styled.div`
  margin-top: 15px;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: #8ede64;
  }
  &:last-child {
    margin-bottom: 10px;
  }
`

const UnzippedNavContainer = styled.div`
  width: 100%;
  box-shadow: 0 0 12px #00000029, 0 8px 24px #0003;
  padding: 20px 20px;
  background-color: #fff;
  z-index: 99;
  top: 50;
  position: absolute;
  left: 0;
  height: 495px;
  box-sizing: border-box;
  padding: 56px 79px;
`

const UnzippedNavItem = styled.div`
  width: 270px;
  height: 495px;
  cursor: pointer;
  &:nth-child(3) {
    width: 454px;
  }
`

const XContainer = styled.div`
  width: 454px;
  border: 1px solid #d5e0d5;
  color: #001e00;
  cursor: pointer;
  border-radius: 9px;
  height: 83px;
  padding-left: 27px;
  padding-top: 17px;
  margin-top: 13px;
  &:hover {
    background-color: rgba(142, 222, 100, 0.25);
  }
`
const ZippedContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const LabelStyled = styled.span`
  color: #5e6d55;
  font-size: 14px;
  font-family: Roboto;
`

const TextStyled = styled.p`
  color: #001e00;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
  margin-block: 0;
  margin-top: 10px;
`

const TextDescriptionStyled = styled.p`
  color: #66745e;
  font-family: Roboto;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px;
`

const LinkStyled = styled.h3`
  color: #001e00;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const ResourcesLinkStyled = styled.h4`
  color: #3c6ccb;
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
`

const ResourcesContainer = styled.div`
  display: flex;
  align-items: baseline;
  &:hover {
    cursor: pointer;
  }
`
const IconStyled = styled.div`
  padding-left: 13px;
`
const ContainerForLink = styled.div`
  padding: ${({ index }) => (index < 2 ? '2' : '0')}px 0px;
  padding-left: ${({ index }) => (index < 2 ? '8' : '0')}px;
  border-radius: ${({ index }) => (index < 2 ? '12' : '0')}px;
  &:hover {
    background-color: ${({ index }) => (index < 2 ? 'rgba(142, 222, 100, 0.25)' : 'transparent')};
  }
`

const HR = styled.hr``

const Dropdown = ({ items, ref, onClose, token, right, top, isUnzipped }) => {
  const profileRef = useRef(null)

  useEffect(() => {
    let mouseMoveTimer

    function handleClose() {
      onClose(false)
    }

    function handleMouseMove() {
      clearTimeout(mouseMoveTimer)
      mouseMoveTimer = setTimeout(handleClose, 3000)
    }

    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        handleClose()
      }
    }

    if (profileRef.current) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      if (profileRef.current) {
        profileRef.current.removeEventListener('mousemove', handleMouseMove)
      }
      document.removeEventListener('mousedown', handleClickOutside)
      clearTimeout(mouseMoveTimer)
    }
  }, [profileRef, onClose])

  return (
    <>
      {isUnzipped ? (
        <UnzippedNavContainer
          style={{
            color: 'black',
            top: '100%',
            position: 'absolute'
          }}
          ref={profileRef}
          onMouseLeave={() => onClose()}>
          <ZippedContentContainer>
            {items?.map((e, index) => {
              if (e.name === '<hr />') {
                return <HR key={index} />
              }
              return (
                <UnzippedNavItem key={e.name + index} onClick={() => (e?.onClick ? e?.onClick(token) : () => {})}>
                  <ContainerForLink index={index}>
                    {e.icon}
                    {e?.link ? (
                      <Link href={e.link}>
                        <LinkStyled>{e.name}</LinkStyled>
                      </Link>
                    ) : (
                      <LinkStyled>{e.name}</LinkStyled>
                    )}
                    {e?.sub &&
                      e?.sub.map((link, index) => (
                        <Link href={link?.link || ''} key={`${index}_${link?.title}`}>
                          <XContainer style={{ width: 454, height: 83 }}>
                            <LabelStyled>{link?.title}</LabelStyled>
                            <TextStyled>{link?.description}</TextStyled>
                          </XContainer>
                        </Link>
                      ))}
                    {e?.sub?.length > 0 && e?.resourcelinks && (
                      <>
                        <ResourcesContainer>
                          <ResourcesLinkStyled>
                            {e?.resourceUrl ? (
                              <Link href={e.resourceUrl}>
                                <Span3>{e.resourcelinks}</Span3>
                              </Link>
                            ) : (
                              e?.resourcelinks
                            )}
                          </ResourcesLinkStyled>
                          <IconStyled>
                            <RightArrow />
                          </IconStyled>
                        </ResourcesContainer>
                      </>
                    )}
                    <TextDescriptionStyled>{e?.description}</TextDescriptionStyled>
                  </ContainerForLink>
                </UnzippedNavItem>
              )
            })}
          </ZippedContentContainer>
        </UnzippedNavContainer>
      ) : (
        <MenuDropdown
          ref={profileRef}
          onMouseLeave={() => onClose()}
          right={right}
          style={{ color: 'black', position: 'absolute', top: '100%' }}>
          {items?.map((e, index) => {
            if (e.name === '<hr />') {
              return <HR key={index} />
            }
            return (
              <Row key={e.name + index} onClick={() => (e?.onClick ? e?.onClick(token) : () => {})}>
                {e.icon}
                {e?.link ? (
                  <Link href={e.link}>
                    <Span3>{e.name}</Span3>
                  </Link>
                ) : (
                  <Span3>{e.name}</Span3>
                )}
              </Row>
            )
          })}
        </MenuDropdown>
      )}
    </>
  )
}

export default Dropdown
