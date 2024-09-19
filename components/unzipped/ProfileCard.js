import React, { useEffect } from 'react'
import styled from 'styled-components'

import Image from '../ui/Image'
import Icon from '../ui/Icon'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Popper from '@mui/material/Popper'
import { ValidationUtils, ConverterUtils } from '../../utils'
import { TitleText, DarkText, Underline, WhiteCard } from './dashboard/style'
import { Card, CardContent, Typography, Grid, Box as MUIBox } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-self: center;
  max-width: 100%;
  min-width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 119px;
`
const Content = styled.div`
  width: -webkit-fill-available;
`
const Box = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`
const Description = styled.div`
  width: 100%;
`
const ImageContainer = styled.div`
  padding: 0px 55px 10px 0px;
`
const Badges = styled.div`
  width: 100%;
  padding-left: 20%;
`
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const Span = styled.span`
  font-weight: ${({ bold }) => (bold ? 500 : 'normal')};
`
const LikeBox = styled.span`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  text-align: right;
`
const Likes = styled.span`
  display: flex;
  margin: 30px 0px;
  width: 100px;
  align-items: flex-end;
  justify-content: space-between;
`
const ProfileCard = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  let id = open ? 'simple-popper' : undefined

  const month = ValidationUtils.getMonthInText(user?.updatedAt)
  const dateCode = `${month} ${new Date(user?.updatedAt).getDate()}, ${new Date(user?.updatedAt).getFullYear()}`

  const handlePageClick = event => {
    if (user?.calendarSettings?.startTime && anchorEl && !anchorEl.contains(event.target)) {
      setAnchorEl(null) // Close the Popper
    }
  }

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('click', handlePageClick)

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handlePageClick)
    }
  }, [anchorEl])

  return (
    <Container data-testid="desktop_profile_container">
      <ImageContainer>
        <Image src={user?.profileImage} alt="profile pic" width="218px" radius="15px" id="freelancer_profile_image" />
      </ImageContainer>
      <Content>
        {user.FirstName !== undefined && user.LastName !== undefined && (
          <TitleText title="true">{ConverterUtils.capitalize(`${user?.FirstName} ${user?.LastName}`)}</TitleText>
        )}
        <div>
          <DarkText noMargin padding="0px 0px 5px 0px">
            SKILLS
          </DarkText>
          {user?.freelancerSkills?.length > 0
            ? user?.freelancerSkills.map(item => (
                <Badge key={item._id}>
                  <span data-testid={ConverterUtils.convertText(item?.skill)}>{item?.skill}</span>
                </Badge>
              ))
            : '-'}
        </div>

        <Box>
          <Description>
            <Underline margin="35px 0px 10px 0px" />
            {user?.likeTotal > 0 && (
              <DarkText bold>
                {user?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS
              </DarkText>
            )}
            <TextBox>
              <Span bold>LAST UPDATED</Span>{' '}
              {dateCode === 'Invalid Date NaN, NaN' ? <span>-</span> : <Span>{dateCode}</Span>}
            </TextBox>
            <TextBox>
              <Span bold>SALARY</Span>
              {'     '}
              <Span>{user.rate > 0 ? `  $${user?.rate.toFixed(2)} / HOUR` : 'Negotiable'}</Span>
            </TextBox>

            <TextBox>
              <Span bold>EQUITY</Span> <Span>{user?.isAcceptEquity ? 'YES' : 'NO'}</Span>
            </TextBox>
          </Description>
          <Badges>
            {user?.isIdentityVerified == 'SUCCESS' && (
              <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                <Icon name="colorUser" />
                <DarkText clickable noMargin paddingLeft hover padding="3px 0px 0px 5px">
                  Identity Verified
                </DarkText>
              </WhiteCard>
            )}
            {user?.isEmailVerified && (
              <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                <Icon name="colorEmail" />
                <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 5px">
                  Email Verified
                </DarkText>
              </WhiteCard>
            )}
            {user?.isPreferedFreelancer && (
              <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                <Icon name="colorSheild" />
                <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 5px">
                  Preferred Verified
                </DarkText>
              </WhiteCard>
            )}
            {user?.isPhoneVerified && (
              <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                <Icon name="colorPhone" />
                <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 5px">
                  Phone Verified
                </DarkText>
              </WhiteCard>
            )}
          </Badges>
        </Box>
      </Content>

      <LikeBox>
        <Button
          block
          width="36px"
          type="button"
          buttonHeight="36px"
          fontSize="15px"
          noBorder
          onClick={e => {
            handleClick(e)
          }}>
          CHECK AVAILABILITY
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} placement={'left'}>
          <Card
            sx={{
              minWidth: 275,
              borderRadius: 3,
              boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#ffffff'
              }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: '#1976d2', marginBottom: '10px' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                {`${ConverterUtils.formatTimeFromDate(
                  user?.calendarSettings?.startTime
                )} - ${ConverterUtils.formatTimeFromDate(user?.calendarSettings?.endTime)}`}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px' }}>
                Available Time Slot
              </Typography>
            </CardContent>
          </Card>
        </Popper>
        <Likes>
          <div className="inline-flex flex-direction-column">
            <Icon name="thumbsUp" />
            <div>{user?.likeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
          <div className="inline-flex flex-direction-column">
            <Icon name="thumbsDown" />
            <div>{user?.dislikeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
        </Likes>
      </LikeBox>
    </Container>
  )
}

export default ProfileCard
