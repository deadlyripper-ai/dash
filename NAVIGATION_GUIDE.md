# Navigation Guide — Inception Efficiency Dashboard

## ✅ Fixed: Multi-Page Routing

All navigation is now working correctly with Next.js 14 App Router.

### Route Structure

```
/app/
├── layout.tsx                              (Root layout)
├── page.tsx                                (Redirects to /dashboard/overview)
└── dashboard/
    ├── layout.tsx                          (Sidebar + Topbar wrapper)
    ├── overview/page.tsx                   (Overview page)
    ├── growth/page.tsx                     (Growth Pillar)
    ├── technology/page.tsx                 (Technology Pillar)
    ├── delivery/page.tsx                   (Delivery Pillar)
    ├── corporate/page.tsx                  (Corporate Pillar)
    └── okrs/page.tsx                       (OKR Progress)
```

### Sidebar Navigation Links

The sidebar in `dashboard/layout.tsx` has 6 navigation items with proper `next/link` href routing:

| Nav Item | Route | Page |
|----------|-------|------|
| 📊 Overview | `/dashboard/overview` | Company-wide overview with hero strip, pillar cards, OKR table |
| 📈 Growth | `/dashboard/growth` | Growth pillar with pipeline, weighted pipeline, win rate KPIs |
| ⚙️ Technology | `/dashboard/technology` | Tech pillar with product/bespoke, sprint velocity, sci OKR rate |
| 🚀 Delivery | `/dashboard/delivery` | Delivery pillar with projects/person, on-time %, CSAT score |
| 💼 Corporate | `/dashboard/corporate` | Corporate pillar with HC ratio, revenue/HC, attrition rate + dept health table |
| 🎯 OKRs | `/dashboard/okrs` | OKR progress with team breakdown, key results detail table |

### How It Works

1. **Root Page** (`/`) → Redirects to `/dashboard/overview`
2. **Dashboard Layout** wraps all `/dashboard/*` routes with sidebar + topbar
3. **Active Link Detection** uses `usePathname()` to highlight current page in sidebar
4. **Page Navigation** via `next/link` — clicking sidebar items navigates to new pages

### Testing Navigation

Open http://localhost:3000 and you should:

1. ✅ See redirect to `/dashboard/overview`
2. ✅ See sidebar with 6 nav items
3. ✅ See "Overview" highlighted in sidebar
4. ✅ Click "Growth" → page changes, Growth is now highlighted
5. ✅ Click "Technology" → page changes, Technology is now highlighted
6. ✅ Continue through all 6 pages
7. ✅ Each page displays its pillar-specific KPI cards

### Styling & Theme

- **Dark Theme**: `#13131C` background, `#0E0E16` sidebar
- **Text Colors**: `#F0F0F6` for headings, `#9898B0` for descriptions
- **Status Colors**:
  - 🟢 On Track: `#34C77B` (green)
  - 🟠 At Risk: `#E8844A` (orange)
  - 🔴 Off Track: `#E05555` (red)
- **Pillar Colors** (top border bars):
  - Growth: `#C9923A` (gold)
  - Technology: `#3DA88F` (teal)
  - Delivery: `#4A9CC8` (blue)
  - Corporate: `#9078C0` (purple)

### Data Indicators

- Each metric shows status with colored border top
- Progress bars animate on load with cubic-bezier easing
- All tables use the same styling for consistency

---

## 📋 Checklist for Verification

- [ ] Navigate to http://localhost:3000
- [ ] Confirm redirect to `/dashboard/overview`
- [ ] Sidebar visible with logo and 6 nav items
- [ ] Overview page displays hero strip (4 KPIs) + pillar cards + OKR table
- [ ] Click "Growth" → page changes, Growth page displays
- [ ] Click "Technology" → page changes, Technology page displays
- [ ] Click "Delivery" → page changes, Delivery page displays
- [ ] Click "Corporate" → page changes, Corporate page displays (HC table)
- [ ] Click "OKRs" → page changes, OKRs page displays (team progress + KR table)
- [ ] Click "Overview" again → back to Overview page
- [ ] Animations smooth, no console errors

---

## 🚀 Next Steps

After testing navigation:

1. **Connect Real Data**: Hook up API endpoints to populate KPI cards
2. **Add Refresh Button**: Manual sync trigger in topbar
3. **Implement Auth**: MSAL login + session management
4. **Deploy to SharePoint**: Configure iFrame embedding + Azure AD SSO
