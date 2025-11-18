import { SearchItem } from "../data/searchIndex";

// Fuzzy search implementation with scoring
export class SearchEngine {
  private static instance: SearchEngine;
  private searchIndex: SearchItem[] = [];
  
  private constructor() {}
  
  static getInstance(): SearchEngine {
    if (!SearchEngine.instance) {
      SearchEngine.instance = new SearchEngine();
    }
    return SearchEngine.instance;
  }
  
  // Initialize the search index
  setIndex(index: SearchItem[]) {
    this.searchIndex = index;
  }
  
  // Calculate Levenshtein distance for fuzzy matching
  private levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];
    
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[len1][len2];
  }
  
  // Calculate similarity score (0-1, higher is better)
  private calculateSimilarity(str1: string, str2: string): number {
    const maxLen = Math.max(str1.length, str2.length);
    if (maxLen === 0) return 1;
    
    const distance = this.levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    return 1 - distance / maxLen;
  }
  
  // Calculate relevance score for a search item
  private calculateRelevance(item: SearchItem, query: string): number {
    const lowerQuery = query.toLowerCase();
    let score = 0;
    
    // Exact match in title (highest priority)
    if (item.title.toLowerCase().includes(lowerQuery)) {
      score += 100;
    }
    
    // Exact match in keywords
    if (item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))) {
      score += 80;
    }
    
    // Exact match in description
    if (item.description.toLowerCase().includes(lowerQuery)) {
      score += 60;
    }
    
    // Exact match in content
    if (item.content.toLowerCase().includes(lowerQuery)) {
      score += 40;
    }
    
    // Fuzzy match in title
    const titleSimilarity = this.calculateSimilarity(item.title, query);
    if (titleSimilarity > 0.5) {
      score += titleSimilarity * 50;
    }
    
    // Fuzzy match in keywords
    const keywordSimilarities = item.keywords.map(kw => 
      this.calculateSimilarity(kw, query)
    );
    const maxKeywordSimilarity = Math.max(...keywordSimilarities, 0);
    if (maxKeywordSimilarity > 0.5) {
      score += maxKeywordSimilarity * 30;
    }
    
    // Check for partial word matches
    const words = lowerQuery.split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) {
        if (item.title.toLowerCase().includes(word)) score += 20;
        if (item.keywords.some(kw => kw.toLowerCase().includes(word))) score += 15;
        if (item.description.toLowerCase().includes(word)) score += 10;
      }
    });
    
    // Apply priority multiplier
    score *= (item.priority / 5);
    
    return score;
  }
  
  // Main search function
  search(query: string, options: {
    maxResults?: number;
    minScore?: number;
    category?: string;
  } = {}): SearchItem[] {
    const { maxResults = 10, minScore = 10, category } = options;
    
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    // Filter by category if specified
    let items = category 
      ? this.searchIndex.filter(item => item.category === category)
      : this.searchIndex;
    
    // Calculate scores and filter
    const results = items
      .map(item => ({
        item,
        score: this.calculateRelevance(item, query),
      }))
      .filter(result => result.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(result => result.item);
    
    return results;
  }
  
  // Get quick suggestions (faster, less strict)
  getSuggestions(query: string, maxResults: number = 5): SearchItem[] {
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const lowerQuery = query.toLowerCase();
    
    return this.searchIndex
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
        item.description.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.priority - a.priority)
      .slice(0, maxResults);
  }
  
  // Highlight matching text
  highlightMatches(text: string, query: string): string {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-[#00FF88]/30 text-[#00FF88]">$1</mark>');
  }
}

// Export singleton instance
export const searchEngine = SearchEngine.getInstance();
