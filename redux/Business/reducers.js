import {
    CREATE_BUSINESS,
    UPDATE_BUSINESS,
    DELETE_BUSINESS,
    GET_BUSINESSES,
    SELECT_BUSINESS,
    CREATE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_DEPARTMENTS,
    CREATE_TAG,
    UPDATE_TAG,
    GET_TAGS,
    DELETE_TAG,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
    SELECT_DEPARTMENT,
    GET_STORIES,
    DEPARTMENT_ERROR,
    RESET_BUSINESS_FORM,
    UPDATE_BUSINESS_FORM,
    LOAD_STATE,
} from './constants';

const INIT_STATE = {
    departments: [],
    businesses: [],
    tags: [],
    stories: [],
    loading: false,
    selectedDepartment: 0,
    selectedBusiness: {},
    businessForm: {
        name: "",
        isFirstBusiness: '',
        isExistingAudience: '',
        socialMediaPlatforms: [""],
        budget: 0,
        isEquity: '',
        equity: 0,
        deadline: "",
        incomePlatform: [""],
        typesOfHires: [""],
        numberOfSocialFollowing: "",
        businessNiche: "",
        businessAddressLineOne: "",
        businessAddressLineTwo: "",
        businessCountry: "",
        businessCity: "",
        businessState: "",
        businessZip: "",
        description: "",
        businessImage: "/",
        stage: 1,
    },
    error: ''
}

const Business = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case CREATE_BUSINESS:
            return {...state, loading: false, businesses: [...state.businesses, action.payload], selectedBusiness: action.payload};
        case UPDATE_BUSINESS:
            const RemoveUpdateBusiness = state.businesses.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, businesses: [action.payload, ...RemoveUpdateBusiness]};
        case DELETE_BUSINESS:
            let newListBusinesses = state.businesses.filter(item => action.payload.id !== item.id)
            return {...state, loading: false, business: [...newListBusinesses]};
        case GET_BUSINESSES:
            return {...state, loading: false, businesses: action.payload};
        case SELECT_BUSINESS:
            return {...state, loading: false, selectedBusiness: action.payload.selected, stories: [...action.payload.stories]};
        case CREATE_DEPARTMENT:
            return {...state, loading: false, departments: action.payload};
        case UPDATE_DEPARTMENT:
            const RemoveUpdateItem = state.departments.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, departments: [action.payload, ...RemoveUpdateItem]};
        case DELETE_DEPARTMENT:
            let newList = state.departments.filter(item => action.payload.id !== item.id)
            return {...state, loading: false, departments: [...newList]};
        case GET_DEPARTMENTS:
            return {...state, loading: false, departments: action.payload};
        case CREATE_TAG:
            return {...state, loading: false, tags: [...state.tags, action.payload]};
        case UPDATE_TAG:
            const RemoveUpdateItems = state.tags.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, tags: [action.payload, ...RemoveUpdateItems]};
        case DELETE_TAG:
            const RemoveTag = state.tags.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, tags: [...RemoveTag]};
        case GET_TAGS:
            return {...state, loading: false, tags: [...action.payload]};
        case CREATE_STORY:
            return {...state, loading: false, stories: [action.payload, ...state.stories]};
        case UPDATE_STORY:
            const RemoveUpdateStories = state.stories.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, stories: [action.payload, ...RemoveUpdateStories]};
        case DELETE_STORY:
            const RemoveStories = state.stories.filter(item => item.id !== action.payload.id)
            return {...state, loading: false, stories: [...RemoveStories]};
        case GET_STORIES:
            return {...state, loading: false, stories: [...action.payload]};
        case SELECT_DEPARTMENT:
            return {...state, loading: false, selectedDepartment: action.payload.selected, stories: [...action.payload.stories]};
        case DEPARTMENT_ERROR:
            return {...state, loading: false, error: action.payload};
        case UPDATE_BUSINESS_FORM:
            return {...state, loading: false, businessForm: {...state.businessForm, ...action.payload}};
        case RESET_BUSINESS_FORM:
            return {...state, loading: false, businessForm: {...INIT_STATE.businessForm}};
        case LOAD_STATE:
            return {...state, loading: true};
        default: 
            return state;
    }
}

export default Business;