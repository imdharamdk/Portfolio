import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { handlePortfolioChat } from './nvidiaAssistant.js';

const port = Number(process.env.PORT || 4173);
const distDir = join(process.cwd(), 'dist');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  const filePath = normalize(join(distDir, requestedPath));
  const safePath = filePath.startsWith(distDir) && existsSync(filePath) ? filePath : join(distDir, 'index.html');
  const contentType = contentTypes[extname(safePath)] || 'application/octet-stream';

  response.writeHead(200, { 'Content-Type': contentType });
  createReadStream(safePath).pipe(response);
}

createServer((request, response) => {
  if (request.url?.startsWith('/api/portfolio-chat')) {
    handlePortfolioChat(request, response);
    return;
  }

  serveStatic(request, response);
}).listen(port, () => {
  console.log(`Portfolio server running at http://127.0.0.1:${port}`);
});
