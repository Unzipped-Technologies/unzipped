import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'
import {
    TableTitle
} from './tableStyle'
import {
    WorkIcon
} from '../../icons'
import FreelancerCard from './FreelancerCard'
import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import Image from '../../ui/Image'
import Dropdowns from '../../ui/Dropdowns'
import Projects from '../../../pages/dashboard/projects'
import { ValidationUtils } from '../../../utils'
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    background: ${({background}) => background ? background : '#D9D9D9'};
    width: 95%;
    max-height: 900px;
    padding: 20px 0px;
    margin-left: 34px;
    border-radius: 10px;
`;

const Box = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    min-height: 100px;
    justify-content: center;
    align-items: center;
`;

const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
`;

const Row = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    position: relative;
`;

const StoryTable = styled.div``;

const Panel = ({list, selectedList, type, projects=[], businesses, loading, userType}) => {
    const [menuOpen, setMenuOpen] = useState(false)

    const setDropdowns = (item) => {
        setTimeout(function() { 
            setMenuOpen(item)
        }, 500);
    }

    const setCloseDropdowns = (time) => {
        setTimeout(function() { 
            setMenuOpen(false)
        }, (time || 500));
    }

    return (
        <Container background={type === 'department' ? '#FDFDFD' : ''}>
            <TableTitle paddingLeft half row>
                <DarkText noMargin bold>Project Name</DarkText>
                <DarkText noMargin> </DarkText>
                <DarkText noMargin center bold>Budget</DarkText>
                <DarkText noMargin center bold>Equity</DarkText>
                <DarkText noMargin center bold>Points</DarkText>
                <DarkText noMargin center bold>Value Estimate</DarkText>
                <DarkText noMargin center bold>Deadline</DarkText>
                <DarkText noMargin center bold>Actions</DarkText>
            </TableTitle>
            <Underline color="#333" noMargin/>   
            <StoryTable>
                {businesses.length === 0 && loading && <Box><CircularProgress /></Box>}
                {businesses.length === 0 && <Box>Start a project and you will see it here...</Box>}
                {businesses.length > 0 && businesses.map((item, index) => (
                    <WhiteCard noMargin borderRadius="0px" row background={!ValidationUtils.checkNumberEven(index) ? "#F7F7F7" : "#fff"}>
                            <Absolute width="45%" wideLeft textOverflow="ellipsis"><DarkText textOverflow="ellipsis" noMargin>{item.name}</DarkText></Absolute>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin> </DarkText>
                        <DarkText noMargin center>${(item.budget || 0).toLocaleString()}</DarkText>
                        <DarkText noMargin center>{item?.equity || 0}%</DarkText>
                        <DarkText noMargin center>27</DarkText>
                        <DarkText noMargin center>{item?.valueEstimate || 'N/A'}</DarkText>
                        <DarkText noMargin center>{(item?.deadline && ValidationUtils.formatDate(item?.deadline)) || ValidationUtils.formatDate(item?.updatedAt || item?.createdAt)}</DarkText>
                        <DarkText noMargin center></DarkText>
                        <Absolute>
                        <Button
                            icon="largeExpand"
                            popoutWidth="150px"
                            noBorder
                            block
                            type="lightgrey"
                            fontSize="13px"
                            popout=
                            {userType == 1 ?
                              [
                                {
                                    text: 'Details',
                                    onClick: () => console.log('ITEM 1'),
                                },
                                {
                                    text: 'Delete Job',
                                    onClick: () => console.log('ITEM 2'),
                                },
                                {
                                    text: 'Assign department',
                                    onClick: () => console.log('ITEM 3'),
                                },
                              ] :
                              [
                                {
                                    text: 'Log Time',
                                    onClick: () => console.log('ITEM 1'),
                                },
                                {
                                    text: 'view Project',
                                    onClick: () => console.log('ITEM 2'),
                                },
                                {
                                    text: 'View Work',
                                    onClick: () => console.log('ITEM 3'),
                                },
                              ]
                            }
                            iconRight>
                            Details
                        </Button>
                        </Absolute>
                    </WhiteCard>
                ))}
            </StoryTable>

        </Container>
    )
}

export default Panel;