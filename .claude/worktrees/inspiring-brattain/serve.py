#!/usr/bin/env python3
import os
import sys

os.chdir('/Users/juliaschirrmeister/Documents/Claude Portfolio/.claude/worktrees/inspiring-brattain')

port = int(os.environ.get('PORT', 8000))

from http.server import HTTPServer, SimpleHTTPRequestHandler

with HTTPServer(('', port), SimpleHTTPRequestHandler) as httpd:
    print(f'Serving on http://localhost:{port}', flush=True)
    httpd.serve_forever()
