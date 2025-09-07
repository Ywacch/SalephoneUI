import { User, Device, Recommendation, DeviceCategory } from '@/types'
import { generatePriceHistory } from '@/lib/utils'

// Available brands and models for autocomplete
export const availableBrands = [
  'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Motorola', 'Nokia',
  'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Razer', 'Microsoft',
  'Canon', 'Nikon', 'Fujifilm', 'Panasonic', 'Olympus',
  'Bose', 'Sennheiser', 'Audio-Technica', 'JBL', 'Beats',
  'Garmin', 'Fitbit', 'Amazfit', 'Huawei', 'Samsung',
  'PlayStation', 'Xbox', 'Nintendo', 'Steam Deck'
]

export const availableModels = {
  phone: [
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12',
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23',
    'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7',
    'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'Xiaomi 14 Pro', 'Xiaomi 13 Ultra'
  ],
  laptop: [
    'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air 15"', 'MacBook Air 13"',
    'XPS 15', 'XPS 13', 'Inspiron 15', 'Inspiron 13', 'Alienware m18', 'Alienware m16',
    'Spectre x360', 'Envy 15', 'Pavilion 15', 'EliteBook 850', 'ProBook 450',
    'ThinkPad X1 Carbon', 'ThinkPad T14', 'ThinkPad E15', 'IdeaPad 5', 'Legion 5',
    'ROG Zephyrus G14', 'ROG Strix G15', 'VivoBook S15', 'ZenBook 14', 'TUF Gaming A15',
    'Nitro 5', 'Aspire 5', 'Swift 3', 'Predator Helios 300', 'ConceptD 3',
    'Surface Laptop 5', 'Surface Pro 9', 'Surface Book 3'
  ],
  tablet: [
    'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad', 'iPad mini',
    'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab A8',
    'Surface Pro 9', 'Surface Go 3', 'Pixel Tablet', 'Fire HD 10', 'Fire HD 8'
  ],
  camera: [
    'EOS R5', 'EOS R6', 'EOS R7', 'EOS R10', 'EOS 90D', 'EOS 80D',
    'D850', 'D780', 'D7500', 'D5600', 'Z9', 'Z7 II', 'Z6 II',
    'A7R V', 'A7 IV', 'A7 III', 'A7C', 'A6600', 'A6400',
    'X-T5', 'X-T4', 'X-T3', 'X-S10', 'X-E4', 'X100V',
    'GH6', 'G9', 'G95', 'G85', 'S5', 'S1R'
  ],
  tv: [
    'OLED C3', 'OLED G3', 'OLED B3', 'QN90C', 'QN85C', 'QN80C',
    'A95K', 'A90K', 'A80K', 'X95K', 'X90K', 'X85K',
    'C2', 'G2', 'B2', 'QN90B', 'QN85B', 'QN80B',
    'A95L', 'A90L', 'A80L', 'X95L', 'X90L', 'X85L'
  ],
  headphones: [
    'AirPods Pro 2', 'AirPods 3', 'AirPods Max', 'Beats Studio Pro', 'Beats Solo3',
    'WH-1000XM5', 'WH-1000XM4', 'WF-1000XM4', 'WF-1000XM5', 'WH-CH720N',
    'QC45', 'QC35 II', 'QuietComfort Earbuds', 'SoundSport Free',
    'HD 800 S', 'HD 660S', 'HD 600', 'Momentum 4', 'Momentum 3',
    'ATH-M50x', 'ATH-M40x', 'ATH-M30x', 'ATH-AD900X', 'ATH-AD700X'
  ],
  smartwatch: [
    'Apple Watch Series 9', 'Apple Watch Series 8', 'Apple Watch SE', 'Apple Watch Ultra 2',
    'Galaxy Watch 6 Classic', 'Galaxy Watch 6', 'Galaxy Watch 5 Pro', 'Galaxy Watch 5',
    'Pixel Watch 2', 'Pixel Watch', 'Fitbit Versa 4', 'Fitbit Sense 2', 'Fitbit Charge 5',
    'Garmin Fenix 7', 'Garmin Forerunner 955', 'Garmin Venu 2', 'Garmin Instinct 2',
    'Amazfit GTR 4', 'Amazfit GTS 4', 'Huawei Watch GT 3', 'Huawei Watch GT 3 Pro'
  ],
  gaming: [
    'PlayStation 5', 'PlayStation 5 Digital', 'PlayStation 4 Pro', 'PlayStation 4',
    'Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S',
    'Nintendo Switch OLED', 'Nintendo Switch', 'Nintendo Switch Lite',
    'Steam Deck 512GB', 'Steam Deck 256GB', 'Steam Deck 64GB',
    'ROG Ally', 'Legion Go', 'Ayaneo 2', 'GPD Win 4'
  ],
  other: []
}

// Demo Users
export const demoUsers: User[] = [
  {
    id: 'user_1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-15T00:00:00Z',
    totalDevices: 8,
    portfolioValue: 15420,
    totalSavings: 2340,
    preferences: {
      currency: 'USD',
      theme: 'light',
      notifications: true,
      emailUpdates: true,
      pushNotifications: true,
    }
  },
  {
    id: 'user_2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-03-22T00:00:00Z',
    totalDevices: 5,
    portfolioValue: 8750,
    totalSavings: 1200,
    preferences: {
      currency: 'USD',
      theme: 'dark',
      notifications: true,
      emailUpdates: false,
      pushNotifications: true,
    }
  },
  {
    id: 'user_3',
    name: 'Michael Rodriguez',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-02-10T00:00:00Z',
    totalDevices: 12,
    portfolioValue: 22100,
    totalSavings: 3450,
    preferences: {
      currency: 'USD',
      theme: 'system',
      notifications: true,
      emailUpdates: true,
      pushNotifications: false,
    }
  },
  {
    id: 'user_4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-04-05T00:00:00Z',
    totalDevices: 6,
    portfolioValue: 12300,
    totalSavings: 1800,
    preferences: {
      currency: 'USD',
      theme: 'light',
      notifications: false,
      emailUpdates: true,
      pushNotifications: false,
    }
  },
  {
    id: 'user_5',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-28T00:00:00Z',
    totalDevices: 9,
    portfolioValue: 18750,
    totalSavings: 2750,
    preferences: {
      currency: 'USD',
      theme: 'dark',
      notifications: true,
      emailUpdates: true,
      pushNotifications: true,
    }
  },
  {
    id: 'user_6',
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-05-12T00:00:00Z',
    totalDevices: 4,
    portfolioValue: 6800,
    totalSavings: 950,
    preferences: {
      currency: 'USD',
      theme: 'light',
      notifications: true,
      emailUpdates: false,
      pushNotifications: true,
    }
  }
]

// Demo Devices
export const demoDevices: Device[] = [
  // Alex Chen's devices
  {
    id: 'device_1',
    userId: 'user_1',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2022-09-16T00:00:00Z',
    purchasePrice: 999,
    currentValue: 750,
    condition: 'excellent',
    notes: 'Perfect condition, always in case',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 999, 1.5),
    recommendation: {
      action: 'sell',
      reason: 'New iPhone 15 series released. Trade-in values are at peak.',
      confidence: 85,
      urgency: 'high',
      potentialImpact: 150,
      validUntil: '2024-01-15T00:00:00Z',
      marketInsights: ['iPhone 15 launch driving demand', 'Trade-in values up 20%']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_2',
    userId: 'user_1',
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    model: 'MacBook Pro 14"',
    category: 'laptop' as DeviceCategory,
    purchaseDate: '2023-01-20T00:00:00Z',
    purchasePrice: 1999,
    currentValue: 1650,
    condition: 'excellent',
    notes: 'M2 Pro chip, 16GB RAM, 512GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1999, 0.8),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent performance, still under warranty. Market is stable.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['M3 chip not significantly better', 'Professional demand high']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_3',
    userId: 'user_1',
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    model: 'iPad Pro 12.9"',
    category: 'tablet' as DeviceCategory,
    purchaseDate: '2022-05-15T00:00:00Z',
    purchasePrice: 1099,
    currentValue: 850,
    condition: 'good',
    notes: 'M1 chip, 128GB, with Apple Pencil',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1099, 1.2),
    recommendation: {
      action: 'dont_sell',
      reason: 'New iPad Pro with M2 chip available. Consider upgrading for better performance.',
      confidence: 70,
      urgency: 'medium',
      potentialImpact: 200,
      marketInsights: ['M2 iPad Pro offers significant improvements', 'Trade-in values good']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_4',
    userId: 'user_1',
    name: 'Sony A7 IV',
    brand: 'Sony',
    model: 'A7 IV',
    category: 'camera' as DeviceCategory,
    purchaseDate: '2022-12-01T00:00:00Z',
    purchasePrice: 2498,
    currentValue: 2200,
    condition: 'excellent',
    notes: 'Full-frame mirrorless, 33MP, with 24-70mm lens',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 2498, 0.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'Professional camera with excellent value retention. Market demand stable.',
      confidence: 95,
      urgency: 'low',
      marketInsights: ['Professional cameras dont_sell value well', 'No major updates expected']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_5',
    userId: 'user_1',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    model: 'AirPods Pro 2',
    category: 'headphones' as DeviceCategory,
    purchaseDate: '2022-09-23T00:00:00Z',
    purchasePrice: 249,
    currentValue: 180,
    condition: 'good',
    notes: 'Active noise cancellation, USB-C case',
    imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 249, 2.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Still excellent performance. No significant sells available.',
      confidence: 80,
      urgency: 'low',
      marketInsights: ['AirPods Pro 3 not expected soon', 'Battery life still good']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_6',
    userId: 'user_1',
    name: 'Apple Watch Series 8',
    brand: 'Apple',
    model: 'Series 8',
    category: 'smartwatch' as DeviceCategory,
    purchaseDate: '2022-09-16T00:00:00Z',
    purchasePrice: 399,
    currentValue: 280,
    condition: 'excellent',
    notes: '45mm, GPS + Cellular, always updated',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 399, 1.8),
    recommendation: {
      action: 'sell',
      reason: 'Series 9 offers minor improvements. Trade-in values still good.',
      confidence: 75,
      urgency: 'medium',
      potentialImpact: 80,
      marketInsights: ['Series 9 has better processor', 'Trade-in values declining']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_7',
    userId: 'user_1',
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    model: 'Galaxy S23',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2023-02-17T00:00:00Z',
    purchasePrice: 799,
    currentValue: 650,
    condition: 'excellent',
    notes: '128GB, Phantom Black, used as backup phone',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 1.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'Good backup device. S24 not significantly better.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['S24 offers minor improvements', 'Good for trade-in later']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_8',
    userId: 'user_1',
    name: 'LG OLED C2 55"',
    brand: 'LG',
    model: 'OLED C2 55"',
    category: 'tv' as DeviceCategory,
    purchaseDate: '2022-11-25T00:00:00Z',
    purchasePrice: 1299,
    currentValue: 1100,
    condition: 'excellent',
    notes: '4K OLED, perfect for gaming and movies',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1299, 0.8),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent TV with great value retention. C3 offers minimal improvements.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['OLED technology mature', 'C3 not significantly better']
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },

  // Sarah Johnson's devices
  {
    id: 'device_9',
    userId: 'user_2',
    name: 'iPhone 13',
    brand: 'Apple',
    model: 'iPhone 13',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2021-09-24T00:00:00Z',
    purchasePrice: 699,
    currentValue: 450,
    condition: 'good',
    notes: '128GB, Blue, some minor scratches',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 699, 2.0),
    recommendation: {
      action: 'sell',
      reason: 'iPhone 15 offers significant improvements. Trade-in values are good.',
      confidence: 80,
      urgency: 'high',
      potentialImpact: 200,
      marketInsights: ['iPhone 15 has USB-C', 'Trade-in values up 15%']
    },
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_10',
    userId: 'user_2',
    name: 'MacBook Air M2',
    brand: 'Apple',
    model: 'MacBook Air M2',
    category: 'laptop' as DeviceCategory,
    purchaseDate: '2022-07-15T00:00:00Z',
    purchasePrice: 1199,
    currentValue: 950,
    condition: 'excellent',
    notes: '13-inch, 8GB RAM, 256GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1199, 1.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'M3 Air not significantly better. Great performance for daily use.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['M3 offers minor improvements', 'Battery life excellent']
    },
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_11',
    userId: 'user_2',
    name: 'iPad Air',
    brand: 'Apple',
    model: 'iPad Air',
    category: 'tablet' as DeviceCategory,
    purchaseDate: '2022-03-18T00:00:00Z',
    purchasePrice: 599,
    currentValue: 450,
    condition: 'good',
    notes: 'M1 chip, 64GB, Space Gray',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 599, 1.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'Still excellent performance. M2 Air not worth the sell cost.',
      confidence: 80,
      urgency: 'low',
      marketInsights: ['M2 Air offers minor improvements', 'Current model still fast']
    },
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_12',
    userId: 'user_2',
    name: 'Sony WH-1000XM4',
    brand: 'Sony',
    model: 'WH-1000XM4',
    category: 'headphones' as DeviceCategory,
    purchaseDate: '2021-08-20T00:00:00Z',
    purchasePrice: 349,
    currentValue: 200,
    condition: 'fair',
    notes: 'Great noise cancellation, some wear on ear cups',
    imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 349, 2.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'XM5 offers better comfort and noise cancellation. Consider upgrading.',
      confidence: 70,
      urgency: 'medium',
      potentialImpact: 100,
      marketInsights: ['XM5 has better comfort', 'Trade-in values decent']
    },
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_13',
    userId: 'user_2',
    name: 'Apple Watch SE',
    brand: 'Apple',
    model: 'SE',
    category: 'smartwatch' as DeviceCategory,
    purchaseDate: '2022-09-16T00:00:00Z',
    purchasePrice: 249,
    currentValue: 180,
    condition: 'good',
    notes: '40mm, GPS, good for fitness tracking',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 249, 2.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Good value watch. Series 9 not worth the sell for basic features.',
      confidence: 75,
      urgency: 'low',
      marketInsights: ['SE still good for basic features', 'Battery life excellent']
    },
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },

  // Michael Rodriguez's devices
  {
    id: 'device_14',
    userId: 'user_3',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2023-09-22T00:00:00Z',
    purchasePrice: 1199,
    currentValue: 1100,
    condition: 'excellent',
    notes: '256GB, Natural Titanium, latest model',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1199, 0.3),
    recommendation: {
      action: 'dont_sell',
      reason: 'Latest model with excellent value retention. No need to sell.',
      confidence: 95,
      urgency: 'low',
      marketInsights: ['Latest model', 'Excellent value retention']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_15',
    userId: 'user_3',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    model: 'MacBook Pro 16"',
    category: 'laptop' as DeviceCategory,
    purchaseDate: '2023-01-15T00:00:00Z',
    purchasePrice: 2499,
    currentValue: 2100,
    condition: 'excellent',
    notes: 'M2 Max, 32GB RAM, 1TB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 2499, 0.6),
    recommendation: {
      action: 'dont_sell',
      reason: 'Professional workstation with excellent performance. M3 Max not significantly better.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Professional demand high', 'M3 Max offers minor improvements']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_16',
    userId: 'user_3',
    name: 'iPad Pro 11"',
    brand: 'Apple',
    model: 'iPad Pro 11"',
    category: 'tablet' as DeviceCategory,
    purchaseDate: '2023-05-20T00:00:00Z',
    purchasePrice: 799,
    currentValue: 650,
    condition: 'excellent',
    notes: 'M2 chip, 128GB, with Magic Keyboard',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 1.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent tablet for productivity. M2 chip still very capable.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['M2 still very capable', 'Magic Keyboard adds value']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_17',
    userId: 'user_3',
    name: 'Canon EOS R5',
    brand: 'Canon',
    model: 'EOS R5',
    category: 'camera' as DeviceCategory,
    purchaseDate: '2022-08-10T00:00:00Z',
    purchasePrice: 3899,
    currentValue: 3200,
    condition: 'excellent',
    notes: '45MP full-frame mirrorless, with 24-70mm f/2.8 lens',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 3899, 0.8),
    recommendation: {
      action: 'dont_sell',
      reason: 'Professional camera with excellent image quality. R5 Mark II not expected soon.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Professional cameras dont_sell value', 'R5 Mark II not expected']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_18',
    userId: 'user_3',
    name: 'Samsung QN90A 65"',
    brand: 'Samsung',
    model: 'QN90A 65"',
    category: 'tv' as DeviceCategory,
    purchaseDate: '2022-11-20T00:00:00Z',
    purchasePrice: 1999,
    currentValue: 1600,
    condition: 'excellent',
    notes: '4K QLED, 120Hz, perfect for gaming',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1999, 1.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent gaming TV. QN90C offers minimal improvements.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['Gaming performance excellent', 'QN90C minor improvements']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_19',
    userId: 'user_3',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    model: 'WH-1000XM5',
    category: 'headphones' as DeviceCategory,
    purchaseDate: '2023-03-15T00:00:00Z',
    purchasePrice: 399,
    currentValue: 320,
    condition: 'excellent',
    notes: 'Latest noise-canceling headphones',
    imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 399, 1.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'Latest model with excellent noise cancellation. No sell needed.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Latest model', 'Excellent noise cancellation']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_20',
    userId: 'user_3',
    name: 'Apple Watch Ultra',
    brand: 'Apple',
    model: 'Ultra',
    category: 'smartwatch' as DeviceCategory,
    purchaseDate: '2022-09-23T00:00:00Z',
    purchasePrice: 799,
    currentValue: 650,
    condition: 'excellent',
    notes: 'Titanium case, 49mm, GPS + Cellular',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 1.2),
    recommendation: {
      action: 'dont_sell',
      reason: 'Premium watch with excellent build quality. Ultra 2 offers minor improvements.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['Ultra 2 minor improvements', 'Excellent build quality']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_21',
    userId: 'user_3',
    name: 'PlayStation 5',
    brand: 'Sony',
    model: 'PlayStation 5',
    category: 'gaming' as DeviceCategory,
    purchaseDate: '2022-12-15T00:00:00Z',
    purchasePrice: 499,
    currentValue: 450,
    condition: 'excellent',
    notes: 'Disc version, with extra controller',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 499, 0.8),
    recommendation: {
      action: 'dont_sell',
      reason: 'Current gen console with excellent game library. No sell needed.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Current gen console', 'Excellent game library']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_22',
    userId: 'user_3',
    name: 'Dell XPS 13',
    brand: 'Dell',
    model: 'XPS 13',
    category: 'laptop' as DeviceCategory,
    purchaseDate: '2023-04-10T00:00:00Z',
    purchasePrice: 1299,
    currentValue: 1000,
    condition: 'good',
    notes: 'Intel i7, 16GB RAM, 512GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1299, 1.2),
    recommendation: {
      action: 'dont_sell',
      reason: 'Good laptop but Intel 14th gen offers better performance. Consider upgrading.',
      confidence: 70,
      urgency: 'medium',
      potentialImpact: 150,
      marketInsights: ['Intel 14th gen better performance', 'Trade-in values decent']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_23',
    userId: 'user_3',
    name: 'Samsung Galaxy Tab S9',
    brand: 'Samsung',
    model: 'Galaxy Tab S9',
    category: 'tablet' as DeviceCategory,
    purchaseDate: '2023-08-15T00:00:00Z',
    purchasePrice: 799,
    currentValue: 650,
    condition: 'excellent',
    notes: '11-inch, 128GB, with S Pen',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 1.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Latest Android tablet with excellent performance. No sell needed.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Latest Android tablet', 'Excellent performance']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_24',
    userId: 'user_3',
    name: 'Nikon Z6 II',
    brand: 'Nikon',
    model: 'Z6 II',
    category: 'camera' as DeviceCategory,
    purchaseDate: '2022-06-20T00:00:00Z',
    purchasePrice: 1999,
    currentValue: 1600,
    condition: 'excellent',
    notes: '24MP full-frame mirrorless, with 24-70mm f/4 lens',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1999, 1.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent camera for photography. Z6 III not expected soon.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['Excellent for photography', 'Z6 III not expected']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_25',
    userId: 'user_3',
    name: 'LG C3 48"',
    brand: 'LG',
    model: 'C3 48"',
    category: 'tv' as DeviceCategory,
    purchaseDate: '2023-07-10T00:00:00Z',
    purchasePrice: 1299,
    currentValue: 1100,
    condition: 'excellent',
    notes: '4K OLED, perfect for gaming and movies',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 1299, 0.8),
    recommendation: {
      action: 'dont_sell',
      reason: 'Excellent OLED TV. C4 offers minimal improvements.',
      confidence: 90,
      urgency: 'low',
      marketInsights: ['Excellent OLED TV', 'C4 minimal improvements']
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },

  // Emily Davis's devices
  {
    id: 'device_26',
    userId: 'user_4',
    name: 'iPhone 14',
    brand: 'Apple',
    model: 'iPhone 14',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2022-09-16T00:00:00Z',
    purchasePrice: 799,
    currentValue: 600,
    condition: 'good',
    notes: '128GB, Blue, some minor wear',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 1.5),
    recommendation: {
      action: 'sell',
      reason: 'iPhone 15 offers USB-C and better camera. Trade-in values still good.',
      confidence: 75,
      urgency: 'medium',
      potentialImpact: 120,
      marketInsights: ['iPhone 15 has USB-C', 'Trade-in values good']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_27',
    userId: 'user_4',
    name: 'MacBook Air M1',
    brand: 'Apple',
    model: 'MacBook Air M1',
    category: 'laptop' as DeviceCategory,
    purchaseDate: '2021-11-15T00:00:00Z',
    purchasePrice: 999,
    currentValue: 750,
    condition: 'good',
    notes: '13-inch, 8GB RAM, 256GB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 999, 1.2),
    recommendation: {
      action: 'sell',
      reason: 'M3 Air offers significant performance improvements. Trade-in values are good.',
      confidence: 80,
      urgency: 'high',
      potentialImpact: 200,
      marketInsights: ['M3 Air significant improvements', 'Trade-in values good']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_28',
    userId: 'user_4',
    name: 'iPad mini',
    brand: 'Apple',
    model: 'iPad mini',
    category: 'tablet' as DeviceCategory,
    purchaseDate: '2022-09-20T00:00:00Z',
    purchasePrice: 499,
    currentValue: 380,
    condition: 'excellent',
    notes: 'A15 chip, 64GB, perfect for reading',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 499, 1.5),
    recommendation: {
      action: 'dont_sell',
      reason: 'Perfect size for reading and casual use. No sell needed.',
      confidence: 85,
      urgency: 'low',
      marketInsights: ['Perfect size for reading', 'No sell needed']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_29',
    userId: 'user_4',
    name: 'Bose QuietComfort 45',
    brand: 'Bose',
    model: 'QuietComfort 45',
    category: 'headphones' as DeviceCategory,
    purchaseDate: '2022-05-10T00:00:00Z',
    purchasePrice: 329,
    currentValue: 220,
    condition: 'good',
    notes: 'Excellent noise cancellation, comfortable',
    imageUrl: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 329, 2.0),
    recommendation: {
      action: 'dont_sell',
      reason: 'QC Ultra offers better noise cancellation. Consider upgrading.',
      confidence: 70,
      urgency: 'medium',
      potentialImpact: 80,
      marketInsights: ['QC Ultra better noise cancellation', 'Trade-in values decent']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_30',
    userId: 'user_4',
    name: 'Apple Watch Series 7',
    brand: 'Apple',
    model: 'Series 7',
    category: 'smartwatch' as DeviceCategory,
    purchaseDate: '2021-10-15T00:00:00Z',
    purchasePrice: 399,
    currentValue: 250,
    condition: 'good',
    notes: '45mm, GPS, good condition',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 399, 2.2),
    recommendation: {
      action: 'sell',
      reason: 'Series 9 offers better processor and features. Trade-in values are good.',
      confidence: 75,
      urgency: 'high',
      potentialImpact: 100,
      marketInsights: ['Series 9 better processor', 'Trade-in values good']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'device_31',
    userId: 'user_4',
    name: 'Samsung Galaxy S22',
    brand: 'Samsung',
    model: 'Galaxy S22',
    category: 'phone' as DeviceCategory,
    purchaseDate: '2022-03-15T00:00:00Z',
    purchasePrice: 799,
    currentValue: 500,
    condition: 'fair',
    notes: '128GB, used as backup phone',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    priceHistory: generatePriceHistory(30, 799, 2.0),
    recommendation: {
      action: 'sell',
      reason: 'S24 offers significant improvements. Trade-in values are at peak.',
      confidence: 85,
      urgency: 'high',
      potentialImpact: 150,
      marketInsights: ['S24 significant improvements', 'Trade-in values at peak']
    },
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  }
]

// Demo Recommendations
export const demoRecommendations: Recommendation[] = [
  {
    id: 'rec_1',
    deviceId: 'device_1',
    device: demoDevices[0], // iPhone 14 Pro
    action: 'sell',
    reason: 'New iPhone 15 series released. Trade-in values are at peak.',
    confidence: 85,
    urgency: 'high',
    potentialImpact: 150,
    validUntil: '2024-01-15T00:00:00Z',
    marketInsights: ['iPhone 15 launch driving demand', 'Trade-in values up 20%'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_2',
    deviceId: 'device_9',
    device: demoDevices[8], // iPhone 13
    action: 'sell',
    reason: 'iPhone 15 offers significant improvements. Trade-in values are good.',
    confidence: 80,
    urgency: 'high',
    potentialImpact: 200,
    marketInsights: ['iPhone 15 has USB-C', 'Trade-in values up 15%'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_3',
    deviceId: 'device_3',
    device: demoDevices[2], // iPad Pro 12.9"
    action: 'dont_sell',
    reason: 'New iPad Pro with M2 chip available. Consider upgrading for better performance.',
    confidence: 70,
    urgency: 'medium',
    potentialImpact: 200,
    marketInsights: ['M2 iPad Pro offers significant improvements', 'Trade-in values good'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_4',
    deviceId: 'device_6',
    device: demoDevices[5], // Apple Watch Series 8
    action: 'sell',
    reason: 'Series 9 offers minor improvements. Trade-in values still good.',
    confidence: 75,
    urgency: 'medium',
    potentialImpact: 80,
    marketInsights: ['Series 9 has better processor', 'Trade-in values declining'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_5',
    deviceId: 'device_12',
    device: demoDevices[11], // Sony WH-1000XM4
    action: 'dont_sell',
    reason: 'XM5 offers better comfort and noise cancellation. Consider upgrading.',
    confidence: 70,
    urgency: 'medium',
    potentialImpact: 100,
    marketInsights: ['XM5 has better comfort', 'Trade-in values decent'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_6',
    deviceId: 'device_22',
    device: demoDevices[21], // Dell XPS 13
    action: 'dont_sell',
    reason: 'Intel 14th gen offers better performance. Consider upgrading.',
    confidence: 70,
    urgency: 'medium',
    potentialImpact: 150,
    marketInsights: ['Intel 14th gen better performance', 'Trade-in values decent'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_7',
    deviceId: 'device_26',
    device: demoDevices[25], // iPhone 14
    action: 'sell',
    reason: 'iPhone 15 offers USB-C and better camera. Trade-in values still good.',
    confidence: 75,
    urgency: 'medium',
    potentialImpact: 120,
    marketInsights: ['iPhone 15 has USB-C', 'Trade-in values good'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_8',
    deviceId: 'device_27',
    device: demoDevices[26], // MacBook Air M1
    action: 'sell',
    reason: 'M3 Air offers significant performance improvements. Trade-in values are good.',
    confidence: 80,
    urgency: 'high',
    potentialImpact: 200,
    marketInsights: ['M3 Air significant improvements', 'Trade-in values good'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_9',
    deviceId: 'device_29',
    device: demoDevices[28], // Bose QuietComfort 45
    action: 'dont_sell',
    reason: 'QC Ultra offers better noise cancellation. Consider upgrading.',
    confidence: 70,
    urgency: 'medium',
    potentialImpact: 80,
    marketInsights: ['QC Ultra better noise cancellation', 'Trade-in values decent'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_10',
    deviceId: 'device_30',
    device: demoDevices[29], // Apple Watch Series 7
    action: 'sell',
    reason: 'Series 9 offers better processor and features. Trade-in values are good.',
    confidence: 75,
    urgency: 'high',
    potentialImpact: 100,
    marketInsights: ['Series 9 better processor', 'Trade-in values good'],
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    id: 'rec_11',
    deviceId: 'device_31',
    device: demoDevices[30], // Samsung Galaxy S22
    action: 'sell',
    reason: 'S24 offers significant improvements. Trade-in values are at peak.',
    confidence: 85,
    urgency: 'high',
    potentialImpact: 150,
    marketInsights: ['S24 significant improvements', 'Trade-in values at peak'],
    createdAt: '2023-12-01T00:00:00Z'
  }
]

// Device categories with icons and descriptions
export const deviceCategories = [
  {
    id: 'phone' as DeviceCategory,
    name: 'Smartphone',
    icon: '📱',
    description: 'Mobile phones and smartphones',
    brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi']
  },
  {
    id: 'laptop' as DeviceCategory,
    name: 'Laptop',
    icon: '💻',
    description: 'Portable computers and notebooks',
    brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Microsoft']
  },
  {
    id: 'tablet' as DeviceCategory,
    name: 'Tablet',
    icon: '📱',
    description: 'Tablet computers and iPads',
    brands: ['Apple', 'Samsung', 'Microsoft', 'Amazon', 'Google']
  },
  {
    id: 'camera' as DeviceCategory,
    name: 'Camera',
    icon: '📷',
    description: 'Digital cameras and camcorders',
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic']
  },
  {
    id: 'tv' as DeviceCategory,
    name: 'TV',
    icon: '📺',
    description: 'Televisions and displays',
    brands: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense']
  },
  {
    id: 'headphones' as DeviceCategory,
    name: 'Headphones',
    icon: '🎧',
    description: 'Audio devices and headphones',
    brands: ['Apple', 'Sony', 'Bose', 'Sennheiser', 'JBL']
  },
  {
    id: 'smartwatch' as DeviceCategory,
    name: 'Smartwatch',
    icon: '⌚',
    description: 'Wearable devices and smartwatches',
    brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Google']
  },
  {
    id: 'gaming' as DeviceCategory,
    name: 'Gaming',
    icon: '🎮',
    description: 'Gaming consoles and accessories',
    brands: ['Sony', 'Microsoft', 'Nintendo', 'Steam', 'Razer']
  },
  {
    id: 'other' as DeviceCategory,
    name: 'Other',
    icon: '📱',
    description: 'Other electronic devices',
    brands: ['Various']
  }
]

// Market insights
export const marketInsights = [
  {
    id: 'insight_1',
    title: 'iPhone 15 Launch Impact',
    description: 'The iPhone 15 series launch has created increased demand for older iPhone models, driving up trade-in values by 15-20%.',
    impact: 'high' as const,
    category: 'phone' as DeviceCategory,
    publishedAt: '2023-12-01T00:00:00Z',
    relevantDevices: ['device_1', 'device_9']
  },
  {
    id: 'insight_2',
    title: 'Holiday Season Price Drops',
    description: 'Black Friday and holiday sales are causing temporary price drops on many electronics. Consider waiting for post-holiday stabilization.',
    impact: 'medium' as const,
    category: 'other' as DeviceCategory,
    publishedAt: '2023-11-25T00:00:00Z',
    relevantDevices: []
  },
  {
    id: 'insight_3',
    title: 'M3 MacBook Performance Gains',
    description: 'Early reviews show M3 MacBooks offer 10-15% performance improvements over M2, but not significant enough to justify immediate sells.',
    impact: 'medium' as const,
    category: 'laptop' as DeviceCategory,
    publishedAt: '2023-11-20T00:00:00Z',
    relevantDevices: ['device_2', 'device_10']
  }
]
