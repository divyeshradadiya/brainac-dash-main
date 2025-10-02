# 🧠 Brainac Admin Dashboard

React admin dashboard frontend for the Brainac educational platform, providing a comprehensive interface for managing users, content, subscriptions, and platform analytics.

## 🌟 Features

### 🎨 Modern UI/UX
- **Responsive Design** with Tailwind CSS
- **Glass Morphism Effects** and gradient backgrounds
- **Dark Mode Support** with next-themes
- **Component Library** with shadcn/ui components
- **Advanced Charts** with Recharts for analytics

### 📊 Admin Dashboard Functionality
- **User Management** - View, edit, search, and manage user accounts
- **Content Management** - Administer subjects, videos, and educational content
- **Payment Analytics** - Monitor subscriptions, payments, and revenue
- **System Administration** - Comprehensive admin controls
- **Real-time Data** with React Query for efficient data fetching

### 🔐 Authentication & Security
- **Admin JWT Authentication** for secure dashboard access
- **Firebase Integration** for user authentication
- **Role-based Access Control** for admin features
- **Secure API Communication** with token management

### 📱 User Interface Pages
- **Dashboard Overview** - Key metrics and analytics
- **User Management** - Complete user administration
- **Subject Management** - Organize educational subjects
- **Video Management** - Manage video content library
- **Payment Tracking** - Monitor subscription payments
- **Settings** - Platform configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (optional):**
   Create `.env.local` if you want to customize API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The dashboard will run on `http://localhost:5173`

## 💡 Key Technologies

- **React 18** with **TypeScript**
- **Vite** for fast build and development
- **Tailwind CSS** for styling with custom animations
- **shadcn/ui** for component library with Radix UI primitives
- **React Query (TanStack)** for server state management
- **React Router** for client-side routing
- **React Hook Form** with Zod validation
- **Firebase SDK** for authentication
- **Recharts** for data visualization
- **Lucide React** for icons
- **Date-fns** for date manipulation

## 📱 Responsive Design

- **Mobile-first approach** with responsive breakpoints
- **Touch-friendly interfaces** for mobile devices
- **Optimized performance** for various screen sizes
- **Progressive Web App** ready architecture

## 🚀 Deployment

1. Build for production: `npm run build`
2. Build for development: `npm run build:dev`
3. Deploy static files to Vercel, Netlify, or similar
4. Configure environment variables
5. Update CORS settings in backend

## 🔧 Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run build:dev  # Build for development
npm run preview    # Preview production build
npm run lint       # Lint code
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for education and learning**