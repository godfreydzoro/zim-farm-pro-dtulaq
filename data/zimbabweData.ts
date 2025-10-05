
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
  { crop: 'Maize', price: 320, unit: 'USD/tonne', change: '+5%' },
  { crop: 'Tobacco', price: 4200, unit: 'USD/tonne', change: '+12%' },
  { crop: 'Cotton', price: 1800, unit: 'USD/tonne', change: '-3%' },
  { crop: 'Soybean', price: 450, unit: 'USD/tonne', change: '+8%' },
  { crop: 'Wheat', price: 380, unit: 'USD/tonne', change: '+2%' }
];
