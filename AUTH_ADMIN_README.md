# Authentication & Admin Panel Documentation

## Overview
This e-commerce store now includes a complete authentication system and admin dashboard built with NextAuth.js and shadcn/ui components.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

To generate a secure `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

### 2. Install Dependencies
All required dependencies have been installed:
- `next-auth` - Authentication
- `@auth/prisma-adapter` - Database adapter (optional)
- `bcryptjs` - Password hashing
- `@types/bcryptjs` - TypeScript types

### 3. Start the Development Server
```bash
pnpm dev
```

## Authentication Features

### Demo Credentials
Two test accounts are available:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password`
- Role: Admin (full access to admin panel)

**User Account:**
- Email: `user@example.com`
- Password: `password`
- Role: User (access to user features only)

### Authentication Pages
- **Sign In:** `/auth/signin`
- **Sign Up:** `/auth/signup` (UI ready, backend integration needed)

### Protected Routes
The following routes require authentication:
- `/profile` - User profile management
- `/orders` - Order history
- `/settings` - User settings
- `/admin/*` - Admin panel (requires admin role)

### User Features
1. **Profile Page** (`/profile`)
   - View and edit personal information
   - View account details and role

2. **Orders Page** (`/orders`)
   - View order history
   - Track order status
   - See order details

3. **Settings Page** (`/settings`)
   - Notification preferences
   - Privacy settings
   - Account management

## Admin Panel

### Access
Navigate to `/admin` or click the admin link in the user dropdown menu (only visible to admin users).

### Admin Features

#### 1. Dashboard (`/admin`)
- **Key Metrics:** Revenue, orders, products, customers
- **Recent Orders:** Latest customer orders
- **Top Products:** Best-selling items
- **Quick Stats:** Average order value, conversion rate, low stock alerts

#### 2. Product Management (`/admin/products`)
- View all products in a searchable table
- Add new products with full details
- Edit existing products
- Delete products
- Filter by category and status
- Product fields:
  - Name, description, price
  - Category, stock quantity
  - Status (active, inactive, out of stock)

#### 3. Order Management (`/admin/orders`)
- View all customer orders
- Search by order ID, customer name, or email
- Filter by status (pending, processing, shipped, delivered, cancelled)
- View detailed order information:
  - Customer details
  - Order items and totals
  - Shipping address
  - Order timeline
- Update order status
- Track order fulfillment

#### 4. User Management (`/admin/users`)
- View all registered users
- Search by name or email
- Filter by role (admin, user) and status (active, suspended, inactive)
- View user details:
  - Contact information
  - Account activity
  - Order statistics
  - Total spent
- Update user roles
- Manage user status

#### 5. Settings (`/admin/settings`)
- **General:** Store information, store behavior settings
- **Payment:** Payment methods, currency settings
- **Shipping:** Shipping zones, rates, delivery times
- **Notifications:** Email notification preferences

### Admin Navigation
The admin panel includes a sidebar with navigation to all admin sections and a "Back to Store" button to return to the customer-facing site.

## Security Features

### Middleware Protection
- Server-side route protection using NextAuth middleware
- Automatic redirects for unauthorized access
- Role-based access control (RBAC)

### Session Management
- JWT-based sessions
- Secure token storage
- Automatic session refresh

### Password Security
- Passwords are hashed using bcrypt
- Minimum password requirements enforced

## Component Structure

### Authentication Components
- `components/auth/auth-form.tsx` - Login/signup form with tabs
- `components/auth/user-nav.tsx` - User dropdown menu in header
- `components/auth/protected-route.tsx` - Client-side route protection wrapper

### Admin Components
- `components/admin/admin-nav.tsx` - Admin sidebar navigation
- `app/admin/layout.tsx` - Admin layout with sidebar
- `app/admin/page.tsx` - Dashboard with analytics
- `app/admin/products/page.tsx` - Product management
- `app/admin/orders/page.tsx` - Order management
- `app/admin/users/page.tsx` - User management
- `app/admin/settings/page.tsx` - Store settings

### Configuration Files
- `lib/auth.ts` - NextAuth configuration
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API routes
- `types/next-auth.d.ts` - TypeScript type definitions
- `middleware.ts` - Route protection middleware

## Usage Tips

### For Users
1. Click "Sign In" in the header to access your account
2. Use the user dropdown menu to access profile, orders, and settings
3. Click "Log out" to end your session

### For Admins
1. Log in with admin credentials
2. Access the admin panel from the user dropdown or navigate to `/admin`
3. Use the sidebar to navigate between admin sections
4. All changes are saved locally (integrate with your backend API)

## Next Steps

### Backend Integration
The current implementation uses mock data. To integrate with a real database:

1. **Set up a database** (PostgreSQL, MySQL, MongoDB)
2. **Install Prisma ORM** (if using Prisma):
   ```bash
   pnpm add prisma @prisma/client
   pnpm prisma init
   ```
3. **Create database schema** for users, products, orders
4. **Update `lib/auth.ts`** to query real database instead of mock users
5. **Create API routes** for:
   - Product CRUD operations
   - Order management
   - User management
   - Settings updates

### Signup Functionality
To enable user registration:
1. Create `/app/api/auth/signup/route.ts` API endpoint
2. Implement user creation logic with password hashing
3. Update `components/auth/auth-form.tsx` to call the signup API

### Email Notifications
To send emails:
1. Install email service (Resend, SendGrid, etc.)
2. Create email templates
3. Add email sending logic to order processing

## Troubleshooting

### Authentication Issues
- Ensure `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set in `.env.local`
- Restart the dev server after changing environment variables
- Clear browser cookies if experiencing session issues

### Admin Access Denied
- Verify you're logged in with admin credentials
- Check the user role in `lib/auth.ts`
- Ensure middleware is properly configured

### UI Components Not Found
- All components use shadcn/ui
- Component definitions are in `components/ui/`
- Import paths use `@/components/ui/` alias

## Support
For issues or questions, refer to the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [shadcn/ui Docs](https://ui.shadcn.com)
