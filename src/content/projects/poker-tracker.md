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

## The problem

My family and I play poker at home, and keeping track of buy-ins, side pots and who owes whom at the end of the night was always a mess. So I built a web app for it.

## What I built

The host enters each action as it happens, or the totals at the end of a hand. The app handles the rules: it posts blinds, tracks whose turn it is and what bets are legal, splits all-ins into side pots, and divides split pots down to the last chip. At the end of the night it works out the fewest payments to settle everyone up. It also supports chip-only games, players joining mid-game, and an oval table view that highlights who's up next.

## Shared games

Games can be shared between phones. The host starts a room, everyone else joins with a 6-character code, and each player can enter their own actions on their turn while everyone's screen updates live.

## How it's built

The poker rules are a pure TypeScript engine, kept free of UI and database code by a lint rule. Every game is stored as a log of events, and the current state is rebuilt by replaying them, which makes undo and editing past hands straightforward.

The engine is covered by unit tests plus property tests that play thousands of random hands and check that no chips are ever created or lost. Shared games run on Supabase (Postgres with row-level security, rate limits and live updates) behind a React front end hosted on Vercel.

The app is complete and working, and I'm still adding enhancements.
