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
    Grid,
} from '../dashboard/style'

const CardContainer = styled.div`
    display: flex;
    width: 952px;
    height: 611px;
`;



const CreateBusiness = ({title, loading, disabled, submit, skip, sub, children, stage, progress=10, onBack, onSubmit, onUpdate, noMargin, noTitle}) => {
    return (
      <CardContainer>
        <Card noBorder borderRadius="25px">
          <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" />
          <ProgressBar value={progress} width={990} showValue bar="#37DEC5" />
          <TitleText noMargin={noTitle} marginTop='40px'>{title}</TitleText>
          <DarkText noMargin={noMargin}>{sub}</DarkText>
          {children}

          <Absolute bottom='50px'>
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
              margin="0px 37px 0px 20px"
              type="black">
              {!loading ? skip ? 'SKIP' : submit ? 'SUBMIT' : 'Next' : <CircularProgress size={18} />}
            </Button>
          </Absolute>
        </Card>
      </CardContainer>
    )
}

export default CreateBusiness