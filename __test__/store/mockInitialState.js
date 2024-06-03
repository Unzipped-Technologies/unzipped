import { BUSINESS } from './Business'

export let defaultInitialState = {
  Auth: {
    token: 'testToken',
    isAuthenticated: true,
    loading: false,
    user: {
      _id: null,
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
      profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
      freelancers: {
        category: 'Full Stack Developer',
        _id: null
      }
    }
  },
  Stripe: {
    methods: ['method1', 'method2'],
    url: { url: 'testUrl2' },
    balance: {
      available: [
        {
          amount: 100
        }
      ]
    }
  },
  Business: {
    details: {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    },
    projectList: [...BUSINESS]
  },
  Tasks: {
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
    selectedFreelancer: {
      category: 'Full Stack Developer',
      createdAt: '2024-03-25T18:29:58.851Z',
      deletedAt: null,
      dislikeTotal: 5,
      education: [],
      freelancerSkills: [
        {
          isActive: true,
          skill: 'React.js',
          yearsExperience: 2,
          _id: '6601c30e149276195c3f8fcc'
        },
        {
          isActive: true,
          skill: 'Node.js',
          yearsExperience: 3,
          _id: '6601c30e149276195c3f8fcd'
        },
        {
          isActive: true,
          skill: 'Express.js',
          yearsExperience: 1,
          _id: '6601c30e149276195c3f8fce'
        },
        {
          isActive: true,
          skill: 'Nest.js',
          yearsExperience: 3,
          _id: '6601c30e149276195c3f8fcf'
        },
        {
          isActive: true,
          skill: 'Next.js',
          yearsExperience: 2,
          _id: '6601c30e149276195c3f8fd0'
        },
        {
          isActive: true,
          skill: 'MongoDB',
          yearsExperience: 2,
          _id: '6601c30e149276195c3f8fd1'
        },
        {
          isActive: true,
          skill: 'Typescript',
          yearsExperience: 5,
          _id: '6601c30e149276195c3f8fd2'
        },
        {
          isActive: true,
          skill: 'React Native',
          yearsExperience: 5,
          _id: '6601c30e149276195c3f8fd9'
        }
      ],
      invites: '662190359587604114b93306',
      isAcceptEquity: false,
      isActive: true,
      isArchived: false,
      isDeleted: false,
      isPreferedFreelancer: true,
      likeTotal: 23,
      projects: [
        {
          images: [
            {
              _id: '663919ca277f230b94c358a7',
              name: 'image2.png',
              size: 3835,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018186/6601c2a6149276195c3f8fbd/pqq79y1p3dua4oqjqvnt.png',
              cloudinaryId: '6601c2a6149276195c3f8fbd/pqq79y1p3dua4oqjqvnt',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            },
            {
              _id: '663919cb277f230b94c358a8',
              name: 'image2.png',
              size: 3835,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018187/6601c2a6149276195c3f8fbd/qsz3tdtuwvsg8ogykvpo.png',
              cloudinaryId: '6601c2a6149276195c3f8fbd/qsz3tdtuwvsg8ogykvpo',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            },
            {
              _id: '663919cc277f230b94c358a9',
              name: 'image3.jpeg',
              size: 11068,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018189/6601c2a6149276195c3f8fbd/vsjwqps7ept3zoehbnzn.jpg',
              cloudinaryId: '6601c2a6149276195c3f8fbd/vsjwqps7ept3zoehbnzn',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            }
          ],
          skills: ['react', 'node', 'mongoDB'],
          isActive: true,
          _id: '663919d0277f230b94c358ad',
          projectName: 'Test Project 1',
          role: 'Software Engineer',
          createdAt: '2024-05-06T17:56:32.996Z',
          updatedAt: '2024-05-06T17:56:32.996Z'
        },
        {
          images: [
            {
              _id: '663919da277f230b94c358ae',
              name: 'image2.png',
              size: 3835,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018202/6601c2a6149276195c3f8fbd/a7snwiw9n1cej6iktwot.png',
              cloudinaryId: '6601c2a6149276195c3f8fbd/a7snwiw9n1cej6iktwot',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            },
            {
              _id: '663919db277f230b94c358af',
              name: 'image2.png',
              size: 3835,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018204/6601c2a6149276195c3f8fbd/jty4tnr1hgejbvgt5wjm.png',
              cloudinaryId: '6601c2a6149276195c3f8fbd/jty4tnr1hgejbvgt5wjm',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            },
            {
              _id: '663919dc277f230b94c358b0',
              name: 'image3.jpeg',
              size: 11068,
              url: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1715018205/6601c2a6149276195c3f8fbd/ouuqakfpt8xrfmvv6f38.jpg',
              cloudinaryId: '6601c2a6149276195c3f8fbd/ouuqakfpt8xrfmvv6f38',
              userId: '6601c2a6149276195c3f8fbd',
              __v: 0
            }
          ],
          skills: ['react', 'node', 'mongoDB'],
          isActive: true,
          _id: '663919e0277f230b94c358b4',
          projectName: 'Test Project 2',
          role: 'Software Engineer',
          createdAt: '2024-05-06T17:56:48.431Z',
          updatedAt: '2024-05-06T17:56:48.431Z'
        }
      ],
      education: [
        {
          _id: '6659db6a310bdb1c0f26ab07',
          title: 'BS(CS)',
          institute: 'Standford University',
          startYear: '2017',
          endYear: '2021',
          createdAt: '2024-05-31T14:15:06.678Z',
          updatedAt: '2024-05-31T14:15:06.678Z'
        },
        {
          _id: '6659db6a310bdb1c0f26ab12',
          title: 'MSC',
          institute: 'Standford University',
          startYear: '2022',
          endYear: '2024',
          createdAt: '2024-05-31T14:15:06.678Z',
          updatedAt: '2024-05-31T14:15:06.678Z'
        }
      ],
      rate: 23,
      updatedAt: '2024-05-06T17:58:57.371Z',
      userId: {
        isEmailVerified: true,
        isIdentityVerified: 'SUCCESS',
        isPhoneVerified: true,
        AddressLineCountry: 'User Test Address',
        FirstName: 'test',
        LastName: 'freelancer1',
        FullName: 'test freelancer1',
        profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
        likeTotal: 12,
        dislikeTotal: 3,
        _id: '6601c2a6149276195c3f8fbd',
        email: 'freelancer1@gmail.com',
        role: 1,
        createdAt: '2024-03-25T18:29:58.619Z',
        updatedAt: '2024-05-06T17:58:57.348Z'
      },
      __v: 4,
      _id: '6601c2a6149276195c3f8fc2'
    }
  },
  CalenderSetting: {
    calenderSetting: {
      userId: '6601c2a6149276195c3f8fbd',
      startTime: '2024-05-16T20:00:00.828Z',
      endTime: '2024-05-17T16:00:00.828Z',
      timezone: 'Asia/Karachi',
      interviewScheduler: 'RECURITERS_OTHERS',
      createdAt: '2024-05-16T20:11:30.183Z',
      updatedAt: '2024-05-16T20:12:27.509Z',
      __v: 0
    },
    success: null,
    loading: false,
    error: null
  },
  Lists: {
    currentUserList: [
      {
        icon: 'HeartOutlined',
        isActive: true,
        listEntries: [],
        isDefault: true,
        isPrivate: false,
        _id: '6601c2a6149276195c3f8fbe',
        name: 'Favorites',
        userId: '6601c2a6149276195c3f8fbd',
        user: '6601c2a6149276195c3f8fbd',
        createdAt: '2024-03-25T18:29:58.642Z',
        updatedAt: '2024-03-25T18:29:58.642Z',
        __v: 0
      },
      {
        icon: 'EyeOutlined',
        isActive: true,
        listEntries: [],
        isDefault: true,
        isPrivate: false,
        _id: '6601c2a6149276195c3f8fbf',
        name: 'Recently Viewed',
        userId: '6601c2a6149276195c3f8fbd',
        user: '6601c2a6149276195c3f8fbd',
        createdAt: '2024-03-25T18:29:58.658Z',
        updatedAt: '2024-03-25T18:29:58.658Z',
        __v: 0
      },
      {
        icon: 'TeamOutlined',
        isActive: true,
        listEntries: [],
        isDefault: true,
        isPrivate: true,
        _id: '6601c2a6149276195c3f8fc0',
        name: 'My Team',
        userId: '6601c2a6149276195c3f8fbd',
        user: '6601c2a6149276195c3f8fbd',
        createdAt: '2024-03-25T18:29:58.680Z',
        updatedAt: '2024-03-25T18:29:58.680Z',
        __v: 0
      }
    ]
  }
}

export let initialState = { ...defaultInitialState }
