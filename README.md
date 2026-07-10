# Aiventra Studio

Aiventra Studio is a modern, state-of-the-art interactive agency platform built to showcase specialized software engineering cells, dynamic pricing configurators, and portfolio assets.

Rather than charging rigid, fixed subscription packages, Aiventra Studio lets clients prototype, specify, and price their custom software system in real-time.

---

## Key Features

### 1. Dynamic Build Cost Estimator (`/build`)
- **Sephora-Style Configurator**: Clients select components step-by-step (Base Platform, Design Scope, Database, Security, Third-Party Integrations, Support SLAs).
- **Real-Time Calculation**: Displays instant budget subtotals, VAT, and final prices based on selections.
- **Flexible Timelines & Payments**: Toggle between one-off upfront payments (with discounts) or monthly milestone plans.
- **Support Plans (Aiventra Care)**: Choose monitoring and SLA coverage (Standard, Care, Care Pro).

### 2. Interactive Viewport Configurator (`/configurator`)
- Interactive canvas displaying simulated Desktop, Tablet, and Mobile device frame viewports simultaneously.
- Live updates of custom layout selections.

### 3. Core Pages & Layouts
- **Landing Page**: Immersive dark modes, dynamic gradients, infinite marquee team cards, testimonials, and growth banner widgets.
- **Roster Marquee**: Showcases team members (Peter, Shayor, Comfort, Enoch, Femi) with smooth LinkedIn hover icon shortcuts.
- **Interactive Cal.com Scheduler**: Floating animated "Book my Cal" button that triggers a month-view Cal.com scheduling popup.
- **Legal Compliance Pages**: Dedicated Privacy Policy (`/privacy`) and Terms & Conditions (`/terms`) pages.
- **Custom Not Found Page**: Themed 404 page featuring an vector icon which dynamically colors itself according to the active theme (Gold / Blue).

### 4. Technical Specifications
- **Framework**: Next.js 15.5 (App Router)
- **Styling**: Tailwind CSS & CSS Variables
- **Animations**: Framer Motion
- **Interactions**: Dynamic Theme Provider (Gold, Blue, Light), Canvas Confetti, Lucide React Icons

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (Recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jossyboydgenius/Aiventra-Studio.git
   cd Aiventra-Studio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

Build the production bundle:
```bash
pnpm build
```

The production-ready assets will be compiled in the `.next` directory.
