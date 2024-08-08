import styled from 'styled-components'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector, connect } from 'react-redux'
import { getFreelancerById, getUserOwnedBusiness, updateContractForm, resetContractForm } from '../../../redux/actions'
import ProjectDropdown from './project-dropdown'
import BackHeader from '../BackHeader'
import useWindowSize from '../../../hooks/windowWidth'
import { bindActionCreators } from 'redux'

const HireWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HireInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 590px;
  border-radius: 7px;
  border: 1px solid ${COLORS.black};
  background: ${COLORS.white};
  padding-left: 50px;
  padding-bottom: 12px;
  margin-top: 50px;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
  }
`

const HeadingText = styled.h1`
  text-transform: uppercase;
  margin-bottom: 0;
  padding: 10px 0px;
  margin-top: 0;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_20,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
`

const Text = styled.span`
  margin: 0;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 300,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_19,
    letterSpacing: LETTER_SPACING
  })}
`

const Label = styled.span`
  text-transform: uppercase;
  display: block;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_14,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })};
  margin-top: 12px;
  margin-bottom: 6px;
`

const InputField = styled.input`
  height: 45px !important;
  width: 479px !important;
  margin: 0;
  border-radius: 4px;
  border: 1px solid #000 !important;
  background: #fff;
  padding-left: 8px !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
    padding-left: 0px !important;
  }
`
const TextareaField = styled.textarea`
  height: 121px !important;
  width: 488px !important;
  margin: 0;
  border-radius: 4px;
  border: 1px solid #000 !important;
  background: #fff;
  padding: 10px !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
`

const HireButton = styled.button`
  background: ${COLORS.hireButton};
  width: max-content;
  height: 40px;
  border-radius: 5px;
  text-transform: uppercase;
  border: none;
  margin-right: 65px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-right: 0px;
  }
`

const InputHourlyField = styled.input`
  font-size: 14px !important;
  margin-left: 2rem;
  height: 100%;
  position: relative;
  top: 5px;
  width: 45px !important;
  padding: 0px 15px !important;
  border: none !important;
  background: rgba(217, 217, 217, 0.15) !important;
`

const TrackingField = styled.input`
  padding-left: 2rem !important;
  font-size: 14px !important;
  margin-left: 2rem;
  margin-top: 5px !important;
  height: 100%;
  padding: 15px 0px;
  width: 35px !important;
  margin: 0px 35px;
  border: none !important;
  background: rgba(217, 217, 217, 0.15) !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
`

const Span = styled.span`
  text-transform: uppercase;
  display: inline-block;
  margin-right: 15px;
  margin-left: 15px;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_14,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
`
const ButtonText = styled.span`
  text-transform: uppercase;
  display: inline-block;
  margin-right: 20px;
  margin-left: 20px;
  ${getFontStyled({
    color: COLORS.white,
    fontSize: FONT_SIZE.PX_14,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
`

const ContentContainer = styled.div`
  width: 488px;
  padding: 10px 0px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const HourlyRateStyled = styled.div`
  display: flex;
  width: 488px;
  height: 45px;
  gap: 20px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const HourlyInputContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    border: none;
  }
`

const MiddleContent = styled.div`
  display: flex;
  width: 353px;
  height: 45px;
  border: 1px solid black;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 35px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 35px;
  width: 100%;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding-left: 0px;
    justify-content: center;
  }
`

export const Error = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  padding-top: 2px;
  color: #d13823;
`

const HireComp = ({
  name,
  token,
  userId,
  userOwnedBusiness,
  getUserOwnedBusiness,
  updateContractForm,
  resetContractForm,
  projects,
  freelancerId,
  businessId,
  hourlyRate,
  hoursLimit,
  currency,
  message,
  jobType,
  form
}) => {
  // const dispatch = useDispatch()
  // const projects = useSelector(state => state.Business.projectList)
  const router = useRouter()
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const [errors, setError] = useState({
    businessId: '',
    hourlyRate: '',
    hoursLimit: ''
  })
  const isSmall = useWindowSize(680)

  useEffect(() => {
    if (isSmall) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [isSmall])

  useEffect(() => {
    getUserOwnedBusiness(userId, token)
  }, [])

  useEffect(() => {
    if (!freelancerId) {
      router.push('/freelancers')
    }
    updateContractForm({ freelancerId: freelancerId })
    updateContractForm({ userId: userId })
  }, [freelancerId])

  const updateForm = data => {
    updateContractForm({ ...data })
    const key = Object.keys({ ...data })[0]
    if (data[key] !== null && data[key] !== '') {
      setError({ ...errors, [key]: '' })
    }
  }

  const hireFreelancr = () => {
    if (form?.businessId == null || form?.businessId === '') {
      setError({ ...errors, businessId: 'Please select a business.' })
      return
    }
    if (form?.hourlyRate == null || form?.hourlyRate === '' || form?.hourlyRate <= 0) {
      setError({ ...errors, hourlyRate: 'Hourly rate muus be greater than 0.' })
      return
    }
    if (form?.hoursLimit == null || form?.hoursLimit === '' || form?.hoursLimit <= 0) {
      setError({ ...errors, hoursLimit: 'Hours limit muus be greater than 0.' })
      return
    }

    router.push('/recurring-payment')
  }
  return (
    <HireWrapper data-testid="hire_freelancer">
      <BackHeader title="Confirm Payment Details" />
      <HireInputContainer>
        <ContentContainer>
          <HeadingText id="contract_freelancer_name">Contact {name} About Your Job</HeadingText>
          <Text>Send a contract request to {name}. More details on the next screen.</Text>
          <Label>Project Name</Label>
          <ProjectDropdown
            userBusinessList={userOwnedBusiness}
            value={businessId}
            onChange={value => {
              updateForm({ businessId: value })
            }}
          />
          {errors.businessId && <Error>{errors.businessId}</Error>}
          <Label>Send a private message</Label>
          <TextareaField
            onChange={e => {
              updateForm({ message: e.target.value })
            }}
            value={message}
            rows={50}
            cols={100}
            id="send_message"
            name="send_message"
          />
          <Label>job type</Label>
          <InputField
            value={jobType}
            onChange={e => {
              updateForm({ jobType: e.target.value })
            }}
            type="text"
            id="job_type"
            name="job_type"
          />
          <Label>hourly rate (show budget if selected)</Label>
          <HourlyRateStyled>
            <HourlyInputContainer>
              <Span>$</Span>
              <InputHourlyField
                value={hourlyRate}
                onChange={e => {
                  updateForm({ hourlyRate: e.target.value })
                }}
                id="hours_rate"
                name="hours_rate"
              />
              <Span>per hours</Span>
            </HourlyInputContainer>
            <div>
              <Select
                id="currency"
                name="currency"
                value={currency}
                onChange={e => {
                  updateForm({ currency: e.target.value })
                }}
                style={{
                  width: `${isSmallWindow ? '100%' : '77px'}`,
                  border: '1px solid black',
                  height: '45px',
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 6,
                  fontSize: '14px !important'
                }}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </Select>
            </div>
          </HourlyRateStyled>
          {errors.hourlyRate && <Error>{errors.hourlyRate}</Error>}

          <Label>weekly tracking limit (limit 40)</Label>

          <MiddleContent>
            <TrackingField
              onChange={e => {
                updateForm({ hoursLimit: e.target.value })
              }}
              value={hoursLimit}
              id="tracking_hours"
              name="tracking_hours"
            />
            <Span>hours / week</Span>
          </MiddleContent>
          {errors.hoursLimit && <Error>{errors.hoursLimit}</Error>}
        </ContentContainer>
        <ButtonContainer>
          <HireButton>
            <ButtonText
              onClick={() => {
                hireFreelancr()
              }}>
              Hire {name ? name : ''}
            </ButtonText>
          </HireButton>
        </ButtonContainer>
      </HireInputContainer>
    </HireWrapper>
  )
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
    name: state.Freelancers?.selectedFreelancer?.userId?.FirstName,
    userId: state.Auth?.user?._id,
    userOwnedBusiness: state.Business.userOwnedBusiness,
    freelancerId: state.Freelancers.selectedFreelancer?._id,
    businessId: state.Contracts.contractForm.businessId,
    message: state.Contracts.contractForm.message,
    currency: state.Contracts.contractForm.currency,
    hourlyRate: state.Contracts.contractForm.hourlyRate,
    hoursLimit: state.Contracts.contractForm.hoursLimit,
    jobType: state.Contracts.contractForm.jobType,
    form: state.Contracts.contractForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    getUserOwnedBusiness: bindActionCreators(getUserOwnedBusiness, dispatch),
    getUserOwnedBusiness: bindActionCreators(getUserOwnedBusiness, dispatch),
    updateContractForm: bindActionCreators(updateContractForm, dispatch),
    resetContractForm: bindActionCreators(resetContractForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HireComp)
