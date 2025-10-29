import { supabase, EmissionRecord } from '@/lib/supabase';

export const emissionService = {
  async getAllEmissions(): Promise<EmissionRecord[]> {
    const { data, error } = await supabase
      .from('emission_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emissions:', error);
      throw error;
    }

    return data || [];
  },

  async getEmissionsByHomeId(homeId: string): Promise<EmissionRecord[]> {
    const { data, error } = await supabase
      .from('emission_records')
      .select('*')
      .eq('home_id', homeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emissions by home_id:', error);
      throw error;
    }

    return data || [];
  },

  async getEmissionsByCluster(cluster: string): Promise<EmissionRecord[]> {
    const { data, error } = await supabase
      .from('emission_records')
      .select('*')
      .eq('cluster', cluster)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emissions by cluster:', error);
      throw error;
    }

    return data || [];
  },

  async getEmissionByDeviceId(deviceId: string): Promise<EmissionRecord | null> {
    const { data, error } = await supabase
      .from('emission_records')
      .select('*')
      .eq('device_id', deviceId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching emission by device_id:', error);
      throw error;
    }

    return data;
  },

  async createEmission(emission: Omit<EmissionRecord, 'id' | 'created_at' | 'updated_at'>): Promise<EmissionRecord> {
    const { data, error } = await supabase
      .from('emission_records')
      .insert(emission)
      .select()
      .single();

    if (error) {
      console.error('Error creating emission:', error);
      throw error;
    }

    return data;
  },

  async updateEmission(deviceId: string, updates: Partial<EmissionRecord>): Promise<EmissionRecord> {
    const { data, error } = await supabase
      .from('emission_records')
      .update(updates)
      .eq('device_id', deviceId)
      .select()
      .single();

    if (error) {
      console.error('Error updating emission:', error);
      throw error;
    }

    return data;
  },

  async deleteEmission(deviceId: string): Promise<void> {
    const { error } = await supabase
      .from('emission_records')
      .delete()
      .eq('device_id', deviceId);

    if (error) {
      console.error('Error deleting emission:', error);
      throw error;
    }
  }
};
