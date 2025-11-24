import httpx
import time

def test_geocode():
    name = "Nalbari Assam"
    print(f"Testing geocode for: {name}")
    
    # Test Open-Meteo
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params = {"name": name, "country": "IN", "count": 1}
    try:
        resp = httpx.get(url, params=params, timeout=10.0)
        print(f"Open-Meteo Status: {resp.status_code}")
        print(f"Open-Meteo Body: {resp.text}")
    except Exception as e:
        print(f"Open-Meteo Error: {repr(e)}")

    # Test Nominatim
    url2 = "https://nominatim.openstreetmap.org/search"
    params2 = {"format": "json", "q": "Nalbari, Assam, India", "limit": 1}
    headers = {"User-Agent": "TestScript/1.0"}
    try:
        resp = httpx.get(url2, params=params2, headers=headers, timeout=10.0)
        print(f"Nominatim Status: {resp.status_code}")
        print(f"Nominatim Body: {resp.text}")
    except Exception as e:
        print(f"Nominatim Error: {repr(e)}")

if __name__ == "__main__":
    test_geocode()
