const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const ROUTES = {
  '/jrdiario': 'jrdiario.html',
  '/jrpayout': 'jrpayout.html',
  // próximos produtos: '/jrx': 'jrx.html'
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0].replace(/\/$/, '') || '/';

  if (ROUTES[url]) {
    const file = path.join(__dirname, ROUTES[url]);
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end('Página não encontrada'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Raiz → redireciona pro jrdiario por enquanto
  if (url === '/') {
    res.writeHead(302, { Location: '/jrdiario' });
    res.end();
    return;
  }

  res.writeHead(404);
  res.end('Página não encontrada');

}).listen(PORT, () => {
  console.log('ia.jovemrico.com hub na porta ' + PORT);
  console.log('Rotas:', Object.keys(ROUTES).join(', '));
});
