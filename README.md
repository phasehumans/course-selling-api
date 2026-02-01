# Course Selling API

REST API for managing and selling online courses with user authentication, course management, lessons and purchase handling.

## Features

- User authentication
- Course management
- Lesson organization
- Purchase tracking

## Project Structure

```
course-selling-api/
├── controller/              # API endpoint handlers
│   ├── auth.controller.ts
│   ├── course.controller.ts
│   ├── lesson.controller.ts
│   └── purchase.controller.ts
├── routes/                  # API route definitions
│   ├── auth.routes.ts
│   ├── course.routes.ts
│   ├── lesson.routes.ts
│   └── purchase.routes.ts
├── middleware/              # Express middleware
│   └── auth.middleware.ts
├── utils/                   # Utility functions
│   └── validation.ts
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma
│   └── migrations/
│       ├── 20260130081439_init_user/
│       └── 20260130094318_v0tables/
├── generated/               # Auto-generated Prisma client
│   └── prisma/
├── db.ts                    # Database connection
├── index.ts                 # Application entry point
├── package.json
├── tsconfig.json
└── prisma.config.ts
```
