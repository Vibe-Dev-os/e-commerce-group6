# Authentication System Guide

## ✅ Authentication Setup Complete!

Your e-commerce store now has a fully functional authentication system using NextAuth.js.

## Configuration

### Environment Variables (.env file)

Make sure your `.env` file contains:

```env
AUTH_SECRET=v9U9QKqmpKvquVC+tAIdnPeD4MhwpCn112AwkCw0TiA=
NEXTAUTH_URL=http://localhost:3000
```

**Important:** Never commit your `.env` file to git. It's already in `.gitignore`.

## Test Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** password
- **Role:** admin
- **Access:** Can access `/admin/products` and `/settings`

### Regular User Account
- **Email:** user@example.com
- **Password:** password
- **Role:** user
- **Access:** Regular shopping features only

## Pages & Routes

### Public Routes (No Authentication Required)
- `/` - Homepage
- `/category/[category]` - Category pages
- `/product/[id]` - Product details
- `/checkout` - Checkout process
- `/order-confirmation` - Order confirmation
- `/auth/signin` - Login page

### Protected Routes (Authentication Required)
- `/admin/products` - Admin product management
- `/settings` - User settings (change password)

## Authentication Features

### 1. Login Form (`/auth/signin`)
- **Location:** `app/auth/signin/page.tsx`
- **Component:** `components/auth/auth-form.tsx`
- **Features:**
  - Email & password validation
  - Error handling
  - Loading states
  - Demo credentials displayed
  - Tabs for Login/Signup

### 2. Protected Routes
- **Middleware:** `middleware.ts`
- Automatically redirects unauthenticated users to `/auth/signin`
- Protects `/admin/*` and `/settings` routes

### 3. Session Management
- **Strategy:** JWT (JSON Web Tokens)
- **Provider:** Credentials (email/password)
- **Session includes:**
  - User ID
  - Email
  - Name
  - Role (admin/user)

### 4. Role-Based Access
- **Admin users:** Can access admin panel
- **Regular users:** Can only shop and checkout
- **Role stored in:** JWT token and session

## How to Use Authentication

### For Customers (Shopping)
1. Browse products (no login required)
2. Add items to cart (no login required)
3. Proceed to checkout (no login required)
4. Complete order (no login required)

**Note:** Customer checkout does NOT require authentication. Only admin features require login.

### For Admins
1. Go to `/admin/products` or `/settings`
2. You'll be redirected to `/auth/signin`
3. Enter admin credentials:
   - Email: `admin@example.com`
   - Password: `password`
4. Click "Sign In"
5. You'll be redirected back to the admin page

## API Endpoints

### NextAuth API Routes
- `GET/POST /api/auth/[...nextauth]` - NextAuth handler
  - `/api/auth/signin` - Sign in
  - `/api/auth/signout` - Sign out
  - `/api/auth/session` - Get session
  - `/api/auth/providers` - Get providers
  - `/api/auth/csrf` - CSRF token

## Authentication Flow

### Login Flow
```
User visits /admin/products
  ↓
Middleware checks authentication
  ↓
Not authenticated → Redirect to /auth/signin
  ↓
User enters credentials
  ↓
Credentials sent to NextAuth
  ↓
NextAuth validates with lib/auth.ts
  ↓
Password checked with bcrypt
  ↓
JWT token created with user data
  ↓
Session created
  ↓
Redirect back to /admin/products
```

### Session Check Flow
```
User makes request
  ↓
Middleware checks for session
  ↓
Session exists? → Allow access
  ↓
No session? → Redirect to /auth/signin
```

## Code Structure

### Authentication Files

1. **`lib/auth.ts`**
   - NextAuth configuration
   - User database (mock)
   - Credential provider setup
   - Password hashing with bcrypt
   - JWT and session callbacks
   - Role management

2. **`app/api/auth/[...nextauth]/route.ts`**
   - NextAuth API route handler
   - Exports GET and POST handlers

3. **`components/auth/auth-form.tsx`**
   - Login/Signup form UI
   - Form validation with react-hook-form + zod
   - Error handling
   - Loading states

4. **`middleware.ts`**
   - Route protection
   - Session verification
   - Redirect logic

5. **`types/next-auth.d.ts`**
   - TypeScript type definitions
   - Extends NextAuth types with role

## User Database

Currently using **in-memory storage** with 2 users:

```typescript
const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: "$2a$12$...", // bcrypt hash of "password"
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2",
    email: "user@example.com",
    password: "$2a$12$...", // bcrypt hash of "password"
    name: "Regular User",
    role: "user"
  }
]
```

### Adding New Users

To add a new user, you need to:

1. **Generate password hash:**
```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('your_password', 12);
console.log(hash); // Copy this hash
```

2. **Add user to `lib/auth.ts`:**
```typescript
{
  id: "3",
  email: "newuser@example.com",
  password: "$2a$12$...", // paste hash here
  name: "New User",
  role: "user" // or "admin"
}
```

## Security Features

✅ **Password Hashing:** bcrypt with 12 salt rounds
✅ **JWT Tokens:** Secure session management
✅ **HTTPS Ready:** Works with HTTPS in production
✅ **CSRF Protection:** Built into NextAuth
✅ **Route Protection:** Middleware-based
✅ **Role-Based Access:** Admin vs User roles

## Testing Authentication

### Test Login
1. Start dev server: `pnpm dev`
2. Visit: http://localhost:3000/admin/products
3. You'll be redirected to login
4. Use: `admin@example.com` / `password`
5. Should redirect to admin panel

### Test Logout
1. Open browser console
2. Run: `fetch('/api/auth/signout', {method: 'POST'})`
3. Try to access `/admin/products` again
4. Should be redirected to login

### Test Settings
1. Login as admin
2. Visit: http://localhost:3000/settings
3. Change password form should appear
4. Try changing password

## Future Enhancements

### Database Integration
Replace in-memory users with database:
- **MongoDB** with Mongoose
- **PostgreSQL** with Prisma
- **MySQL** with Prisma

### Additional Features
- [ ] Email verification
- [ ] Password reset via email
- [ ] OAuth providers (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Account lockout after failed attempts
- [ ] Password strength requirements
- [ ] User registration API

### Admin Features
- [ ] User management dashboard
- [ ] View all registered users
- [ ] Activate/deactivate accounts
- [ ] Assign roles
- [ ] View login history

## Troubleshooting

### Server Configuration Error
**Problem:** "There is a problem with the server configuration"

**Solution:**
1. Check `.env` file has `AUTH_SECRET` and `NEXTAUTH_URL`
2. Restart dev server: `pnpm dev`
3. Clear browser cache
4. Check terminal for errors

### Cannot Login
**Problem:** "Invalid email or password"

**Solution:**
1. Verify credentials: `admin@example.com` / `password`
2. Check console for errors
3. Verify password hash in `lib/auth.ts`

### Redirect Loop
**Problem:** Keeps redirecting to login

**Solution:**
1. Clear browser cookies
2. Check `middleware.ts` configuration
3. Verify session is being created

### Session Not Persisting
**Problem:** Logged out after refresh

**Solution:**
1. Check browser cookies are enabled
2. Verify `AUTH_SECRET` is set
3. Check for console errors

## Production Deployment

### Before Deploying

1. **Generate new AUTH_SECRET:**
```bash
openssl rand -base64 32
```

2. **Update environment variables:**
- Set `AUTH_SECRET` in production
- Set `NEXTAUTH_URL` to your domain
- Example: `NEXTAUTH_URL=https://yourdomain.com`

3. **Enable HTTPS:**
- NextAuth requires HTTPS in production
- Use Vercel, Netlify, or configure SSL

4. **Database:**
- Replace mock users with real database
- Set up user registration
- Implement proper user management

## Support

For issues or questions:
- Check NextAuth docs: https://next-auth.js.org
- Review code in `lib/auth.ts`
- Check middleware configuration
- Verify environment variables

---

## Summary

Your authentication system is now fully functional with:
✅ Login/Logout functionality
✅ Protected admin routes
✅ Role-based access control
✅ Password hashing with bcrypt
✅ JWT session management
✅ Professional login UI

**Test it now:** Visit http://localhost:3000/admin/products and login with `admin@example.com` / `password`
