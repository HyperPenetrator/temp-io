# 🚀 Temp.io - Complete Deployment Guide

This guide will help you deploy Temp.io to production with a single accessible link.

---

## 📋 Deployment Options

### Recommended: Vercel (Frontend) + Railway (Backend)

**Why?**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Custom domains supported
- ✅ Fast global CDN
- ✅ Easy environment variable management

---

## 🎯 Quick Deployment (5 Minutes)

### Step 1: Prepare GitHub Repository

```bash
cd d:\Projects\Weather

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Temp.io weather app"

# Create repository on GitHub (https://github.com/new)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/temp-io.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app/)**
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `temp-io` repository
5. Railway will auto-detect Python and deploy
6. **Set Environment Variables** (optional):
   - `OPENAI_API_KEY` = `sk-your-key-here` (for enhanced AI)
7. **Get your backend URL**: `https://temp-io-production.up.railway.app`

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com/)**
2. Click **"Add New Project"**
3. Import your `temp-io` repository
4. **Configure:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL` = `https://temp-io-production.up.railway.app`
6. Click **"Deploy"**
7. **Your app is live!** `https://temp-io.vercel.app`

---

## 🔧 Detailed Setup

### Backend Deployment (Railway)

#### Option A: Automatic (Recommended)

Railway auto-detects Python projects. Just ensure:

**`backend/requirements.txt`** exists ✅
**`Procfile`** in root:
```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

#### Option B: Manual Configuration

If Railway doesn't auto-detect:

1. **Build Command**:
   ```bash
   cd backend && pip install -r requirements.txt
   ```

2. **Start Command**:
   ```bash
   cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

3. **Environment Variables**:
   - `PORT` = `8000` (Railway sets this automatically)
   - `OPENAI_API_KEY` = `sk-...` (optional)

4. **Health Check**:
   - Path: `/api/health`
   - Expected: `{"ok": true, "time": "..."}`

### Frontend Deployment (Vercel)

#### Build Settings

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

#### Environment Variables

```
VITE_API_URL=https://your-backend-url.railway.app
```

**Important**: Update `frontend/vite.config.js` for production:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
```

---

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. Go to **Project Settings** → **Domains**
2. Add your domain: `temp.io` or `www.temp.io`
3. Update DNS records as instructed
4. SSL certificate auto-generated

### Railway Custom Domain

1. Go to **Settings** → **Domains**
2. Add custom domain: `api.temp.io`
3. Update DNS CNAME record
4. SSL auto-configured

**Final URLs**:
- Frontend: `https://temp.io`
- Backend: `https://api.temp.io`

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Optional: Enhanced AI responses
OPENAI_API_KEY=sk-your-openai-key

# Production settings
PORT=8000
ENVIRONMENT=production
```

### Frontend (.env.production)

```env
VITE_API_URL=https://api.temp.io
```

---

## 🧪 Post-Deployment Testing

### 1. Test Backend

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Weather API
curl "https://your-backend.railway.app/api/weather/by-region?state=Delhi&district=New%20Delhi"

# AI Query
curl -X POST https://your-backend.railway.app/api/ai/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Will it rain?","lat":28.6139,"lon":77.2090}'
```

### 2. Test Frontend

1. Visit `https://temp-io.vercel.app`
2. Search for "Delhi, New Delhi"
3. Verify weather data loads
4. Ask AI: "What should I wear?"
5. Check responsive design (mobile view)

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Railway support automatic deployments:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

2. **Auto-Deploy**:
   - Vercel: Deploys on every push to `main`
   - Railway: Deploys on every push to `main`

3. **Preview Deployments**:
   - Create a branch: `git checkout -b feature/new-feature`
   - Push: `git push origin feature/new-feature`
   - Get preview URL automatically

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in **Project Settings** → **Analytics**
2. View traffic, performance, and Web Vitals

### Railway Metrics

1. View in **Metrics** tab
2. Monitor CPU, memory, network usage

### Error Tracking (Optional)

Add Sentry for error tracking:

```bash
npm install @sentry/react
```

---

## 🚨 Troubleshooting

### Backend Issues

**Problem**: 502 Bad Gateway
**Solution**: Check Railway logs, ensure `PORT` env var is used

**Problem**: CORS errors
**Solution**: Update `backend/main.py`:
```python
allow_origins=["https://temp-io.vercel.app", "https://temp.io"]
```

### Frontend Issues

**Problem**: API calls fail
**Solution**: Verify `VITE_API_URL` is set correctly

**Problem**: Build fails
**Solution**: Check `package.json` scripts, run `npm install`

---

## 🎯 Production Checklist

### Before Deployment

- [ ] Update CORS origins in `backend/main.py`
- [ ] Set `VITE_API_URL` in Vercel
- [ ] Add `OPENAI_API_KEY` in Railway (optional)
- [ ] Test all features locally
- [ ] Run `npm run build` successfully
- [ ] Commit all changes to GitHub

### After Deployment

- [ ] Test health endpoint
- [ ] Test weather API
- [ ] Test AI assistant
- [ ] Verify responsive design
- [ ] Check performance (Lighthouse)
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - Already in `.gitignore` ✅

2. **Use environment variables for secrets**
   - Set in Railway/Vercel dashboards ✅

3. **Enable HTTPS only**
   - Auto-enabled on Vercel/Railway ✅

4. **Restrict CORS origins**
   ```python
   allow_origins=["https://temp.io"]
   ```

5. **Add rate limiting** (future enhancement)

---

## 📈 Performance Optimization

### Frontend

1. **Enable Compression** (Vercel auto-enables)
2. **Image Optimization** (use Vercel Image Optimization)
3. **Code Splitting** (Vite handles automatically)
4. **Lazy Loading** (for future features)

### Backend

1. **Add Redis Cache** (for geocoding)
2. **Database Connection Pooling** (if using DB)
3. **Enable Gzip Compression**
4. **CDN for Static Assets**

---

## 🎉 You're Live!

Your Temp.io app is now accessible at:

**🌐 https://temp-io.vercel.app**

Share this single link with anyone to access your weather app!

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/temp-io/issues)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Railway Support**: [railway.app/help](https://railway.app/help)

---

**Deployment Time**: ~5 minutes
**Cost**: Free (with generous limits)
**Uptime**: 99.9%+

**Happy Deploying! 🚀**
