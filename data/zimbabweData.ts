
// Sample data for Zimbabwe farming app
export const zimbabweProvinces = [
  'Harare',
  'Bulawayo', 
  'Manicaland',
  'Mashonaland Central',
  'Mashonaland East',
  'Mashonaland West',
  'Masvingo',
  'Matabeleland North',
  'Matabeleland South',
  'Midlands'
];

export const sampleWeatherData = {
  location: 'Harare',
  temperature: 24,
  condition: 'Sunny',
  humidity: 65,
  rainfall: 2.5,
  windSpeed: 12
};

export const sampleCrops = [
  {
    id: '1',
    name: 'Maize',
    plantingMonth: 'Oct-Dec',
    harvestMonth: 'Apr-Jun',
    soilType: 'Clay loam',
    waterRequirement: 'Medium',
    status: 'optimal' as const
  },
  {
    id: '2',
    name: 'Tobacco',
    plantingMonth: 'Sep-Oct',
    harvestMonth: 'Mar-May',
    soilType: 'Sandy loam',
    waterRequirement: 'High',
    status: 'optimal' as const
  },
  {
    id: '3',
    name: 'Cotton',
    plantingMonth: 'Nov-Dec',
    harvestMonth: 'Apr-Jun',
    soilType: 'Well-drained',
    waterRequirement: 'Medium',
    status: 'caution' as const
  },
  {
    id: '4',
    name: 'Soybean',
    plantingMonth: 'Nov-Jan',
    harvestMonth: 'Apr-Jun',
    soilType: 'Fertile loam',
    waterRequirement: 'Medium',
    status: 'optimal' as const
  },
  {
    id: '5',
    name: 'Wheat',
    plantingMonth: 'May-Jul',
    harvestMonth: 'Sep-Nov',
    soilType: 'Clay loam',
    waterRequirement: 'High',
    status: 'not-recommended' as const
  },
  {
    id: '6',
    name: 'Barley',
    plantingMonth: 'May-Jun',
    harvestMonth: 'Sep-Oct',
    soilType: 'Well-drained',
    waterRequirement: 'Medium',
    status: 'caution' as const
  }
];

export const sampleAlerts = [
  {
    id: '1',
    type: 'drought' as const,
    title: 'Drought Warning',
    message: 'Low rainfall expected for the next 2 weeks. Consider water conservation measures.',
    severity: 'medium' as const,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'pest' as const,
    title: 'Fall Armyworm Alert',
    message: 'Fall armyworm activity detected in Mashonaland East. Monitor maize crops closely.',
    severity: 'high' as const,
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'weather' as const,
    title: 'Heavy Rains Expected',
    message: 'Heavy rainfall predicted for this weekend. Prepare drainage systems.',
    severity: 'low' as const,
    timestamp: '3 hours ago'
  }
];

export const soilTypes = [
  'Clay loam',
  'Sandy loam', 
  'Silt loam',
  'Clay',
  'Sandy clay',
  'Well-drained',
  'Fertile loam',
  'Red clay',
  'Black cotton soil'
];

export const agroEcologicalZones = [
  {
    zone: 'Zone I',
    description: 'Specialized and diversified farming',
    rainfall: '1000mm+',
    crops: ['Coffee', 'Tea', 'Dairy farming', 'Forestry']
  },
  {
    zone: 'Zone II',
    description: 'Intensive farming',
    rainfall: '700-1000mm',
    crops: ['Maize', 'Tobacco', 'Cotton', 'Wheat']
  },
  {
    zone: 'Zone III',
    description: 'Semi-intensive farming',
    rainfall: '500-700mm',
    crops: ['Maize', 'Cotton', 'Tobacco', 'Livestock']
  },
  {
    zone: 'Zone IV',
    description: 'Semi-extensive farming',
    rainfall: '450-650mm',
    crops: ['Drought-resistant crops', 'Livestock']
  },
  {
    zone: 'Zone V',
    description: 'Extensive farming',
    rainfall: '<450mm',
    crops: ['Livestock', 'Drought-resistant crops']
  }
];

export const marketPrices = [
  { 
    crop: 'Maize', 
    price: 320, 
    unit: 'USD/tonne', 
    change: '+5%',
    lastUpdated: '2024-01-15',
    market: 'Harare Commodity Exchange',
    trend: 'up' as const
  },
  { 
    crop: 'Tobacco', 
    price: 4200, 
    unit: 'USD/tonne', 
    change: '+12%',
    lastUpdated: '2024-01-15',
    market: 'Tobacco Sales Floor',
    trend: 'up' as const
  },
  { 
    crop: 'Cotton', 
    price: 1800, 
    unit: 'USD/tonne', 
    change: '-3%',
    lastUpdated: '2024-01-15',
    market: 'Cotton Marketing Board',
    trend: 'down' as const
  },
  { 
    crop: 'Soybean', 
    price: 450, 
    unit: 'USD/tonne', 
    change: '+8%',
    lastUpdated: '2024-01-15',
    market: 'Harare Commodity Exchange',
    trend: 'up' as const
  },
  { 
    crop: 'Wheat', 
    price: 380, 
    unit: 'USD/tonne', 
    change: '+2%',
    lastUpdated: '2024-01-15',
    market: 'Grain Marketing Board',
    trend: 'up' as const
  },
  { 
    crop: 'Barley', 
    price: 290, 
    unit: 'USD/tonne', 
    change: '-1%',
    lastUpdated: '2024-01-15',
    market: 'Grain Marketing Board',
    trend: 'down' as const
  }
];

export const extensionServices = [
  {
    id: '1',
    name: 'Harare Agricultural Extension Office',
    province: 'Harare',
    address: '123 Agricultural Drive, Harare',
    phone: '+263 4 123 4567',
    email: 'harare.agritex@gov.zw',
    services: ['Crop advisory', 'Soil testing', 'Pest management', 'Training programs'],
    officer: 'Dr. Mary Chikwanha',
    workingHours: 'Mon-Fri: 8:00 AM - 4:30 PM',
    specialization: ['Maize production', 'Tobacco farming', 'Horticulture']
  },
  {
    id: '2',
    name: 'Mashonaland Central Extension Office',
    province: 'Mashonaland Central',
    address: '456 Farm Road, Bindura',
    phone: '+263 71 234 5678',
    email: 'mashcentral.agritex@gov.zw',
    services: ['Livestock advisory', 'Crop rotation planning', 'Water management', 'Market linkages'],
    officer: 'Mr. James Mutasa',
    workingHours: 'Mon-Fri: 8:00 AM - 4:30 PM',
    specialization: ['Cattle farming', 'Tobacco production', 'Conservation agriculture']
  },
  {
    id: '3',
    name: 'Bulawayo Agricultural Services',
    province: 'Bulawayo',
    address: '789 Industrial Road, Bulawayo',
    phone: '+263 9 345 6789',
    email: 'bulawayo.agritex@gov.zw',
    services: ['Drought management', 'Small grains production', 'Livestock health', 'Irrigation systems'],
    officer: 'Mrs. Nomsa Ndlovu',
    workingHours: 'Mon-Fri: 8:00 AM - 4:30 PM',
    specialization: ['Drought-resistant crops', 'Small livestock', 'Water conservation']
  },
  {
    id: '4',
    name: 'Manicaland Extension Services',
    province: 'Manicaland',
    address: '321 Mountain View, Mutare',
    phone: '+263 20 456 7890',
    email: 'manicaland.agritex@gov.zw',
    services: ['Coffee production', 'Tea farming', 'Forestry', 'Banana cultivation'],
    officer: 'Dr. Peter Mukamuri',
    workingHours: 'Mon-Fri: 8:00 AM - 4:30 PM',
    specialization: ['High-altitude crops', 'Perennial crops', 'Agroforestry']
  }
];

export const cropsCalendar = [
  {
    crop: 'Maize',
    activities: [
      { month: 'September', activity: 'Land preparation', description: 'Clear fields, plough and harrow' },
      { month: 'October', activity: 'Planting', description: 'Plant with first rains, 75cm x 25cm spacing' },
      { month: 'November', activity: 'First weeding', description: 'Weed and apply basal fertilizer' },
      { month: 'December', activity: 'Top dressing', description: 'Apply nitrogen fertilizer' },
      { month: 'January', activity: 'Second weeding', description: 'Weed and monitor for pests' },
      { month: 'February', activity: 'Pest control', description: 'Monitor for fall armyworm and other pests' },
      { month: 'March', activity: 'Pre-harvest', description: 'Monitor crop maturity' },
      { month: 'April', activity: 'Harvesting', description: 'Harvest when moisture content is 12.5%' },
      { month: 'May', activity: 'Post-harvest', description: 'Dry and store properly' }
    ]
  },
  {
    crop: 'Tobacco',
    activities: [
      { month: 'August', activity: 'Seedbed preparation', description: 'Prepare tobacco seedbeds' },
      { month: 'September', activity: 'Seed sowing', description: 'Sow tobacco seeds in seedbeds' },
      { month: 'October', activity: 'Transplanting', description: 'Transplant seedlings to main field' },
      { month: 'November', activity: 'First cultivation', description: 'Weed and apply fertilizer' },
      { month: 'December', activity: 'Topping', description: 'Remove flower heads to promote leaf growth' },
      { month: 'January', activity: 'Suckering', description: 'Remove suckers regularly' },
      { month: 'February', activity: 'Harvesting begins', description: 'Start harvesting bottom leaves' },
      { month: 'March', activity: 'Peak harvesting', description: 'Continue leaf harvesting' },
      { month: 'April', activity: 'Curing', description: 'Cure harvested leaves properly' }
    ]
  },
  {
    crop: 'Cotton',
    activities: [
      { month: 'October', activity: 'Land preparation', description: 'Prepare fields for planting' },
      { month: 'November', activity: 'Planting', description: 'Plant cotton seeds' },
      { month: 'December', activity: 'Thinning', description: 'Thin plants to proper spacing' },
      { month: 'January', activity: 'Weeding', description: 'Weed and apply fertilizer' },
      { month: 'February', activity: 'Pest monitoring', description: 'Monitor for bollworm and other pests' },
      { month: 'March', activity: 'Flowering', description: 'Monitor flowering and boll development' },
      { month: 'April', activity: 'First picking', description: 'Start harvesting mature bolls' },
      { month: 'May', activity: 'Second picking', description: 'Continue harvesting' },
      { month: 'June', activity: 'Final picking', description: 'Complete harvest and prepare for marketing' }
    ]
  }
];

export const soilTypeDescriptions = {
  'Clay loam': {
    description: 'Excellent water retention, good for most crops',
    suitableCrops: ['Maize', 'Wheat', 'Barley'],
    drainageLevel: 'Moderate',
    fertility: 'High'
  },
  'Sandy loam': {
    description: 'Well-draining, easy to work, good for tobacco',
    suitableCrops: ['Tobacco', 'Cotton', 'Groundnuts'],
    drainageLevel: 'Good',
    fertility: 'Medium'
  },
  'Silt loam': {
    description: 'Fertile soil with good moisture retention',
    suitableCrops: ['Soybean', 'Maize', 'Vegetables'],
    drainageLevel: 'Moderate',
    fertility: 'High'
  },
  'Clay': {
    description: 'Heavy soil, excellent for water retention',
    suitableCrops: ['Rice', 'Sugarcane'],
    drainageLevel: 'Poor',
    fertility: 'High'
  },
  'Sandy clay': {
    description: 'Moderate drainage with good nutrient retention',
    suitableCrops: ['Cotton', 'Maize'],
    drainageLevel: 'Moderate',
    fertility: 'Medium'
  },
  'Well-drained': {
    description: 'General well-draining soil suitable for most crops',
    suitableCrops: ['Cotton', 'Barley', 'Wheat'],
    drainageLevel: 'Excellent',
    fertility: 'Medium'
  },
  'Fertile loam': {
    description: 'Ideal soil for most agricultural purposes',
    suitableCrops: ['Soybean', 'Maize', 'Vegetables', 'Tobacco'],
    drainageLevel: 'Good',
    fertility: 'Very High'
  },
  'Red clay': {
    description: 'Iron-rich clay soil, common in Zimbabwe',
    suitableCrops: ['Maize', 'Tobacco'],
    drainageLevel: 'Poor to Moderate',
    fertility: 'Medium to High'
  },
  'Black cotton soil': {
    description: 'Vertisol soil, expands and contracts with moisture',
    suitableCrops: ['Cotton', 'Sorghum', 'Millet'],
    drainageLevel: 'Poor',
    fertility: 'High'
  }
};

export const zimbabweRegions = [
  {
    name: 'Harare Metropolitan',
    provinces: ['Harare'],
    dominantSoils: ['Red clay', 'Clay loam'],
    averageRainfall: '800-1000mm',
    mainCrops: ['Maize', 'Tobacco', 'Horticulture']
  },
  {
    name: 'Mashonaland',
    provinces: ['Mashonaland Central', 'Mashonaland East', 'Mashonaland West'],
    dominantSoils: ['Clay loam', 'Sandy loam', 'Red clay'],
    averageRainfall: '650-1200mm',
    mainCrops: ['Tobacco', 'Maize', 'Cotton', 'Soybean']
  },
  {
    name: 'Matabeleland',
    provinces: ['Matabeleland North', 'Matabeleland South'],
    dominantSoils: ['Sandy clay', 'Clay', 'Black cotton soil'],
    averageRainfall: '400-650mm',
    mainCrops: ['Cotton', 'Sorghum', 'Millet', 'Livestock']
  },
  {
    name: 'Midlands',
    provinces: ['Midlands'],
    dominantSoils: ['Clay loam', 'Sandy loam'],
    averageRainfall: '500-800mm',
    mainCrops: ['Maize', 'Cotton', 'Tobacco']
  },
  {
    name: 'Manicaland',
    provinces: ['Manicaland'],
    dominantSoils: ['Fertile loam', 'Clay loam'],
    averageRainfall: '1000-2000mm',
    mainCrops: ['Coffee', 'Tea', 'Bananas', 'Timber']
  },
  {
    name: 'Masvingo',
    provinces: ['Masvingo'],
    dominantSoils: ['Sandy clay', 'Clay loam'],
    averageRainfall: '450-700mm',
    mainCrops: ['Maize', 'Cotton', 'Livestock']
  }
];
