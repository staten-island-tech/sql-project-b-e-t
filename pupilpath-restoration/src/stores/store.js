import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

const session = ref()

export const useSessionStore = defineStore('session', {
  actions: {
    async sessionCheck() {
      supabase.auth.getSession().then(({ data }) => {
        session.value = data.session
      })

      supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session
      })
    }
  }
})

export { session }
