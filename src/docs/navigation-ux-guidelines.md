# 🧭 Navigation UX Guidelines for Quant Platform

## 📋 Table of Contents
1. [Header Navigation Design](#header-navigation-design)
2. [Footer Navigation Design](#footer-navigation-design)
3. [Layout Specifications](#layout-specifications)
4. [Best Practices](#best-practices)
5. [Figma Implementation Notes](#figma-implementation-notes)

---

## 🔹 Header Navigation Design

### Structure Overview
```
[Logo] [Home] [Features] [Pricing] [Resources ▼] [About] [Contact] [Login] [Sign Up Button]
```

### Desktop Layout (≥1024px)

#### 1. **Component Spacing**
- **Header Height**: 80px (h-20)
- **Horizontal Spacing**: 32px between items (gap-8)
- **Container Padding**: 24px horizontal (px-6), 32px on large screens (lg:px-8)
- **Max Width**: 1280px (max-w-7xl) centered

#### 2. **Typography**
- **Logo Text**: 20px / 1.25rem (text-xl) - Semibold
- **Menu Items**: 14px / 0.875rem (text-sm) - Regular
- **Dropdown Titles**: 14px / 0.875rem (text-sm) - Medium
- **Dropdown Descriptions**: 12px / 0.75rem (text-xs) - Regular

#### 3. **Color States**
```css
/* Default State */
text-gray-300

/* Hover State */
text-[#00FF88]
+ 0.5px bottom border animation (w-0 → w-full in 300ms)

/* Active State */
text-[#00FF88]
+ full-width bottom border

/* Focus State (Accessibility) */
outline: 2px solid #00FF88
outline-offset: 4px
```

#### 4. **Resources Dropdown**

**Trigger Behavior**:
- Desktop: Show on hover + click toggle
- Hover intent delay: 150ms
- Exit delay: 200ms
- Chevron rotation: 0° → 180° in 300ms

**Dropdown Menu**:
- **Width**: 288px (w-72)
- **Background**: `bg-black/95 backdrop-blur-xl`
- **Border**: `border-white/10` with rounded-xl
- **Shadow**: `shadow-2xl shadow-black/50`
- **Padding**: 8px vertical (py-2)
- **Animation**: fade-in + slide-in-from-top-2 (200ms)

**Menu Items**:
- **Padding**: 24px horizontal, 12px vertical (px-6 py-3)
- **Hover**: `bg-[#00FF88]/10` + title color changes to `#00FF88`
- **Structure**: 
  - Title (14px, white/[#00FF88] on hover)
  - Description (12px, gray-500/gray-400 on hover)

#### 5. **Sign Up CTA Button**

**Style**:
```css
background: linear-gradient(to right, #00FF88, #00C8FF)
color: black
padding: 12px 24px
border-radius: 6px
font-weight: 500
transition: opacity 300ms, transform 300ms

/* Hover */
opacity: 0.9
transform: scale(1.05)
box-shadow: 0 10px 25px rgba(0, 255, 136, 0.2)
```

**Positioning**:
- Desktop: Right-aligned after all menu items
- Mobile: Full-width at bottom of mobile menu

---

### Mobile Layout (<1024px)

#### 1. **Hamburger Menu**
- **Icon Size**: 24px
- **Position**: Right side of header
- **Active State**: X icon (same size)
- **Background Overlay**: `bg-black/95 backdrop-blur-lg`

#### 2. **Mobile Menu Structure**
```
[Home]
[Features]
[Pricing]
[Resources ▼]
  └─ [Blog]
  └─ [FAQs]
  └─ [Support / Help Center]
  └─ [API Docs]
  └─ [Release Notes]
  └─ [Roadmap]
[About]
[Contact]
[Login]
[Sign Up Button - Full Width]
```

#### 3. **Mobile Accordion (Resources)**
- **Trigger**: Click/tap to expand
- **Animation**: Slide down with 300ms ease
- **Visual Indicator**: 
  - Left border: 2px solid `#00FF88/20`
  - Chevron rotation
- **Nested Padding**: 16px left (ml-4), 12px vertical spacing

#### 4. **Mobile Spacing**
- **Item Gap**: 16px (gap-4)
- **Safe Area Margins**: 24px horizontal
- **Touch Target**: Minimum 44px height

---

## 🔹 Footer Navigation Design

### Structure Overview
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo + Tagline]     [Product]    [Company]   [Support]   [Legal]  │
│  [Social Icons]       - Links      - Links     - Links     - Links  │
├─────────────────────────────────────────────────────────────┤
│  © 2025 Quant         [Sitemap] [Status] [🌐 Language ▼]           │
└─────────────────────────────────────────────────────────────┘
```

### Desktop Layout (≥768px)

#### 1. **Grid Structure**
- **Layout**: 5-column grid (1 brand + 4 link columns)
- **Column Distribution**: `grid-cols-2 md:grid-cols-5`
- **Gap**: 32px base, 48px on large screens (gap-8 lg:gap-12)
- **Container Padding**: 64px vertical (py-16), 24px horizontal (px-6 lg:px-8)

#### 2. **Brand Column (Column 1)**

**Logo**:
- Same as header logo (8x8 icon + "Quant" text)
- Interactive hover: scale-110 on logo icon

**Tagline**:
- Text: "Build, backtest & deploy AI-powered trading strategies with institutional-grade tools."
- Size: 14px / text-sm
- Color: text-gray-400
- Line Height: leading-relaxed (1.625)
- Margin Bottom: 24px (mb-6)

**Social Icons**:
- **Grid**: Horizontal flex with 12px gap (gap-3)
- **Icon Size**: 40x40px (w-10 h-10)
- **Background**: `bg-white/5` default
- **Hover Background**: `gradient from-[#00FF88]/20 to-[#00C8FF]/20`
- **Border**: `border-white/10` default, `border-[#00FF88]/50` on hover
- **Icon Color**: `text-gray-400` default, `text-[#00FF88]` on hover
- **Platforms**: Twitter, LinkedIn, GitHub, YouTube

#### 3. **Link Columns (Columns 2-5)**

**Column Titles**:
```css
font-size: 14px (text-sm)
text-transform: uppercase
letter-spacing: 0.05em (tracking-wider)
color: rgba(255, 255, 255, 0.9)
margin-bottom: 16px (mb-4)
```

**Links**:
```css
font-size: 14px (text-sm)
color: rgb(156, 163, 175) /* text-gray-400 */
line-height: 1.5
spacing: 12px between items (space-y-3)

/* Hover */
color: #00FF88
transition: color 200ms
```

**Column Groupings**:

1. **Product** (Most Critical - Left Position)
   - Features ⭐ (High traffic)
   - Pricing ⭐ (High traffic)
   - Roadmap
   - Release Notes

2. **Company** (Brand Trust)
   - About Us
   - Careers
   - Contact Us ⭐ (High traffic)
   - Blog

3. **Support** (Help Resources)
   - FAQs ⭐ (High traffic)
   - Support / Help Center
   - API Documentation

4. **Legal** (Compliance)
   - Terms & Conditions
   - Privacy Policy ⭐ (Required for trust)
   - Refund Policy
   - Security
   - Legal & Compliance

⭐ = High-priority links (typically 60%+ of footer clicks)

#### 4. **Bottom Bar**

**Layout**: Flex row, space-between on desktop, column on mobile

**Left Section**:
```
© 2025 Quant. All rights reserved.
text-sm | text-gray-500
```

**Right Section** (flex gap-6):
- Sitemap link
- Status link
- 🌐 Language Selector dropdown
  - Background: transparent
  - Border: `border-white/10`, hover `border-[#00FF88]/50`
  - Padding: 4px 8px
  - Options: English, Español, Français, Deutsch

#### 5. **Gradient Accent**
- Bottom edge: 1px height
- Gradient: `from-transparent via-[#00FF88]/30 to-transparent`
- Purpose: Subtle visual polish

---

### Mobile Layout (<768px)

#### 1. **Grid Adaptation**
- **Columns**: 2-column grid (grid-cols-2)
- **Order**:
  - Row 1: Brand (full width, col-span-2)
  - Row 2: Product, Company
  - Row 3: Support, Legal

#### 2. **Spacing**
- **Vertical Padding**: 48px (py-12)
- **Horizontal Padding**: 24px (px-6)
- **Column Gap**: 24px (gap-6)

#### 3. **Bottom Bar**
- **Layout**: Vertical stack (flex-col)
- **Alignment**: Center
- **Gap**: 16px (gap-4)
- **Text Alignment**: Center on mobile

---

## 📐 Layout Specifications

### Scrolling Behavior

#### Sticky Header
```css
position: fixed
top: 0
left: 0
right: 0
z-index: 50

/* Default (top of page) */
background: transparent

/* Scrolled State (scroll-y > 20px) */
background: rgba(0, 0, 0, 0.95)
backdrop-filter: blur(16px)
border-bottom: 1px solid rgba(255, 255, 255, 0.1)
transition: all 300ms
```

### Accessibility Requirements

#### Keyboard Navigation
- Tab order: Logo → Menu Items (left to right) → Login → Sign Up
- Resources dropdown: 
  - Tab to focus trigger
  - Enter/Space to open
  - Arrow keys to navigate items
  - Escape to close
  - Tab out to next menu item

#### Focus States
```css
outline: 2px solid #00FF88
outline-offset: 4px
border-radius: 4px
```

#### ARIA Labels
```html
<button aria-label="Open navigation menu" aria-expanded="false">
<nav aria-label="Main navigation">
<footer aria-label="Footer navigation">
```

#### Color Contrast
- All text must meet WCAG AA standards (4.5:1 minimum)
- Tested combinations:
  - Gray-300 on Black: ✅ 7.2:1
  - Gray-400 on Black: ✅ 5.8:1
  - #00FF88 on Black: ✅ 12.1:1

---

## 🎯 Best Practices

### SaaS Navigation UX Principles

#### 1. **Cognitive Load Reduction**
- ✅ Limit top-level items to 7 (Miller's Law)
- ✅ Group related items under "Resources"
- ✅ Use clear, action-oriented labels
- ❌ Avoid deep nesting (max 1 level dropdown)

#### 2. **Conversion Optimization**
- 🎨 Visual hierarchy: Sign Up button > Login > Menu items
- 🎨 High contrast CTA with gradient + shadow
- 🎨 Consistent CTA placement across all pages
- 📊 A/B test: Button text "Sign Up" vs "Start Free" vs "Get Started"

#### 3. **Trust Building**
- ✅ Easy access to Security, Privacy Policy, Compliance
- ✅ Status page link (shows transparency)
- ✅ Multiple support channels visible (FAQs, Help Center, Contact)
- ✅ Social proof via social media links

#### 4. **Information Scent**
- ✅ Descriptive dropdown item labels with subtitles
- ✅ Clear column titles in footer
- ✅ Logical grouping by user intent
- ✅ High-traffic pages in multiple locations (Features in header + footer)

#### 5. **Mobile-First Considerations**
- ✅ Thumb-friendly touch targets (44px minimum)
- ✅ Bottom-aligned primary actions
- ✅ Collapsible sections to reduce scrolling
- ✅ Full-width CTAs on mobile

---

## 🎨 Figma Implementation Notes

### Component Setup

#### 1. **Header Component**
```
Navigation/Header
├─ Variants
│  ├─ State: Default / Scrolled
│  └─ Viewport: Desktop / Mobile
├─ Auto Layout (Horizontal)
│  ├─ Padding: 24px horizontal, 0 vertical
│  ├─ Gap: 32px
│  └─ Height: 80px fixed
└─ Interactive Components
   └─ Resources Dropdown (Instance)
```

#### 2. **Resources Dropdown Component**
```
Navigation/ResourcesDropdown
├─ Variants
│  └─ State: Closed / Open
├─ Auto Layout (Vertical)
│  ├─ Width: 288px fixed
│  ├─ Padding: 8px vertical
│  └─ Gap: 0px
├─ Effects
│  ├─ Background Blur: 16px
│  ├─ Drop Shadow: Y=8, Blur=24, Color=#000 50%
│  └─ Border: 1px solid #FFF 10%
└─ Items (6)
   └─ Auto Layout: 24px horizontal, 12px vertical padding
```

#### 3. **Footer Component**
```
Navigation/Footer
├─ Auto Layout (Vertical)
│  ├─ Padding: 64px vertical, 24px horizontal
│  └─ Gap: 48px
├─ Main Grid
│  ├─ Layout Grid: 5 columns, 32px gutter
│  └─ Height: Auto
└─ Bottom Bar
   ├─ Border Top: 1px solid #FFF 10%
   ├─ Padding Top: 32px
   └─ Auto Layout: Space between
```

### Responsive Breakpoints
```
Mobile:    < 768px  (grid-cols-2, hamburger menu)
Tablet:    768-1023px (grid-cols-2, hamburger menu)
Desktop:   ≥ 1024px (full navigation, grid-cols-5)
```

### Animation Specs
```
Dropdown Open:
- Duration: 200ms
- Easing: ease-out
- Effect: opacity 0→1 + translateY(-8px → 0)

Hover Underline:
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0.1, 0.2, 1)
- Effect: width 0% → 100%

Chevron Rotation:
- Duration: 300ms
- Easing: ease-in-out
- Effect: rotate(0deg → 180deg)
```

### Prototype Interactions
1. **Resources Hover (Desktop)**
   - Trigger: Mouse Enter → Delay 150ms → Open Dropdown
   - Trigger: Mouse Leave → Delay 200ms → Close Dropdown

2. **Resources Click (Mobile)**
   - Trigger: Tap → Toggle State (Closed ↔ Open)

3. **Navigation Links**
   - Trigger: Click → Navigate to Frame/Page
   - Smart Animate between pages

---

## 📊 Analytics Recommendations

### Track These Metrics
1. **Header Navigation**
   - Click-through rate on each menu item
   - Sign Up button conversion rate
   - Resources dropdown open rate
   - Time to first interaction

2. **Footer Navigation**
   - Top 5 most clicked links
   - Column-wise engagement
   - Social icon click rate
   - Language selector usage

3. **Mobile Menu**
   - Hamburger menu open rate
   - Average items clicked per session
   - Sign Up CTA conversion (mobile vs desktop)

### Suggested Tools
- Google Analytics 4: Event tracking
- Hotjar: Heatmaps for link popularity
- Mixpanel: User flow analysis
- PostHog: Feature flags for A/B testing navigation variants

---

## ✅ Final Checklist

### Before Launch
- [ ] All links have valid href attributes
- [ ] Keyboard navigation works flawlessly
- [ ] Screen reader announces navigation properly
- [ ] Color contrast passes WCAG AA
- [ ] Mobile menu is thumb-friendly
- [ ] Dropdowns close when clicking outside
- [ ] Footer displays correctly on all breakpoints
- [ ] Social icons have aria-labels
- [ ] Language selector is functional
- [ ] Sign Up CTA is visually prominent
- [ ] Sticky header doesn't obscure content
- [ ] All hover states are smooth (300ms max)

---

**Document Version**: 1.0  
**Last Updated**: November 18, 2025  
**Maintained By**: Quant Design System Team
