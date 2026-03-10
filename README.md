# FinTrack — Dashboard Financeiro Pessoal

> Gerencie receitas, despesas e metas financeiras com clareza e simplicidade.

---

## Stack

| Camada       | Tecnologia                              |
|--------------|----------------------------------------|
| Front-end    | Next.js 14 (App Router) + TypeScript   |
| Estilização  | Tailwind CSS                           |
| Back-end     | Node.js + Express + TypeScript         |
| Banco        | PostgreSQL + Prisma ORM                |
| Autenticação | JWT + bcrypt                           |
| Gráficos     | Recharts                               |
| Testes       | Jest + Testing Library                 |
| Deploy       | Vercel (front) + Railway (back + DB)   |

---

## Funcionalidades

- **Autenticação** — Cadastro e login com JWT; rotas protegidas via middleware
- **Transações** — Cadastrar receitas e despesas por categoria; filtrar por mês/ano
- **Dashboard** — Saldo atual, gráfico de barras (receitas vs despesas), gráfico de pizza (gastos por categoria) e últimas 5 transações
- **Alertas** — Aviso visual quando 80%+ do limite mensal por categoria for atingido

---

## Estrutura de pastas

```
/FinTrack
  /backend
    /prisma
      schema.prisma     # Modelos: User, Transaction, Category, Alert
      seed.ts           # Seed das categorias padrão
    /src
      /controllers      # authController, transactionController
      /routes           # authRoutes, transactionRoutes
      /middlewares      # authMiddleware (JWT)
      /lib              # prisma client singleton
      /__tests__        # Testes de integração (supertest)
      index.ts          # Entry point Express
  /frontend
    /app
      /dashboard        # Páginas protegidas
      /(auth)/login     # Página de login
      /(auth)/register  # Página de cadastro
    /components
      /dashboard        # BalanceCard, MonthlyBarChart, CategoryPieChart,
                        # RecentTransactions, AlertBanner, DashboardView
      /ui               # Sidebar
    /hooks              # useAuth
    /lib                # api.ts (axios), utils.ts, mockData.ts
    middleware.ts       # Proteção de rotas Next.js
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- PostgreSQL rodando localmente (ou via Docker)
- npm ou yarn

### 1. Clone e instale

```bash
git clone <repo-url>
cd FinTrack

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure as variáveis de ambiente

**backend/.env**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fintrack?schema=public"
JWT_SECRET="sua-chave-secreta"
JWT_EXPIRES_IN="7d"
PORT=3001
```

**frontend/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Configure o banco de dados

```bash
cd backend

# Gerar o Prisma Client
npm run prisma:generate

# Criar as tabelas
npm run prisma:migrate

# Popular categorias padrão
npm run prisma:seed
```

### 4. Inicie os servidores

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# → http://localhost:3001

# Terminal 2 — Frontend
cd frontend && npm run dev
# → http://localhost:3000
```

### 5. Rode os testes

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

---

## API Endpoints

| Método | Rota                        | Descrição                    | Auth |
|--------|-----------------------------|------------------------------|------|
| POST   | /auth/register              | Cadastrar usuário            | —    |
| POST   | /auth/login                 | Login                        | —    |
| GET    | /transactions               | Listar transações            | JWT  |
| POST   | /transactions               | Criar transação              | JWT  |
| DELETE | /transactions/:id           | Deletar transação            | JWT  |
| GET    | /transactions/summary       | Resumo do dashboard          | JWT  |

---

## Screenshots

> _Em breve: prints do dashboard, tela de login e alertas._

![Dashboard Preview](docs/dashboard-preview.png)
![Login Page](docs/login-preview.png)

---

## Deploy

### Vercel (Frontend)

1. Conecte o repositório ao Vercel
2. Defina `NEXT_PUBLIC_API_URL` apontando para o Railway
3. Deploy automático a cada push na `main`

### Railway (Backend + PostgreSQL)

1. Crie um serviço Node.js e um serviço PostgreSQL no Railway
2. Copie a `DATABASE_URL` gerada para as variáveis de ambiente
3. Configure `JWT_SECRET` e demais variáveis
4. O Railway detecta automaticamente o `npm run build` e `npm start`

---

## Licença

MIT
