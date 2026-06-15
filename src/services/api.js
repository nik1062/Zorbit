/**
 * central API layer for Zorbit Studio.
 * Abstracts local storage operations so that the frontend can easily scale 
 * to real cloud-based REST endpoints (e.g. Supabase, MongoDB, or FastAPI backend) 
 * without modifying UI components.
 */

// Simulated API latency to mimic real network behavior
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  /**
   * Fetch all inquiry leads
   */
  async getLeads() {
    await delay(300)
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
    // Attempt real HTTP pipeline submit
    let serverSuccess = false
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
      console.warn('API Lead pipeline ingestion endpoint offline, storing locally...', err)
    }

    // Persistence layer synchronization
    const leads = await this.getLeads()
    const updated = [newLead, ...leads]
    localStorage.setItem('zorbitLeads', JSON.stringify(updated))
    localStorage.setItem('zorbit_contact_messages', JSON.stringify(updated))

    return { success: true, serverSynced: serverSuccess, data: updated }
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
    const reviews = await this.getReviews()
    const updated = [newReview, ...reviews]
    localStorage.setItem('zorbit_reviews', JSON.stringify(updated))
    return updated
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
