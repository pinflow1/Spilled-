import { useState, useEffect, useCallback } from 'react'
import supabase from '../lib/supabase'

// ── CATEGORIES MAP ─────────────────────────────────────────────────────────
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

      let query = supabase
        .from("narratives")
        .select("*")
        .in("status", ["emerging", "active"])
        .order("narrative_score", { ascending: false })
        .order("first_seen", { ascending: false })
        .limit(30)

      // Filter by category
      const categoryFilter = CATEGORY_MAP[category]
      if (categoryFilter === "emerging") {
        query = query.eq("status", "emerging")
      } else if (categoryFilter) {
        query = query.ilike("category", `%${categoryFilter}%`)
      }

      const { data, error: fetchErr } = await query
      if (fetchErr) throw fetchErr

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

    // Realtime — push new narratives to feed live
    const channel = supabase
      .channel("narratives_feed")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "narratives",
      }, (payload) => {
        if (["emerging", "active"].includes(payload.new.status)) {
          setStories(prev => [payload.new, ...prev].slice(0, 30))
        }
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "narratives",
      }, (payload) => {
        setStories(prev =>
          prev.map(s => s.id === payload.new.id ? payload.new : s)
            .filter(s => ["emerging", "active"].includes(s.status))
        )
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
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
// Queries narratives table — highest scoring active stories
export function useTopStories(limit = 4) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const { data, error } = await supabase
          .from("narratives")
          .select("*")
          .in("status", ["emerging", "active"])
          .order("narrative_score", { ascending: false })
          .limit(limit)

        if (!error) setStories(data || [])
      } catch (err) {
        console.error("[useTopStories]", err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()

    // Realtime updates for top stories
    const channel = supabase
      .channel("top_stories")
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "narratives",
      }, () => {
        fetch() // refetch on any narrative update
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [limit])

  return { stories, loading }
}

// ── THREAD HOOK ────────────────────────────────────────────────────────────
// Pulls thread posts for a narrative from thread_posts table
export function useThread(narrativeId) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!narrativeId) {
      setLoading(false)
      return
    }

    async function fetch() {
      try {
        const { data, error: fetchErr } = await supabase
          .from("thread_posts")
          .select("*")
          .eq("story_id", narrativeId)
          .order("order_index", { ascending: true })

        if (fetchErr) throw fetchErr
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
      const { data } = await supabase
        .from("saved_stories")
        .select("story_id")
        .eq("user_id", userId)

      setSavedIds(data?.map(s => s.story_id) || [])
      setLoading(false)
    }
    fetch()
  }, [userId])

  const toggleSave = async (storyId) => {
    if (!userId) return
    const isSaved = savedIds.includes(storyId)

    if (isSaved) {
      setSavedIds(prev => prev.filter(id => id !== storyId))
      await supabase.from("saved_stories")
        .delete()
        .eq("user_id", userId)
        .eq("story_id", storyId)
    } else {
      setSavedIds(prev => [...prev, storyId])
      await supabase.from("saved_stories")
        .insert({ user_id: userId, story_id: storyId })
    }
  }

  return { savedIds, toggleSave, loading }
}
