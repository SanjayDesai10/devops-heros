from http.server import HTTPServer, BaseHTTPRequestHandler

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        html = "<!DOCTYPE html><html><head><title>Python Docker</title></head><body><h1>Hello World from Python Docker!</h1></body></html>"
        self.wfile.write(html.encode("utf-8"))

if __name__ == "__main__":
    PORT = 8080
    print("Hello World from Docker!")
    server = HTTPServer(("0.0.0.0", PORT), SimpleHTTPRequestHandler)
    print(f"Python Web Server running on port {PORT}")
    server.serve_forever()
