import styled from 'styled-components'
import HireDivider from './hire-divider/hireDivider'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProjectDropdown from './project-dropdown'
import useWindowSize from '../../../hooks/windowWidth'
import { connect } from 'react-redux'

const HireWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`

const HireInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 586px;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 7px;
  border: 1px solid ${COLORS.black};
  background: ${COLORS.white};
  padding-bottom: 12px;
  margin-top: 10px;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: none;
  }
`

const ProjectName = styled.div`
  display: flex;
  flex-direction: column;
`

const JobType = styled.div`
  display: flex;
  flex-direction: column;
`

const PrivateMessage = styled.div`
  display: flex;
  flex-direction: column;
`

const HourlyRate = styled.div`
  display: flex;
  flex-direction: column;
`

const HeadingText = styled.h1`
  text-transform: uppercase;
  margin-bottom: 0;
  margin-top: 20px;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_20,
    fontWeight: 700,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
  @media screen and (max-width: 600px) {
    margin-top: 0px;
  }
`

const Text = styled.span`
  margin: 0;
  padding-top: 10px;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 200,
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
    fontSize: FONT_SIZE.PX_13,
    fontWeight: 300,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })};
  margin-top: 12px;
  margin-bottom: 6px;
  @media screen and (max-width: 600px) {
    font-weight: 700;
  }
`

const InputField = styled.input`
  height: 30px !important;
  width: 485px !important;
  margin: 0;
  border: 1px solid #000 !important;
  background: rgba(217, 217, 217, 0.15) !important;
  padding-left: 8px !important;
  &:focus {
    outline: none !important; /* Remove outline */
    box-shadow: none !important; /* Remove outline */
  }
  @media screen and (max-width: 600px) {
    width: 100% !important;
    padding-left: 0px !important;
  }
`
const TextareaField = styled.textarea`
  height: 121px !important;
  width: 98%;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
  margin: 0 !important;
  border: 1px solid #000 !important;
  background: rgba(217, 217, 217, 0.15) !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
`

const InputHourlyField = styled.input`
  color: #000;
  font-size: 12px !important;
  font-style: normal;
  font-weight: 300;
  line-height: 24.5px; /* 204.167% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-left: 1rem !important;
  height: 100% !important;
  width: 40px !important;
  border: none !important;
  background: transparent !important;
  padding-top: 10px !important;
  box-shadow: none !important;
  &:focus {
    border-bottom: none !important; /* Remove outline */
    outline: none !important; /* Remove outline */
    box-shadow: none !important; /* Remove outline */
  }
`

const MiddleContent = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.15);
  height: 40px !important;
`

const TrackingField = styled.input`
  width: 350px !important;
  height: 40px !important;
  display: flex;
  align-items: center;
  padding-left: 1rem !important;
  font-size: 12px !important;
  background: transparent !important;
  border: none !important;
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 204.167% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media screen and (max-width: 600px) {
    width: 65% !important;
  }
  &:focus {
    border-bottom: none !important; /* Remove outline */
    outline: none !important; /* Remove outline */
    box-shadow: none !important; /* Remove outline */
  }
`

const TrackingFieldHours = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  width: 135 !important;
  font-weight: 300;
  @media screen and (max-width: 600px) {
    width: 35% !important;
    font-weight: 500;
  }
`

const Span = styled.span`
  text-transform: uppercase;
  display: inline-block;
  margin-right: 20px;
  margin-left: 10px;
  font-family: Roboto;
  text-transform: uppercase;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_12,
    fontWeight: 200,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
  @media screen and (max-width: 600px) {
    font-weight: 500;
  }
`

const HourlyRateStyled = styled.div`
  display: flex;
  width: 488px;
  gap: 20px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const HourlyInputContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  height: 34px;
  flex-shrink: 0;
`

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 122px;
  height: 36px;
  margin-top: 35px;
  background: ${COLORS.hireButton};
  height: 36px;
  border-radius: 5px;
  text-transform: uppercase;
  border: none;
  @media screen and (max-width: 600px) {
    justify-content: center;
    width: 100%;
    height: 50px !important;
  }
`

const ButtonText = styled.span`
  text-transform: uppercase;
  cursor: pointer;
  ${getFontStyled({
    color: COLORS.white,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })}
`

const HireComp = ({ name, rate }) => {
  const router = useRouter()
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  const [project, setProject] = useState('')
  const [message, setMessage] = useState('')
  const [jobType, setJobType] = useState('')
  const [hourlyRate, setHourlyRate] = useState(rate)
  const [currency, setCurrency] = useState('')
  const [weeklyHours, setWeeklyHours] = useState('')

  useEffect(() => {
    if (width <= 600) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  const setButtonDisabled = () => {
    if (!project || !jobType || !hourlyRate || !currency || !weeklyHours || isNaN(hourlyRate) || isNaN(weeklyHours))
      return true
    return false
  }

  return (
    <HireWrapper>
      <HireDivider title="Confirm Payment Details" />
      <HireInputContainer>
        <HeadingText>Contact {name ?? 'User'} About Your Job</HeadingText>
        <Text>Your subscription will be paid using your primary payment method.</Text>
        <ProjectName>
          <Label>Project Name</Label>
        </ProjectName>
        <ProjectDropdown
          value={project}
          onChange={value => {
            setProject(value)
          }}
        />
        <PrivateMessage>
          <Label>Send a private message</Label>
          <TextareaField
            rows={50}
            cols={100}
            value={message}
            onChange={e => {
              setMessage(e.target.value)
            }}
          />
        </PrivateMessage>
        <JobType>
          <Label>job type</Label>
          <InputField
            type="text"
            value={jobType}
            onChange={e => {
              setJobType(e.target.value)
            }}
          />
        </JobType>
        <HourlyRate>
          <Label>hourly rate (show budget if selected)</Label>
          <HourlyRateStyled>
            <HourlyInputContainer>
              <Span>$</Span>
              <InputHourlyField
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={5}
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
              />
              <Span style={{ marginLeft: '2rem', marginRight: '10px' }}>PER HOUR</Span>
            </HourlyInputContainer>

            <Select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              style={{
                marginLeft: '2rem',
                width: `${isSmallWindow ? '100%' : '90px'}`,
                borderRadius: '4px',
                border: '1px solid #000',
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 6,
                fontSize: '12px !important'
              }}>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </HourlyRateStyled>
        </HourlyRate>

        <Label>weekly tracking limit</Label>

        <MiddleContent>
          <TrackingField value={weeklyHours} onChange={e => setWeeklyHours(e.target.value)} maxLength={5} />
          <TrackingFieldHours>hours / week</TrackingFieldHours>
        </MiddleContent>
        <ButtonContainer
          disabled={setButtonDisabled()}
          onClick={() => {
            router.push('/recurring-payment')
          }}>
          <ButtonText>Hire (user)</ButtonText>
        </ButtonContainer>
      </HireInputContainer>
    </HireWrapper>
  )
}

const mapStateToProps = state => {
  return {
    name: state.Auth.user.FirstName + ' ' + state.Auth.user.LastName,
    rate: state.Auth.user.rate
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HireComp)
