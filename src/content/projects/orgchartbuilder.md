---
title: OrgChartBuilder
summary: A HubSpot app that turns CRM contacts into editable org charts. I led its development at NextRow Digital, and it now has 60+ customer installs.
status: complete
kind: work
date: 2025-06-01 # TODO: set to roughly when it launched
tech: [Java, React, PostgreSQL, OAuth, HubSpot API]
# Hidden until NextRow confirms it's OK to publish. Then set draft: false.
draft: true
placeholder: true
---

<!-- No code or confidential details here. Add a screenshot only if NextRow allows it. -->

## Problem

<!-- TODO: in your own words: what were sales teams missing in HubSpot? -->
Sales teams selling into larger companies need to see who reports to whom at an account, and HubSpot has no built-in way to map that out.

## What I built

OrgChartBuilder is a HubSpot integration that syncs contacts from the CRM and lets users arrange them into an org chart. I led development and coordinated the engineering work across a small team. <!-- TODO: team size --> The app supports 60+ customer installations.

- **CRM sync and contact mapping** through the HubSpot API, with OAuth for installs.
- **A custom React diagram editor** with drag-and-drop, dynamic node rendering and hierarchical layouts.
- **PostgreSQL data models** designed for deep, changing org hierarchies.

<!-- TODO: add an architecture diagram (HubSpot ↔ OAuth ↔ Java API ↔ Postgres, React editor). -->

## Key decisions & trade-offs

<!-- TODO: match these to your interview stories, e.g. why a custom editor over a library,
     how the hierarchy is stored in Postgres, and how sync conflicts are handled. -->

## How I tested it

<!-- TODO -->

## What I'd do next

<!-- TODO -->
