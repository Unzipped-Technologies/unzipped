import styled from 'styled-components'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const RecurringWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const Container = styled.div`
  width: 1070px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 680px) {
    display: none;
  }
`

const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 706px;
  margin: 0px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const NotificationContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 25px;
  border-radius: 5px;
  border: 0.5px solid #0029ff;
  background: #f8faff;
`

const NotificationContainerText = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: 0.15px;
`

const ContentContainer = styled.div`
  width: 1052px;
  display: flex;
  justify-content: center;
  margin-top: 26px;
  gap: 20px;
`

const PaymentContainer = styled.div`
  width: 725px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  border-radius: 5px;
  border: 1px solid #333;
  // background: green;
  padding: 20px;
`

const PaymentDetailContainer = styled.div`
  // padding: 10px;
  width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #d8d8d8;
  background: #fff;
  height: 570px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 15px;
  }
`

const ChargeText = styled.span`
  width: 137px;
  color: #000;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  display: block;
`

const AmountTextStyled = styled.span`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`

const AmountTextNote = styled.span`
  color: #000;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  display: block;
`

const AmountDueTextHeading = styled.span`
  color: #222;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 19.5px;
  letter-spacing: 0.15px;
`

const TableText = styled.span`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: 0.15px;
  font-family: Roboto;
`

const TableRowStyled = styled(TableRow)`
  border-bottom: none !important;
`

const TableCellStyled = styled(TableCell)`
  border-bottom: none !important;
  color: #333;
  text-align: left;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding-left: 3px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

const ConfirmAmountButton = styled.button`
  width: 207px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #37dec5;
  border: none;
`

const ConfirmAmountText = styled.span`
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`

const PaymentDetailHeading = styled.p`
  margin: 15px;
  color: #222;
  font-family: Roboto;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: 0.15px;
  margin-bottom: 10px;
`

const PaymentParagraphText = styled.p`
  margin: 10px;
  color: #333;
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`

const PaymentHeaderDescription = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 19.5px;
  letter-spacing: 0.15px;
  margin: 10px;

  // &:after{
  //     width: 342px;
  //     content: '';
  //     display: block;
  //     height: 1px;
  //     background: #D8D8D8;
  //     margin-top: 10px;
  // }
`

const TextStyledSubHeader = styled.p`
  color: #333;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.15px;
  margin: 10px;
`

const UpdatePaymentButton = styled.button`
  width: 300px;
  height: 39px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #d8d8d8;
  border: none;
  text-transform: uppercase;
  padding: 10px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
const PaymentDetailNote = styled.div`
  color: #444;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 16.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 15px;
`

const DetailsContainer = styled.div`
  width: 100%;
`

const SpanText = styled.span`
  margin: 10px;
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`

const BillingTextStyled = styled.span`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`

const PaymentDivider = styled.div`
  width: 325px;
  background: #d8d8d8;
  height: 1px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const ConfirmationText = styled.p`
  color: #444;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 16.5px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`
// Responsive Layout Section Styling

const ResponsiveContainer = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  @media screen and (min-width: 680px) {
    display: block;
  }
`
export {
  RecurringWrapper,
  Container,
  NotificationContainer,
  NotificationContainerText,
  ContentContainer,
  ContainerBox,
  PaymentContainer,
  PaymentDetailContainer,
  ChargeText,
  AmountTextStyled,
  AmountTextNote,
  AmountDueTextHeading,
  TableText,
  TableRowStyled,
  TableCellStyled,
  ConfirmAmountButton,
  ConfirmAmountText,
  PaymentDetailHeading,
  PaymentParagraphText,
  PaymentHeaderDescription,
  TextStyledSubHeader,
  UpdatePaymentButton,
  PaymentDetailNote,
  DetailsContainer,
  SpanText,
  BillingTextStyled,
  PaymentDivider,
  ConfirmationText,
  ResponsiveContainer
}
