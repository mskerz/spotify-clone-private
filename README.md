# 🎧 Spotify Clone

**Project Type:**  
A full-stack music streaming web application, similar to Spotify, with user authentication, playlist management, and audio playback.

**Key Features:**
- User Authentication (email/password, Google)
- Browse and search songs
- Create and manage playlists
- Basic audio playback (fake)
- Admin dashboard for managing songs and categories


**Tech Stack:**  
💻 **Frontend:** Next.js, TypeScript, React Icons  
🗄️ **Backend / Database:** PostgreSQL, Prisma, Redis  
🔒 **Authentication:** Firebase Auth (Email/Password, Google)  
🎨 **UI / Styling:** TailwindCSS, Shadcn UI, Lucide, Devicon  
⚡ **State Management / API:** Redux Toolkit, Axios

**Overview of the System:**  
 
```
flowchart TB
    subgraph Frontend
        A[Next.js UI] -->|Uses| B[Shadcn UI & TailwindCSS]
        A -->|State Management| C[Redux Toolkit]
        A -->|HTTP Requests| D[Axios]
    end

    subgraph Backend
        E[Next.js API Routes] -->|Query DB| F[Prisma ORM]
        F --> G[PostgreSQL Database]
        E -->|Cache| H[Redis]
        E -->|Auth| I[Firebase Authentication]
    end

    Frontend -->|Send Request| Backend

    style Frontend fill:#f9f,stroke:#333,stroke-width:2px
    style Backend fill:#bbf,stroke:#333,stroke-width:2px

```



## 🐳 Docker Setup

This project uses Docker Compose to spin up a PostgreSQL container for local development.

```bash
docker-compose up -d
