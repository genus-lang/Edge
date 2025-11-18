# 🔍 Search Feature - Quick Reference Card

## 🚀 Quick Start (30 seconds)

### 1. Open Search
- Press **Cmd/Ctrl + K** or **"/"** key
- Click **Search** in navbar

### 2. Add New Content to Index
```typescript
// Edit: /data/searchIndex.ts
{
  id: "unique-id",
  title: "Your Page Title",
  description: "Brief description",
  content: "Searchable content with keywords",
  category: "Blog" | "Features" | "Docs" | "FAQs" | "Pricing" | "Legal" | "Company" | "Product",
  url: "route-name", // Must match App.tsx routes
  page: "Page Name",
  keywords: ["keyword1", "keyword2"],
  priority: 8, // 1-10, higher = more important
},
```

### 3. Test It
```bash
1. Open website
2. Press Cmd+K
3. Type "pricing"
4. See results instantly
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/data/searchIndex.ts` | **Add content here** |
| `/utils/searchEngine.ts` | Search algorithm (don't touch) |
| `/hooks/useSearch.ts` | Search logic (configure debounce) |
| `/components/search/SearchModal.tsx` | Modal UI (customize design) |
| `/pages/SearchResultsPage.tsx` | Full results page |

---

## ⚙️ Common Customizations

### Change Debounce Delay
```typescript
// /hooks/useSearch.ts line ~50
setTimeout(() => performSearch(...), 300); // Change to 500
```

### Change Max Results
```typescript
// /hooks/useSearch.ts line ~40
getSuggestions(searchQuery, 5); // Change to 10
search(searchQuery, { maxResults: 20 }); // Change to 50
```

### Add Category Icon
```typescript
// /components/search/SearchResultCard.tsx line ~15
case "YourCategory":
  return <YourIcon size={16} className="text-color-400" />;
```

### Change Keyboard Shortcut
```typescript
// /hooks/useSearch.ts line ~70
if (e.key === "/") { // Change to "s" or any key
  e.preventDefault();
  onOpen();
}
```

---

## 🎯 Priority Guide

Set `priority` based on importance:

| Priority | Use For |
|----------|---------|
| 10 | Home, Pricing, Signup |
| 9 | Main Features, About |
| 8 | Key Features, Popular FAQs |
| 7 | Docs, Secondary Pages |
| 6 | Blog Posts, Testimonials |
| 5 | Legal Pages |

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| No results | Check `url` matches route in App.tsx |
| Too many results | Increase `minScore` in searchEngine.ts |
| Search is slow | Reduce `maxResults` or increase debounce delay |
| Modal won't close | Check z-index conflicts |
| Keyboard shortcut doesn't work | Check for conflicting browser extensions |

---

## 📊 Search Index Template

```typescript
// Copy & paste this template
{
  id: "feature-name",
  title: "Feature Title - Key Benefit",
  description: "One sentence explaining what this is and why users care",
  content: "Detailed explanation with keywords users might search for. Include synonyms, common questions, and related terms. Example: backtesting, backtest, historical testing, strategy testing",
  category: "Features",
  url: "features",
  page: "Features",
  keywords: ["main", "keyword", "variations", "synonyms"],
  priority: 8,
},
```

---

## 🎨 Category Colors

Edit in `/components/search/SearchResultCard.tsx`:

```typescript
Blog      → Green   (#00FF88)
Docs      → Blue    (#00C8FF)  
FAQs      → Purple  (#A855F7)
Pricing   → Yellow  (#FACC15)
Legal     → Gray    (#9CA3AF)
Company   → Blue    (#3B82F6)
Product   → Green   (#00FF88)
```

---

## ⌨️ All Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd/Ctrl + K` | Open search |
| `/` | Open search (when not in input) |
| `Esc` | Close search |
| `↑` `↓` | Navigate results (future) |
| `Enter` | Open selected result (future) |
| `Cmd/Ctrl + /` | Toggle filters (future) |

---

## 📱 Mobile UX Notes

- Search button in mobile menu
- Full-screen modal on mobile
- Large touch targets (min 44×44px)
- Swipe down to close (future)
- Voice search button (future)

---

## 🔥 Pro Tips

1. **Use natural language** in descriptions
2. **Add common typos** to keywords
3. **Update index weekly** when adding content
4. **Test with real user queries**
5. **Monitor zero-result searches**
6. **Set priority strategically**

---

## 🚨 Don't Forget

- ✅ Update search index when adding pages
- ✅ Test on mobile after changes
- ✅ Clear browser cache if changes don't appear
- ✅ Add keywords users actually search for
- ✅ Keep descriptions under 160 characters

---

## 📞 Support

**Issue?** Check `/docs/SEARCH_IMPLEMENTATION_GUIDE.md`  
**Bug?** File an issue with search query + expected results  
**Feature request?** Add to roadmap

---

**Last Updated:** $(date)  
**Version:** 1.0.0  
**Next Update:** Add arrow key navigation
