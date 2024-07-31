import React from 'react'
import styled from 'styled-components'
import Card from '../../ui/Card'
import Image from '../../ui/Image'
import CircularProgress from '@material-ui/core/CircularProgress'
import ProgressBar from '../../ui/ProgressBar'
import Button from '../../ui/Button'
import { TitleText, DarkText, Absolute, HeadingText } from '../dashboard/style'
import { useDispatch, useSelector } from 'react-redux'
import { nullBusinessForm } from '../../../redux/actions'
import { useRouter } from 'next/router'

const CardContainer = styled.div`
  display: flex;
  width: 90vw;
  max-width: 952px;
  height: 735px;

  @media (max-width: 680px) {
    width: 100%;
    height: 100%;
  }
`

const CreateBusiness = ({
  hasNextButton = true,
  hasBackButton = true,
  mobile = false,
  titleFontSize,
  doubleScreenTop,
  doubleScreenBottom,
  title,
  disabled,
  submit,
  sub,
  children,
  stage,
  progress = 11,
  onBack,
  onSubmit,
  onUpdate,
  noMargin,
  noTitle,
  projectType
}) => {
  const store = useSelector(state => state)
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <CardContainer id={`step_${stage}`}>
      <Card
        doubleScreenTop={doubleScreenTop}
        doubleScreenBottom={doubleScreenBottom}
        noBorder
        borderRadius={mobile ? '0px' : '25px'}
        mobile={mobile}>
        {mobile ? (
          <HeadingText doubleScreenBottom={doubleScreenBottom}>Create A Project</HeadingText>
        ) : (
          <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" id="steps_logo" />
        )}
        <ProgressBar
          doubleScreenBottom={doubleScreenBottom}
          mobile={mobile}
          value={progress}
          width={100}
          showValue
          bar="#37DEC5"
        />
        {title ? (
          <TitleText
            mobile={mobile}
            titleFontSize={titleFontSize}
            noMargin={noTitle}
            marginTop={mobile ? '0px' : '40px'}>
            {title}
          </TitleText>
        ) : null}
        <DarkText bottomMargin={mobile ? true : false} noMargin={noMargin}>
          {sub}
        </DarkText>
        {children}

        <Absolute
          doubleScreenTop={doubleScreenTop}
          bottom={mobile ? false : '50px'}
          right={mobile ? '10px' : '50px'}
          gap="10px">
          {stage > 1 ? (
            <>
              {hasBackButton && (
                <Button oval extraWide={mobile ? false : true} mobile={mobile} type="outlineInverse2" onClick={onBack}>
                  BACK
                </Button>
              )}
            </>
          ) : (
            <Button
              oval
              extraWide={mobile ? false : true}
              mobile={mobile}
              type="outlineInverse2"
              onClick={() => {
                dispatch(nullBusinessForm())
                router.push('/dashboard')
              }}>
              Cancel
            </Button>
          )}
          {hasNextButton && (
            <Button
              disabled={disabled}
              onClick={() => onSubmit(stage)}
              width="58.25px"
              extraWide={mobile ? false : true}
              mobile={mobile}
              oval
              type="black">
              {submit ? 'SUBMIT' : 'Next'}
            </Button>
          )}
        </Absolute>
      </Card>
    </CardContainer>
  )
}

export default CreateBusiness
