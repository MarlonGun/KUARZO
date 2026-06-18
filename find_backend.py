import os

documents_path = "c:\\Users\\USUARIO\\Documents"
print(f"Searching for package.json or backend files in {documents_path}...")

found_dirs = []
for root, dirs, files in os.walk(documents_path):
    # Skip common folders to speed up
    if any(p in root.lower() for p in ["node_modules", ".git", ".expo", "venv", "appdata"]):
        continue
    if "package.json" in files:
        pkg_path = os.path.join(root, "package.json")
        try:
            with open(pkg_path, "r", encoding="utf-8") as f:
                content = f.read()
                # Check if it has Express or prisma or mysql dependencies
                if any(x in content for x in ["express", "prisma", "mysql2"]):
                    found_dirs.append((root, "Backend/Express Project"))
                elif "react-native" in content or "expo" in content:
                    found_dirs.append((root, "Expo/React Native Project"))
                else:
                    found_dirs.append((root, "Other Node Project"))
        except Exception:
            pass

print("\nSearch results:")
for r, t in found_dirs:
    print(f"- {r} ({t})")
