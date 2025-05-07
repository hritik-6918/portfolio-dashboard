# Portfolio Dashboard

A modern, responsive, and interactive portfolio dashboard built with **Next.js**, **Tailwind CSS**, and **Radix UI components**, offering real-time updates of your stock investments and sector allocations.

## 🔧 Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) 15
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom themes
* **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
* **Data Visualization**: [Recharts](https://recharts.org/)
* **State & Forms**: React Hooks + react-hook-form + zod

## 📊 Features

* **Portfolio View**: Detailed breakdown of each holding, including real-time gain/loss, P/E ratios, and earnings.
* **Sector Analysis**: View allocation and performance of investments across sectors.
* **Real-Time Data**: Simulated live updates every 15 seconds using mock APIs.
* **Responsive UI**: Optimized for all screen sizes with adaptive layout.

## 🔹 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hritik-6918-portfolio-dashboard.git
cd hritik-6918-portfolio-dashboard
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Visit `http://localhost:3000` to see the dashboard in action.

## 🔌 Project Structure

```
hritik-6918-portfolio-dashboard/
├── app/               # App routes (Next.js App Router)
│   ├── api/           # Mock API endpoints for stocks & sectors
│   ├── layout.tsx     # App-wide layout wrapper
│   └── page.tsx       # Home page with tabs
├── components/        # Reusable UI components
│   ├── portfolio-table.tsx
│   ├── sector-summary.tsx
│   └── ui/            # UI primitives from shadcn/ui
├── hooks/             # Custom React hooks
├── lib/               # Utilities and types
├── styles/            # Tailwind and global styles
├── public/            # Static assets (e.g. preview image)
├── tailwind.config.ts
└── tsconfig.json
```

## 📢 API Mock Endpoints

* `GET /api/stocks` — Returns mocked stock holdings with simulated real-time data.
* `GET /api/sectors` — Returns aggregated sector data with value changes.

These APIs simulate real-time fluctuations for a realistic dashboard experience.

## ⚖️ Components and Utilities

* **portfolio-table.tsx**: Displays live-updated table of individual holdings.
* **sector-summary.tsx**: Visual breakdown of sectors with progress bars and gain/loss.
* **ui/**: Modular UI primitives like Button, Card, Tabs, Toast, etc.
* **utils.ts**: Formatters for currency, percentages, and reusable helpers.

## 💡 Customization

You can update the `mock data` in `app/api/stocks/route.ts` and `app/api/sectors/route.ts` to reflect your own portfolio.

Themes and color schemes are managed through `tailwind.config.ts` and `app/globals.css`.

## 🔧 Build and Deployment

```bash
pnpm build
pnpm start
```

Ensure you configure your `next.config.mjs` if deploying on platforms like Vercel.

## 🚀 Future Improvements

* Integration with real stock APIs (Yahoo/Google Finance)
* User authentication
* Historical charts and performance metrics
* Export reports (PDF/CSV)
