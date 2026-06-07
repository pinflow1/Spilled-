import { useState, useEffect, useCallback } from 'react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const CATEGORY_MAP = {
  "For You":       null,
  "Early Signals": "emerging",
  "Tech":          "tech",
  "Creators":      "creators",
  "Culture":       "celebrity",
  "Business":      "finance",
  "Sports":        "sports",
  "Politics":      "politics",
}

// Direct REST fetch — bypasses SDK entirely
async function fetchNarratives(filters = {}) {
  const params = new URLSearchParams()
  params.set("select", "*")
  params.set("order", "narrative_score.desc,first_seen.desc")
  params.set("limit", "30")

  // Status filter
  if (filters.status) {
    params.set("status", `eq.${filters.status}`)
  } else {
    params.set("status", "in.(emerging,active)")
  }

  // Category filter
  if (filters.category) {
    params.set("category", `ilike.%25${filters.category}%25`)
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/narratives?${params.toString()}`,
    {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status}: ${text}`)
  }

  return res.json()
}

async function fetchThreadPosts(narrativeId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/thread_posts?story_id=eq.${narrativeId}&order=order_index.asc`,
    {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
    }
  )
  if (!res.ok) return []
  return res.json()
}

// ── MAIN FEED HOOK ─────────────────────────────────────────────────────────
export function useFeed(category = "For You") {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStories = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError(null)

      const categoryFilter = CATEGORY_MAP[category]
      const filters = {}

      if (categoryFilter === "emerging") {
        filters.status = "emerging"
      } else if (categoryFilter) {
        filters.category = categoryFilter
      }

      const data = await fetchNarratives(filters)
      setStories(data || [])
    } catch (err) {
      console.error("[useFeed]", err.message)
      setError(err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [category])

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  return {
    stories,
    loading,
    error,
    refreshing,
    refresh: () => fetchStories(true),
  }
}

// ── TOP STORIES HOOK ───────────────────────────────────────────────────────
export function useTopStories(limit = 4) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const data = await fetchNarratives({})
        setStories((data || []).slice(0, limit))
      } catch (err) {
        console.error("[useTopStories]", err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [limit])

  return { stories, loading }
}

// ── THREAD HOOK ────────────────────────────────────────────────────────────
export function useThread(narrativeId) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!narrativeId) { setLoading(false); return }

    async function fetch() {
      try {
        const data = await fetchThreadPosts(narrativeId)
        setPosts(data || [])
      } catch (err) {
        console.error("[useThread]", err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [narrativeId])

  return { posts, loading, error }
}

// ── SAVED STORIES HOOK ─────────────────────────────────────────────────────
export function useSavedStories(userId) {
  const [savedIds, setSavedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }

    async function fetch() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/saved_stories?user_id=eq.${userId}&select=story_id`,
          {
            headers: {
              "apikey": SUPABASE_KEY,
              "Authorization": `Bearer ${SUPABASE_KEY}`,
            },
          }
        )
        const data = await res.json()
        setSavedIds(data?.map(s => s.story_id) || [])
      } catch (err) {
        console.error("[useSavedStories]", err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [userId])

  const toggleSave = async (storyId) => {
    if (!userId) return
    const isSaved = savedIds.includes(storyId)

    if (isSaved) {
      setSavedIds(prev => prev.filter(id => id !== storyId))
      await fetch(`${SUPABASE_URL}/rest/v1/saved_stories?user_id=eq.${userId}&story_id=eq.${storyId}`, {
        method: "DELETE",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` },
      })
    } else {
      setSavedIds(prev => [...prev, storyId])
      await fetch(`${SUPABASE_URL}/rest/v1/saved_stories`, {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, story_id: storyId }),
      })
    }
  }

  return { savedIds, toggleSave, loading }
    }
