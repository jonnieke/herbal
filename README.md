# 🌿 HerbalCareHub

A comprehensive wellness web application focused on traditional herbal knowledge and natural health remedies. Built with modern technologies, featuring a clean, nature-inspired design optimized for accessibility and user engagement.

## ✨ Features

### 🌱 Herbal Knowledge Base
- **27+ Herbs Database**: Comprehensive information on global and African indigenous herbs
- **Detailed Profiles**: Benefits, preparation methods, safety information, and local names
- **Search & Filter**: Find herbs by category, benefits, or search terms
- **High-Quality Images**: Unique images for each herb

### 🏥 Wellness Categories
- **Mental Health**: Herbs for stress, anxiety, and cognitive support
- **Energy**: Natural energy boosters and vitality herbs
- **Sleep**: Herbs for better sleep and relaxation
- **Weight Balance**: Herbs for metabolism and weight management
- **General Wellness**: Overall health and immunity support

### 👥 Community Features
- **Wellness Community Center**: Share success stories and wellness journeys
- **User Engagement**: Comment, like, and interact with community posts
- **Email Integration**: User identification for community participation
- **Categories**: Success stories, questions, tips, and wellness journeys

### 🤖 AI Assistant
- **Floating Chatbot**: Get personalized herbal recommendations
- **Natural Language**: Ask questions about herbs and wellness
- **Contextual Responses**: Tailored advice based on your needs

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom nature-inspired design
- **Radix UI** components for accessibility
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management

### Backend
- **Node.js** with Express.js
- **TypeScript** throughout the full stack
- **In-memory storage** with interface for future database integration
- **RESTful API** design

### Database & ORM
- **Drizzle ORM** configured for PostgreSQL
- **Type-safe** database operations
- **Migration system** with Drizzle-kit

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd HerbalCareHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
HerbalCareHub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Static data
│   │   └── hooks/         # Custom React hooks
│   └── package.json
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared schemas and types
│   └── schema.ts
├── attached_assets/      # Images and static assets
└── package.json
```

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Environment Variables** (set in Vercel dashboard)
   - `NODE_ENV=production`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Run TypeScript type checking

## 📊 API Endpoints

### Herbs
- `GET /api/herbs` - Get all herbs
- `GET /api/herbs/:id` - Get specific herb
- `GET /api/herbs/search?q=query` - Search herbs
- `GET /api/herbs/category/:category` - Get herbs by category

### Community
- `GET /api/community/posts` - Get all community posts
- `POST /api/community/posts` - Create new post
- `GET /api/community/posts/:id/comments` - Get post comments
- `POST /api/community/comments` - Create comment
- `POST /api/community/posts/:id/like` - Like/unlike post

### Contact
- `POST /api/contact` - Submit contact form

## 🎨 Design System

### Color Palette
- **Primary**: Nature-inspired greens (#10B981, #059669)
- **Secondary**: Warm creams and soft browns
- **Accent**: Complementary colors for highlights

### Typography
- **Headings**: Modern, readable fonts
- **Body**: Clean, accessible text
- **Responsive**: Mobile-first design approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Traditional herbal knowledge and wisdom
- African indigenous healing practices
- Modern wellness research and studies
- Open source community contributions

## 📞 Support

For support, email support@herbalcarehub.com or create an issue in the repository.

---

**HerbalCareHub** - Connecting traditional wisdom with modern wellness 🌿✨
