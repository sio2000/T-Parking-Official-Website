import { MapIcon, ClockIcon, FuelIcon, ChartBarIcon, GlobeAltIcon, UserGroupIcon } from '../assets/icons';

const features = [
  {
    key: 'liveMap',
    icon: <MapIcon className="w-10 h-10 text-sky-500 bg-sky-100 rounded-full p-2 shadow-lg" />,
    title: 'Live Map View',
    description: 'Real-time parking spot availability'
  },
  {
    key: 'instantReservations',
    icon: <ClockIcon className="w-10 h-10 text-purple-500 bg-purple-100 rounded-full p-2 shadow-lg" />,
    title: 'Instant Reservations',
    description: 'Book your spot in seconds'
  },
  {
    key: 'shareEarn',
    icon: <FuelIcon className="w-10 h-10 text-orange-500 bg-orange-100 rounded-full p-2 shadow-lg" />,
    title: 'Share & Earn',
    description: 'Unpark, share your spot—earn points and retail coupons in Greece'
  },
  {
    key: 'pointsSystem',
    icon: <ChartBarIcon className="w-10 h-10 text-green-500 bg-green-100 rounded-full p-2 shadow-lg" />,
    title: 'Coupons & rewards',
    description: 'Redeem coupons and offers at top retail stores in Greece as you participate'
  },
  {
    key: 'realTimeUpdates',
    icon: <GlobeAltIcon className="w-10 h-10 text-pink-500 bg-pink-100 rounded-full p-2 shadow-lg" />,
    title: 'Real-time Updates',
    description: 'Stay informed with live notifications'
  },
  {
    key: 'communityDriven',
    icon: <UserGroupIcon className="w-10 h-10 text-yellow-500 bg-yellow-100 rounded-full p-2 shadow-lg" />,
    title: 'Community Driven',
    description: 'Join a growing community of users'
  }
];

const pricingPlans = [
  {
    name: 'Free',
    price: '0€',
    features: [
      'Basic map access',
      'Limited reservations',
      'Community support'
    ]
  },
  {
    name: 'Premium',
    price: '4.99€',
    features: [
      'Priority reservations',
      'Advanced notifications',
      'Premium support',
      'Ad-free experience'
    ]
  },
  {
    name: 'Platinum',
    price: '9.99€',
    features: [
      'All Premium features',
      'Exclusive spots',
      '24/7 support',
      'Custom themes',
      'Family sharing'
    ]
  }
];

const pointsRewards = [
  {
    key: 'earnPoints',
    icon: <ChartBarIcon className="w-10 h-10 text-green-500 bg-green-100 rounded-full p-2 shadow-lg" />,
    title: 'Earn Points',
    description: 'Get points for sharing spots'
  },
  {
    key: 'redeemRewards',
    icon: <FuelIcon className="w-10 h-10 text-orange-500 bg-orange-100 rounded-full p-2 shadow-lg" />,
    title: 'Redeem Rewards',
    description: 'Use points for free parking'
  },
  {
    key: 'levelUp',
    icon: <UserGroupIcon className="w-10 h-10 text-yellow-500 bg-yellow-100 rounded-full p-2 shadow-lg" />,
    title: 'Level Up',
    description: 'Unlock exclusive benefits'
  }
];

const notifications = [
  {
    key: 'spotAvailable',
    icon: <MapIcon className="w-10 h-10 text-sky-500 bg-sky-100 rounded-full p-2 shadow-lg" />,
    title: 'Spot Available',
    description: 'Get notified when spots open up'
  },
  {
    key: 'reservationReminder',
    icon: <ClockIcon className="w-10 h-10 text-purple-500 bg-purple-100 rounded-full p-2 shadow-lg" />,
    title: 'Reservation Reminder',
    description: 'Never forget your parking time'
  },
  {
    key: 'pointsUpdate',
    icon: <ChartBarIcon className="w-10 h-10 text-green-500 bg-green-100 rounded-full p-2 shadow-lg" />,
    title: 'Points Update',
    description: 'Track your rewards progress'
  }
];

export const appData = {
  features,
  pricingPlans,
  pointsRewards,
  notifications
}; 