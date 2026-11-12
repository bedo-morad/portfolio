// Minimal static server for the Playwright suite. Astro's `preview` command
// starts a background server and exits, which Playwright reads as a crash.
// This stays in the foreground so the test runner can start and stop it.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT ?? 4391);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function resolveFile(pathname) {
  const relative = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  if (relative.startsWith('..')) return null;

  let file = join(root, relative);
  if (pathname.endsWith('/')) file = join(file, 'index.html');

  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, 'index.html');
    return file;
  } catch {
    return null;
  }
}

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  const file = await resolveFile(url.pathname);

  if (!file) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-type':
        contentTypes[extname(file)] ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Failed to read file');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview server listening on http://127.0.0.1:${port}`);
});
