export const PaymentMethods = [
  {
    paymentMethod: {
      object: 'setup_intent',
      automatic_payment_methods: null,
      cancellation_reason: null,
      client_secret: 'seti_1OEthoKbRhZhJxMgQqdq3eXg_secret_P2zhRspNEYfO8qzGDz0ylEUvtLspSKT',
      created: 1700572172,
      description: null,
      last_setup_error: null,
      livemode: false,
      next_action: null,
      payment_method: 'pm_1OEti1KbRhZhJxMgUVXzw6yg',
      payment_method_configuration_details: null,
      payment_method_types: ['card'],
      status: 'succeeded',
      usage: 'off_session',
      customer: 'cus_P2zh0dNKywljtn'
    },
    address: {
      zip: '43220',
      lineOne: '123 fake st.',
      lineTwo: 'apt. A',
      city: 'Columbus',
      state: 'OH',
      country: 'United States'
    },
    lastFour: 1575,
    card: 'jcb',
    paymentType: 0,
    isPrimary: true,
    userId: '6601c288149276195c3f8faf',
    businessId: '6601c35b149276195c3f8fd3'
  }
]
export const BANKS = [
  {
    id: 'ba_1OtzMeQmnBKiGechSgsYDHvt',
    object: 'bank_account',
    account: 'acct_1OtzJDQmnBKiGech',
    account_holder_name: null,
    account_holder_type: null,
    account_type: null,
    available_payout_methods: ['standard', 'instant'],
    bank_name: 'STRIPE TEST BANK',
    country: 'US',
    currency: 'usd',
    default_for_currency: true,
    financial_account: null,
    fingerprint: 'aLKrl5hDuxSB4RRQ',
    future_requirements: {
      currently_due: [],
      errors: [],
      past_due: [],
      pending_verification: []
    },
    last4: '6789',
    metadata: {},
    requirements: {
      currently_due: [],
      errors: [],
      past_due: [],
      pending_verification: []
    },
    routing_number: '110000000',
    status: 'new'
  }
]

export const BALANCE = {
  available: [
    {
      amount: 10000
    }
  ],
  instant_available: [
    {
      amount: 10000
    }
  ]
}

export const URL = {
  url: 'testUrl2'
}
