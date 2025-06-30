# Next.js + Prisma + Neon Basic Template Framework

[中文文档](./README.md) | **English Documentation**

A modern Basic Template Framework built with Next.js 15, Prisma ORM, and Neon cloud database. This project provides complete user CRUD operation API endpoints, supporting user registration, login, and information management.

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Database ORM**: Prisma 6.9.0
- **Cloud Database**: Neon PostgreSQL
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4.0
- **Code Standards**: ESLint + TypeScript ESLint
- **Deployment**: Vercel
- - **UI Framework**: Antd 5.26

## ✨ Features

- 🔐 Complete Basic Template Framework
- 🏗️ RESTful API design
- 🎯 Type-safe TypeScript support
- 🗄️ Prisma ORM database operations
- ☁️ Neon cloud database integration
- 📝 Comprehensive error handling and validation
- 🚀 One-click Vercel deployment support
- 📊 Pagination support
- 🔒 Soft delete and status management

## 📁 Project Structure

```
next-neon-base/
├── prisma/
│   └── schema.prisma          # Prisma database schema
├── src/
│   ├── lib/
│   │   └── prisma.ts          # Prisma client connection instance
│   ├── services/
│   │   └── userService.ts     # User data operation service
│   └── app/
│       └── api/
│            └── users/         # User-related API routes
│
├── .env                       # Environment variables
└── package.json              # Project dependencies and scripts
```

## 🛠️ Environment Setup

### 1. Environment Variables

Create a `.env` file in the project root:

```env
# Neon database connection string
DATABASE_URL="postgresql://username:password@endpoint/database?sslmode=require"

# Next.js configuration (optional)
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AliCloudOSS:// configurationopment"
OSS_ACCESS_KEY_ID="AccessKey ID"
OSS_ACCESS_KEY_SECRET="AccessKey Secret"
OSS_REGION="oss-rg-china-mainland" # The region (region) identifier of the OSS storage. Region identifier where OSS storage is located
OSS_BUCKET="xxxxxxx" # Bucket name
BASE_OSS_URL="https://xxxxxxx.oss-rg-china-mainland.aliyuncs.com " # Public access base URL for OSS

```

### 2. Database Schema

Main data table used in the project:

```sql
CREATE TABLE next_base_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user',
  provider VARCHAR(20),
  provider_id VARCHAR(100),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_deleted BOOLEAN DEFAULT FALSE,
  login_count INTEGER DEFAULT 0,
  last_login_at TIMESTAMP,
  last_login_ip VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/durunsong/next-neon-base.git
cd next-neon-base
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Database

```bash
# Pull existing table structure from database
pnpm db:pull

# Generate Prisma client
pnpm db:generate
```

### 4. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## 📡 API Endpoints

### User Management APIs

| Method   | Path              | Description               | Parameters            |
| -------- | ----------------- | ------------------------- | --------------------- |
| `GET`    | `/api/users`      | Get user list             | `page`, `pageSize`    |
| `POST`   | `/api/users`      | Create new user           | User info JSON        |
| `GET`    | `/api/users/[id]` | Get single user           | User ID               |
| `PUT`    | `/api/users/[id]` | Update user info          | User ID + update data |
| `DELETE` | `/api/users/[id]` | Delete user (soft delete) | User ID               |

### Request Examples

#### Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password_hash": "hashed_password"
  }'
```

#### Get User List

```bash
curl "http://localhost:3000/api/users?page=1&pageSize=10"
```

### Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Returned data
  }
}
```

## 🛠️ Development Scripts

```bash
# Development related
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Code linting

# Database related
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:pull      # Pull schema from database
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Prisma Studio
pnpm  db:seed     # Running database seed data
pnpm db:sync      # Synchronize database structure and generate clients -- Synchronization from database to code
pnpm db:dev-push  # Rapid Push + Generation -- Rapid Prototyping for Development Environments
```

## 🔧 Database Management

### Prisma Studio

```bash
pnpm db:studio
```

Opens visual database management interface in browser.

### Database Migrations

```bash
# Create new migration
pnpm db:migrate

# Reset database
npx prisma migrate reset
```

## 🌐 Deployment Guide

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL`: Neon database connection string
4. Deployment will complete automatically

### Environment Variables Configuration

Add in Vercel project settings Environment Variables:

```
DATABASE_URL=postgresql://your-neon-connection-string
```

## 🐛 Troubleshooting

### Common Issues

1. **Prisma client not generated**

   ```bash
   pnpm db:generate
   ```

2. **Database connection failed**

   - Check `DATABASE_URL` in `.env` file
   - Ensure Neon database is running properly

3. **ESLint errors**
   - Run `pnpm lint` to check code standards
   - Check `eslint.config.mjs` configuration

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source under the MIT License. See `LICENSE` file for more information.

## 🔗 Related Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Database](https://neon.tech/)
- [Vercel Deployment](https://vercel.com/)

---

**Note**: This is a sample project for learning and development purposes. When using in production, please ensure:

- Use proper password encryption algorithms
- Implement appropriate authentication and authorization mechanisms
- Add API rate limiting and security measures
- Conduct thorough testing and error handling
