# NEXA 🚀

**Nexa** is a modern community platform where people can chat, create their own communities, meet new people, and build groups around shared interests.

## Features

- 🎯 **Communities** - Create and join communities around shared interests
- 💬 **Text Chat** - Fast, responsive messaging with reactions and replies
- 🎤 **Voice Chat** - High-quality voice communication (coming soon)
- 👥 **Profiles** - Customizable profiles with levels, badges, and status
- 🔍 **Discover** - Find new communities through powerful discovery system
- 🛡️ **Safety** - Built-in moderation, reporting, and anti-spam
- ⚡ **Fast & Simple** - Designed to be easier and faster than competitors

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Node.js
- **Database**: PostgreSQL + Prisma ORM
- **Real-time**: Socket.io for chat and live features
- **Auth**: NextAuth.js + Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (for auth)

### Installation

```bash
# Clone the repository
git clone https://github.com/kallelonqvist-hue/Nexa.git
cd Nexa

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Update .env.local with your credentials

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
Nexa/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and helpers
│   ├── types/               # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   └── store/               # Zustand state management
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
└── README.md
```

## Development

### Running the dev server

```bash
npm run dev
```

### Database management

```bash
# Create migration
npm run db:migrate

# View database in Prisma Studio
npm run db:studio

# Push schema changes
npm run db:push
```

## Contributing

This project is actively under development. We welcome contributions!

## License

MIT

## Author

Kalle L (@kallelonqvist-hue)
