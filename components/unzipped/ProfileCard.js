import React from 'react'
import styled from 'styled-components'
import Image from '../ui/Image'
import Icon from '../ui/Icon'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { ValidationUtils } from '../../utils'
import {
    TitleText,
    DarkText,
    Underline,
    WhiteCard
} from './dashboard/style'

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-self: center;
    max-width: 1300px;
    padding: 40px;
`;
const Content = styled.div`
    margin: 0px 30px;
`;
const Box = styled.div`
    display: flex;
    flex-flow: row;
`;
const Description = styled.div`
    width: 445px;
`;
const ImageContainer = styled.div`
    padding: 25px 55px 10px 0px;
`;
const Badges = styled.div``;
const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 300px;
`;
const Span = styled.span`
    width: 160px;
    font-weight: ${({bold}) => bold ? 500 : 'normal'};
`;
const LikeBox = styled.span`
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    text-align: right;
`;
const Likes = styled.span`
    display: flex;
    margin: 30px 0px;
    width: 100px;
    align-items: flex-end;
    justify-content: space-between;
`;

const ProfileCard = ({user}) => {
    const month = ValidationUtils.getMonthInText(user?.updatedAt)
    const dateCode = `${month} ${new Date(user?.updatedAt).getDate()}, ${new Date(user?.updatedAt).getFullYear()}`
    return (
        <Container>
            <ImageContainer>
                <Image src={user?.user?.profileImage} alt="profile pic" width="218px" radius="15px" />
            </ImageContainer>
            <Content>
                <TitleText title>{user?.user?.FirstName} {user?.user?.LastName}</TitleText>
                <DarkText>skills</DarkText>
                {user?.user?.freelancerSkills?.length > 0 && user?.user?.freelancerSkills.map(item => (
                    <Badge>{item?.skill}</Badge>
                ))}
                <Box>
                    <Description>
                        <Underline margin="35px 0px 10px 0px"/>
                        {user?.likeTotal > 0 && <DarkText bold>{user?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS</DarkText>}
                        <TextBox><Span bold>LAST UPDATED</Span> <Span>{dateCode}</Span></TextBox>
                        <TextBox><Span bold>SALARY</Span> <Span>${user.rate.toFixed(2)} / HOUR</Span></TextBox>
                        <TextBox><Span bold>EQUITY</Span> <Span>{user.isAcceptEquity ? 'YES' : 'NO'}</Span></TextBox>
                    </Description>
                    <Badges>
                        <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                            <Icon name="colorUser" />
                            <DarkText clickable noMargin paddingLeft hover>Identity Verified</DarkText>
                        </WhiteCard>
                        <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                            <Icon name="colorEmail" />
                            <DarkText clickable noMargin paddingLeft hover>Email Verified</DarkText>
                        </WhiteCard>
                        <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                            <Icon name="colorSheild" />
                            <DarkText clickable noMargin paddingLeft hover>Preferred Verified</DarkText>
                        </WhiteCard>
                        <WhiteCard borderColor="transparent" height="30px" row noMargin clickable>
                            <Icon name="colorPhone" />
                            <DarkText clickable noMargin paddingLeft hover>Phone Verified</DarkText>
                        </WhiteCard>
                    </Badges>
                </Box>
            </Content>
            <LikeBox>
                <Button noBorder>CHECK AVAILABILITY</Button>
                <Likes>
                    <Icon name="thumbsUp" />
                    <Icon name="thumbsDown" />
                </Likes>
                <DarkText>{user?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Likes</DarkText>
            </LikeBox>
        </Container>
    )
}

export default ProfileCard