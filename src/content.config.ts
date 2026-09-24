// The "rules" for every piece of content on the site.
// If a Markdown or YAML file is missing a required field (or has a typo),
// `npm run dev` / `npm run build` fails with a message pointing at the file.
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// "2025-06" style month strings, used for jobs and school dates.
const month = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM, e.g. 2025-06');

// Set `placeholder: true` on anything that's still dummy content.
// It shows a visible PLACEHOLDER tag on the page so nothing slips through.
const placeholder = z.boolean().default(false);

const link = z.object({ label: z.string(), url: z.string() });

// ---------- Markdown collections (src/content/) ----------

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string().max(160, 'Keep the card summary under 160 characters'),
        status: z.enum(['in-progress', 'complete', 'archived']),
        date: z.coerce.date(), // used for sorting (newest first)
        tech: z.array(z.string()).default([]),
        repo: z.string().optional(),
        demo: z.string().optional(),
        cover: image().optional(), // path relative to the .md file, e.g. ../../assets/projects/x.png
        coverAlt: z.string().optional(),
        featured: z.boolean().default(false), // show on the home page
        draft: z.boolean().default(false), // hide from the site entirely
        placeholder,
      })
      .refine((d) => !d.cover || d.coverAlt, {
        message: 'coverAlt is required when cover is set',
        path: ['coverAlt'],
      }),
});

const hobbies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hobbies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100), // lower numbers show first
    draft: z.boolean().default(false),
    placeholder,
  }),
});

// ---------- YAML data (src/data/) ----------

const profile = defineCollection({
  loader: file('src/data/profile.yaml'),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    bio: z.string(),
    location: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    resume: z.string(), // path under public/, e.g. /resume.pdf
    links: z.array(link).default([]),
    skills: z.array(z.string()).default([]),
    placeholder,
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: month,
    end: month.optional(), // leave out for "Present"
    bullets: z.array(z.string()).default([]),
    placeholder,
  }),
});

const education = defineCollection({
  loader: file('src/data/education.yaml'),
  schema: z.object({
    school: z.string(),
    location: z.string().optional(),
    // One school can have several degrees (e.g. B.S. then Master's).
    degrees: z
      .array(
        z.object({
          name: z.string(),
          end: month, // graduation (or expected graduation)
          start: month.optional(),
          gpa: z.string().optional(),
          minor: z.string().optional(),
        }),
      )
      .min(1),
    courses: z.array(z.string()).default([]),
    honors: z.array(z.string()).default([]),
    placeholder,
  }),
});

const photos = defineCollection({
  loader: file('src/data/photos.yaml'),
  schema: z.object({
    file: z.string(), // filename inside src/assets/photos/
    alt: z.string().min(1, 'Every photo needs alt text'),
    caption: z.string().optional(),
    placeholder,
  }),
});

export const collections = { projects, hobbies, profile, experience, education, photos };
