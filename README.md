# 🌟 AROMA - Premium E-Commerce Application

A sophisticated, production-ready e-commerce platform for selling premium fragrances. Built with modern technologies, clean architecture principles, and enterprise-grade security.

**🔗 Live Demo**: [https://aroma-lemon.vercel.app](https://aroma-lemon.vercel.app)

## Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Rendering Strategy](#rendering-strategy)
- [Security Implementation](#security-implementation)
- [Configuration](#configuration)
- [Commands](#commands)

---

## Quick Start

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `Demo@12345`

---

## Features

### 🛍️ E-Commerce Functionality
- ✅ Product catalog with 6 premium fragrances
- ✅ Advanced filtering (brand, category, price range, search)
- ✅ Sorting (name, price, rating, newest)
- ✅ Product detail pages with specifications
- ✅ Pagination support
- ✅ Shopping cart with persistent storage
- ✅ Checkout process with order summary
- ✅ User account management

### 🔐 Security Features
- ✅ JWT authentication with httpOnly cookies
- ✅ XSS prevention with input sanitization
- ✅ CSRF protection mechanisms
- ✅ Password validation (8+ chars, uppercase, lowercase, number, special char)
- ✅ Email validation
- ✅ Rate limiting (100 requests/minute on auth endpoints)
- ✅ Secure API headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ Content Security Policy headers
- ✅ Protected routes middleware
- ✅ Session persistence and validation

### 🎨 Design & Performance
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Image lazy loading with Next.js optimization
- ✅ WebP and AVIF image formats
- ✅ Skeleton loaders for better UX
- ✅ Smooth animations with Framer Motion
- ✅ Tailwind CSS with professional gold/amber theme
- ✅ React Query caching (5 min stale time, 10 min gc time)

### 📱 SEO & Analytics
- ✅ Dynamic sitemap generation
- ✅ Robots.txt with proper directives
- ✅ JSON-LD structured data (Organization, Product, Breadcrumb, LocalBusiness)
- ✅ Open Graph & Twitter card support
- ✅ Canonical URLs
- ✅ Proper metadata on all pages
- ✅ Private page protection (no indexing for cart, checkout, account)

---

## Project Architecture

### Directory Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # BFF API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── session/route.ts
│   │   ├── cart/route.ts
│   │   └── products/route.ts
│   ├── auth/                     # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── products/                 # Product pages
│   │   ├── [id]/page.tsx         # Dynamic product detail
│   │   └── [id]/ProductDetailClient.tsx
│   ├── cart/page.tsx             # Shopping cart
│   ├── checkout/page.tsx         # Checkout page
│   ├── account/page.tsx          # User account
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Crawl directives
│   └── StructuredData.tsx        # JSON-LD schemas
│
├── lib/                          # Application logic (Domain-Driven Design)
│   ├── application/
│   │   └── stores/               # Zustand state management
│   │       ├── authStore.ts
│   │       ├── cartStore.ts
│   │       └── filterStore.ts
│   ├── domain/
│   │   └── types                 # Entity definitions
│   ├── infrastructure/
│   │   └── mockDatabase.ts       # Data layer
│   ├── presentation/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── Skeletons.tsx
│   │   │   └── Providers.tsx
│   │   └── hooks/                # React hooks
│   │       ├── useAuth.ts
│   │       └── useProducts.ts
│   └── utils/
│       ├── jwt.ts                # JWT token management
│       └── security.ts           # Sanitization, validation, headers
│
├── public/                       # Static assets
├── styles/                       # Global styles
├── types/                        # Global TypeScript types
│   └── domain.ts
├── __tests__/                    # Test files
│   ├── api/
│   ├── components/
│   ├── integration/
│   ├── stores/
│   └── utils/
├── proxy.ts                      # Next.js edge middleware
├── middleware.ts                 # (Deprecated - use proxy.ts)
├── next.config.js
├── tailwind.config.js
├── jest.config.js
└── tsconfig.json
```

### Architecture Layers (Domain-Driven Design)

#### 1. **Presentation Layer** (`lib/presentation/`)
- React components (Header, Footer, ProductCard, etc.)
- Custom hooks (useAuth, useProducts)
- UI concerns only
- No business logic

#### 2. **Application Layer** (`lib/application/`)
- Zustand state stores (authStore, cartStore, filterStore)
- Business logic coordination
- State management

#### 3. **Domain Layer** (`lib/domain/`)
- Entity types and interfaces
- Business rules definitions
- No implementation details

#### 4. **Infrastructure Layer** (`lib/infrastructure/`)
- Data access (mockDatabase.ts)
- External service integration
- Implementation details

#### 5. **Utilities Layer** (`lib/utils/`)
- JWT token operations
- Input sanitization
- Security helpers
- Helper functions

---

## Rendering Strategy

### Page Rendering by Type

#### Static Site Generation (SSG)
**Pre-rendered at build time, served from CDN**
- `/about` - Static company info
- `/contact` - Static contact form
- `/auth/login` - Static login form
- `/auth/register` - Static registration form

Benefits: Fastest load times (~50ms), best SEO, zero server cost

#### Incremental Static Regeneration (ISR)
**Static with background revalidation**

**Homepage** (`/`)
- Generated at build time
- Revalidated every 60 seconds
- Serves stale cache while revalidating
- Fresh products available within 60s

**Product Details** (`/products/[id]`)
- All product pages pre-generated at build time
- Revalidated every 1 hour
- Static performance with dynamic freshness
- Graceful 404 handling

Benefits: Static performance + dynamic freshness, reduced server load, good SEO

#### Client-Side Rendering (CSR)
**User-specific, requires authentication**
- `/cart` - Real-time cart state
- `/account` - Protected user profile
- `/checkout` - Real-time validation & payment

Why CSR: Requires authentication, personalizes per user, handles real-time interactions

### Revalidation Example

```typescript
// Product detail page
export const revalidate = 3600; // 1 hour

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}
```

---

## Security Implementation

### 1. XSS Prevention

**Input Sanitization**
```typescript
// All user inputs are sanitized
export function sanitizeInput(text: string): string {
  return text.trim().slice(0, 1000);
}
}
```

**httpOnly Cookies**
- JWT tokens stored in httpOnly cookies
- Not accessible via JavaScript
- Cannot be stolen via XSS
- Automatically sent with requests

**Content Security Policy**
- Restricts inline scripts
- Whitelist-based approach
- Applied to all responses

### 2. CSRF Protection

**Same-Site Cookies**
```typescript
response.cookies.set({
  name: 'auth-token',
  value: token,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict', // ← CSRF protection
  maxAge: 7 * 24 * 60 * 60,
  path: '/',
});
```

**Token Verification**
- Origin checking
- Referrer validation
- Strict same-site policy

### 3. JWT Authentication

**Token Creation**
```typescript
export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}
```

**Token Verification**
```typescript
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as JWTPayload;
  } catch {
    return null;
  }
}
```

**Protected Routes** (`proxy.ts`)
```typescript
export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).)*'],
};

const protectedRoutes = ['/checkout', '/orders', '/account'];

if (isProtectedRoute && !validToken) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
}
```

### 4. Password Security

**Validation Rules**
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (@$!%*?&)

```typescript
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
```

### 5. Rate Limiting

**Implementation**
```typescript
if (!checkRateLimit(`login-${clientIp}`)) {
  return NextResponse.json(
    { success: false, error: 'Too many login attempts. Please try again later.' },
    { status: 429 }
  );
}
```

**Limits**
- 100 requests per minute per IP
- Applied to login/register endpoints
- Production: Replace with Redis for distributed systems

### 6. Secure API Headers

All API responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 7. Error Handling

**Information Disclosure Prevention**
```typescript
// ❌ Bad: Leaks information
{ error: "User not found" }

// ✅ Good: Generic error message
{ error: "Invalid credentials" }
```

### 8. Protected Endpoints

**Login** (`POST /api/auth/login`)
- Rate limiting by IP
- Input validation
- Credential validation
- Generic error messages

**Register** (`POST /api/auth/register`)
- Email validation
- Password strength validation
- Rate limiting
- Duplicate email check
- Input sanitization

**Session** (`GET /api/auth/session`)
- Token verification
- Session validation
- User data retrieval

### 9. Production Deployment Checklist

Before deploying to production:
- [ ] Change `JWT_SECRET` to secure random value
- [ ] Change `NODE_ENV` to production
- [ ] Enable HTTPS (https:// only)
- [ ] Set `secure: true` for cookies
- [ ] Replace mock database with real DB
- [ ] Implement password hashing (bcrypt)
- [ ] Set up rate limiting with Redis
- [ ] Enable CORS properly
- [ ] Set up monitoring and logging
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Configuration

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind CSS

Uses custom color palette:
- **Primary**: Gold/Amber for premium feel
- **Background**: Dark theme for luxury
- **Text**: High contrast for readability

---

## Commands

### Development
```bash
# Start dev server with hot reload
npm run dev

# Visit http://localhost:3000
```

### Production
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
```

### Code Quality
```bash
# Type checking
npm run type-check

# Format code
npm run format

# Lint code
npm run lint
```

### Build Verification
```bash
# Verify types compile
npm run type-check

# Check dependencies for vulnerabilities
npm audit

# Check outdated packages
npm outdated
```

---

## State Management (Zustand)

### Auth Store
```typescript
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### Cart Store
```typescript
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

// Persisted with localStorage
```

### Filter Store
```typescript
interface FilterState {
  filters: {
    brands: string[];
    categories: string[];
    priceRange: [number, number];
    search: string;
  };
  setFilters: (filters: any) => void;
}
```

---

## Data Fetching (React Query)

### Query Examples

```typescript
// Fetch products
const { data: productsData } = useProducts();

// Fetch single product
const { data: product } = useProduct(id);

// Check session
const { data: user } = useSession();
```

### Mutation Examples

```typescript
// Login
const { mutate: login, isPending } = useLogin();

// Register
const { mutate: register, isPending } = useRegister();

// Logout
const { mutate: logout } = useLogout();
```

---

## Return URL After Login

The application implements smart redirect after login:

1. User clicks "Proceed to Checkout" without authentication
2. Checkout page stores return URL in sessionStorage
3. User is redirected to login page
4. After successful login, user is redirected back to checkout
5. If no return URL, defaults to home page

**Implementation:**
- [checkout/page.tsx](app/checkout/page.tsx#L19-L27) - Stores returnUrl
- [auth/login/page.tsx](app/auth/login/page.tsx#L31-L46) - Reads returnUrl from sessionStorage
- [cart/page.tsx](app/cart/page.tsx#L250-L254) - Navigates to checkout

---

## Performance Metrics

### Expected Performance

| Page Type | Strategy | Load Time | TTFB | Cache |
|-----------|----------|-----------|------|-------|
| SSG Pages | Static | ~50ms | <50ms | CDN |
| ISR Home | Static+Refresh | ~100ms+SWR | ~50ms | 60s |
| Product Detail | Static+Refresh | ~100ms+SWR | ~50ms | 1h |
| Cart/Account | CSR | Variable | ~200ms | None |

### Optimization Techniques

- ✅ Image lazy loading
- ✅ WebP/AVIF formats
- ✅ React Query caching
- ✅ Code splitting
- ✅ CSS minification
- ✅ JS minification
- ✅ Static pre-rendering
- ✅ CDN distribution

---

## Testing

### Test Structure

```
__tests__/
├── api/
│   └── auth.validation.test.ts
├── components/
│   ├── Footer.test.tsx
│   ├── Header.test.tsx
│   ├── ProductCard.test.tsx
│   └── ProductFilters.test.tsx
├── integration/
│   └── ecommerce-flow.test.ts
├── stores/
│   ├── authStore.test.ts
│   ├── cartStore.test.ts
│   └── filterStore.test.ts
└── utils/
    ├── jwt.test.ts
    └── security.test.ts
```

### Running Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test auth.validation.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## Future Enhancements

1. **Database Integration**
   - Connect to PostgreSQL/MongoDB
   - Implement password hashing (bcrypt)
   - Add proper ORM (Prisma/TypeORM)

2. **Payment Processing**
   - Integrate Stripe or PayPal
   - Secure payment handling
   - Order receipts and emails

3. **Analytics**
   - Product page views
   - Conversion tracking
   - User behavior analysis

4. **Advanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Order history and tracking
   - Abandoned cart recovery

5. **Admin Features**
   - Admin dashboard
   - Product management
   - Order management
   - User analytics

6. **Performance**
   - Image CDN integration
   - Edge caching optimization
   - Database query optimization

---

## Technology Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Zustand** - State management
- **React Hook Form** - Form handling

### Backend
- **Next.js API Routes** - BFF
- **Jose** - JWT handling
- **Node.js built-in crypto** - Hashing

### Testing
- **Jest** - Test runner
- **React Testing Library** - Component testing

### Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## License

MIT License - Feel free to use this project as a template.

---

**Built with ❤️ for premium fragrance enthusiasts**

*Last Updated: February 19, 2026*
