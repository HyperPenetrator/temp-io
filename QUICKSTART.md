# 🚀 Quick Start Guide - WeatherAI

## For Immediate Local Testing

### Step 1: Open Two Terminals

You need two separate terminal windows (PowerShell or Command Prompt).

### Step 2: Start Backend (Terminal 1)

```bash
cd d:\Projects\Weather
start-backend.bat
```

**What you should see:**
```
========================================
Starting WeatherAI Backend Server
========================================

Starting FastAPI server on http://localhost:8000
API Documentation: http://localhost:8000/docs

INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Backend is ready when you see "Application startup complete"**

### Step 3: Start Frontend (Terminal 2)

```bash
cd d:\Projects\Weather
start-frontend.bat
```

**What you should see:**
```
========================================
Starting WeatherAI Frontend Server
========================================

Starting Vite dev server...
Frontend will be available at: http://localhost:5173

  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Frontend is ready when you see the Local URL**

### Step 4: Open Browser

Navigate to: **http://localhost:5173**

## First-Time Setup

If you haven't set up the project yet, run this first:

```bash
cd d:\Projects\Weather
setup.bat
```

This will:
1. Create Python virtual environment
2. Install Python dependencies
3. Install Node.js dependencies
4. Create data directory

## Testing the Application

### Quick Test Flow

1. **Default Load**
   - App should load with Delhi weather automatically
   - Check that temperature, humidity, and wind speed display

2. **Search Test**
   - Select "Maharashtra" from dropdown
   - Type "Mumbai" in district field
   - Click "Search"
   - Verify Mumbai weather loads

3. **AI Test**
   - Type "Will it rain today?" in AI assistant
   - Click send button
   - Verify response appears

### Verify Backend API

Open in browser: **http://localhost:8000/docs**

You should see the interactive API documentation (Swagger UI).

Try these endpoints:
- Click on `GET /api/health` → "Try it out" → "Execute"
- Should return: `{"ok": true, "time": "..."}`

## Troubleshooting

### Backend Won't Start

**Problem:** "Virtual environment not found"
**Solution:** Run `setup.bat` first

**Problem:** "Module not found"
**Solution:** 
```bash
cd backend
.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### Frontend Won't Start

**Problem:** "Node modules not found"
**Solution:**
```bash
cd frontend
npm install
```

**Problem:** "npm : running scripts is disabled"
**Solution:** Use the batch files or run:
```bash
cmd /c "npm run dev"
```

### Port Already in Use

**Backend (8000):**
```bash
# Find and kill process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend (5173):**
```bash
# Find and kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### CORS Errors

Make sure:
1. Backend is running on port 8000
2. Frontend is running on port 5173
3. Check `vite.config.js` has correct proxy settings

### Weather Data Not Loading

1. Check browser console for errors (F12)
2. Verify backend is running
3. Test backend directly: http://localhost:8000/api/health
4. Check internet connection (APIs require internet)

## Running Tests

### Backend Tests

```bash
cd backend
.venv\Scripts\python.exe test_all.py
```

Expected output:
```
==================================================
WeatherAI Backend Test Suite
==================================================

[TEST 1] Health Check
--------------------------------------------------
✓ Status: 200
✓ Response: {'ok': True, 'time': '...'}

[TEST 2] Weather by Region (Delhi)
--------------------------------------------------
✓ Status: 200
✓ Location: Delhi, IN
✓ Temperature: 25.5°C
...

==================================================
TEST SUMMARY
==================================================
Passed: 6/6
Failed: 0/6

✓ All tests passed! Backend is working correctly.
```

## Optional: Enable AI with OpenAI

1. Get an OpenAI API key from https://platform.openai.com/

2. Create `backend/.env` file:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```

3. Restart backend

4. Test AI assistant - responses will be more intelligent!

## Keyboard Shortcuts

- **Ctrl+C** in terminal: Stop server
- **F5** in browser: Refresh page
- **F12** in browser: Open developer tools
- **Ctrl+Shift+R**: Hard refresh (clear cache)

## URLs Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Main application |
| Backend API | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| API Redoc | http://localhost:8000/redoc | Alternative docs |

## Next Steps

After successful local testing:

1. ✅ Review [FEATURES.md](FEATURES.md) for complete feature list
2. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
3. ✅ Check [README.md](README.md) for project overview
4. ✅ Commit to Git and push to GitHub
5. ✅ Deploy to production platform

## Need Help?

- Check console logs (browser F12, terminal output)
- Review error messages carefully
- Ensure all dependencies are installed
- Verify ports are not in use
- Check internet connection for API calls

---

**Happy Testing! 🎉**
