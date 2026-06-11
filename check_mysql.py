import socket

print("Checking if port 3306 (MySQL) is open on localhost...")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(2)
try:
    s.connect(("127.0.0.1", 3306))
    print("Port 3306 is OPEN on localhost!")
    s.close()
except Exception as e:
    print(f"Port 3306 is CLOSED: {e}")
