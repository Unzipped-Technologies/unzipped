import React, {useState} from 'react'
import styled from 'styled-components'
import Card from '../../ui/Card'
import Image from '../../ui/Image'
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgressBar from '../../ui/ProgressBar'
import Button from '../../ui/Button'
import {
    TitleText,
    DarkText,
    Absolute,
    HeadingText,
    Grid,
} from '../dashboard/style'

const CardContainer = styled.div`
    display: flex;
    width: 952px;
    height: 611px;

    @media (max-width: 680px) {
        width: 100%;
        height: ${ props => props.doubleScreenTop || props.doubleScreenBottom ? 'auto' : '100%'};
    }
`;


const CreateBusiness = ({mobile, doubleScreenTop, doubleScreenBottom, title, loading, disabled, submit, skip, sub, children, stage, progress=10, onBack, onSubmit, onUpdate, noMargin, noTitle}) => {
    return (
      <CardContainer doubleScreenTop={doubleScreenTop} doubleScreenBottom={doubleScreenBottom}>
        <Card doubleScreenTop={doubleScreenTop} doubleScreenBottom={doubleScreenBottom} noBorder borderRadius={mobile ? '0px' : '25px'} mobile={mobile}>
          {mobile ? (
            <HeadingText doubleScreenBottom={doubleScreenBottom}>Create A Project</HeadingText>
          ) : (
            <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" />
          )}
          <ProgressBar doubleScreenBottom={doubleScreenBottom} mobile={mobile} value={progress} width={990} showValue bar="#37DEC5" />
          {title ? (
            <TitleText mobile={mobile} noMargin={noTitle} marginTop={mobile?'0px':"40px"}>
              {title}
            </TitleText>
          ) : null}
          <DarkText bottomMargin={mobile? true : false } noMargin={noMargin} >{sub}</DarkText>
          {children}

          <Absolute doubleScreenTop={doubleScreenTop} bottom={mobile ? false : '50px'} right={mobile ? '10px' : '50px'} mobile={mobile} gap='10px'>
            {stage > 1 ? (
              <Button oval extraWide type="outlineInverse2" onClick={onBack}>
                BACK
              </Button>
            ) : null}
            <Button
              disabled={disabled || loading}
              onClick={() => onSubmit(stage)}
              width="58.25px"
              extraWide
              oval
              type="black">
              {!loading ? skip ? 'SKIP' : submit ? 'SUBMIT' : 'Next' : <CircularProgress size={18} />}
            </Button>
          </Absolute>
        </Card>
      </CardContainer>
    )
}

export default CreateBusiness