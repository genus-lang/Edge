import { useState, useEffect, useCallback, useRef } from "react";
import { SearchItem, SEARCH_INDEX } from "../data/searchIndex";
import { searchEngine } from "../utils/searchEngine";

// Initialize search engine on first use
searchEngine.setIndex(SEARCH_INDEX);

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  
  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Debounced search function
  const performSearch = useCallback((searchQuery: string, category?: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setSuggestions([]);
      return;
    }
    
    setIsSearching(true);
    
    // Get suggestions (fast)
    const quickSuggestions = searchEngine.getSuggestions(searchQuery, 5);
    setSuggestions(quickSuggestions);
    
    // Get full results (more thorough)
    const searchResults = searchEngine.search(searchQuery, {
      maxResults: 20,
      minScore: 10,
      category,
    });
    setResults(searchResults);
    setIsSearching(false);
  }, []);
  
  // Debounced query change handler
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new debounce timer (300ms delay)
    debounceTimer.current = setTimeout(() => {
      performSearch(newQuery, selectedCategory);
    }, 300);
  }, [performSearch, selectedCategory]);
  
  // Immediate search (no debounce) - for enter key or button click
  const immediateSearch = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    performSearch(query, selectedCategory);
  }, [query, selectedCategory, performSearch]);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
    setSelectedCategory(undefined);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  
  return {
    query,
    results,
    suggestions,
    isSearching,
    selectedCategory,
    setQuery: handleQueryChange,
    setSelectedCategory,
    immediateSearch,
    clearSearch,
    highlightMatches: (text: string) => searchEngine.highlightMatches(text, query),
  };
}

// Hook for keyboard shortcuts
export function useSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
      
      // Also support "/" key (common in many apps)
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        onOpen();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}
