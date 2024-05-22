export const initialState = {
  Auth: {
    token: 'testToken',
    isAuthenticated: true,
    loading: false,
    profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
    user: {
      role: 1,
      FirstName: 'Test',
      FullName: 'Test User',
      LastName: 'User',
      stripeAccountId: 'testStripeId',
      email: 'testUser@gmail.com',
      phoneNumber: '0111-111-1111',
      AddressLineOne: 'Address 1',
      AddressLineTwo: 'Address 2',
      AddressCity: 'NewYork',
      AddressZip: '40000',
      AddressLineTwo: 'Address 2',
      likeTotal: 10,
      profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',

      freelancers: {
        category: 'Full Stack Developer'
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
    }
  }
}
