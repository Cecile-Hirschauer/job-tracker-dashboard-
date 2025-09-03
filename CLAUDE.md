# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 job tracker dashboard application built with TypeScript, Prisma ORM, and PostgreSQL. The application helps users track job applications with companies, contacts, and application status management.

## Development Commands

### Package Manager
This project uses `pnpm` as the package manager.

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Production build with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Operations
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations in development
- `npm run db:migrate:deploy` - Deploy migrations to production
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio GUI
- `npm run db:reset` - Reset database and run migrations
- `npm run db:test` - Test Prisma connection

### Docker Development
- `docker-compose up -d postgres` - Start PostgreSQL database only
- `docker-compose up -d` - Start all services (PostgreSQL, Redis, PgAdmin, App)
- `docker-compose down` - Stop all services

## Architecture

### Database Schema
The application uses Prisma with PostgreSQL and includes these main entities:
- **User**: Main user accounts with authentication
- **Company**: Job target companies with details and notes
- **Contact**: Company contacts (recruiters, hiring managers)
- **Application**: Job applications with status tracking, priorities, and dates

### Key Relationships
- Users can have multiple Companies, Contacts, and Applications
- Applications belong to Companies and optionally link to Contacts
- All entities cascade delete when user is removed

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **UI**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **AI Integration**: Anthropic SDK and OpenAI SDK

### Project Structure
- `src/app/` - Next.js App Router pages and API routes
  - `(auth)/` - Authentication pages (login, register)
  - `(dashboard)/` - Main dashboard pages
  - `api/` - API endpoints for applications, companies, auth, AI integration
- `src/components/` - Reusable UI components organized by feature
- `src/lib/` - Utility functions, database config, auth setup, AI integrations
- `src/types/` - TypeScript type definitions
- `prisma/` - Database schema and migrations

### Environment Setup
Copy `.env.example` to `.env.local` and configure:
- `DATABASE_URL` for PostgreSQL connection
- `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for authentication
- AI API keys for Anthropic/OpenAI integration

### Docker Services
- **PostgreSQL**: Primary database on port 5432
- **Redis**: Caching layer on port 6379  
- **PgAdmin**: Database GUI on port 5050
- **App**: Next.js application on port 3000

The Docker setup includes health checks and proper service dependencies. Use the individual service commands for development to avoid running the full stack when not needed.