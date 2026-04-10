# Inception Efficiency Dashboard — SharePoint Hosting Guide

## Overview

The dashboard can run **in SharePoint** in two ways:

1. **iFrame Embed (Recommended for speed & flexibility)** — Host the Next.js app on a separate server (Vercel/Railway), embed as iFrame in SharePoint
2. **SPFX Web Part (Native integration)** — Bundle as SharePoint Framework web part, deploy to SharePoint App Catalog

**For your use case**, we recommend **iFrame embed** because:
- Updates deploy instantly without SharePoint admin approval
- Full Next.js capabilities (API routes, SSR, App Router)
- Zero SharePoint dev ops overhead
- Seamless Azure AD SSO (same tenant)

---

## Architecture: iFrame + Azure AD SSO

```
SharePoint Page
    ↓ (iframe src="https://your-dashboard-domain.com?spfx=1")
Next.js Frontend (Vercel/Railway)
    ↓ (Bearer token + auto-SSO)
Express Backend (Railway)
    ↓
Supabase + D365 + Monday + WorkBoard
```

When a user opens the SharePoint page:
1. SharePoint loads your page
2. iFrame loads Next.js dashboard with `?spfx=1` flag
3. MSAL tries `acquireTokenSilent()` — succeeds because user is already logged into SharePoint/Azure AD
4. Dashboard renders with live data, **zero login prompts**

---

## Step-by-Step Deployment

### Step 1: Register Azure AD App (if not already done)

1. **Azure Portal** → Azure Active Directory → App registrations
2. **New registration**:
   - Name: `Inception Efficiency Dashboard`
   - Redirect URI: `https://your-domain.com/auth/callback`
   - Also add: `https://your-domain.com/auth/callback?spfx=1` (for SharePoint redirect)

3. **Expose an API** tab:
   - Add Scope: `Dashboard.Read`
   - Scope ID: Auto-generated, copy it

4. **API Permissions**:
   - Add `Microsoft Graph` → `User.Read` (for profile info)
   - Add `Dynamics 365 Online` → `user_impersonation` (for D365 SSO)
   - Grant admin consent

5. **Certificates & secrets**:
   - Create new client secret (for backend)
   - Copy: **Tenant ID**, **Client ID**, **Client Secret**

### Step 2: Deploy Frontend to Vercel

```bash
cd inception-dashboard/frontend
npm install
npm run build
vercel deploy --prod
```

**During Vercel setup**, set environment variables:
```
NEXT_PUBLIC_AZURE_TENANT_ID=<your-tenant-id>
NEXT_PUBLIC_AZURE_CLIENT_ID=<your-client-id>
NEXT_PUBLIC_REDIRECT_URI=https://your-vercel-domain.vercel.app/auth/callback
NEXT_PUBLIC_API_BASE_URL=https://your-railway-backend.railway.app
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Result: `https://inception-dashboard.vercel.app`

### Step 3: Deploy Backend to Railway

```bash
cd inception-dashboard/backend
npm install

# Link to Railway
railway login
railway init
railway up
```

**In Railway dashboard**, set environment variables:
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-service-key>
AZURE_TENANT_ID=<your-tenant-id>
AZURE_CLIENT_ID=<your-client-id>
AZURE_CLIENT_SECRET=<your-secret>
D365_SALES_ORG=your-crm-org
D365_SALES_BASE_URL=https://your-crm-org.crm.dynamics.com
MONDAY_API_KEY=<your-monday-key>
WORKBOARD_API_KEY=<your-workboard-key>
FRONTEND_URL=https://inception-dashboard.vercel.app
```

Result: `https://inception-api.railway.app`

### Step 4: Deploy Supabase Schema

1. **Supabase dashboard** → SQL editor
2. Copy entire `/schema.sql` file
3. Run it to create all tables

### Step 5: Create SharePoint Web Part (Simple HTML)

In your **SharePoint site**:

1. **Create a new page** (or edit existing)
2. **Add "HTML Web Part"** component
3. Paste this code:

```html
<div id="inception-dashboard">
  <style>
    #inception-iframe {
      width: 100%;
      height: 100vh;
      border: none;
      border-radius: 8px;
    }
    body { margin: 0; padding: 0; }
  </style>
  <iframe
    id="inception-iframe"
    src="https://inception-dashboard.vercel.app?spfx=1&theme=dark"
    allow="clipboard-write"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-modals"
  ></iframe>
</div>
```

4. **Save & publish** the page

### Step 6: Test the Integration

1. **Open the SharePoint page** in Microsoft Edge/Chrome
2. You should **NOT** see a login screen (silent SSO)
3. Dashboard loads with your Azure AD user identity
4. Verify KPIs populate from backend

If you **do** see a login popup:
- Check `NEXT_PUBLIC_REDIRECT_URI` matches Azure AD app config
- Verify `storeAuthStateInCookie: true` in MSAL config
- Try **Incognito window** first (clean cookies)

---

## Alternative: SPFX Web Part (Advanced)

If you need **native SharePoint integration** (notifications, search, offline):

```bash
yo @microsoft/sharepoint
# Select React + TypeScript

# Install our dashboard as dependency
npm install ../inception-dashboard-frontend

# Create web part that wraps iFrame
```

This adds 2-3 days of SPFX dev work. **Not recommended** unless you need SharePoint-specific features.

---

## Troubleshooting

### **Issue: Login popup appears inside iFrame**

**Solution**: MSAL detected cross-origin context and can't use silent flow.

- Check: `allowRedirectInIframe: true` in `msal-config.ts` ✓
- Check: `storeAuthStateInCookie: true` ✓
- Ensure iframe `sandbox` includes `allow-popups` ✓
- Vercel domain must be **whitelisted in Azure AD** as redirect URI

### **Issue: CORS error when fetching KPIs**

**Solution**: Backend CORS misconfigured.

Edit `/backend/src/index.ts`:
```typescript
app.use(cors({
  origin: ['https://inception-dashboard.vercel.app', 'https://*.sharepoint.com'],
  credentials: true,
}))
```

### **Issue: D365 tokens fail (401 Unauthorized)**

**Solution**: Client credentials not working.

- Verify `AZURE_CLIENT_SECRET` is set in Railway
- Check Azure AD app has **`Dynamics 365 Online`** API permission + admin consent
- Test with: `POST https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token`

### **Issue: `?spfx=1` doesn't hide the sidebar**

**Solution**: Make sure `dashboard/layout.tsx` reads the query param:

```typescript
'use client'
import { useSearchParams } from 'next/navigation'

export default function DashboardLayout() {
  const searchParams = useSearchParams()
  const isEmbedded = searchParams.get('spfx') === '1'

  return (
    <div className="flex">
      {!isEmbedded && <Sidebar />}  {/* Hidden in SharePoint */}
      <main className={isEmbedded ? 'w-full' : 'flex-1'}>
        {children}
      </main>
    </div>
  )
}
```

---

## Post-Deployment Checklist

- [ ] Vercel domain is HTTPS ✓
- [ ] Railway backend is running (`/health` returns 200)
- [ ] Supabase tables created + RLS policies enabled
- [ ] Azure AD app permissions granted + admin consented
- [ ] SharePoint HTML web part iFrame loads without errors
- [ ] Manual refresh button works (triggers `POST /api/sync`)
- [ ] KPI cards populate with real data within 60s
- [ ] OKR table displays all 55+ key results

---

## Maintenance

**Hourly sync** runs automatically via cron job on backend.

To **manually trigger a refresh**:
1. Click "Refresh" button in dashboard top-right
2. Sync starts in background
3. Data updates in ~5-10 seconds

To **monitor sync logs**:
```sql
SELECT source, status, records_synced, error_message, completed_at
FROM sync_log
ORDER BY started_at DESC
LIMIT 20;
```

---

## Custom Domain (Optional)

To host at `dashboard.yourdomain.com` instead of `*.vercel.app`:

1. **Buy domain** from Namecheap/GoDaddy
2. **Vercel dashboard** → Settings → Domains → Add custom domain
3. **Update Azure AD** redirect URI to `https://dashboard.yourdomain.com/auth/callback`
4. **Update Supabase** CORS to allow new domain

---

## Security Notes

- **Never** commit `.env` files with secrets — use Railway/Vercel secrets manager
- **Always** use `https://` in production
- SharePoint CSP headers automatically allow iFrame embeds
- MSAL tokens expire in **1 hour** — auto-refresh happens in background
- Backend validates all Azure AD Bearer tokens before serving data

---

## Questions?

Refer to:
- Azure AD app config docs: https://docs.microsoft.com/en-us/azure/active-directory/develop/
- Vercel deployment: https://vercel.com/docs
- Railway deployment: https://docs.railway.app
- MSAL iframe tips: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/FAQs
