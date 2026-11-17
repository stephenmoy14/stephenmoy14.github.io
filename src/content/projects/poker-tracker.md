---
title: Poker Tracker
summary: A web app for tracking in-person Texas Hold'em home games. It handles blinds, turn order, side pots, split pots and settle-up, and phones can share one game live from a room code.
status: complete
date: 2026-09-01
tech: [React, TypeScript, Vite, Supabase, Postgres, Vercel]
repo: https://github.com/stephenmoy14/poker-tracker
demo: https://poker-tracker-umber-one.vercel.app/
cover: ../../assets/projects/table-diagram.png
coverAlt: Poker Tracker on a phone, showing the oval table view with three players, the pot, and Fold, Call and Raise buttons for the player to act
featured: true
---

<!-- Every project page uses the same sections:
     Problem → What I built → Key decisions & trade-offs → How I tested it → What I'd do next -->

## Problem

My family and I play poker at home, and keeping track of buy-ins, side pots and who owes whom at the end of the night was always a mess. So I built a web app for it.

## What I built

The host enters each action as it happens, or the totals at the end of a hand. The app handles the rules: it posts blinds, tracks whose turn it is and what bets are legal, splits all-ins into side pots, and divides split pots down to the last chip. At the end of the night it works out the fewest payments to settle everyone up. It also supports chip-only games, players joining mid-game, and an oval table view that highlights who's up next.

Games can be shared between phones. The host starts a room, everyone else joins with a 6-character code, and each player can enter their own actions on their turn while everyone's screen updates live.

<!-- TODO: add an architecture diagram, e.g. ![Poker Tracker architecture](../../assets/projects/poker-tracker-architecture.svg) -->

## Key decisions & trade-offs

- **A pure rules engine.** The poker rules are a TypeScript engine with no UI or database code, and a lint rule keeps it that way. That makes the hardest logic easy to test on its own.
- **An event log, not saved state.** Every game is stored as a log of events, and the current state is rebuilt by replaying them. Undo and editing past hands come almost for free.
- **Supabase for shared games.** Postgres with row-level security, rate limits and live updates gave me multiplayer rooms without running my own server.

## How I tested it

The engine is covered by unit tests plus property tests that play thousands of random hands and check that no chips are ever created or lost.

## What I'd do next

The app is complete and working, and I'm still adding enhancements.
<!-- TODO: name the next one or two specific enhancements here. -->
