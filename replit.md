# Herbal Care Hub

## Overview

Herbal Care Hub is a mobile-friendly wellness web application that focuses on traditional herbal knowledge and natural health remedies. The platform provides educational content about global and African indigenous herbs, wellness categories, and traditional preparation methods. Built as a full-stack application with modern technologies, it features a clean, nature-inspired design optimized for accessibility and user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom nature-inspired color palette (greens, creams, soft browns)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for RESTful API endpoints
- **Language**: TypeScript throughout the full stack for consistency
- **Data Layer**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints for herbs management, search functionality, and contact form submissions

### Database Schema Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: 
  - Users table for future authentication features
  - Herbs table with comprehensive metadata (name, local names, benefits, categories, preparation methods, safety info)
  - Contact messages table for user inquiries
- **Migration System**: Drizzle-kit for database schema migrations

### Development Features
- **Hot Reload**: Vite development server with HMR for rapid development
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Code Quality**: Consistent import aliases and path resolution
- **Mobile-First**: Responsive design with mobile breakpoint detection hooks

### Content Management
- **Herb Categories**: Mental Health, Energy, Sleep, Weight Balance, General Wellness
- **Regional Classification**: Global herbs vs. African indigenous herbs with local names
- **Search Functionality**: Name-based and condition-based herb discovery
- **Educational Content**: Safety information, preparation methods, and traditional uses

## External Dependencies

### Database & Storage
- **Neon Database**: PostgreSQL-compatible serverless database for production
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL adapter
- **connect-pg-simple**: PostgreSQL session store for future session management

### UI & Styling
- **Radix UI**: Comprehensive collection of accessible, unstyled React components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for clean, readable typography

### Development & Build
- **Vite**: Build tool with React plugin and runtime error overlay
- **React Hook Form**: Form handling with validation resolvers
- **Zod**: Runtime type validation and schema validation
- **TanStack React Query**: Server state management and data fetching

### Hosting & Deployment
- **Replit**: Development and hosting platform with integrated deployment
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **Express.js**: Web application framework for API server

## Recent Changes

### September 4, 2025 - Complete Deployment Module Resolution Fix (Updated)
- **Issue**: Deployment was failing with "Cannot find module '/home/runner/workspace/dist/server/routes'" error during production build
- **Root Cause**: Conflicting TypeScript module resolution settings and problematic build script causing ES module import failures
- **Fixes Applied**:
  1. **TypeScript Config**: Updated `tsconfig.server.json` to use consistent "Node16" module resolution instead of conflicting "bundler" setting
  2. **Build Script Simplification**: Removed complex sed command from build process since TypeScript files already have correct .js extensions
  3. **File Cleanup**: Removed duplicate .js files that were causing module resolution conflicts
  4. **Deployment Config**: Set up proper autoscale deployment configuration
- **Technical Details**:
  - Changed `tsconfig.server.json` from `"moduleResolution": "bundler"` to `"moduleResolution": "Node16"` for consistency
  - Simplified build script from complex sed operations to straightforward TypeScript compilation
  - TypeScript source files already had correct .js extensions for ES module imports (e.g., `./routes.js`, `../shared/schema.js`)
  - Cleaned up duplicate JavaScript files that were interfering with module resolution
- **Verification**: Production server builds and starts successfully, all modules load correctly, deployment configuration verified
- **Deployment Status**: Fully resolved - ready for production deployment with proper ES module resolution