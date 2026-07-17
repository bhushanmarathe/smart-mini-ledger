# 💰 Smart Mini Ledger

A modern full-stack personal finance application built with **NestJS**, **React**, **TypeScript**, **Prisma**, and **PostgreSQL**. It allows users to manage income and expenses, visualize spending trends, receive intelligent financial insights, and simulate savings.

---

## 🚀 Live Demo

**Frontend:** https://smart-mini-ledger-alpha.vercel.app/

**Backend API:** https://smart-mini-ledger-jdmj.onrender.com

---

## ✨ Features

### Transaction Management

- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- Categorize transactions
- Date-based transaction tracking

### Dashboard

- Total Income
- Total Expenses
- Current Balance

### Data Visualization

- Cash Flow Bar Chart
- Expense Distribution Pie Chart

### Financial Health

- Savings Rate
- Expense Ratio
- Balance Status
- Financial Health Score

### Smart Insights

- Spending analysis
- Income vs Expense analysis
- Financial recommendations
- Large expense detection

### Savings Simulator

Simulate reducing spending in any expense category and instantly see:

- Monthly savings
- Yearly savings
- Projected balance
- Updated savings rate

### Filtering

- Search transactions
- Filter by type
- Filter by category
- Reset filters

### Export

- Export all transactions to CSV

### Notifications

- Success notifications
- Error notifications
- Large expense alerts

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Axios
- React Hot Toast
- Recharts

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Class Validator

## Database

- PostgreSQL

## Deployment

- Vercel
- Render
- Docker
- Docker Compose

---

# 📁 Project Structure

```
smart-mini-ledger/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# 🏗 Architecture

```
React (Frontend)
        │
        │ REST API
        ▼
NestJS Backend
        │
     Prisma ORM
        │
        ▼
 PostgreSQL Database
```

---

# ⚙ Local Setup

## Clone repository

```bash
git clone https://github.com/bhushanmarathe/smart-mini-ledger.git

cd smart-mini-ledger
```

---

## Backend

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ledger"

PORT=3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start backend

```bash
npm run start:dev
```

Backend runs at

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:3000
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🐳 Docker Setup

Ensure Docker Desktop is running.

From the project root:

```bash
docker compose up --build
```

Services

| Service    | Port |
| ---------- | ---- |
| Frontend   | 5173 |
| Backend    | 3000 |
| PostgreSQL | 5432 |

Stop containers

```bash
docker compose down
```

---

# ☁ Deployment

## Backend

Hosted on Render.

Build Command

```bash
npm install && npm run build && npx prisma generate && npx prisma migrate deploy
```

Start Command

```bash
npm run start:prod
```

---

## Frontend

Hosted on Vercel.

Environment Variable

```env
VITE_API_URL=https://smart-mini-ledger-jdmj.onrender.com
```

---

# 📊 API Endpoints

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | /transactions         | Get all transactions |
| GET    | /transactions/summary | Dashboard summary    |
| POST   | /transactions         | Create transaction   |
| PATCH  | /transactions/:id     | Update transaction   |
| DELETE | /transactions/:id     | Delete transaction   |

---

# 📸 Screenshots

Add screenshots of:

- Dashboard
- Charts
- Smart Insights
- Savings Simulator
- Transaction Management
- Filters
- CSV Export

---

# 🤖 AI Tools Used

During development I intentionally used AI to accelerate repetitive development while applying my own engineering judgment to design, debugging, and refinement.

AI tools used:

- ChatGPT
- GitHub Copilot

AI assisted with:

- Initial project scaffolding
- Boilerplate generation
- API structure
- Component templates
- Docker configuration
- README drafting

---

# ⚠ Where AI Fell Short

Several AI-generated suggestions required manual intervention.

Examples include:

- Incorrect React component structure causing duplicate form fields.
- Docker configuration issues that prevented successful builds.
- Prisma migration problems during deployment.
- Incorrect state handling in the Savings Simulator.
- Frontend environment configuration that pointed to localhost after deployment.
- Build errors caused by unused TypeScript variables.
- Data synchronization issues after transaction updates.

These issues were diagnosed and fixed through debugging, testing, and engineering judgment rather than relying solely on AI-generated code.

---

# 👨‍💻 Human Engineering Contributions

Beyond the AI-generated boilerplate, I implemented several improvements:

- Designed an interactive Savings Simulator for financial planning.
- Added Smart Insights based on transaction patterns.
- Implemented Financial Health metrics.
- Built CSV export functionality.
- Added transaction filtering with search, category, and type filters.
- Implemented toast notifications and large expense alerts.
- Configured Docker and Docker Compose for containerized development.
- Deployed the application using Render and Vercel.
- Improved validation, error handling, and overall user experience.
- Resolved deployment and Prisma migration issues across environments.

---

# 🔮 Future Enhancements

Potential future improvements include:

- User authentication
- Multiple accounts
- Monthly budgeting
- Recurring transactions
- Email notifications
- PDF export
- Dark mode
- AI-powered spending predictions
- Expense forecasting
- Goal-based savings planner

---

# 👤 Author

**BHUSHAN VILAS MARATHE**

GitHub: https://github.com/bhushanmarathe

LinkedIn: www.linkedin.com/in/bhushanmarathe

---
