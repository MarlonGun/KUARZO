import os

print("Checking environment variables...")
keys = sorted(os.environ.keys())
found = False
for key in keys:
    if any(term in key.upper() for term in ["DB", "MYSQL", "RAILWAY", "KUARZO", "CONN", "PASS", "USER", "HOST", "PORT", "API"]):
        print(f"{key}: {os.environ[key][:10]}... [length {len(os.environ[key])}]")
        found = True

if not found:
    print("No related environment variables found.")
