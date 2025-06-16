# 🎧 Spotify Clone

A full-stack music streaming web application inspired by Spotify.  
This project features user authentication, playlist management, and audio playback with a clean and responsive UI.

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: [Prisma](https://www.prisma.io/) ORM, [PostgreSQL](https://www.postgresql.org/) (via Docker Compose)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) with **email/password** and **Google** sign-in providers
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: [Lucide](https://lucide.dev/), [Devicon](https://devicon.dev/), [React Icons](https://react-icons.github.io/react-icons)

 

## 🐳 Docker Setup

This project uses Docker Compose to spin up a PostgreSQL container for local development.

```bash
docker-compose up -d
