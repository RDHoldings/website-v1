# DNS for GitHub Pages (RDHoldings / website-v1)

Official reference: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).

---

## Fix `InvalidCNAMEError` for `www.reddominoholdings.com`

GitHub expects a real **DNS CNAME** for **`www`** — not a URL redirect, not an A record on `www`, and not a typo.

### Correct record (exactly)

| Field | Value |
|--------|--------|
| **Type** | `CNAME` |
| **Host / Name** | `www` (or whatever your DNS UI uses for the `www` subdomain only) |
| **Target / Points to / Data** | **`rdholdings.github.io`** |

Rules:

- **All lowercase:** `rdholdings.github.io`
- **No** `https://`
- **No** trailing path (`/website-v1`)
- **No** `www.rdholdings.github.io`
- **No** `github.com` or `pages.github.com` as the CNAME target (use **`rdholdings.github.io`** only)

### Common Squarespace mistakes

1. **“Forwarding” or “Website defaults”** — A **forward/redirect** is not a **CNAME**. You need **Domains** → your domain → **DNS** / **Custom records** (or **Google Workspace** area’s **Advanced DNS** in some setups) and add a **CNAME** row as above.
2. **Wrong target** — `reddominoholdings.com`, `www.reddominoholdings.com`, or Squarespace’s default host will trigger **InvalidCNAMEError**. Replace with **`rdholdings.github.io`**.
3. **Duplicate `www` records** — Only **one** primary record for `www` should exist. Remove extra **A** or **CNAME** rows for `www` that conflict.
4. **Host field** — If the panel asks for “full hostname”, use **`www.reddominoholdings.com`** for the name and **`rdholdings.github.io`** for the target (Squarespace docs vary by product).

### Verify after saving (PowerShell)

```powershell
Resolve-DnsName www.reddominoholdings.com -Type CNAME
```

You should see **`rdholdings.github.io`** in the CNAME answer (possibly after one hop). If you only see **A** records and no CNAME, GitHub will still report **InvalidCNAMEError**.

Then in GitHub: **Settings → Pages → Custom domain** → save **`www.reddominoholdings.com`** again if needed, wait for the check to pass.

---

## Fix `NotServedByPagesError` (apex / general)

GitHub shows **“Domain does not resolve to the GitHub Pages server”** when **`@`** (and sometimes **`www`**) still points at the wrong servers. This is almost always **DNS at Squarespace**, not the Vite app.

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

## Enforce HTTPS unavailable — “not properly configured” (`reddominoholdings.com`)

GitHub can only turn on **Enforce HTTPS** after it can obtain a TLS certificate (Let’s Encrypt). That requires **every hostname** GitHub associates with your Pages site—often both **`www.reddominoholdings.com`** *and* the apex **`reddominoholdings.com`**—to **resolve correctly to GitHub Pages**.

- If **`www`** is correct (CNAME → `rdholdings.github.io`) but **Enforce HTTPS** still says the problem is **`reddominoholdings.com`**, the **apex** is almost always still wrong: **`@`** must use GitHub’s **A** (and ideally **AAAA**) records from **§ `reddominoholdings.com` (apex)** above—not Squarespace’s default **A** records.

**Check the apex from PowerShell:**

```powershell
Resolve-DnsName reddominoholdings.com -Type A | Format-Table Name,IPAddress -AutoSize
```

You want to see GitHub’s addresses (e.g. **`185.199.108.153`** and the other three **185.199.111.x** / **109** / **110** from the table above). If you only see **Squarespace** or unrelated IPs, **HTTPS will stay disabled** until **`@`** is fixed.

After DNS is correct:

1. Wait **up to 24 hours** for propagation and for GitHub to finish certificate provisioning.
2. **Settings → Pages** — confirm **Custom domain**; click **Save** again if needed.
3. When the domain check is clean, **Enforce HTTPS** should become available.

More detail: [Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) and [HTTPS for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

---

## `ERR_CERT_COMMON_NAME_INVALID` / “Your connection isn’t private” (Edge, HSTS)

The browser is rejecting the **TLS certificate** for **`reddominoholdings.com`**: the name on the cert doesn’t match the apex (or the cert isn’t GitHub’s yet).

### Likely causes

1. **Certificate still provisioning** — After apex **A** records go live, GitHub/Let’s Encrypt can take **up to an hour or longer** (sometimes **24h**) to issue a cert that includes the apex. Until then, <https://reddominoholdings.com> can show **COMMON_NAME_INVALID**.
2. **Only `www` on the cert first** — Try **`https://www.reddominoholdings.com`**. If **www** loads but the **apex** does not, wait and re-check **Settings → Pages** until both are covered; do **not** rely on the apex until the cert is valid.
3. **HSTS stuck in the browser** — If you (or a prior host) sent **HSTS** for `reddominoholdings.com`, Edge will **only** use HTTPS and will keep failing until the cert is valid—or you clear HSTS for testing.

### What to do

1. **Confirm the site on `www`:** open **`https://www.reddominoholdings.com`** (and the default **`https://rdholdings.github.io/website-v1/`**). If those work, DNS and Pages are fine; the apex cert is catching up.
2. **GitHub:** **Settings → Pages** — ensure **Custom domain** / DNS checks are green; leave **Enforce HTTPS** off until the UI allows it without errors.
3. **Clear HSTS in Edge (testing only):** address bar → **`edge://net-internals/#hsts`** → **Delete domain security policies** → enter **`reddominoholdings.com`** → Delete. Then retry after GitHub shows a valid certificate (otherwise the error may return).
4. **Wait** and retry the apex later the same day; if it still fails after **24–48 hours** with correct **A** records, open a ticket with GitHub Support and mention **custom domain** + **certificate**.

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
