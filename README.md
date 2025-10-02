# 🧠 Brainac Admin Dashboard

React admin dashboard frontend for the Brainac educational platform, providing a modern UI for managing educational content, user subscriptions, and platform administration.

## 🌟 Features

### 🎨 Modern UI/UX
- **Responsive Design** with Tailwind CSS
- **Glass Morphism Effects** and gradient backgrounds
- **Dark Mode Support** (ready)
- **Component Library** with shadcn/ui components

### 📊 Dashboard Functionality
- **User Management** with class-based profiles
- **Subscription Monitoring** and payment tracking
- **Content Administration** for subjects and videos
- **Progress Analytics** and engagement metrics

### 🔐 Integrated Authentication
- **Firebase Authentication** for secure admin access
- **Role-based Access Control** for admin features
- **Session Management** with automatic token refresh

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
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Firebase SDK** for client-side auth
- **React Router** for navigation

## 📱 Responsive Design

- **Mobile-first approach** with responsive breakpoints
- **Touch-friendly interfaces** for mobile devices
- **Optimized performance** for various screen sizes
- **Progressive Web App** ready architecture

## 🚀 Deployment

1. Build for production: `npm run build`
2. Deploy static files to Vercel, Netlify, or similar
3. Configure environment variables
4. Update CORS settings in backend

## 🔧 Development Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for education and learning**