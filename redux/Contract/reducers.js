import {
  CREATE_CONTRACT,
  GET_CONTRACTS,
  GET_CONTRACT_BY_ID,
  GET_ACTIVE_CONTRACTS,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  LOAD_STATE,
  SUCCESS,
  CONTRACT_ERROR,
  UPDATE_CONTRACT_FORM,
  RESET_CONTRACT_FORM
} from './constants'

const CONTRACT_FORM = {
  businessId: '',
  departmentId: '',
  freelancerId: '',
  userId: '',
  currency: 'USD',
  hourlyRate: 0,
  hoursLimit: 0,
  message: '',
  jobType: ''
}

const INIT_STATE = {
  contracts: [],
  selectedContract: {},
  activeContracts: [],
  error: '',
  loading: false,
  totalCount: 0,
  contractForm: { ...CONTRACT_FORM }
}

const Contracts = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_CONTRACT:
      return {
        ...state,
        loading: false,
        contractForm: { ...CONTRACT_FORM }
      }
    case UPDATE_CONTRACT:
      const RemoveUpdateContract = state.contracts.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, contracts: [action.payload, ...RemoveUpdateContract] }
    case GET_ACTIVE_CONTRACTS:
      return { ...state, loading: false, activeContracts: action.payload }
    case DELETE_CONTRACT:
      let newListContracts = state.contracts.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, contracts: [...newListContracts] }
    case GET_CONTRACTS:
      const selectedContract = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectedContract,
        contracts: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_CONTRACT_BY_ID:
      const contract = state.contracts.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedContract: action.payload
      }
    case CONTRACT_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    case UPDATE_CONTRACT_FORM:
      return {
        ...state,
        loading: false,
        contractForm: { ...state.contractForm, ...action.payload }
      }
    case RESET_CONTRACT_FORM:
      return { ...state, loading: false, contractForm: { ...CONTRACT_FORM } }
    default:
      return state
  }
}

export default Contracts
