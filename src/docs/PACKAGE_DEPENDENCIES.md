# 📦 Supabase Dependencies

## Required Packages

Add these to your `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

## Installation Command

```bash
npm install @supabase/supabase-js
```

or

```bash
yarn add @supabase/supabase-js
```

## Verify Installation

After installing, verify it works:

```typescript
import { createClient } from '@supabase/supabase-js';

console.log('Supabase installed successfully!');
```

## Environment Variables

Create `.env.local` file:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For Vite projects, use `VITE_` prefix.  
For Create React App, use `REACT_APP_` prefix.

## TypeScript Support

Supabase JS includes TypeScript definitions out of the box. No additional `@types/` package needed!

## Optional: Supabase CLI (for advanced usage)

If you want to manage Supabase from command line:

```bash
npm install -g supabase
```

Then:

```bash
supabase login
supabase init
supabase start
```

## Build Configuration

### For Vite

Your `vite.config.ts` should work as-is. Vite automatically loads `.env.local`.

### For Create React App

CRA automatically loads `.env.local` with `REACT_APP_` prefix.

### For Next.js

Next.js automatically loads `.env.local`. No additional config needed.

## Browser Compatibility

Supabase JS works in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Bundle Size

- `@supabase/supabase-js`: ~50KB gzipped
- Tree-shakeable for smaller bundles

## Version Compatibility

This implementation is tested with:
- Supabase JS v2.39.0+
- React 18+
- TypeScript 5+

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"

Solution:
```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### "Environment variables not found"

Solution:
1. Create `.env.local` in project root
2. Restart dev server
3. Check variable prefix (`VITE_` or `REACT_APP_`)

### Module resolution errors

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

## Production Build

Before deploying:

```bash
# Build your app
npm run build

# Set production env variables in your hosting platform:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
```

## Hosting Platforms

### Vercel
Add env variables in: Settings → Environment Variables

### Netlify
Add env variables in: Site settings → Build & deploy → Environment

### AWS Amplify
Add env variables in: App settings → Environment variables

### Render
Add env variables in: Environment → Environment Variables

## CDN Usage (Not Recommended)

If you must use CDN instead of npm:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

But **we recommend npm/yarn** for better TypeScript support and tree-shaking.

---

**Your package dependencies are ready!** Install Supabase and start building. 🚀
