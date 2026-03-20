# Fix `NotServedByPagesError` — DNS for GitHub Pages (RDHoldings / website-v1)

GitHub shows **“Domain does not resolve to the GitHub Pages server”** when DNS does not point **`www`** and/or the **apex** (`@`) to GitHub. This is almost always a **DNS provider (Squarespace)** issue, not the Vite app.

Official reference: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).

## Your GitHub Pages default hostname (project site)

- **Organization:** `RDHoldings`
- **Repository:** `website-v1`
- **Default URL:** `https://rdholdings.github.io/website-v1/`

For **DNS**, the **`www`** CNAME target is always the **org (or user) hostname only**:

```text
rdholdings.github.io
```

Do **not** include:

- `https://`
- `/website-v1`
- `www.rdholdings.github.io`
- `github.com`

---

## 1. `www.reddominoholdings.com` (subdomain)

In Squarespace **DNS** (Domains → your domain → **DNS settings** / **Custom records** — exact names vary):

| Type   | Host / Name | Points to / Data          |
|--------|-------------|---------------------------|
| **CNAME** | `www`       | `rdholdings.github.io`    |

- Some UIs use **`www`** as host; others want **`www.reddominoholdings.com`** — follow Squarespace’s help for “CNAME”.
- **Do not** point `www` to `reddominoholdings.com` only (CNAME to apex) — GitHub [warns](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) this breaks HTTPS and can prevent the site from loading.

---

## 2. `reddominoholdings.com` (apex / naked domain)

The apex **cannot** use a normal CNAME in many setups. Use **A** (and optionally **AAAA**) records for **`@`** (or blank host = apex).

Per [GitHub’s apex documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain) (verify these IPs have not changed in the doc):

**A records — Host `@`, each as its own row:**

| Type | Host | Data              |
|------|------|-------------------|
| A    | `@`  | `185.199.108.153` |
| A    | `@`  | `185.199.109.153` |
| A    | `@`  | `185.199.110.153` |
| A    | `@`  | `185.199.111.153` |

**AAAA (optional but recommended):**

| Type  | Host | Data                 |
|-------|------|----------------------|
| AAAA  | `@`  | `2606:50c0:8000::153` |
| AAAA  | `@`  | `2606:50c0:8001::153` |
| AAAA  | `@`  | `2606:50c0:8002::153` |
| AAAA  | `@`  | `2606:50c0:8003::153` |

**Remove** conflicting apex records that point to Squarespace’s website hosting (old **A** records for “parking” or Squarespace default site), or GitHub will never see your domain.

If Squarespace offers **ALIAS** / **ANAME** on `@`, you can point **`@`** to **`rdholdings.github.io`** instead of the four **A** records — see GitHub’s table [DNS records for your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#dns-records-for-your-custom-domain).

---

## 3. GitHub repository settings

1. **Settings → Pages → Custom domain**
2. Enter the **same** hostname as in `public/CNAME` (currently **`www.reddominoholdings.com`**), or switch to apex if you change `public/CNAME` and rebuild.
3. If GitHub lists an **alternate domain** (e.g. apex), add the DNS records for **both** `www` and `@` as above.
4. After checks pass, enable **Enforce HTTPS**.

---

## 4. Squarespace: domain “connected” to a Squarespace site

If the domain is **linked to a Squarespace website**, Squarespace may keep **A** records aimed at their servers. For **`www` + apex` to GitHub you must:

- Either use **DNS-only** / **use domain elsewhere** flows so **you** control **A** and **CNAME**, or  
- Edit **custom DNS** so apex **A** and **www** **CNAME** match this document.

If you keep a Squarespace site on the same domain, only one service can “own” the apex; many teams use **`www` → GitHub** and redirect apex, or a **subdomain** for one of the two.

---

## 5. Verify from Windows (PowerShell)

After saving DNS, wait a few minutes (up to 24–48 hours in worst cases).

```powershell
Resolve-DnsName www.reddominoholdings.com -Type CNAME -ErrorAction SilentlyContinue
Resolve-DnsName reddominoholdings.com -Type A -ErrorAction SilentlyContinue
```

**Expected:**

- **`www`**: a **CNAME** chain that ends with GitHub Pages (often via `rdholdings.github.io` → GitHub’s infrastructure).
- **Apex**: **A** answers should include **`185.199.108.153`** (and the other three GitHub **A** IPs).

If apex still shows only Squarespace IPs, GitHub will keep reporting **NotServedByPagesError** for the apex.

---

## 6. `public/CNAME` in this repo

The built site includes **`public/CNAME`** with a single line: **`www.reddominoholdings.com`**. That should match **Settings → Pages → Custom domain**. If you switch the canonical domain to **apex**, change **`public/CNAME`** to `reddominoholdings.com`, commit, push, and align GitHub’s custom domain field.

---

## Quick checklist

- [ ] **`www`** → **CNAME** → **`rdholdings.github.io`**
- [ ] **`@`** → **four A** records (or **ALIAS/ANAME** to **`rdholdings.github.io`**) per GitHub doc
- [ ] No leftover **A** records on **`@`** pointing only to Squarespace
- [ ] GitHub **Pages** custom domain saved; wait for green check / **Enforce HTTPS**
