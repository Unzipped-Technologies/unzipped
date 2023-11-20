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
    GET_DEPARTMENT_BY_ID,
    CREATE_TAG,
    UPDATE_TAG,
    GET_TAGS,
    DELETE_TAG,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
    SELECT_DEPARTMENT,
    GET_STORIES,
    REORDER_STORIES,
    SORT_STORIES_ON_DRAG,
    DEPARTMENT_ERROR,
    RESET_BUSINESS_FORM,
    UPDATE_BUSINESS_FORM,
    LOAD_STATE,
    SUCCESS,
    ADD_COMMENT_TO_STORY,
    CREATE_FILE,
    REMOVE_COMMENT_FROM_STORY,
    UPDATE_CREATE_STORY,
    GET_PROJECT_LIST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_Error
} from './constants';

const INIT_STATE = {
    departments: [],
    businesses: [],
    files: [],
    tags: [],
    stories: [],
    loading: false,
    selectedDepartment: 0,
    selectedBusiness: {},
    employees: [],
    businessForm: {
        isShortTermBusiness: '',
        name: "",
        challenge: '',
        role: '',
        objectives: [""],
        teamDynamics: '',
        requiredSkills: [""],
        goals: '',
        companyBackground: '',
        budget: '',
        questionsToAsk: [""],
        // isFirstBusiness: '',
        // isExistingAudience: '',
        // socialMediaPlatforms: [""],
        // budget: 0,
        // isEquity: '',
        // equity: 0,
        // deadline: "",
        // incomePlatform: [""],
        // typesOfHires: [""],
        // numberOfSocialFollowing: "",
        // businessNiche: "",
        // businessAddressLineOne: "",
        // businessAddressLineTwo: "",
        // businessCountry: "",
        // businessCity: "",
        // businessState: "",
        // businessZip: "",
        // description: "",
        // businessImage: "/",
        stage: 1,
    },
    createStoryForm: {
        taskName: '',
        assignee: '',
        assigneeId: '',
        storyPoints: '',
        priority: 1,
        description: '',
        tagId: '',
        tagName: '',
    },
    error: ''
}

const Business = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case CREATE_BUSINESS:
            return { ...state, loading: false, businesses: [...state.businesses, action.payload], selectedBusiness: action.payload };
        case UPDATE_BUSINESS:
            const RemoveUpdateBusiness = state.businesses.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, businesses: [action.payload, ...RemoveUpdateBusiness] };
        case DELETE_BUSINESS:
            let newListBusinesses = state.businesses.filter(item => action.payload.id !== item.id)
            return { ...state, loading: false, business: [...newListBusinesses] };
        case GET_BUSINESSES:
            const selectedBusiness = action.payload.find(e => e.isSelected) || action.payload[0]
            return { ...state, loading: false, businesses: action.payload, selectedBusiness };
        case SELECT_BUSINESS:
            return { ...state, loading: false, selectedBusiness: action.payload, stories: action.payload?.stories || [], employees: action.payload?.employees || [] };
        case CREATE_DEPARTMENT:
            return { ...state, loading: false, departments: action.payload };
        case UPDATE_DEPARTMENT:
            const RemoveUpdateItem = state.departments.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, departments: [action.payload, ...RemoveUpdateItem] };
        case DELETE_DEPARTMENT:
            let newList = state.departments.filter(item => action.payload.id !== item.id)
            return { ...state, loading: false, departments: [...newList] };
        case GET_DEPARTMENT_BY_ID:
            const depart = state.departments.map(e => {
                return {
                    ...e,
                    isSelected: action.payload._id === e._id
                }
            })
            return { ...state, loading: false, selectedDepartment: action.payload, departments: depart, tags: action.payload.tags, stories: action.payload?.tasks };
        case GET_DEPARTMENTS:
            const selectedDepartment = action.payload.find(e => e.isSelected) || action.payload[0]
            return { ...state, loading: false, departments: action.payload, selectedDepartment };
        case CREATE_TAG:
            return { ...state, loading: false, tags: [...state.tags, action.payload] };
        case UPDATE_TAG:
            const RemoveUpdateItems = state.tags.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, tags: [action.payload, ...RemoveUpdateItems] };
        case DELETE_TAG:
            const RemoveTag = state.tags.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, tags: [...RemoveTag] };
        case GET_TAGS:
            return { ...state, loading: false, tags: [...action.payload] };
        case UPDATE_CREATE_STORY:
            return { ...state, loading: false, createStoryForm: { ...state.createStoryForm, ...action.payload } };
        case CREATE_STORY:
            return { ...state, loading: false, stories: [action.payload, ...state.stories], createStoryForm: INIT_STATE.createStoryForm };
        case UPDATE_STORY:
            const RemoveUpdateStories = state.stories.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, stories: [action.payload, ...RemoveUpdateStories] };
        case REORDER_STORIES:
            return { ...state, loading: false, stories: action.payload };
        case DELETE_STORY:
            const RemoveStories = state.stories.filter(item => item.id !== action.payload.id)
            return { ...state, loading: false, stories: [...RemoveStories] };
        case SORT_STORIES_ON_DRAG:
            return { ...state, loading: false, stories: action.payload };
        case GET_STORIES:
            return { ...state, loading: false, stories: [...action.payload] };
        case ADD_COMMENT_TO_STORY:
            const updatedStories = state.stories || []
            const index = updatedStories.map(e => e._id).indexOf(action.payload._id);
            if (index !== -1) {
                updatedStories[index] = action.payload;
            }
            return { ...state, loading: false, stories: [...updatedStories] };
        case REMOVE_COMMENT_FROM_STORY:
            const removeStory = state.stories.filter(e => e._id !== action.payload._id)
            return { ...state, loading: false, stories: removeStory };
        case SELECT_DEPARTMENT:
            return { ...state, loading: false, selectedDepartment: action.payload.selected, stories: [...action.payload.stories] };
        case DEPARTMENT_ERROR:
            console.log('error failed')
            return { ...state, loading: false, error: action.payload };
        case UPDATE_BUSINESS_FORM:
            return { ...state, loading: false, businessForm: { ...state.businessForm, ...action.payload } };
        case RESET_BUSINESS_FORM:
            return { ...state, loading: false, businessForm: { ...INIT_STATE.businessForm } };
        case CREATE_FILE:
            return { ...state, loading: false, files: [...state.files, action.payload] };
        case SUCCESS:
            return { ...state, loading: true };
        case LOAD_STATE:
            return { ...state, loading: true };
        case GET_PROJECT_LIST:
            return { ...state, loading: false, projectList: action.payload };
        case GET_PROJECT_Error:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default Business;