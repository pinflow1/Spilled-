import { useState, useEffect, useCallback } from "react";
import { SPILL_FEED, TOP_STORIES } from "../data/mockData";

export function useFeed(category) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadStories = useCallback(async () => {
    try {
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 600));
      let filtered = [...SPILL_FEED];
      if (category !== "For You") {
        filtered = filtered.filter(() => Math.random() > 0.3);
      }
      setStories(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);

  useEffect(() => {
    setLoading(true);
    loadStories();
  }, [loadStories]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    loadStories();
  }, [loadStories]);

  return { stories, loading, error, refreshing, refresh };
}

export function useTopStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTop() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const enriched = TOP_STORIES.map((story) => ({
          ...story,
          summary: story.summary || story.headline.slice(0, 80) + "...",
          timeAgo: story.timeAgo || `${Math.floor(Math.random() * 5) + 1}h ago`,
          created_at: story.created_at || new Date(Date.now() - Math.random() * 86400000).toISOString(),
        }));
        setStories(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTop();
  }, []);

  return { stories, loading, error };
}
