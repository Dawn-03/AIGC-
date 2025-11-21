import { Report, UserQuota } from './types';

export const MAX_DAILY_DOWNLOADS = 20;
export const MAX_MONTHLY_DOWNLOADS = 100;

export const INITIAL_QUOTA: UserQuota = {
  dailyDownloads: 0,
  monthlyDownloads: 0,
  lastDownloadDate: new Date().toISOString(),
};

export const MOCK_REPORTS: Report[] = [
  {
    id: 'r-001',
    title: 'Food Ecommerce Consumer Trends 2025',
    category: 'Food & Beverage',
    subCategory: 'Ecommerce',
    uploadDate: '2024-05-20',
    reportDate: '2024-05-01',
    fileName: 'Food_Ecommerce_Trends_2025.pdf',
    dimensions: [
      {
        layer1: 'Market Macro Environment',
        layer2: 'Socio-Cultural',
        layer3: 'Health Awareness',
        dimensionPoint: 'Health literacy and diet attention',
        content: 'Consumers prioritize physical health, also focusing on taste, emotional value, social aspects, and beauty.',
        sourcePage: '16',
      },
      {
        layer1: 'Market Macro Environment',
        layer2: 'Socio-Cultural',
        layer3: 'Consumption Concepts',
        dimensionPoint: 'Skincare concept evolution',
        content: 'Skincare concepts shifting towards scientific precision and efficacy-price ratio.',
        sourcePage: '17',
      },
      {
        layer1: 'Industry Scale',
        layer2: 'Market Share',
        layer3: 'Category Share',
        dimensionPoint: 'Sub-category business share',
        content: '2025 Q1 Sales: Snacks 29%, Grain/Oil 26%, Beverages 27%, Fresh 18%.',
        sourcePage: '3',
      },
      {
        layer1: 'Consumer Insights',
        layer2: 'Demographics',
        layer3: 'Age Distribution',
        dimensionPoint: 'Core age groups',
        content: 'Instant food: 80s (77.8%) and 90s (69.3%) are main consumers. 00s prefer solo dining (68.5%).',
        sourcePage: '8, 11',
      }
    ]
  },
  {
    id: 'r-002',
    title: 'Global Beverage Market Analysis Q2',
    category: 'Food & Beverage',
    subCategory: 'Beverages',
    uploadDate: '2024-06-10',
    reportDate: '2024-06-01',
    fileName: 'Global_Bev_Q2.pdf',
    dimensions: [
      {
        layer1: 'Product Trends',
        layer2: 'Flavor Profiles',
        layer3: 'Exotic Fruits',
        dimensionPoint: 'Yuzu and Dragonfruit popularity',
        content: 'Significant increase in citrus and exotic fruit profiles in sparkling water segment.',
        sourcePage: '4',
      }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Food & Beverage',
  'Electronics',
  'Apparel',
  'Home & Garden',
  'Beauty & Personal Care'
];