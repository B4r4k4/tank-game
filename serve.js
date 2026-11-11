// Local web server for the game: run `node serve.js` (or double-click start.bat),
// then open http://localhost:8765
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, PORT = 8765;
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.json':'application/json', '.mp3':'audio/mpeg' };
http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (p === root || p === root + path.sep) p = path.join(root, 'index.html');
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(d);
  });
}).listen(PORT, () => console.log(`Iron Bastion running at http://localhost:${PORT}  (Ctrl+C to stop)`));
