import { supabase, CarbonCreditTransfer } from '@/lib/supabase';

export const transferService = {
  async getAllTransfers(): Promise<CarbonCreditTransfer[]> {
    const { data, error } = await supabase
      .from('carbon_credit_transfers')
      .select('*')
      .order('transfer_date', { ascending: false });

    if (error) {
      console.error('Error fetching transfers:', error);
      throw error;
    }

    return data || [];
  },

  async getTransfersByDevice(deviceId: string): Promise<CarbonCreditTransfer[]> {
    const { data, error } = await supabase
      .from('carbon_credit_transfers')
      .select('*')
      .or(`transferred_by.eq.${deviceId},received_by.eq.${deviceId}`)
      .order('transfer_date', { ascending: false });

    if (error) {
      console.error('Error fetching transfers by device:', error);
      throw error;
    }

    return data || [];
  },

  async getTransfersSentBy(deviceId: string): Promise<CarbonCreditTransfer[]> {
    const { data, error } = await supabase
      .from('carbon_credit_transfers')
      .select('*')
      .eq('transferred_by', deviceId)
      .order('transfer_date', { ascending: false });

    if (error) {
      console.error('Error fetching transfers sent by device:', error);
      throw error;
    }

    return data || [];
  },

  async getTransfersReceivedBy(deviceId: string): Promise<CarbonCreditTransfer[]> {
    const { data, error } = await supabase
      .from('carbon_credit_transfers')
      .select('*')
      .eq('received_by', deviceId)
      .order('transfer_date', { ascending: false });

    if (error) {
      console.error('Error fetching transfers received by device:', error);
      throw error;
    }

    return data || [];
  },

  async createTransfer(transfer: Omit<CarbonCreditTransfer, 'id' | 'transfer_date' | 'created_at'>): Promise<CarbonCreditTransfer> {
    const { data, error } = await supabase
      .from('carbon_credit_transfers')
      .insert(transfer)
      .select()
      .single();

    if (error) {
      console.error('Error creating transfer:', error);
      throw error;
    }

    return data;
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
