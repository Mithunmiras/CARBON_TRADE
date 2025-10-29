import { EmissionRecord } from '@/lib/types';

// Simple localStorage-backed mock store for the frontend-only mode.
const STORAGE_KEY = 'mock:emissions';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function readStore(): EmissionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EmissionRecord[];
  } catch (e) {
    console.error('Failed to read emissions from localStorage', e);
    return [];
  }
}

function writeStore(data: EmissionRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Seed with some synthetic data if empty
function ensureSeed() {
  const existing = readStore();
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const seed: EmissionRecord[] = Array.from({ length: 30 }).map((_, i) => ({
    id: generateId(),
    cluster: i % 3 === 0 ? 'urban' : i % 3 === 1 ? 'suburban' : 'industry',
    home_id: i % 5 === 0 ? 'industry' : 'home',
    device_id: `device-${i + 1}`,
    emission_kg: Math.round((Math.random() * 200 + (i % 5 === 0 ? 400 : 20)) * 100) / 100,
    credits_signed: Math.floor(Math.random() * 50),
    created_at: now,
    updated_at: now
  }));
  writeStore(seed);
}

ensureSeed();

export const emissionService = {
  async getAllEmissions(): Promise<EmissionRecord[]> {
    return readStore().sort((a, b) => (b.created_at > a.created_at ? 1 : -1));
  },

  async getEmissionsByHomeId(homeId: string): Promise<EmissionRecord[]> {
    return readStore().filter(r => r.home_id === homeId).sort((a, b) => (b.created_at > a.created_at ? 1 : -1));
  },

  async getEmissionsByCluster(cluster: string): Promise<EmissionRecord[]> {
    return readStore().filter(r => r.cluster === cluster).sort((a, b) => (b.created_at > a.created_at ? 1 : -1));
  },

  async getEmissionByDeviceId(deviceId: string): Promise<EmissionRecord | null> {
    return readStore().find(r => r.device_id === deviceId) || null;
  },

  async createEmission(emission: Omit<EmissionRecord, 'id' | 'created_at' | 'updated_at'>): Promise<EmissionRecord> {
    const now = new Date().toISOString();
    const record: EmissionRecord = {
      ...emission,
      id: generateId(),
      created_at: now,
      updated_at: now
    } as EmissionRecord;
    const data = readStore();
    data.unshift(record);
    writeStore(data);
    return record;
  },

  async updateEmission(deviceId: string, updates: Partial<EmissionRecord>): Promise<EmissionRecord> {
    const data = readStore();
    const idx = data.findIndex(r => r.device_id === deviceId);
    if (idx === -1) throw new Error('Emission record not found');
    const updated = { ...data[idx], ...updates, updated_at: new Date().toISOString() } as EmissionRecord;
    data[idx] = updated;
    writeStore(data);
    return updated;
  },

  async deleteEmission(deviceId: string): Promise<void> {
    const data = readStore();
    const filtered = data.filter(r => r.device_id !== deviceId);
    writeStore(filtered);
  }
};
