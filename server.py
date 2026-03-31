import http.server
import socketserver
import os

PORT = int(os.environ.get('PORT', 8080))
DIRECTORY = '/Users/juliaschirrmeister/Desktop/Claude Portfolio'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(format % args)

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print(f'Serving {DIRECTORY} on port {PORT}')
    httpd.serve_forever()
