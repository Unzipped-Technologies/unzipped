import { planEnum } from '../../server/enum/planEnum'
import { ValidationUtils } from '../../utils'

export const PLANS = [
  {
    id: planEnum.BASIC,
    name: 'Basic Unzipped',
    description: 'Everything you need to create your business and begin collaborating with professionals',
    cost: ValidationUtils.getPlanCost(planEnum.BASIC),
    features: [
      {
        icon: 'breifcase',
        text: 'Create up to 1 business'
      },
      {
        icon: 'user',
        text: 'Hire Unlimited professionals to work on your project'
      },
      {
        icon: 'github',
        text: 'Create and manage your unzipped repo'
      },
      {
        icon: 'checkMenu',
        text: 'Plan and monitor effort remaining'
      }
    ]
  },
  {
    id: planEnum.STANDARD,
    name: 'Unzipped',
    description: 'Level up your business with profit sharing and advanced collaboration',
    cost: ValidationUtils.getPlanCost(planEnum.STANDARD),
    features: [
      {
        icon: 'breifcase',
        text: 'Create up to 3 businesses'
      },
      {
        icon: 'user',
        text: 'Hire Unlimited professionals to work on your project'
      },
      {
        icon: 'cartAlt',
        text: 'Offer ownership and profit sharing'
      },
      {
        icon: 'github',
        text: 'Create and manage your unzipped repo'
      },
      {
        icon: 'checkMenu',
        text: 'Plan and monitor effort remaining'
      }
    ]
  },
  {
    id: planEnum.ADVANCED,
    name: 'Advanced Unzipped',
    description: 'Everything you need to create your business and begin collaborating with professionals',
    cost: ValidationUtils.getPlanCost(planEnum.ADVANCED),
    features: [
      {
        icon: 'breifcase',
        text: 'Create unlimited businesses'
      },
      {
        icon: 'user',
        text: 'Hire Unlimited professionals to work on your project'
      },
      {
        icon: 'cartAlt',
        text: 'Offer ownership and profit sharing'
      },
      {
        icon: 'github',
        text: 'Create and manage your unzipped repo'
      },
      {
        icon: 'checkMenu',
        text: 'Plan and monitor effort remaining'
      },
      {
        icon: 'chatBubble',
        text: 'Dedicated support staff member'
      },
      {
        icon: 'phoneAlt',
        text: 'Advanced promotion options'
      }
    ]
  }
]
