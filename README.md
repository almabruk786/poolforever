# POOL FOREVER

Premium Next.js website and admin CMS for a luxury swimming pool company.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Swiper.js
- Next.js API routes as the Node.js backend
- MongoDB for CMS persistence
- JWT cookie auth with bcrypt password hashing

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin login:

- Username: `admin`
- Password: `Miraj@2026`

## Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
MONGODB_URI=
JWT_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_FACEBOOK_URL=
NOTIFICATION_EMAIL_TO=
```

Password changes require `MONGODB_URI`, because the updated encrypted password must be persisted.

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

The site builds without external font-fetching, so Vercel deployment stays fast and reliable.

## Notes

The current CMS upload endpoint stores uploaded assets as data URLs in MongoDB for a portable starter setup. For heavy production galleries, connect Supabase Storage, S3, Cloudinary, or another object storage provider and save returned URLs in the same CMS fields.
