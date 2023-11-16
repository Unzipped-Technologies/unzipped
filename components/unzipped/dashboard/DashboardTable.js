import React from 'react'
import styled from 'styled-components'
import {
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'
import {
    TableTitle
} from './tableStyle'
import Button from '../../ui/Button'
import { ValidationUtils } from '../../../utils'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router';

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    background: ${({ background }) => background ? background : '#D9D9D9'};
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

const StoryTable = styled.div``;

const Panel = ({ type, businesses, loading, userType }) => {

    const router = useRouter();

    const generatePopout = (userType, item) => {
        if (userType === 0 || userType === 2) {
            return [
                {
                    text: 'Invoice',
                    onClick: () => router.push(`projects/client/invoice/${item._id}`),
                },
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
            ];
        } else {
            return [
                {
                    text: 'Log Time',
                    onClick: () => router.push(`projects/invoice/${item._id}`),
                },
                {
                    text: 'View Project',
                    onClick: () => console.log('ITEM 2'),
                },
                {
                    text: 'View Work',
                    onClick: () => console.log('ITEM 3'),
                },
            ];
        }
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
            <Underline color="#333" noMargin />
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
                                popout={generatePopout(userType, item)}
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