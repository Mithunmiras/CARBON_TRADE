export interface ReadingRow {
  _id: string;
  record_id: string;
  entity_id: string;
  type: string; // 'industry' or 'urban'
  segment: string;
  timestamp: string;
  electricity_kWh: number;
  direct_emission_kg: number;
  emission_from_electricity_kg: number;
  total_emission_kg: number;
  total_emission_tonnes: number;
  carbon_credit_budget_tonnes: number;
  carbon_credit_quality: string;
  location: string;
  region: string;
}

// Selected representative rows from the provided CSV (synthetic dataset)
export const readings: ReadingRow[] = [
  { _id: '69025bb6adbef71ca8f2269e', record_id: '96aa5908', entity_id: '754b0b', type: 'industry', segment: 'small_industry', timestamp: '2025-09-29', electricity_kWh: 17579.54, direct_emission_kg: 343.5, emission_from_electricity_kg: 14415.22, total_emission_kg: 14758.72, total_emission_tonnes: 14.7587, carbon_credit_budget_tonnes: 37.5, carbon_credit_quality: 'Low', location: 'Pune', region: 'industrial zone' },
  { _id: '69025bb6adbef71ca8f2269f', record_id: '49e6d11c', entity_id: '4f266b', type: 'industry', segment: 'medium_industry', timestamp: '2025-09-29', electricity_kWh: 11908.35, direct_emission_kg: 222.66, emission_from_electricity_kg: 9764.85, total_emission_kg: 9987.51, total_emission_tonnes: 9.9875, carbon_credit_budget_tonnes: 183.33, carbon_credit_quality: 'Low', location: 'Chennai', region: 'industrial zone' },
  { _id: '69025bb6adbef71ca8f226a0', record_id: 'ee83da75', entity_id: '22b74a', type: 'industry', segment: 'small_industry', timestamp: '2025-09-29', electricity_kWh: 21413.72, direct_emission_kg: 495.13, emission_from_electricity_kg: 17559.25, total_emission_kg: 18054.38, total_emission_tonnes: 18.0544, carbon_credit_budget_tonnes: 37.5, carbon_credit_quality: 'Low', location: 'Delhi', region: 'industrial zone' },
  { _id: '69025bb6adbef71ca8f226a5', record_id: 'a2536738', entity_id: 'eb769e', type: 'industry', segment: 'large_industry', timestamp: '2025-09-29', electricity_kWh: 9966.27, direct_emission_kg: 225.5, emission_from_electricity_kg: 8172.34, total_emission_kg: 8397.84, total_emission_tonnes: 8.3978, carbon_credit_budget_tonnes: 625.0, carbon_credit_quality: 'High', location: 'Mumbai', region: 'industrial zone' },
  { _id: '69025bb6adbef71ca8f226a9', record_id: '85b6f6a4', entity_id: '49c705', type: 'industry', segment: 'large_industry', timestamp: '2025-09-29', electricity_kWh: 18612.48, direct_emission_kg: 336.65, emission_from_electricity_kg: 15262.23, total_emission_kg: 15598.88, total_emission_tonnes: 15.5989, carbon_credit_budget_tonnes: 625.0, carbon_credit_quality: 'Medium', location: 'Bangalore', region: 'industrial zone' },
  // Urban/home examples
  { _id: '69025bb6adbef71ca8f226d0', record_id: '9919015b', entity_id: 'ef3d68', type: 'urban', segment: 'high_income_home', timestamp: '2025-09-29', electricity_kWh: 33.57, direct_emission_kg: 0.0, emission_from_electricity_kg: 27.53, total_emission_kg: 27.53, total_emission_tonnes: 0.0275, carbon_credit_budget_tonnes: 1.25, carbon_credit_quality: 'Medium', location: 'Delhi', region: 'urban zone' },
  { _id: '69025bb6adbef71ca8f226d1', record_id: 'c8d6a848', entity_id: '2a0010', type: 'urban', segment: 'low_income_home', timestamp: '2025-09-29', electricity_kWh: 17.2, direct_emission_kg: 0.0, emission_from_electricity_kg: 14.1, total_emission_kg: 14.1, total_emission_tonnes: 0.0141, carbon_credit_budget_tonnes: 0.33, carbon_credit_quality: 'Low', location: 'Chennai', region: 'urban zone' },
  { _id: '69025bb6adbef71ca8f226e9', record_id: '49726ac1', entity_id: 'd0f68c', type: 'urban', segment: 'middle_class_home', timestamp: '2025-09-29', electricity_kWh: 15.92, direct_emission_kg: 0.0, emission_from_electricity_kg: 13.05, total_emission_kg: 13.05, total_emission_tonnes: 0.0131, carbon_credit_budget_tonnes: 0.67, carbon_credit_quality: 'Medium', location: 'Mumbai', region: 'urban zone' },
  { _id: '69025bb6adbef71ca8f226ef', record_id: '6da094a0', entity_id: '875d80', type: 'urban', segment: 'low_income_home', timestamp: '2025-09-29', electricity_kWh: 57.38, direct_emission_kg: 0.0, emission_from_electricity_kg: 47.05, total_emission_kg: 47.05, total_emission_tonnes: 0.047, carbon_credit_budget_tonnes: 0.33, carbon_credit_quality: 'Low', location: 'Bangalore', region: 'urban zone' }
];
