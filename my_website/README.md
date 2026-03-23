# markkagach.com

Minimal one-page personal website.

## Project structure

- `index.html` - page content and section structure
- `styles.css` - visual system and layout
- `script.js` - toggle behavior
- `assets/profile.svg` - placeholder profile image (replace with your photo)
- `assets/icons/*.svg` - social icon placeholders

## Edit content quickly

1. Open `index.html`.
2. Update:
   - intro and extra intro text
   - project preview and expanded text
   - timeline entries
   - social links (`href` values)
3. Replace `assets/profile.svg` with your own image file if you want.

## Keep width and style constraints

- Main content width is controlled by `--content-width` in `styles.css`.
- Current value is `72ch`, which stays in the 50-75 character reading range.
- Background is `#252525` and text is white Inter.

## Local preview

Use any static server, for example:

```powershell
py -m http.server 8080
```

Then visit `http://localhost:8080`.

## Launch steps (Cloudflare Pages + Namecheap)

### 1) Create a GitHub repository

1. Create an empty GitHub repo named `markkagach.com`.
2. In this project folder, run:

```powershell
git init
git add .
git commit -m "Initial one-page site"
git branch -M main
git remote add origin https://github.com/<your-username>/markkagach.com.git
git push -u origin main
```

### 2) Deploy with Cloudflare Pages

1. Log in to Cloudflare dashboard.
2. Go to **Workers & Pages** -> **Create application** -> **Pages**.
3. Connect the GitHub repo `markkagach.com`.
4. Build settings:
   - Framework preset: `None`
   - Build command: *(empty)*
   - Build output directory: `/`
5. Deploy.

### 3) Connect custom domain (`markkagach.com`)

1. In Cloudflare Pages project, open **Custom domains**.
2. Add:
   - `markkagach.com`
   - `www.markkagach.com`
3. Cloudflare will show DNS targets/instructions.
4. In Namecheap -> **Domain List** -> `markkagach.com` -> **Advanced DNS**:
   - Add/update records exactly as Cloudflare requests.
   - Usually this includes `CNAME` records for Pages validation/routing.
5. Save and wait for DNS propagation (often minutes, sometimes longer).

### 4) Redirect preference

Set one canonical domain in Cloudflare Pages:

- recommended: redirect `www` -> `markkagach.com`

### 5) Verify production

Confirm all of these:

- `https://markkagach.com` loads
- `https://www.markkagach.com` redirects to canonical domain
- SSL certificate shows valid HTTPS
- Toggle buttons open/close correctly
- Layout remains centered and readable on phone and laptop

## Replace placeholder links

In `index.html`, replace these:

- `https://x.com/yourhandle`
- `https://yourname.substack.com`
- `https://github.com/yourhandle`
- `mailto:hello@markkagach.com`
- `https://www.linkedin.com/in/yourhandle`
- `https://www.youtube.com/@yourhandle`
