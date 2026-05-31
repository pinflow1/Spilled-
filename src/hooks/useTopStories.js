import { useState, useEffect } from "react"
import { TOP_STORIES } from "../data/mockData"

export function useTopStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTopStories() {
      try {
        // Simulate network delay (remove in production or keep for loading UX)
        await new Promise(resolve => setTimeout(resolve, 400))
        
        // Add summary and time fields if missing from mock data
        const enriched = TOP_STORIES.map(story => ({
          ...story,
          summary: story.summary || story.headline.slice(0, 80) + "...",
          timeAgo: story.timeAgo || `${Math.floor(Math.random() * 5) + 1}h ago`,
          created_at: story.created_at || new Date(Date.now() - Math.random() * 86400000).toISOString(),
        }))
        
        setStories(enriched)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTopStories()
  }, [])

  return { stories, loading, error }
}
