/**
 * Central API layer for zorbit-studio.
 * Abstracts local storage operations so that the frontend can easily scale 
 * to real cloud-based REST endpoints (e.g. Supabase, MongoDB, or FastAPI backend) 
 * without modifying UI components.
 */

// Cloud configuration variables (Configurable via .env file in production)
const CLOUD_CONFIG = {
  ENDPOINT: import.meta.env.VITE_DATABASE_URL || '',
  API_KEY: import.meta.env.VITE_DATABASE_ANON_KEY || '',
  MODE: import.meta.env.VITE_DATABASE_URL ? 'CLOUD_DB_SYNC' : 'LOCAL_STORAGE_FALLBACK'
}

// Log status on init
console.log(`[Zorbit API Service] Initialized in ${CLOUD_CONFIG.MODE} mode.`, {
  endpoint: CLOUD_CONFIG.ENDPOINT ? 'configured' : 'none'
})

// Simulated API latency to mimic real network behavior
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  /**
   * Fetch all inquiry leads
   */
  async getLeads() {
    await delay(300)
    
    // If production endpoint is configured, fetch directly from database API
    if (CLOUD_CONFIG.ENDPOINT) {
      try {
        const response = await fetch(`${CLOUD_CONFIG.ENDPOINT}/rest/v1/leads?select=*&order=id.desc`, {
          headers: {
            'apikey': CLOUD_CONFIG.API_KEY,
            'Authorization': `Bearer ${CLOUD_CONFIG.API_KEY}`
          }
        })
        if (response.ok) {
          return await response.json()
        }
      } catch (err) {
        console.error('Failed to fetch from cloud database. Falling back to local storage cache.', err)
      }
    }

    const saved = localStorage.getItem('zorbitLeads') || localStorage.getItem('zorbit_contact_messages')
    if (!saved) return []
    try {
      return JSON.parse(saved)
    } catch (err) {
      console.error('API service failed to parse leads data', err)
      return []
    }
  },

  /**
   * Submit a new lead
   */
  async createLead(newLead) {
    let serverSuccess = false
    
    // If production endpoint is configured, POST to database API
    if (CLOUD_CONFIG.ENDPOINT) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)
        
        const response = await fetch(`${CLOUD_CONFIG.ENDPOINT}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CLOUD_CONFIG.API_KEY,
            'Authorization': `Bearer ${CLOUD_CONFIG.API_KEY}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(newLead),
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        if (response.ok) {
          serverSuccess = true
        }
      } catch (err) {
        console.warn('API cloud database connection failed. Falling back to local cache.', err)
      }
    } else {
      // Mock secondary server pipeline execution
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 4000)
        
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
          signal: controller.signal
        })
        clearTimeout(timeoutId)
        if (response.ok) {
          serverSuccess = true
        }
      } catch (err) {
        console.warn('API Lead mock server offline, storing locally...', err)
      }
    }

    // Persistence synchronization
    const leads = await this.getLeads()
    // Make sure we don't duplicate if it was already synced to serverless DB
    if (!leads.some(l => l.id === newLead.id)) {
      const updated = [newLead, ...leads]
      localStorage.setItem('zorbitLeads', JSON.stringify(updated))
      localStorage.setItem('zorbit_contact_messages', JSON.stringify(updated))
      return { success: true, serverSynced: serverSuccess, data: updated }
    }

    return { success: true, serverSynced: serverSuccess, data: leads }
  },

  /**
   * Save/Update leads list directly (archiving/deleting in Admin console)
   */
  async updateLeads(updatedLeads) {
    await delay(200)
    
    localStorage.setItem('zorbitLeads', JSON.stringify(updatedLeads))
    localStorage.setItem('zorbit_contact_messages', JSON.stringify(updatedLeads))
    return updatedLeads
  },

  /**
   * Fetch all reviews/testimonials
   */
  async getReviews() {
    await delay(300)
    
    if (CLOUD_CONFIG.ENDPOINT) {
      try {
        const response = await fetch(`${CLOUD_CONFIG.ENDPOINT}/rest/v1/reviews?select=*&order=id.desc`, {
          headers: {
            'apikey': CLOUD_CONFIG.API_KEY,
            'Authorization': `Bearer ${CLOUD_CONFIG.API_KEY}`
          }
        })
        if (response.ok) {
          return await response.json()
        }
      } catch (err) {
        console.error('Failed to fetch reviews from cloud database.', err)
      }
    }

    const saved = localStorage.getItem('zorbit_reviews')
    if (!saved) return []
    try {
      return JSON.parse(saved)
    } catch (err) {
      console.error('API service failed to parse reviews data', err)
      return []
    }
  },

  /**
   * Submit/create a review
   */
  async createReview(newReview) {
    await delay(400)
    
    if (CLOUD_CONFIG.ENDPOINT) {
      try {
        await fetch(`${CLOUD_CONFIG.ENDPOINT}/rest/v1/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CLOUD_CONFIG.API_KEY,
            'Authorization': `Bearer ${CLOUD_CONFIG.API_KEY}`
          },
          body: JSON.stringify(newReview)
        })
      } catch (err) {
        console.warn('API cloud database review insert failed.', err)
      }
    }

    const reviews = await this.getReviews()
    if (!reviews.some(r => r.id === newReview.id)) {
      const updated = [newReview, ...reviews]
      localStorage.setItem('zorbit_reviews', JSON.stringify(updated))
      return updated
    }
    return reviews
  },

  /**
   * Update reviews list directly (approving/moderating in Admin console)
   */
  async updateReviews(updatedReviews) {
    await delay(200)
    
    localStorage.setItem('zorbit_reviews', JSON.stringify(updatedReviews))
    return updatedReviews
  }
}
