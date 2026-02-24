import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Vercel built-in geo (most reliable on Vercel deployments)
  const vercelCountry = (request as any).geo?.country;

  // 2. Cloudflare header (if behind Cloudflare CDN)
  const cfCountry = request.headers.get('cf-ipcountry');

  // 3. Generic header set by some proxies/load balancers
  const xCountry =
    request.headers.get('x-country') ||
    request.headers.get('x-vercel-ip-country');

  const country = vercelCountry || cfCountry || xCountry;

  // If we can resolve a country and it is NOT the US, block the request
  if (country && country.toUpperCase() !== 'US') {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Access Restricted</title>
    <style>
      body { font-family: sans-serif; display: flex; flex-direction: column;
             align-items: center; justify-content: center; min-height: 100vh;
             margin: 0; background: #f9fafb; color: #111827; }
      h1 { font-size: 2rem; margin-bottom: 0.5rem; }
      p  { color: #6b7280; }
    </style>
  </head>
  <body>
    <h1>Access Restricted</h1>
    <p>This website is only available to visitors in the United States.</p>
  </body>
</html>`,
      {
        status: 403,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on every route except Next.js internals and static assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|otf|css|js)).*)',
  ],
};
