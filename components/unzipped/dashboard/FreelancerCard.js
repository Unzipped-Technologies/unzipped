import React from 'react';
import styled from 'styled-components';
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'

const Container = styled.div`
    display: flex;
    flex-flow: row;
    padding: 15px 10px 0px 20px;
`;
const Left = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin: 0px 10px;
`;
const Right = styled.div`
    padding: 15px 30px;
`;



const FreelancerCard = ({user}) => {
    return (
        <Container>
            <Left>
                <Image src={user.profilePic} alt={user.name + ' profile'} height="94px" width="94px" radius="50%"/>
                <Button margin="20px 0px" type={!user.isInvited ? "default" : "grey"} noBorder>{user.isInvited ? 'Invited' : 'Invite'}</Button>
            </Left>
            <Right>
                <TitleText half color="blue">{user.name}</TitleText>
                <TitleText noMargin>{user.type}</TitleText>
                <DarkText half>{user.country}</DarkText>
                {user.skills.map(item => (
                    <Badge>{item}</Badge>
                ))}
                <DarkText topMargin="10px"><strong>cover letter: </strong>
                {user.cover}
                </DarkText>
            </Right>
            <Absolute><Button normal oval type="green2" noBorder>View Profile</Button></Absolute>
        </Container>
    )
}

export default FreelancerCard;