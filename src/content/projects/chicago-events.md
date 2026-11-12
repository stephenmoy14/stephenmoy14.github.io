---
title: Chicago Events
summary: What can I do in Chicago in the next 30 days? A daily pipeline pulls events from four sources, merges duplicates and hides anything that's over, and a mobile-first site lets you filter what's left.
status: in-progress
date: 2026-11-01
tech: [Python, Next.js, TypeScript, PostgreSQL, Supabase, GitHub Actions, Vercel]
demo: https://events-app-chicago.vercel.app/
featured: true
---

## The problem

Finding things to do in Chicago means checking a handful of sites that each list only part of what's on, often with the same event posted twice and old events left up. I wanted one place that answers a simple question: what can I do in the next month?

## What I built

Every morning a pipeline pulls upcoming events from Ticketmaster, Eventbrite, the Chicago Public Library and Choose Chicago. It cleans them into one shared format, merges the same event when it shows up on more than one site, sorts everything into 12 categories, and works out the neighborhood from each event's location. Events that have ended, or that drop off their source, are hidden automatically.

The website shows one day at a time with a day strip and a month calendar, and you can filter by date range, category, price, time of day, neighborhood or keyword. Every filter lives in the URL, so any view can be bookmarked or shared, and the filters work even without JavaScript.

## How it's built

The pipeline is Python, run on a daily GitHub Actions schedule. Each source is a small fetcher that returns the same event model, so adding a source never touches the database or the website, and a new WordPress or library site only needs a few lines of config. Fetchers use the JSON feeds the sites' own pages load rather than scraping HTML, wait between requests, and follow each site's robots.txt and terms. I skipped a source whose terms forbid scraping.

Duplicates are matched on title, start time (within 30 minutes) and venue, using Chicago dates so evening shows don't split across days. They're hidden, never deleted, and recomputed every run, so a wrong match fixes itself when the rules improve. Neighborhoods come from a point-in-polygon check against the city's 77 community areas, in plain Python with no extra database extension.

Each run logs per-source results, retries timeouts and rate limits with backoff, and fails loudly after three failures in a row. Events are stored in Postgres on Supabase with row-level security, and the Next.js site on Vercel reads them server-side. Parser tests run against saved responses from each source, and every push typechecks and builds the site.

## What's next

I'm finishing email sign-in so people can save events and set default filters, then adding more sources, starting with the Chicago Park District.
