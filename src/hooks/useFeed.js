import { useState, useEffect, useCallback } from "react"
import { SPILL_FEED } from "../data/mockData"

export function useFeed(category) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadStories = useCallback(async () => {
    try {
      setError(null)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600))
      // Filter by category if needed (for now return all)
      let filtered = [...SPILL_FEED]
      if (category !== "For You") {
        // Simple mock filter – in real app you'd map category to story tags
        filtered = filtered.filter(() => Math.random() > 0.3)
      }
      setStories(filtered)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [category])

  useEffect(() => {
    setLoading(true)
    loadStories()
  }, [loadStories])

  const refresh = useCallback(() => {
    setRefreshing(true)
    loadStories()
  }, [loadStories])

  return { stories, loading, error, refreshing, refresh }
}

export function useTopStories() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchTop() {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        // Import TOP_STORIES from mockData
        const { TOP_STORIES } = await import("../data/mockData")
        // Add summary field if missing (mock)
        const withSummary = TOP_STORIES.map(s => ({
          ...s,
          summary: s.headline.slice(0, 80) + "...",
          created_at: new Date().toISOString(),
        }))
        setStories(withSummary)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTop()
  }, [])

  return { stories, loading, error }
            }
