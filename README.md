# Temp.io 🌦️

> **Industry-Grade Weather Intelligence Platform for India**

A professional, production-ready weather application featuring real-time weather data for all Indian states and districts, powered by GPT-3.5 AI insights, intelligent weather alerts, and a stunning glassmorphism UI.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HyperPenetrator/temp-io&project-name=temp-io&repository-name=temp-io&root-directory=frontend&env=VITE_API_URL&envDescription=Backend%20API%20URL&envLink=https://github.com/HyperPenetrator/temp-io#deployment)
[![Deploy Backend to Railway](https://railway.app/button.svg)](https://railway.app/template/temp-io)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://reactjs.org/)

**🚀 [Live Demo](https://temp-io.vercel.app)** | **📖 [GitHub Guide](GITHUB_GUIDE.md)** | **🐛 [Report Bug](https://github.com/HyperPenetrator/temp-io/issues)**

---

## 📡 Deployment Status

| Component | Status | Provider | Link |
|-----------|--------|----------|------|
| **Frontend** | 🟢 Live | Vercel | [View Site](https://temp-io.vercel.app) |
| **Backend** | 🟢 Live | Railway | [API Docs](https://temp-io-production.up.railway.app/docs) |
| **CI/CD** | 🟢 Passing | GitHub | [Actions](https://github.com/HyperPenetrator/temp-io/actions) |

See **[GITHUB_GUIDE.md](GITHUB_GUIDE.md)** for full deployment instructions.

---

## ✨ Features

### 🎨 **Industry-Grade UI/UX**
- **Glassmorphism Design** - Modern, translucent cards with backdrop blur
- **Animated Dashboard** - Smooth entrance animations and micro-interactions
- **Real-time Clock** - Live local time display for selected location
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Professional Typography** - Google Fonts (Outfit + Inter)
- **Accessibility** - WCAG 2.1 AA compliant

### 🌍 **Comprehensive Weather Data**
- **Real-time Updates** - Current temperature, feels-like, humidity, wind
- **12-Hour Forecast** - Precipitation probability and temperature trends
- **Wind Compass** - Direction display with 16-point compass
- **Cloud Cover** - Sky condition monitoring
- **Atmospheric Pressure** - Weather stability indicators
- **All Indian Locations** - 36 states/UTs, 700+ districts
- **Smart Caching** - Faster repeated searches

### 🚨 **Intelligent Weather Alerts** (NEW!)
- **Heat Warnings** - Extreme temperature alerts
- **Cold Weather Advisories** - Freezing condition warnings
- **Wind Alerts** - High wind speed notifications
- **Rain Warnings** - Heavy precipitation alerts
- **Humidity Advisories** - High humidity notifications
- **Perfect Weather** - Ideal condition indicators

### 🤖 **GPT-3.5 Powered AI Assistant**
- **Natural Language** - Ask any weather question naturally
- **Smart Recommendations** - Clothing, activities, safety tips
- **Context-Aware** - Uses current weather data for responses
- **60+ Keywords** - Understands various phrasings
- **Chat Interface** - Full conversation history
- **Dual Mode** - Rule-based (default) + OpenAI GPT-3.5 (optional)

### 🚀 **Technical Excellence**
- **Fast Performance** - Optimized React with Vite
- **Smart Caching** - Geocoding cache for faster searches
- **Error Handling** - Graceful error messages
- **Type Safety** - Pydantic validation
- **RESTful API** - Well-documented FastAPI backend
- **Production Ready** - Optimized builds and deployment scripts
- **CI/CD Pipeline** - Automated testing with GitHub Actions

---

## 🎯 One-Click Deployment

### **Option 1: Deploy Everything (Recommended)**

1. **Click the Deploy to Vercel button above** ⬆️
2. **Deploy backend to Railway** using the Railway button
3. **Add environment variable** in Vercel:
   - `VITE_API_URL` = Your Railway backend URL
4. **Done!** Your app is live 🎉

### **Option 2: Manual Deployment**

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **npm or yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/HyperPenetrator/temp-io.git
cd temp-io

# Run setup script (Windows)
setup.bat

# Or manual setup:

# Backend
cd backend
python -m venv .venv
.venv\Scripts\activate  # On Windows
# source .venv/bin/activate  # On macOS/Linux
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Running Locally

**Option 1: Using Scripts (Windows)**
```bash
# Terminal 1 - Backend
start-backend.bat

# Terminal 2 - Frontend
start-frontend.bat
```

**Option 2: Manual**
```bash
# Terminal 1 - Backend
cd backend
.venv\Scripts\activate
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📡 API Documentation

### Endpoints

#### Weather
- `GET /api/health` - Health check
- `GET /api/weather/current?lat={lat}&lon={lon}` - Current weather
- `GET /api/weather/by-region?state={state}&district={district}` - Weather by location
- `GET /api/weather/hourly?lat={lat}&lon={lon}&hours={hours}` - Hourly forecast

#### AI Assistant
- `POST /api/ai/query` - Ask weather questions
  ```json
  {
    "query": "Will it rain today?",
    "lat": 28.6139,
    "lon": 77.2090
  }
  ```

#### Geocoding
- `GET /api/geocode/suggest?state={state}&q={query}` - Location suggestions

**Interactive API Docs**: http://localhost:8000/docs

---

## 🔧 Configuration

### Optional: OpenAI Integration

For enhanced AI responses, add your OpenAI API key:

```bash
# backend/.env
OPENAI_API_KEY=sk-your-api-key-here
```

Without this, the app uses intelligent rule-based responses (still very capable!).

---

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[FEATURES.md](FEATURES.md)** - Full feature list and testing checklist
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[AI_UPGRADE.md](AI_UPGRADE.md)** - AI assistant documentation
- **[OPENAI_SETUP.md](OPENAI_SETUP.md)** - OpenAI integration guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
.venv\Scripts\python.exe test_all.py
```

### Manual Testing
1. Search for "Nalbari, Assam"
2. Ask AI: "Will it rain today?"
3. Ask AI: "What should I wear?"
4. Check weather alerts
5. Verify responsive design (resize browser)
6. Check local time updates

---

## 📦 Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client
- **date-fns** - Date formatting

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **httpx** - Async HTTP client
- **Pydantic** - Data validation
- **OpenAI** - AI integration (optional)

### APIs
- **Open-Meteo** - Weather data (free, no API key)
- **Nominatim** - Geocoding fallback
- **OpenAI GPT-3.5** - AI responses (optional)

---

## 🎨 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/1200x700/1e1b4b/38bdf8?text=Temp.io+Dashboard)

### AI Assistant
![AI Chat](https://via.placeholder.com/1200x700/1e1b4b/c084fc?text=AI+Assistant)

### Weather Alerts
![Alerts](https://via.placeholder.com/1200x700/1e1b4b/ef4444?text=Weather+Alerts)

### Mobile View
![Mobile](https://via.placeholder.com/400x800/1e1b4b/38bdf8?text=Mobile+View)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) - Free weather data API
- [OpenStreetMap](https://www.openstreetmap.org/) - Geocoding services
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [OpenAI](https://openai.com/) - GPT-3.5 AI model
- [x] AI-powered assistant
- [x] Weather alerts
- [x] Glassmorphism UI
- [x] One-click deployment
- [ ] 7-day forecast with charts
- [ ] Save favorite locations
- [ ] Dark/light mode toggle
- [ ] Unit conversion (°C/°F, km/h/mph)
- [ ] Weather maps (radar, satellite)
- [ ] Historical weather data
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Weather widgets

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=HyperPenetrator/temp-io&type=Date)](https://star-history.com/#HyperPenetrator/temp-io&Date)

---

<div align="center">

**Built with ❤️ for India by [HyperPenetrator](https://github.com/HyperPenetrator)**

[Website](https://temp-io.vercel.app) • [Documentation](DEPLOYMENT.md) • [Report Bug](https://github.com/HyperPenetrator/temp-io/issues) • [Request Feature](https://github.com/HyperPenetrator/temp-io/issues)

**⭐ Star this repo if you find it useful!**

</div>
