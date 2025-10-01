# Homepage Components

Modern, animated homepage for Relynk built with Next.js 15 and Motion (Framer Motion).

## Components

### HomepageNavbar

- Fixed navigation with scroll effects
- Mobile-responsive with hamburger menu
- Smooth animations using Motion
- Links to features and CTA buttons

### HeroSection

- Animated gradient background
- Feature highlights with icons
- Animated mockup preview
- CTA buttons with hover effects
- Responsive design

### FeaturesSection

- 9 feature cards in a grid layout
- Hover animations with color gradients
- Icon animations on hover
- Viewport-triggered animations

### HowItWorksSection

- 4-step process visualization
- Numbered steps with connecting line
- Icon rotation animations
- Step-by-step guidance

### StatsSection

- Animated counters with custom formatting
- 4 key metrics display
- Social proof badges
- Technology stack showcase

### CTASection

- Prominent call-to-action
- Animated background gradients
- Trust indicators
- Badge with sparkles icon

### Footer

- Comprehensive link sections
- Social media links with hover effects
- Brand information
- Copyright and tech stack info

## Features

- **Server Component Compatible**: Main page.tsx is a server component
- **Client Components**: All interactive components use "use client" directive
- **Motion Animations**: Smooth animations using motion/react
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Performance**: Optimized animations with viewport triggers

## Usage

```tsx
import {
  HomepageNavbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  CTASection,
  Footer,
} from "@/components/features/homepage";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HomepageNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
```

## Customization

All components use Tailwind CSS classes and can be customized by:

- Modifying color schemes in `globals.css`
- Adjusting animation durations in component files
- Changing content in the component arrays
- Updating links and navigation items

## Dependencies

- `motion/react` - Animation library
- `lucide-react` - Icon library
- `next/link` - Next.js routing
- Tailwind CSS - Styling
- shadcn/ui components - UI primitives
