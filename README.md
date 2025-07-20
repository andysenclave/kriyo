# 📌 Kriyo – Modern Task Tracker App

Kriyo is a **modern, predictive task tracking app** designed for individual productivity and team collaboration. It follows a **book-based modular UI architecture** with a scalable monorepo setup using **TurboRepo**.

The UI provides a **dashboard view** of tasks, overdue highlights, upcoming tasks, and projects, with an integrated calendar for easy navigation.

---

## 🖥️ UI Overview

### Landing Page
- **Hero Section** – Brief app introduction or user greeting
- **Today's Tasks Curve**
  - Shows tasks due today
  - Highlighted buttons for:
    - 🔵 Overdue Tasks (takes you to overdue view)
    - 🟠 Due Next Tasks (takes you to due next view)
- **Calendar Sidebar**
  - Interactive calendar to navigate tasks by date
- **Projects Section**
  - Displays projects overview
  - Add/Edit/Delete projects inline

### Modular Book-Based UI
- Every page is structured as a "Book" containing **Sections**
- Each Section handles a self-contained piece of UI logic and APIs

---

## ⚙️ Tech Stack

| Layer              | Technology                    | Notes                                   |
|--------------------|--------------------------------|-----------------------------------------|
| Frontend Framework | [Next.js](https://nextjs.org) | React-based framework with App Router  |
| Styling            | TailwindCSS / CSS Modules     | Scalable and themeable UI              |
| API Abstraction    | Axios                         | Common options + Interceptors setup    |
| State Management   | React Context (future Redux)  | For global state (auth, theme, etc.)   |
| Mock API           | MSW (Mock Service Worker)     | Local API simulation during dev        |
| Calendar           | react-big-calendar            | Full-featured interactive calendar     |
| Monorepo           | TurboRepo                     | Manage frontend, backend, shared code |
| Testing            | Jest, React Testing Library   | Unit + integration testing             |

---

## 🚀 Features

✅ Book-based UI architecture  
✅ Abstracted Axios services layer for APIs  
✅ Mock API with MSW for offline dev  
✅ Calendar integration for task dates  
✅ Modular, reusable UI components  
✅ Scalable TurboRepo structure for future backend & DevOps

---

## 📦 Folder Structure

```
kriyo/
├── apps/
│   └── kriyo-ui/src/app/         # Frontend app (Next.js)
│       ├── book/         # Page-level "books" (landing, etc.)
│       ├── components/   # Reusable UI elements
│       ├── services/     # Axios abstraction layer
│       ├── mocks/        # MSW handlers & setup
│       ├── models/       # TypeScript models
│       ├── pages/        # Next.js routes
│       ├── public/
│       ├── styles/
│       ├── .env.local    # Environment configs
│       └── README.md     # App-level docs
├── packages/
│   └── shared/           # Shared libs (for future)
├── infra/                # DevOps (future)
├── turbo.json            # TurboRepo pipeline
├── package.json          # Root dependencies
└── README.md             # Monorepo documentation
```

---

## 🔑 Environment Configuration

Create a `.env.local` file inside `apps/kriyo-ui`:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.kriyo.example.com
NEXT_PUBLIC_CALENDAR_LOCALE=en-US
NEXT_PUBLIC_FEATURE_FLAGS=beta
```

> 🔥 Tip: Use `.env.development.local` and `.env.production.local` for environment-specific configs.

---

## 🛠️ Prerequisites

- **Node.js** >= 18.x (LTS) ✅ Supports Next.js and MSW
- **npm** >= 9.x (for strict dependency resolution)
- Git (for version control)
- (Optional) Docker (for future backend/devops setup)

---

## 📥 Installation

Clone the repo and install dependencies:
```bash
# Clone the repository
git clone https://github.com/<your-username>/kriyo.git
cd kriyo

# Install all dependencies
npm install

# Start the development server
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

```bash
# Run unit tests
npm run test
```

---

## 🚀 Build for Production

```bash
npm run build
```