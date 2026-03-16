const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const ROUTES = {
  '/':          'index.html',      // hub ia.jovemrico.com
  '/jrdiario':  'jrdiario.html',   // sales JR DIÁRIO
  '/jrpayout':  'jrpayout.html',   // sales JR PAYOUT
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0].replace(/\/$/, '') || '/';
  const file = ROUTES[url] || ROUTES['/'];
  if (!ROUTES[url] && url !== '/') { res.writeHead(302, { Location: '/' }); res.end(); return; }
  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
}).listen(PORT, () => console.log('ia.jovemrico.com na porta ' + PORT));
