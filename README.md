# RevUp - Smart Technology Upgrade Advisor

A modern, full-stack SaaS platform that helps users optimize their device upgrade timing to maximize value and minimize costs. Built with Next.js 14, TypeScript, and a comprehensive design system.

## 🚀 Features

### Core Functionality
- **Device Portfolio Management**: Track and manage your technology devices
- **Smart Recommendations**: AI-powered suggestions for optimal upgrade timing
- **Analytics Dashboard**: Comprehensive insights into your tech portfolio performance
- **Market Intelligence**: Real-time market trends and pricing data
- **User Onboarding**: Seamless 3-step setup process

### Technical Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Animations**: Smooth Framer Motion animations throughout
- **State Management**: Robust Zustand stores for global state
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Custom design system with orange/black branding
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Next.js built-in bundler

## 📁 Project Structure

```
app/
├── (auth)/                 # Authentication pages
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── layout.tsx
├── (dashboard)/            # Dashboard pages
│   ├── dashboard/page.tsx
│   ├── devices/
│   │   ├── page.tsx
│   │   ├── add/page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── recommendations/page.tsx
│   ├── analytics/page.tsx
│   ├── settings/page.tsx
│   └── layout.tsx
├── onboarding/page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   ├── landing/            # Landing page components
│   └── providers.tsx       # Context providers
├── stores/                 # Zustand state stores
├── types/                  # TypeScript type definitions
├── lib/                    # Utility functions
├── hooks/                  # Custom React hooks
└── data/                   # Demo data and constants
```

## 🎨 Design System

### Brand Colors
- **Primary Orange**: `#FF6B35` - Primary buttons, active states, highlights
- **Orange Light**: `#FFB399` - Hover states, subtle backgrounds
- **Orange Dark**: `#E55A2B` - Pressed states, borders, focused elements
- **Deep Black**: `#0A0A0A` - Main text, navigation, headers
- **Pure White**: `#FFFFFF` - Card backgrounds, content areas
- **Neutral Grays**: Various shades for supporting elements

### Typography
- **Font Family**: Inter (modern sans-serif)
- **Spacing**: 8px grid system
- **Border Radius**: 8px for cards, 6px for buttons, 4px for inputs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd revup-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

### Key Responsive Features
- Collapsible sidebar that becomes a drawer on mobile
- Adaptive grid layouts
- Touch-optimized interactions
- Responsive typography and spacing

## 🎭 Animations

Comprehensive animation system using Framer Motion:

- **Page Transitions**: Smooth navigation between pages
- **Card Animations**: Hover effects and micro-interactions
- **Loading States**: Skeleton loaders and spinners
- **Stagger Animations**: Sequential element animations
- **Modal Animations**: Spring-based modal transitions

## 🔧 State Management

Zustand stores for different application domains:

### Auth Store (`src/stores/authStore.ts`)
- User authentication state
- Login/logout functionality
- Profile management

### Device Store (`src/stores/deviceStore.ts`)
- Device CRUD operations
- Filtering and sorting
- Portfolio statistics

### Recommendation Store (`src/stores/recommendationStore.ts`)
- Recommendation management
- Filtering and sorting
- Dismiss/snooze functionality

## 📊 Demo Data

The application includes comprehensive demo data:

- **6 Demo Users**: Diverse user profiles with different preferences
- **31+ Demo Devices**: Realistic device portfolio across categories
- **11+ Recommendations**: Smart upgrade suggestions with market insights
- **Market Insights**: Current trends and pricing data

## 🧪 Testing

### Manual Testing Checklist

#### Authentication & Onboarding
- [ ] Login with valid credentials
- [ ] Register new account
- [ ] Forgot password flow
- [ ] 3-step onboarding process
- [ ] Form validation and error handling

#### Core Application Pages
- [ ] Dashboard overview with statistics
- [ ] Device management (list, add, edit, delete)
- [ ] Recommendations with filtering
- [ ] Analytics with interactive charts
- [ ] Settings with all preference options

#### UI/UX Quality Standards
- [ ] Orange (#FF6B35) and deep black (#0A0A0A) consistently applied
- [ ] Professional SaaS-quality design throughout
- [ ] Responsive design working on all screen sizes
- [ ] Smooth animations and micro-interactions
- [ ] Loading states and error handling
- [ ] Accessibility standards met

#### Functionality Requirements
- [ ] All forms submit and validate properly
- [ ] State management working across all features
- [ ] Navigation working without broken links
- [ ] Demo data populated and realistic
- [ ] Charts and visualizations rendering correctly
- [ ] Search and filtering functional

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Optimized bundle sizes
- **Caching**: Efficient caching strategies
- **Loading States**: Skeleton loaders for better perceived performance

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Animations**: 60fps with proper easing
- **Accessibility**: WCAG 2.1 AA compliance

## 🔒 Security

### Security Features
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection
- **Secure Headers**: Security headers configuration

## 📈 Analytics & Monitoring

### Built-in Analytics
- **Portfolio Performance**: Value tracking over time
- **Device Depreciation**: Individual device performance
- **Market Intelligence**: Trend analysis and insights
- **User Behavior**: Interaction tracking and optimization

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use Tailwind CSS for styling
3. Implement responsive design patterns
4. Add proper error handling
5. Include loading states
6. Write accessible components

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow Next.js best practices
- Implement proper TypeScript types
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Stripe Dashboard, Linear, Notion
- **Chart Inspiration**: StockX charting capabilities
- **UI Components**: Custom components with modern design patterns
- **Icons**: Lucide React icon library
- **Fonts**: Inter font family

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo data for examples

---

**RevUp** - Optimizing your technology upgrade journey, one device at a time. 🚀
