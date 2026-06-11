import requests
import socket

domains = ["google.com", "github.com", "kuarzo-backend-production.up.railway.app"]

for domain in domains:
    print(f"\nResolving {domain}...")
    try:
        ip = socket.gethostbyname(domain)
        print(f"IP: {ip}")
    except Exception as e:
        print(f"Failed to resolve: {e}")

    print(f"Requesting https://{domain}...")
    try:
        r = requests.get(f"https://{domain}", timeout=5)
        print(f"Status: {r.status_code}")
    except Exception as e:
        print(f"Request failed: {e}")
