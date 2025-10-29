import { CarbonCreditTransfer } from '@/lib/types';

const STORAGE_KEY = 'mock:transfers';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

function readStore(): CarbonCreditTransfer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CarbonCreditTransfer[];
  } catch (e) {
    console.error('Failed to read transfers from localStorage', e);
    return [];
  }
}

function writeStore(data: CarbonCreditTransfer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensureSeed() {
  const existing = readStore();
  if (existing.length > 0) return;
  const now = new Date().toISOString();
  const seed: CarbonCreditTransfer[] = Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    transferred_by: `device-${(i % 10) + 1}`,
    received_by: `device-${((i + 3) % 10) + 1}`,
    credit_kg: Math.round((Math.random() * 500 + 10) * 100) / 100,
    transfer_date: now,
    created_at: now
  }));
  writeStore(seed);
}

ensureSeed();

export const transferService = {
  async getAllTransfers(): Promise<CarbonCreditTransfer[]> {
    return readStore().sort((a, b) => (b.transfer_date > a.transfer_date ? 1 : -1));
  },

  async getTransfersByDevice(deviceId: string): Promise<CarbonCreditTransfer[]> {
    return readStore().filter(t => t.transferred_by === deviceId || t.received_by === deviceId).sort((a, b) => (b.transfer_date > a.transfer_date ? 1 : -1));
  },

  async getTransfersSentBy(deviceId: string): Promise<CarbonCreditTransfer[]> {
    return readStore().filter(t => t.transferred_by === deviceId).sort((a, b) => (b.transfer_date > a.transfer_date ? 1 : -1));
  },

  async getTransfersReceivedBy(deviceId: string): Promise<CarbonCreditTransfer[]> {
    return readStore().filter(t => t.received_by === deviceId).sort((a, b) => (b.transfer_date > a.transfer_date ? 1 : -1));
  },

  async createTransfer(transfer: Omit<CarbonCreditTransfer, 'id' | 'transfer_date' | 'created_at'>): Promise<CarbonCreditTransfer> {
    const now = new Date().toISOString();
    const record: CarbonCreditTransfer = {
      ...transfer,
      id: generateId(),
      transfer_date: now,
      created_at: now
    } as CarbonCreditTransfer;
    const data = readStore();
    data.unshift(record);
    writeStore(data);
    return record;
  },

  async getTransferStats(): Promise<{
    totalTransfers: number;
    totalVolume: number;
    uniqueSenders: number;
    uniqueReceivers: number;
  }> {
    const transfers = await this.getAllTransfers();

    const totalTransfers = transfers.length;
    const totalVolume = transfers.reduce((sum, t) => sum + t.credit_kg, 0);
    const uniqueSenders = new Set(transfers.map(t => t.transferred_by)).size;
    const uniqueReceivers = new Set(transfers.map(t => t.received_by)).size;

    return {
      totalTransfers,
      totalVolume,
      uniqueSenders,
      uniqueReceivers
    };
  }
};
