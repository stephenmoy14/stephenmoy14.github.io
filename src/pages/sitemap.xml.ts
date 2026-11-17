// Builds /sitemap.xml at build time (a tiny stand-in for @astrojs/sitemap).
// New top-level pages: add their path to `pages` below. Projects are added automatically.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const pages = ['/', '/about/', '/experience/', '/projects/', '/academics/', '/photos/', '/contact/'];

export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const paths = [...pages, ...projects.map((p) => `/projects/${p.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
