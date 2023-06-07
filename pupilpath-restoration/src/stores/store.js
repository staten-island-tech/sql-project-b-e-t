import { defineStore } from 'pinia'
// import { ref } from 'vue'
import { supabase } from '../supabase'

// const session = ref()

export const useSessionStore = defineStore('session', {
  state: () => ({
    session: false
  }),
  actions: {
    async sessionCheck() {
      supabase.auth.getSession().then(({ data }) => {
        this.session = data.session
      })

      supabase.auth.onAuthStateChange((_, _session) => {
        this.session = _session
      })
    }
  }
})
