import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DarkText, TitleText, WhiteCard, Absolute, Grid2, Grid3 } from '../dashboard/style'
import FormField from '../../ui/FormField'
import useWindowSize from '../../ui/hooks/useWindowSize'
import Button from '../../ui/Button'
import { CircularProgress } from '@material-ui/core';
import Image from '../../ui/Image';

const Container = styled.div`
  margin: 0px 0px 0px 0px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 5px;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
`

const BankInformation = ({ form, updateSubscription }) => {

  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()
  const [bankObj, setBankObj] = useState({});

  const [isBankInformation, setIsBankInformation] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBankingInfo = () => {
    setIsBankInformation(false)
    setIsUpdated(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 750)
    updateSubscription({ bankInformation: bankObj })
  }

  useEffect(() => {
    if (width <= 600) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])



  return (
    <Container>
      {isBankInformation ? (
        <WhiteCard height="650px">
          <TitleText size="22px">Bank Information</TitleText>
          <DarkText marginLeft={"0px"}>This is the account where the transfer will be sent.</DarkText>
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            width={isSmallWindow ? '100%' : '90%'}
            value={form?.bankInformation?.bankName}
            onChange={(e) => setBankObj({ ...bankObj, bankName: e.target.value })}
          >
            BANK NAME
          </FormField>
          <Grid2 margin="10px" paddingLeft={ width <= 600 ? "0px" :"35px"} block>
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width={width <= 600 ? '100%' : '80%'}
              value={form?.bankInformation?.routingNumber}
              onChange={(e) => setBankObj({ ...bankObj, routingNumber: e.target.value })}

            >
              ROUTING NUMBER
            </FormField>
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              marginLeft={width <= 600 ? '0px' : '20px'}
              width={width <= 600 ? '100%' : '80%'}
              value={form?.bankInformation?.accountNumber}
              onChange={(e) => setBankObj({ ...bankObj, accountNumber: e.target.value })}
            >
              ACCOUNT NUMBER
            </FormField>
          </Grid2>
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            width={width <= 600 ? '100%' : '90%'}
            value={form?.bankInformation?.cityOrState}
            onChange={(e) => setBankObj({ ...bankObj, cityOrState: e.target.value })}
          >
            BANK CITY/STATE
          </FormField>
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            width={width <= 600 ? '100%' : '90%'}
            value={form?.bankInformation?.accountType}
            onChange={(e) => setBankObj({ ...bankObj, accountType: e.target.value })}
          >
            ACCOUNT TYPE
          </FormField>

          <ButtonContainer>
            <Button noBorder onClick={handleBankingInfo}>ADD BANK</Button>
          </ButtonContainer>
        </WhiteCard>
      ) : (
        <WhiteCard onClick={() => {
          setIsUpdated(false)
          setIsBankInformation(true)
        }}>
          <TitleText size="22px">Bank Information</TitleText>
          <Absolute top={!isLoading ? "12px" : "18px"}>
            {isUpdated && isLoading && (
              <CircularProgress size={24} />
            )}
            {isUpdated && !isLoading && (
              <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png" alt="success" height="34px" width="34px" />
            )}
            {!isUpdated && (
              <Button type='outlineInverse' small onClick={() => setIsBankInformation(true)}>Add</Button>
            )}
          </Absolute>
        </WhiteCard>
      )
      }
    </Container >

  )
}

export default BankInformation
