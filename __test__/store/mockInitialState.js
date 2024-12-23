import { BUSINESS, SELECTED_BUSIESS, BUSINESS_FORM, WIZARD_SUBMISSION } from './Business'
import { INVOICES } from './Invoices'
import { paymentFrequencyEnum } from '../../server/enum/planEnum'
import { PaymentMethods } from './Stripe'
import { TASKS } from './Tasks'
import { CONTRACTS } from './Contracts'
import { FREELANCER, FREELCANCERS_LIST } from './Freelancer'
import { LIST_ENTRIES, USER_LIST_ENTRIES, INVITES_LIST, USER_LIST, CURRENT_USER_LISTS } from './ListEntries'
import { PROJECT_APPLICATIONS } from './ProjectApplications'
import { PLANS } from './Plans'
export let defaultInitialState = {
  Auth: {
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
    token: 'testToken',
    isAuthenticated: true,
    loading: false,
    passwordChanged: false,
    verifyUrl: '',
    trialLength: 7,
    plans: [...PLANS],
    selectedPlan: null,
    planCost: 29,
    user: {
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdentityVerified: 'SUCCESS',
      _id: '6601c288149276195c3f8faf',
      role: 1,
      FirstName: 'Test',
      FullName: 'Test User',
      LastName: 'User',
      stripeAccountId: 'testStripeId',
      email: 'testUser@gmail.com',
      phoneNumber: '(123) 456-7890',
      AddressLineOne: 'Address 1',
      AddressLineTwo: 'Address 2',
      AddressCity: 'NewYork',
      AddressState: 'New York',
      AddressZip: '40000',
      likeTotal: 10,
      updatedAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), //'2024-03-25T19:00:02.865Z',
      profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
      freelancers: {
        _id: '6601c2a6149276195c3f8fc2',
        rate: 23,
        isActive: true,
        isArchived: false,
        isPreferedFreelancer: true,
        isAcceptEquity: true,
        category: 'Full Stack Developer'
      }
    },
    thirdPartyDetails: {
      githubId: 24108368,
      userName: 'testUser',
      avatarUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
    }
  },
  Stripe: {
    methods: [...PaymentMethods],
    url: { url: 'testUrl2' },
    balance: {
      available: [
        {
          amount: 100
        }
      ]
    }
  },
  Contracts: {
    contracts: [...CONTRACTS],
    activeContracts: [...CONTRACTS],
    contractForm: {
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
  },
  Invoices: {
    invoices: [...INVOICES],
    unpaidInvoices: [...INVOICES],
    selectedInvoice: {},
    error: '',
    loading: false,
    totalCount: INVOICES?.length
  },
  Business: {
    wizardSubmission: {
      ...WIZARD_SUBMISSION
    },
    details: {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    },
    businessForm: {
      ...BUSINESS_FORM
    },
    files: [],
    projectList: [...BUSINESS],
    selectedBusiness: { ...SELECTED_BUSIESS },
    totalCount: BUSINESS?.length,
    loading: false,
    userOwnedBusiness: [...BUSINESS]
  },
  ProjectApplications: {
    success: false,
    selectedApplication: {},
    error: '',
    loading: false,
    totalCount: PROJECT_APPLICATIONS?.length,
    projectApplications: [...PROJECT_APPLICATIONS]
  },
  Tasks: {
    tasks: [...TASKS],
    selectedTask: {},
    error: '',
    loading: false,
    totalCount: TASKS?.length,
    currentDepartment: {},
    createStoryForm: {
      taskName: '',
      storyPoints: '',
      priority: '',
      order: 1,
      description: '',
      status: '',
      businessId: '',
      departmentId: '',
      assignee: '',
      tags: [],
      tag: '',
      comments: []
    }
  },
  Departments: {
    selectedDepartment: {
      businessId: '6601c35b149276195c3f8fd3',
      client: {
        FirstName: 'Test',
        FullName: 'Test Client',
        LastName: 'Client',
        email: 'client@gmail.com',
        profileImage:
          'https://allthings.how/content/images/wordpress/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png',
        _id: '6601c288149276195c3f8faf',
        clientId: '6601c288149276195c3f8faf'
      },
      contracts: [
        {
          businessId: '6601c35b149276195c3f8fd3',
          createdAt: '2024-03-25T18:34:11.311Z',
          departmentId: '6601c35b149276195c3f8fd5',
          freelancer: {
            user: {
              FirstName: 'test',
              FullName: 'test freelancer1',
              LastName: 'freelancer1',
              email: 'freelancer1@gmail.com',
              profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
              _id: '6601c2a6149276195c3f8fbd'
            },
            userId: '6601c2a6149276195c3f8fbd',
            _id: '6601c2a6149276195c3f8fc2'
          },
          freelancerId: '6601c2a6149276195c3f8fc2',
          hourlyRate: 23,
          hoursLimit: 40,
          isActive: true,
          isOfferAccepted: true,
          totalStoryPoints: 19,
          updatedAt: '2024-03-25T18:34:11.311Z',
          userId: '6601c288149276195c3f8faf',
          _id: '6601c3a3149276195c3f8fdb'
        }
      ],
      createdAt: '2024-03-25T18:32:59.175Z',
      departmentTags: [
        {
          _id: '6601c35b149276195c3f8fd6',
          tagName: 'To Do',
          tasks: [
            {
              _id: '6601c3eb149276195c3f8fdd',
              storyPoints: 10,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'lowest',
              taskName: 'Task 2',
              description: 'Task 2 description',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-1',
              comments: []
            },
            {
              _id: '6601c401149276195c3f8fde',
              storyPoints: 10,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'lowest',
              taskName: 'Task 2',
              description: 'Task 2 description',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-2',
              comments: []
            },
            {
              _id: '6601c423149276195c3f8fdf',
              storyPoints: 10,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'lowest',
              taskName: 'Task 2',
              description: 'Task 2 description',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-3',
              comments: []
            },
            {
              _id: '6601cae9e6f2811e7be73306',
              storyPoints: 6,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'low',
              taskName: 'nmnmnm',
              description: '',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-5',
              comments: []
            },
            {
              _id: '6601cbd59411991f47005801',
              storyPoints: 9,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'low',
              taskName: 'nmnmnmjkj',
              description: '',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-6',
              comments: []
            },
            {
              _id: '6601dd4036e96924aedf6a2c',
              storyPoints: 2,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'low',
              taskName: 'cdcdcd',
              description: '',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-7',
              comments: []
            },
            {
              _id: '6601e5f10676f6299e5cc945',
              storyPoints: 22,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'low',
              taskName: 'asssssssss',
              description: '',
              tag: '6601c35b149276195c3f8fd6',
              ticketCode: 'pos-8',
              comments: []
            }
          ]
        },
        {
          _id: '6601c35b149276195c3f8fd7',
          tagName: 'In Progress',
          tasks: [
            {
              _id: '6601c61dfa3d861ad822e000',
              storyPoints: 2,
              assignee: {
                user: {}
              },
              status: 'todo',
              priority: 'lowest',
              taskName: 'task 1 update',
              description: 'ddd',
              tag: '6601c35b149276195c3f8fd7',
              comments: [
                {
                  img: '',
                  _id: '6601c6dffa3d861ad822e002',
                  comment: 'aaa',
                  userId: '6601c288149276195c3f8faf',
                  createdAt: '2024-03-25T18:47:59.798Z',
                  updatedAt: '2024-03-25T18:47:59.798Z'
                }
              ],
              ticketCode: 'pos-4'
            }
          ]
        },
        {
          _id: '6601c35b149276195c3f8fd8',
          tagName: 'Done',
          tasks: []
        },
        {
          _id: '6601cc4e9411991f47005803',
          tagName: 'sssss ',
          tasks: []
        },
        {
          _id: '6601ccd69411991f47005804',
          tagName: ' new tag',
          tasks: []
        },
        {
          _id: '6601cd159411991f47005805',
          tagName: ' ccccc',
          tasks: []
        }
      ],
      employees: ['6601c3a3149276195c3f8fdb'],
      isActive: true,
      isArchived: false,
      isDeleted: false,
      isEquity: false,
      isSelected: false,
      isSubDepartment: false,
      name: 'Management',
      order: 0,
      tags: ['6601c35b149276195c3f8fd6', '6601c35b149276195c3f8fd7', '6601c35b149276195c3f8fd8'],
      tasks: [
        '6601c3eb149276195c3f8fdd',
        '6601c401149276195c3f8fde',
        '6601c423149276195c3f8fdf',
        '6601c61dfa3d861ad822e000',
        '6601cbd59411991f47005801',
        '6601dd4036e96924aedf6a2c',
        '6601e5f10676f6299e5cc945'
      ],
      updatedAt: '2024-03-25T21:00:33.771Z',
      __v: 8,
      _id: '6601c35b149276195c3f8fd5'
    }
  },
  Tags: {
    createTagForm: {
      tagName: ' ',
      isActive: true,
      isArchived: false,
      departmentId: ''
    }
  },
  Loading: {
    loading: false
  },
  Freelancers: {
    isExpanded: false,
    freelancers: [...FREELCANCERS_LIST],
    totalCount: FREELCANCERS_LIST.length,
    selectedFreelancer: { ...FREELANCER }
  },
  Lists: {
    invitesList: [...INVITES_LIST],
    selectedList: null,
    updatedList: null,
    currentUserList: [...CURRENT_USER_LISTS]
  },
  ListEntries: {
    userLists: [...USER_LIST],
    listEntries: [],
    userListEntries: [...USER_LIST_ENTRIES]
  }
}

export let initialState = { ...defaultInitialState }
