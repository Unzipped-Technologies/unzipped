import {
  CREATE_INVOICE,
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  GET_UNPAID_INVOICES,
  INVOICE_ERROR,
  LOAD_STATE,
  SUCCESS
} from './constants'

const INIT_STATE = {
  invoices: [],
  unpaidInvoices: [],
  selectedInvoice: {},
  error: '',
  loading: false,
  totalCount: 0
}

const Invoices = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_INVOICE:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices]
      }
    case UPDATE_INVOICE:
      const updateInvoice = state.invoices.find(item => item._id !== action.payload._id)
      action.payload['businesses'] = updateInvoice['businesses']
      action.payload['freelancer'] = updateInvoice['freelancer']
      action.payload['user'] = updateInvoice['user']
      action.payload['contract'] = updateInvoice['contract']
      return { ...state, loading: false, invoices: [action.payload, ...updateInvoice] }
    case DELETE_INVOICE:
      let newListInvoices = state.invoices.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, invoices: [...newListInvoices] }
    case GET_INVOICES:
      const selectedInvoice = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectedInvoice,
        invoices: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_UNPAID_INVOICES:
      return {
        ...state,
        loading: false,
        unpaidInvoices: action.payload
      }
    case GET_INVOICE_BY_ID:
      const invoice = state.invoices.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedInvoice: action.payload
      }
    case INVOICE_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default Invoices
