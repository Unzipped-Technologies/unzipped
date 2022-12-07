import React, {useState} from 'react'
import styled from 'styled-components'
import Card from '../../ui/Card'
import Image from '../../ui/Image'
import OptionTileGroup from '../../ui/OptionTileGroup'
import ProgressBar from '../../ui/ProgressBar'
import Button from '../../ui/Button'
import {
    TitleText,
    DarkText,
    Absolute,
    Grid,
} from '../dashboard/style'

const CardContainer = styled.div`
    display: flex;
    width: 952px;
    height: 611px;
`;



const CreateBusiness = ({title, sub, children, stage, progress=10, onBack, onSubmit, noMargin}) => {
    
    return (
        <CardContainer>
        <Card noBorder borderRadius="25px">
            <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px"/>
            <ProgressBar value={progress} width={892} showValue bar="#37DEC5"/>
            <TitleText>{title}</TitleText>
            <DarkText noMargin={noMargin}>{sub}</DarkText>
            {children}
            <Absolute><Button oval extraWide type="outlineInverse" onClick={onBack}>{stage > 1 ? 'BACK' : 'CANCEL'}</Button><Button onClick={() => onSubmit(stage)} oval extraWide margin="0px 37px 0px 20px" type="black">Next</Button></Absolute>
        </Card>
        </CardContainer>
    )
}

export default CreateBusiness