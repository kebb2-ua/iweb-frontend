import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useApiKeyStore = defineStore('apikeys', {
  state: () => ({
    keys: [],
  }),

  actions: {
    async getKeys() {
      const response = await axios.get('/auth/apikey');
      this.keys = response.data;
    },

    async createApiKey() {
      const response = await axios.post('/auth/apikey/create');
      this.keys.push({ publicId: response.data.publicId });
      return response.data.jwt;
    },

    async deleteApiKey(key) {
      const response = await axios.post('/auth/apikey/delete', { publicId: key });
      if (response.status === 200) {
        this.keys = this.keys.filter((k) => k.publicId !== key);
      }
    }
  }
});
