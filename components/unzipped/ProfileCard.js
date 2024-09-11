import React from 'react'
import styled from 'styled-components'

import Image from '../ui/Image'
import Icon from '../ui/Icon'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { ValidationUtils, ConverterUtils } from '../../utils'
import { TitleText, DarkText, Underline, WhiteCard } from './dashboard/style'

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
  const month = ValidationUtils.getMonthInText(user?.updatedAt)
  const dateCode = `${month} ${new Date(user?.updatedAt).getDate()}, ${new Date(user?.updatedAt).getFullYear()}`
  return (
    <Container data-testid="desktop_profile_container" id="freelancer_profile">
      <ImageContainer>
        <Image src={user?.profileImage} alt="profile pic" width="218px" radius="15px" id="freelancer_profile_image" />
      </ImageContainer>
      <Content>
        {user.FirstName !== undefined && user.LastName !== undefined && (
          <TitleText title="true">{ConverterUtils.capitalize(`${user?.FirstName} ${user?.LastName}`)}</TitleText>
        )}
        <div id="freelancer_skills">
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
        <Button block width="36px" type="button" buttonHeight="36px" fontSize="15px" noBorder>
          CHECK AVAILABILITY
        </Button>
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
