import {
  CREATE_CONTRACT,
  GET_CONTRACTS,
  GET_CONTRACT_BY_ID,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  LOAD_STATE,
  SUCCESS,
  CONTRACT_ERROR
} from './constants'

const INIT_STATE = {
  contracts: [],
  selectedContract: {},
  error: '',
  loading: false,
  totalCount: 0
}

const Contracts = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_CONTRACT:
      return {
        ...state,
        loading: false,
        contract: [...state.contract]
      }
    case UPDATE_CONTRACT:
      const RemoveUpdateContract = state.contracts.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, contracts: [action.payload, ...RemoveUpdateContract] }
    case DELETE_CONTRACT:
      let newListContracts = state.contracts.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, contracts: [...newListContracts] }
    case GET_CONTRACTS:
      console.log('action.payload', action.payload)
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
    default:
      return state
  }
}

export default Contracts
