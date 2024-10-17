import React, { useEffect , useState} from 'react'
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
import socket from '../../components/sockets/index'
import { useDispatch } from 'react-redux'
import ListModal from './ListModal'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-self: center;
  max-width: 80%;
  min-width: 80%;
  width: 80%;

  margin: auto;
  margin-top: 119px;
`
const Content = styled.div`
  width: -webkit-fill-available;
`
const Box = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
`
const ImageContainer = styled.div`
  padding: 0px 55px 10px 0px;
`
const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
const Span = styled.span`
  font-weight: ${({ bold }) => (bold ? 500 : 'normal')};
`
const LikeBox = styled.span`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  text-align: right;
`
const Likes = styled.span`
  display: flex;
  margin: 10px 0px 0px 30px;
  width: 100px;
  align-items: flex-end;

  justify-content: space-between;
`
const ProfileCard = ({ user, userId, selectedFreelancer, role }) => {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = event => {
    handleOpenModal()
    // setAnchorEl(anchorEl ? null : event.currentTarget)
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

  useEffect(() => {
    socket.emit('userConnected', userId)
  }, [])

  useEffect(() => {
    socket.on('like', response => {
      dispatch({
        type: 'GET_FREELANCER_BY_ID',
        payload: {
          ...selectedFreelancer,
          likes: response?.likes,
          dislikes: response?.dislikes
        }
      })
    })

    socket.on('dislike', response => {
      dispatch({
        type: 'GET_FREELANCER_BY_ID',
        payload: {
          ...selectedFreelancer,
          likes: response?.likes,
          dislikes: response?.dislikes
        }
      })
    })

    return () => {
      socket.off('like')
      socket.off('dislike')
    }
  })

  const handleLike = () => {
    if (role !== 1) {
      const payload = {
        userId: userId,
        freelancerId: user?._id
      }
      socket.emit('like', payload)
    }
  }

  const handleDisLike = () => {
    if (role !== 1) {
      const payload = {
        userId: userId,
        freelancerId: user?._id
      }
      socket.emit('dislike', payload)
    }
  }


  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  console.log("Skills",user?.freelancerSkills)

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
                <Badge className="overflow-hidden" key={item._id}>
                  <span data-testid={ConverterUtils.convertText(item?.skill)}>{item?.skill}</span>
                </Badge>
              ))
            : '-'}
        </div>

        <Underline style={{ width: '300px' }} margin="35px 0px 10px 0px" />
        <Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: 'fit-content',
              minWidth: '500px'
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
              }}>
              {user?.likeTotal > 0 && (
                <DarkText bold>
                  {user?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS
                </DarkText>
              )}
              <TextBox>
                <Span bold>LAST UPDATED</Span>{' '}
                {dateCode === 'Invalid Date NaN, NaN' ? (
                  <span>-</span>
                ) : (
                  <Span style={{ marginLeft: '20px' }}>{dateCode}</Span>
                )}
              </TextBox>
              <TextBox>
                <Span bold>SALARY</Span>
                {'     '}
                <Span>{user.rate > 0 ? `  $${user?.rate.toFixed(2)} / HOUR` : 'Negotiable'}</Span>
              </TextBox>

              <TextBox>
                <Span bold>EQUITY</Span> <Span>{user?.isAcceptEquity ? 'YES' : 'NO'}</Span>
              </TextBox>
            </div>
            <div>
              {user?.isIdentityVerified == 'SUCCESS' && (
                <div style={{ display: 'flex' }}>
                  <Icon name="colorUser" />
                  <DarkText clickable noMargin paddingLeft hover padding="3px 0px 0px 5px">
                    Identity Verified
                  </DarkText>
                </div>
              )}
              {user?.isEmailVerified && (
                <div style={{ display: 'flex' }}>
                  <Icon name="colorEmail" />
                  <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 0px">
                    Email Verified
                  </DarkText>
                </div>
              )}
              {user?.isPreferedFreelancer && (
                <div style={{ display: 'flex' }}>
                  <Icon name="colorSheild" />
                  <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 5px">
                    Preferred Verified
                  </DarkText>
                </div>
              )}
              {user?.isPhoneVerified && (
                <div style={{ display: 'flex' }}>
                  <Icon name="colorPhone" />
                  <DarkText clickable noMargin paddingLeft hover padding="0px 0px 0px 5px">
                    Phone Verified
                  </DarkText>
                </div>
              )}
            </div>
          </div>
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

        {isOpen && (
            <ListModal handleClose={handleCloseModal} open={isOpen} userId={userId} freelancerId={user?._id} user={user} />
          )}

         {/* <Popper id={id} open={open} anchorEl={anchorEl} placement={'left'}> 
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
         </Popper>  */}
        <Likes>
          <div className="inline-flex flex-direction-column">
            <span onClick={handleLike}>
              <Icon name="thumbsUp" />
            </span>
            <div>{user?.likeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
          <div className="inline-flex flex-direction-column">
            <span onClick={handleDisLike}>
              <Icon name="thumbsDown" />
            </span>
            <div>{user?.dislikeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
        </Likes>
      </LikeBox>
    </Container>
  )
}

export default ProfileCard
