import {
  USER_LOADING,
  USER_LOADED,
  USER_CREDENTIALS,
  AUTH_ERROR,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  CURRENT_USER,
  SET_TOKEN,
  SIGN_UP_FOR_NEWSLETTER,
  REGISTER_USER,
  FORGET_PASSWORD,
  SET_LOADING,
  FORGET_PASSWORD_SUCCESS,
  UPDATE_REGISTER_FORM,
  LOGGED_OUT,
  RESET_REGISTER_FORM,
  SELECT_A_PLAN,
  UPDATE_SUBSCRIPTION_FORM,
  SUBSCRIPTION_CREATED,
  CLEAR_ERRORS,
  VERIFY_USER,
  UPDATE_REGISTER_CREDENTIALS,
  INITIATE_VERIFY_IDENTITY,
  GET_USER_THIRD_PARTY_DETAILS,
  GET_USER_THIRD_PARTY_DETAILS_FAILED,
  UPDATE_USER_EMAIL,
  UPDATE_EMAIL_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from './constants'
import { paymentFrequencyEnum, planEnum } from '../../server/enum/planEnum'
import { ValidationUtils } from '../../utils'

const setDisabled = data => {
  if (data?.paymentFrequency >= 0 && data?.paymentMethod?.card?.id) {
    return false
  }
  return true
}

const INIT_STATE = {
  token: '',
  disabled: true,
  isAuthenticated: false,
  isEmailSent: false,
  userRegistrationForm: { email: '', password: '' },
  user: {},
  verifyUrl: '',
  userForm: {
    role: -1,
    FirstName: '',
    LastName: '',
    phoneNumber: '',
    AddressLineOne: '',
    AddressLineTwo: '',
    AddressLineCountry: '',
    AddressState: '',
    AddressZip: '',
    AddressCity: '',
    AddressCountry: '',
    taxEIN: '',
    socialSecurityNumber: '',
    businessType: '',
    stage: 1
  },
  loading: false,
  error: { data: '' },
  loggedOut: false,
  notification: '',
  selectedPlan: null,
  subscriptionForm: {
    paymentFrequency: paymentFrequencyEnum.MONTHLY,
    stripeId: '',
    BusinessAddressLineOne: '',
    BusinessAddressLineTwo: '',
    BusinessAddressLineCountry: '',
    BusinessFirstName: '',
    BusinessLastName: '',
    BusinessAddressCity: '',
    BusinessAddressState: '',
    BusinessAddressZip: '',
    BusinessAddressPhone: '',
    paymentMethod: {
      BillingAddressLineOne: '',
      BillingAddressLineTwo: '',
      BillingAddressLineCountry: '',
      BillingFirstName: '',
      BillingLastName: '',
      BillingAddressCity: '',
      BillingAddressState: '',
      BillingAddressZip: '',
      card: undefined
    }
  },
  email: '',
  planCost: 29,
  trialLength: 7,
  plans: [
    {
      id: planEnum.BASIC,
      name: 'Basic Unzipped',
      description: 'Everything you need to create your business and begin collaborating with professionals ',
      cost: ValidationUtils.getPlanCost(planEnum.BASIC),
      features: [
        {
          icon: 'breifcase',
          text: 'Create up to 1 business'
        },
        {
          icon: 'user',
          text: 'Hire Unlimited professionals to work on your project'
        },
        {
          icon: 'github',
          text: 'Create and manage your unzipped repo'
        },
        {
          icon: 'checkMenu',
          text: 'Plan and monitor effort remaining'
        }
      ]
    },
    {
      id: planEnum.STANDARD,
      name: 'Unzipped',
      description: 'Level up your business with profit sharing and advanced collaboration',
      cost: ValidationUtils.getPlanCost(planEnum.STANDARD),
      features: [
        {
          icon: 'breifcase',
          text: 'Create up to 3 businesses'
        },
        {
          icon: 'user',
          text: 'Hire Unlimited professionals to work on your project'
        },
        {
          icon: 'cartAlt',
          text: 'Offer ownership and profit sharing'
        },
        {
          icon: 'github',
          text: 'Create and manage your unzipped repo'
        },
        {
          icon: 'checkMenu',
          text: 'Plan and monitor effort remaining'
        }
      ]
    },
    {
      id: planEnum.ADVANCED,
      name: 'Advanced Unzipped',
      description: 'Everything you need to create your business and begin collaborating with professionals ',
      cost: ValidationUtils.getPlanCost(planEnum.ADVANCED),
      features: [
        {
          icon: 'breifcase',
          text: 'Create unlimited businesses'
        },
        {
          icon: 'user',
          text: 'Hire Unlimited professionals to work on your project'
        },
        {
          icon: 'cartAlt',
          text: 'Offer ownership and profit sharing'
        },
        {
          icon: 'github',
          text: 'Create and manage your unzipped repo'
        },
        {
          icon: 'checkMenu',
          text: 'Plan and monitor effort remaining'
        },
        {
          icon: 'chatBubble',
          text: 'Dedicated support staff member'
        },
        {
          icon: 'phoneAlt',
          text: 'Advanced promotion options'
        }
      ]
    }
  ],
  thirdPartyDetails: {}
}

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...INIT_STATE, loading: true }
    case SET_LOADING:
      return { ...state, loading: true }
    case USER_CREDENTIALS:
      return { ...state, userRegistrationForm: action.payload, isEmailSent: false }
    case UPDATE_REGISTER_CREDENTIALS:
      return { ...state, userRegistrationForm: { ...state.userRegistrationForm, email: action.payload } }
    case CURRENT_USER:
      return {
        ...state,
        loading: false,
        user: { ...state.user, paymentMethod: { card: action.payload.card.last4, id: action.payload.id } }
      }
    case SIGN_UP_FOR_NEWSLETTER:
      return { ...state, loading: false, email: action.payload.email }
    case USER_LOADED:
      return {
        ...state,
        email: action.payload.email,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        token: action.payload.cookie,
        error: { data: '' }
      }
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: { data: '' } }
    case UPDATE_USER_SUCCESS:
      return { ...state, user: { ...state.user, ...state.userForm }, loading: false, error: { data: '' } }
    case VERIFY_USER:
      return { ...state, isEmailSent: true, loading: false }
    case REGISTER_USER:
      let isAuthenticated = true
      if (action.payload.error) {
        isAuthenticated = false
      }
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        loading: false,
        isEmailSent: false,
        user: action.payload,
        token: action.payload.cookie
      }
    case LOGOUT_USER:
      return { ...INIT_STATE, loading: false, error: { data: '' }, isAuthenticated: false, isEmailSent: false }
    case SELECT_A_PLAN:
      return { ...state, loading: false, ...action.payload }
    case UPDATE_SUBSCRIPTION_FORM:
      const disabled = setDisabled({ ...state?.subscriptionForm, ...action.payload })
      return {
        ...state,
        loading: false,
        disabled: disabled,
        subscriptionForm: { ...state.subscriptionForm, ...action.payload }
      }
    case SUBSCRIPTION_CREATED:
      return { ...state, loading: false, disabled: true }
    case AUTH_ERROR:
      return { ...state, error: action.payload, loading: false, isAuthenticated: false, isEmailSent: false }
    case CLEAR_ERRORS:
      return { ...state, error: { data: '' }, loading: false, isAuthenticated: false, isEmailSent: false }
    case FORGET_PASSWORD:
      return { ...state, token: action.payload, loading: false }
    case UPDATE_REGISTER_FORM:
      return { ...state, loading: false, userForm: { ...state.userForm, ...action.payload } }
    case SET_TOKEN:
      return { ...state, notification: action.payload, loading: false }
    case LOGGED_OUT:
      return { ...state, loggedOut: false, isAuthenticated: false, isEmailSent: false, error: { data: '' } }
    case RESET_REGISTER_FORM:
      return { ...state, userForm: { ...INIT_STATE.userForm } }
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        token: action.payload.cookie,
        error: ''
      }
    case INITIATE_VERIFY_IDENTITY:
      return { ...state, loading: false, verifyUrl: action?.payload?.url }
    case GET_USER_THIRD_PARTY_DETAILS:
      return { ...state, loading: false, thirdPartyDetails: action?.payload }

    case GET_USER_THIRD_PARTY_DETAILS_FAILED:
      return { ...state, loading: false, thirdPartyDetails: null }

    case UPDATE_USER_EMAIL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        email: action.payload.email
      }
    case RESET_PASSWORD_SUCCESS:
      console.log('payload', action.payload)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: ''
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
        // error: action?.payload
      }
    default:
      return state
  }
}

export default Auth
