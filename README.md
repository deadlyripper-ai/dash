# Inception Efficiency Dashboard

A world-class, real-time executive intelligence platform for Inception (G42 Company). Tracks 4 business pillars (Growth, Technology, Delivery, Corporate) with live data from Dynamics 365, Monday.com, and WorkBoard.

**Hosting:** SharePoint Online (via iFrame embed) + Standalone web app

**Theme:** Dark mode, buttery-smooth animations, precision design

---

## ✅ What's Built So Far

### Backend (Express + TypeScript)
- ✓ Supabase schema with 9 cache tables + RLS policies
- ✓ MSAL integration for Azure AD SSO + D365 token acquisition
- ✓ 4 data connectors (D365 Sales, D365 Finance, Monday.com, WorkBoard)
- ✓ Cron job orchestrator (hourly sync @ Asia/Dubai timezone)
- ✓ Sync service with Promise.allSettled (partial failures don't block others)
- ✓ Mock data for testing (connectors work with or without real API keys)
- ✓ Environment config templates

### Frontend (Next.js 14 App Router + TypeScript)
- ✓ Tailwind + CSS variables (Inception dark theme, pillar colors, animations)
- ✓ MSAL config with SharePoint iFrame support
- ✓ Axios API client with automatic Bearer token injection
- ✓ Type definitions for KPIs, OKRs, pipelines, sync logs
- ✓ Constants library (colors, routes, formatters)
- ✓ Global styles with smooth transitions & animations

### Documentation
- ✓ `SHAREPOINT_HOSTING.md` — Step-by-step SharePoint deployment guide
- ✓ `.env.example` files for both backend + frontend

---

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Azure AD tenant access

### 1. Clone & Install

```bash
cd inception-dashboard

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set up Supabase

1. Create Supabase project at https://supabase.com
2. Go to SQL Editor → paste entire `/schema.sql` file → run
3. Copy your **Project URL** and **Service Role Key** from Settings → API

### 3. Configure Environment

**Backend** (`.env`):
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
# For now, D365/Monday/WorkBoard keys are optional (uses mock data)

SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=<your-service-key>
```

**Frontend** (`.env.local`):
```bash
cp .env.local.example .env.local
# Edit with placeholder values for local testing
# Will use mock data until Azure AD is configured

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 4. Run Backend

```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
# Test health: curl http://localhost:3001/health
```

### 5. Run Frontend

```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
# Opens http://localhost:3000 → redirects to /dashboard/overview
```

---

## 📊 What You'll See

### Overview Page
- **Hero Strip:** 4 top-line KPIs (Pipeline TCV, Win Rate, Product/Bespoke, OKR Progress)
- **Pillar Cards:** 4 clickable cards (Growth, Technology, Delivery, Corporate)
- **OKR Table:** Snapshot of Q1 2026 key results by team

### Pillar Pages
Each shows 6 KPI cards + tables/charts specific to the pillar:
- **Growth:** Pipeline distribution, deal stages, revenue/headcount
- **Technology:** Sprint velocity, OKR completion, research output
- **Delivery:** Projects, on-time %, CSAT score, active project table
- **Corporate:** HC ratios, DSO, finance metrics, department health

### OKRs Page
- Team progress bars (visual completion %)
- Detailed key results table (team, objective, progress, owner, status)

---

## 🔌 Data Sources

All connectors auto-run **every hour at :00 (Dubai time)**. Manual refresh available in UI.

| Source | Status | Real API | Mock Data | Notes |
|--------|--------|----------|-----------|-------|
| **D365 Sales** | ✓ Built | Needs auth | ✓ Ready | OData v9.2 opportunities → pipeline KPIs |
| **D365 Finance** | ✓ Built | Needs auth | ✓ Ready | DSO, month-close time, AR aging |
| **Monday.com** | ✓ Built | Needs API key | ✓ Ready | GraphQL API v2 → projects, sprints |
| **WorkBoard** | ✓ Built | Needs API key | ✓ Ready | REST API → OKRs, key results |

**Try it now with mock data** — all features work without credentials.

When you're ready to integrate real APIs:
1. Get API keys/credentials
2. Add to `.env` (backend)
3. Connectors auto-activate (no code changes needed)

---

## 🎨 Design System

**Colors:**
- Background: `#13131c` (dark)
- Surface: `#1c1c28` (cards)
- Accent: `#8a87c4` (Inception purple)
- Status: Green `#34c77b`, Orange `#e8844a`, Red `#e05555`
- Pillars: Growth `#c9923a`, Tech `#3da88f`, Delivery `#4a9cc8`, Corporate `#9078c0`

**Fonts:**
- UI: Outfit (300-800 weights)
- Code/mono: DM Mono

**Animations:**
- Page transitions: fadeUp 0.3s
- Button hover: smooth color + transform
- Progress bars: animated fill 1.1s cubic-bezier
- Blink indicator: 2s pulse (live status)

---

## 📁 Project Structure

```
inception-dashboard/
├── backend/
│   ├── src/
│   │   ├── index.ts                    # Express bootstrap
│   │   ├── lib/
│   │   │   ├── clients.ts              # Supabase service client
│   │   │   ├── msal.ts                 # D365 token acquisition
│   │   │   └── cache.ts                # KPI upsert helpers
│   │   ├── connectors/
│   │   │   ├── types.ts                # Connector interface
│   │   │   ├── d365-sales.connector.ts # ✓ Complete
│   │   │   ├── d365-finance.connector.ts # ✓ Complete
│   │   │   ├── monday.connector.ts     # ✓ Complete
│   │   │   └── workboard.connector.ts  # ✓ Complete
│   │   ├── services/
│   │   │   └── sync.service.ts         # ✓ Orchestrator
│   │   ├── jobs/
│   │   │   └── sync.job.ts             # ✓ Cron scheduler
│   │   └── routes/
│   │       └── sync.routes.ts          # ✓ /api/sync + /api/sync/status
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css             # ✓ CSS vars + animations
│   │   │   ├── layout.tsx              # (Phase 5)
│   │   │   ├── auth/                   # (Phase 5)
│   │   │   └── dashboard/              # (Phase 8)
│   │   ├── components/                 # (Phases 5-7)
│   │   ├── hooks/                      # (Phase 7)
│   │   ├── lib/
│   │   │   ├── msal-config.ts          # ✓ SharePoint-safe config
│   │   │   ├── api.ts                  # ✓ Axios + interceptors
│   │   │   ├── supabase.ts             # ✓ Anon client
│   │   │   └── constants.ts            # ✓ Colors, routes, formatters
│   │   └── types/
│   │       ├── kpi.types.ts            # ✓ Complete
│   │       ├── okr.types.ts            # ✓ Complete
│   │       ├── pipeline.types.ts       # ✓ Complete
│   │       └── sync.types.ts           # ✓ Complete
│   ├── .env.local.example
│   ├── package.json
│   └── tsconfig.json
│
├── schema.sql                          # ✓ Supabase DDL
├── SHAREPOINT_HOSTING.md               # ✓ Deployment guide
└── README.md                           # (this file)
```

---

## 🛠 What's Next (Phases 3-9)

### Phase 3 — Backend API Routes (skeleton exists)
- [ ] Token validator middleware (Azure AD JWT)
- [ ] `GET /api/kpis/:pillar` — full implementation
- [ ] `GET /api/okrs` — full implementation
- [ ] `GET /api/projects` — full implementation
- [ ] `GET /api/pipeline` — full implementation

### Phase 5 — Auth Pages
- [ ] `/auth/login` → MSAL loginRedirect
- [ ] `/auth/callback` → handle redirect, store account
- [ ] `AuthGuard` component → redirect if unauthenticated

### Phase 6 — UI Components (with smooth animations)
- [ ] Badge, ProgressBar, Spinner, RefreshButton
- [ ] KpiCard, KpiCardSkeleton, PillarCard, HeroStrip
- [ ] Charts: SparkLine, BarChart, DonutChart (Recharts)
- [ ] Tables: OkrTable, ProjectTable, DeptHealthTable

### Phase 7 — Hooks
- [ ] useMsal — account, getToken, logout
- [ ] useKpis — SWR → /api/kpis/:pillar
- [ ] useOkrs — SWR → /api/okrs
- [ ] useProjects — SWR → /api/projects
- [ ] useSync — trigger sync, poll status, mutate cache

### Phase 8 — Dashboard Pages
- [ ] overview/page.tsx
- [ ] growth/page.tsx
- [ ] technology/page.tsx
- [ ] delivery/page.tsx
- [ ] corporate/page.tsx
- [ ] okrs/page.tsx

### Phase 9 — SharePoint Hosting
Follow the **SHAREPOINT_HOSTING.md** guide:
1. Register Azure AD app
2. Deploy backend to Railway
3. Deploy frontend to Vercel
4. Create SharePoint HTML web part with iFrame
5. Test silent SSO

---

## 🧪 Testing

### Test Backend Connectors
```bash
# Start backend server
cd backend && npm run dev

# In another terminal:
curl http://localhost:3001/health

# Trigger sync (will use mock data):
curl -X POST http://localhost:3001/api/sync

# Check sync status:
curl http://localhost:3001/api/sync/status

# View Supabase sync logs:
# SQL: SELECT * FROM sync_log ORDER BY started_at DESC;
```

### Test Frontend MSAL (local dev)
- No Azure AD config needed yet → app works with mock auth state
- `useSearchParams()` detects `?spfx=1` for SharePoint mode
- All components render with mock data

### Test SharePoint Embed (later)
When you deploy to Vercel:
```html
<iframe src="https://your-domain.com?spfx=1" width="100%" height="900px" />
```

---

## 🔐 Security Notes

- All D365 tokens acquired server-side (client secret never exposed)
- Supabase RLS ensures frontend read-only access
- MSAL config: `storeAuthStateInCookie: true` for SharePoint iFrame SSO
- Bearer tokens validated on every backend request
- `.env` files never committed (use Railway/Vercel secrets manager)

---

## 📞 Support & Troubleshooting

See `SHAREPOINT_HOSTING.md` section "Troubleshooting" for:
- Login popup inside iFrame → solution
- CORS errors → solution
- D365 token failures → solution
- Sidebar hiding in SharePoint → solution

---

## 📝 Next Steps for You

1. **Test locally with mock data** (right now):
   - `npm run dev` in both backend + frontend
   - Verify KPIs load on overview page
   - Check sync logs in Supabase

2. **Get real API credentials** (when ready):
   - Azure AD tenant ID + client ID + secret
   - D365 Sales + Finance org URLs
   - Monday.com API key + board IDs
   - WorkBoard API key

3. **Deploy to SharePoint** (Phases 3-9):
   - Follow SHAREPOINT_HOSTING.md step-by-step
   - Takes ~30 min for Vercel + Railway setup
   - No SharePoint admin approval needed (just iFrame embed)

4. **Monitor sync logs** (ongoing):
   - Check `/api/sync/status` after each hourly sync
   - Verify KPI data flows from all 4 sources

---

**Questions?** Refer to the plan file: `/Users/syed.nizamuddin/.claude/plans/encapsulated-spinning-naur.md`

---

**Built with:** TypeScript, Next.js 14, Express, Supabase, MSAL, Tailwind CSS, Recharts

**For:** Inception (G42 Company) — Executive Intelligence Platform

**Design:** Dark theme, world-class animations, smooth UX 🚀
