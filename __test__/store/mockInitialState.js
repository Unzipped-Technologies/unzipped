import { BUSINESS, SELECTED_BUSIESS, BUSINESS_FORM, WIZARD_SUBMISSION } from './Business'
import { INVOICES } from './Invoices'
import { paymentFrequencyEnum } from '../../server/enum/planEnum'
import { PaymentMethods } from './Stripe'
import { TASKS } from './Tasks'
import { CONTRACTS } from './Contracts'
import { FREELANCER, FREELCANCERS_LIST } from './Freelancer'
import { LIST_ENTRIES, USER_LIST_ENTRIES, INVITES_LIST, USER_LIST, CURRENT_USER_LISTS } from './ListEntries'
import { PROJECT_APPLICATIONS } from './ProjectApplications'
import { CALENDAR_SETTINGS } from './CalendarSettings'
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
    contracts: [...CONTRACTS]
  },
  Invoices: {
    invoices: [...INVOICES],
    unpaidInvoices: [],
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
    loading: false
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
    selectedTask: { ...TASKS[0] },
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
              assignee: '6601c2a6149276195c3f8fbd',
              taskName: 'Task 2',
              departmentId: '6601c35b149276195c3f8fd5',
              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3',
                client: {
                  _id: '6601c288149276195c3f8faf',
                  FirstName: 'Test',
                  LastName: 'Client',
                  FullName: 'Test Client',
                  profileImage:
                    'https://allthings.how/content/images/wordpress/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png'
                }
              },
              assignee: {
                user: {
                  _id: '6601c2a6149276195c3f8fbd',
                  FirstName: 'test',
                  LastName: 'freelancer1',
                  FullName: 'test freelancer1',
                  profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [],
              tags: ['tag1'],
              status: 'Todo',
              ticketCode: 'pos-4',
              comments: [
                {
                  comment: 'commet 1',
                  img: '',
                  userId: '6601c2a6149276195c3f8fba',
                  _id: '6601c6dffa3d861ad822e002',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 2',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e003',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 3',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e004',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 4',
                  img: '',
                  userId: '6601c2a6149276195c3f8fbd',
                  _id: '6601c6dffa3d861ad822e005',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 5',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e006',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 6',
                  img: '',
                  userId: '6601c2a6149276195c3f8fbd',
                  _id: '6601c6dffa3d861ad822e007',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 7',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e008',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 8',
                  img: '',
                  userId: '6601c2a6149276195c3f8fbd',
                  _id: '6601c6dffa3d861ad822e009',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 9',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e0010',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 10',
                  img: '',
                  userId: '6601c2a6149276195c3f8fbd',
                  _id: '6601c6dffa3d861ad822e0011',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 11',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8faf',
                  _id: '6601c6dffa3d861ad822e0012',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                }
              ]
            },
            {
              _id: '6601c3eb149276195c3f8fdx',
              storyPoints: 10,
              assignee: '6601c2a6149276195c3f8fbd',
              taskName: 'Task 20',
              departmentId: '6601c35b149276195c3f8fd5',
              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3',
                client: {
                  _id: '6601c288149276195c3f8faf',
                  FirstName: 'Test',
                  LastName: 'Client',
                  FullName: 'Test Client',
                  profileImage:
                    'https://allthings.how/content/images/wordpress/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png'
                }
              },
              assignee: {
                user: {
                  _id: '6601c2a6149276195c3f8fbd',
                  FirstName: 'test',
                  LastName: 'freelancer1',
                  FullName: 'test freelancer1',
                  profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [],
              tags: ['tag1'],
              status: 'Todo',
              ticketCode: 'pos-4',
              comments: [
                {
                  comment: 'commet 1',
                  img: '',
                  userId: '6601c2a6149276195c3f8fba',
                  _id: '6601c6dffa3d861ad822e002',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                }
              ]
            }
          ]
        },
        {
          _id: '6601c35b149276195c3f8fd7',
          tagName: 'In Progress',
          tasks: [
            {
              _id: '6601dd4036e96924aedf6a2c',
              storyPoints: 2,
              assignee: '6601c2a6149276195c3f8fbd',
              taskName: 'cdcdcd',
              departmentId: '6601c35b149276195c3f8fd5',
              status: 'In Progress',

              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3'
              },
              assignee: {
                user: {
                  _id: '6601c2a6149276195c3f8fbd',
                  FullName: 'test freelancer1',
                  FirstName: 'test',
                  LastName: 'freelancer1',
                  FullName: 'test freelancer1',
                  profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [
                {
                  _id: '6601dd4036e96924aedf6a2d',
                  hours: 3,
                  taskId: '6601dd4036e96924aedf6a2c'
                }
              ]
            }
          ]
        },
        {
          _id: '6601c35b149276195c3f8fd8',
          tagName: 'Done',
          tasks: [
            {
              _id: '6601c61dfa3d861ad822e000',
              storyPoints: 2,
              assignee: '6601c288149276195c3f8fac',
              taskName: 'task 1 update',
              status: 'Done',
              departmentId: '6601c35b149276195c3f8fd5',

              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3'
              },
              assignee: {
                user: {
                  _id: '6601c288149276195c3f8faf',
                  FirstName: 'Test',
                  LastName: 'Client',
                  FullName: 'Test Client',
                  profileImage:
                    'https://allthings.how/content/images/wordpress/2020/10/allthings.how-how-to-change-your-profile-picture-on-google-meet-profile-photo.png'
                }
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [
                {
                  _id: '6601c9b35657f51de61d2626',
                  hours: 4,
                  taskId: '6601c61dfa3d861ad822e000'
                }
              ],
              comments: [
                {
                  comment: 'commet 1',
                  img: '',
                  userId: '6601c2a6149276195c3f8fba',
                  _id: '6601c6dffa3d861ad822e002',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                },
                {
                  comment: 'commet 2',
                  img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                  userId: '6601c288149276195c3f8fac',
                  _id: '6601c6dffa3d861ad822e003',
                  createdAt: '2024-03-25T18:47:59.798+00:00',
                  updatedAt: '2024-03-25T18:47:59.798+00:00'
                }
              ]
            }
          ]
        },
        {
          _id: '6601cc4e9411991f47005803',
          tagName: 'Doing',
          tasks: [
            {
              _id: '6601e5f10676f6299e5cc945',
              storyPoints: 22,
              assignee: '6601c2a6149276195c3f8fbd',
              taskName: 'asssssssss',
              departmentId: '6601c35b149276195c3f8fd5',
              status: 'Doing',

              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3'
              },
              assignee: {
                user: {
                  _id: '6601c2a6149276195c3f8fbd',

                  FullName: 'test freelancer1',
                  profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [
                {
                  _id: '6601e5f10676f6299e5cc946',
                  hours: 20,
                  taskId: '6601e5f10676f6299e5cc945'
                }
              ]
            }
          ]
        },
        {
          _id: '6601cc4e9411991f47005823',
          tagName: 'tag2',
          tasks: [
            {
              _id: '6601e5f10676f6299e5cc925',
              storyPoints: 22,
              assignee: '6601c2a6149276195c3f8fbd',
              taskName: 'asssssssss',
              departmentId: '6601c35b149276195c3f8fd5',
              status: 'new tag',

              department: {
                _id: '6601c35b149276195c3f8fd5',
                name: 'Management',
                businessId: '6601c35b149276195c3f8fd3'
              },
              business: {
                _id: '6601c35b149276195c3f8fd3',
                name: 'POS'
              },
              taskHours: [
                {
                  _id: '6601e5f10676f6299e5cc946',
                  hours: 20,
                  taskId: '6601e5f10676f6299e5cc945'
                }
              ]
            }
          ]
        }
      ],
      employees: ['6601c288149276195c3f8faf'],
      isActive: true,
      isArchived: false,
      isDeleted: false,
      isEquity: false,
      isSelected: false,
      isSubDepartment: false,
      name: 'Management',
      order: 0,
      tags: [
        '6601c35b149276195c3f8fd6',
        '6601c35b149276195c3f8fd7',
        '6601c35b149276195c3f8fd8',
        '6601cc4e9411991f47005823'
      ],
      tasks: [
        '6601c3eb149276195c3f8fdd',
        '6601c61dfa3d861ad822e000',
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
      tagName: '',
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
  CalenderSetting: {
    calenderSetting: { ...CALENDAR_SETTINGS },
    success: null,
    loading: false,
    error: null
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
