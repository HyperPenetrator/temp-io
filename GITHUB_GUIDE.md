# 🐙 GitHub Command Center Guide

This guide explains how to manage, deploy, and view your **Temp.io** industry-grade weather app entirely through GitHub.

---

## 🚀 1. The "One-Click" Deployment Architecture

Since this is a modern Full-Stack App (React + Python), we don't just "upload files". We use **Continuous Deployment (CD)**.

**How it works:**
1. You push code to **GitHub** 🐙
2. GitHub tells **Vercel** to update the Frontend ⚡
3. GitHub tells **Railway** to update the Backend 🚂
4. Your live site updates automatically!

---

## 📦 2. First-Time Setup (Do this once)

### Step A: Initialize GitHub Repo
Run these commands in your project folder (`d:\Projects\Weather`):

```bash
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Commit your industry-grade code
git commit -m "Initial commit: Temp.io Industry Grade V3"

# 4. Create a new repo on GitHub.com (name it 'temp-io')
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/temp-io.git
git branch -M main
git push -u origin main
```

### Step B: Connect Deployments
1. **Frontend**: Go to [Vercel](https://vercel.com/new), import your `temp-io` repo.
   - Root Directory: `frontend`
   - Framework: `Vite`
   - **Click Deploy**.
2. **Backend**: Go to [Railway](https://railway.app/new), import your `temp-io` repo.
   - It will auto-detect Python.
   - **Click Deploy**.

### Step C: Link Them
1. Copy your **Railway URL** (e.g., `https://web-production-123.up.railway.app`).
2. Go to Vercel Dashboard → Settings → Environment Variables.
3. Add `VITE_API_URL` with value: `https://web-production-123.up.railway.app`.
4. Redeploy Vercel.

---

## 🔄 3. How to Update & Deploy

**You never need to manually upload files again.** Just use these commands:

### 1. Make Changes
Edit your code (e.g., change a color, add a feature).

### 2. Push to GitHub
```bash
git add .
git commit -m "Added new feature"
git push
```

### 3. Watch it Happen 🍿
- Go to your **GitHub Repo** → **Actions** tab.
- You will see "CI/CD" running to test your code.
- Once green, Vercel and Railway automatically pull the changes.
- **Your live site updates in ~60 seconds.**

---

## 👁️ 4. How to View Your App on GitHub

You can make your live link appear prominently on your GitHub repository page.

1. Go to your **GitHub Repo**.
2. Look at the **Right Sidebar** (About section).
3. Click the ⚙️ **Gear icon**.
4. In the **Website** field, paste your Vercel URL (e.g., `https://temp-io.vercel.app`).
5. Click **Save**.

Now, anyone visiting your GitHub repo sees a "Deployment" link directly to your live app!

---

## 🛡️ 5. GitHub Safety Checks (CI/CD)

We have configured **GitHub Actions** to protect your code.
Every time you push, GitHub automatically:
1. **Installs Python & Node.js**
2. **Runs Backend Tests** (`test_all.py`)
3. **Builds Frontend** (checks for crash errors)

**If the tests fail:**
- You get a ❌ Red X on your commit.
- You know something is broken *before* it breaks the live site.

**View Status:**
- Click the **Actions** tab in your repo.
- Click the latest workflow run to see details.

---

## 📝 Summary of Links

| Service | Purpose | URL |
|---------|---------|-----|
| **GitHub** | Code & Control | `https://github.com/YOUR_USERNAME/temp-io` |
| **Vercel** | Live Frontend | `https://temp-io.vercel.app` |
| **Railway** | Live Backend | `https://your-backend.up.railway.app` |

---

**🎉 You are now operating like a Senior DevOps Engineer!**
