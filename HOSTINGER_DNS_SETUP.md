# DNS Configuration for Hostinger

## 🎯 Quick Setup Instructions

### Step 1: Login to Hostinger
1. Go to: https://www.hostinger.com/
2. Login to your account
3. Navigate to: **Domains** → **waqasportfolio.site** → **DNS / Nameservers**

---

## 📝 DNS Records to Add

### A Records (IPv4) - For Naked Domain
Add these **FOUR** A records:

```
Type: A
Host: @ (or leave blank)
Points to: 185.199.108.153
TTL: 3600 (or Auto)
```

```
Type: A
Host: @ (or leave blank)
Points to: 185.199.109.153
TTL: 3600 (or Auto)
```

```
Type: A
Host: @ (or leave blank)
Points to: 185.199.110.153
TTL: 3600 (or Auto)
```

```
Type: A
Host: @ (or leave blank)
Points to: 185.199.111.153
TTL: 3600 (or Auto)
```

### CNAME Record - For WWW Subdomain

```
Type: CNAME
Host: www
Points to: waqas84251.github.io
TTL: 3600 (or Auto)
```

---

## ⚠️ Important Notes

1. **Do NOT delete existing CAA records** - Leave them as they are
2. **Remove old A records** - If there are any old A records pointing to different IPs (like 84.32.84.32), delete them first
3. **Wait for propagation** - DNS changes can take 5-30 minutes (up to 24 hours in rare cases)

---

## ✅ Verification

After adding the records, verify using:
- https://www.whatsmydns.net/#A/waqasportfolio.site
- https://www.whatsmydns.net/#CNAME/www.waqasportfolio.site

You should see:
- **A records**: All 4 GitHub IPs showing globally
- **CNAME record**: `waqas84251.github.io` for www subdomain

---

## 🔧 Troubleshooting

### If DNS check fails in GitHub:
1. Wait 30 minutes and try again
2. Verify all 4 A records are added correctly
3. Check for conflicting records (old A records, AAAA records)
4. Clear your browser cache and DNS cache

### To clear DNS cache (Windows):
```powershell
ipconfig /flushdns
```

---

## 📞 Next Steps

Once DNS records are added and propagated:
1. Go to GitHub Pages settings
2. Verify the custom domain
3. Enable "Enforce HTTPS"
4. Test both URLs:
   - https://waqasportfolio.site
   - https://www.waqasportfolio.site
