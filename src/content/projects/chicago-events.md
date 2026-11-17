---
title: Chicago Events
summary: A site that pulls Chicago events from several sources into one list, drops outdated listings, and focuses on what's happening in the next month.
status: in-progress
kind: personal
date: 2026-11-01
# TODO: confirm the tech list matches the real stack.
tech: [TypeScript, Next.js, Supabase, GitHub Actions, Vercel]
repo: https://github.com/stephenmoy14/events-app
demo: https://events-app-chicago.vercel.app/
# TODO: add a cover screenshot, then uncomment:
# cover: ../../assets/projects/chicago-events.png
# coverAlt: Chicago Events showing ...
featured: false # set to true once the write-up and screenshot are done
placeholder: true # remove once you've reviewed this write-up
---

## Problem

Things to do in Chicago are spread across Eventbrite, venue calendars and the city's own events page, and a lot of what turns up in search is already over. I wanted one place to see what I could actually go to in the next month.

## What I built

Scrapers collect events from the Eventbrite API, local venue calendars and the city's events page. The site combines them into one list, removes duplicates of the same event from different sources, and filters out anything that has already happened.

<!-- TODO: add an architecture diagram, e.g. ![Chicago Events architecture](../../assets/projects/chicago-events-architecture.svg) -->

## Key decisions & trade-offs

- **My own scrapers on GitHub Actions.** Scheduled workflows keep the cost close to zero. A paid scraping service (Apify) stays as a backup only if a source gets hard to scrape.
- **Only sources worth the cost.** I dropped Meetup because its API needs a paid Pro plan, and I'm checking other sources one by one before adding them.
- **Starting with one city.** Keeping it to Chicago let me focus on very local sources first.

<!-- TODO: add how duplicates are matched across sources, a good interview talking point. -->

## How I tested it

<!-- TODO: describe tests, e.g. fixtures of saved pages for each scraper, dedup test cases. -->
Coming soon.

## What I'd do next

Sign-in and saved events, then more Chicago sources.
