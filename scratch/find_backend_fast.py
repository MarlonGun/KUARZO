import os

start_dir = "c:\\Users\\USUARIO\\Documents"
print(f"Scanning {start_dir} up to depth 4 for backend projects...")

found = []
for root, dirs, files in os.walk(start_dir):
    # Calculate depth
    depth = root[len(start_dir):].count(os.sep)
    if depth > 4:
        # Don't descend too deep
        dirs.clear()
        continue
        
    if "node_modules" in dirs:
        dirs.remove("node_modules")
    if ".git" in dirs:
        dirs.remove(".git")
    if ".expo" in dirs:
        dirs.remove(".expo")
        
    if "package.json" in files:
        pkg_path = os.path.join(root, "package.json")
        try:
            with open(pkg_path, "r", encoding="utf-8") as f:
                content = f.read()
                if any(x in content for x in ["express", "prisma", "mysql2"]):
                    found.append((root, "Node/Express Backend"))
        except Exception:
            pass
            
    if "manage.py" in files:
        found.append((root, "Django Backend"))

print("\n--- RESULTS ---")
for f_path, f_type in found:
    print(f"- {f_path} ({f_type})")
