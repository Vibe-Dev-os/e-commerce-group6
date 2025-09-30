# Admin Access Guide

## ✅ Admin Login Fixed!

Your admin panel is now properly configured to redirect admin users to the admin dashboard.

## How to Access Admin Panel

### Method 1: Direct Login
1. Go to: http://localhost:3000/auth/signin
2. Enter admin credentials:
   - **Email:** `admin@example.com`
   - **Password:** `password`
3. Click "Sign In"
4. **You will be automatically redirected to `/admin/products`**

### Method 2: From Homepage
1. Login as admin using method above
2. Click on your avatar (initials "AU") in the top right
3. Click "Admin Panel" from the dropdown menu
4. You'll be taken to the admin dashboard

### Method 3: Direct URL
1. Login first (using method 1)
2. Navigate to: http://localhost:3000/admin/products
3. You'll see the full admin panel

## Admin Panel Features

Once logged in as admin, you'll see:

### 📊 Product Management Dashboard
- **Product Table** - View all products with:
  - Product ID
  - Name
  - Description
  - Price
  - Category
  - Stock
  - Status (Active/Inactive/Out of Stock)
  - Action buttons (Edit/Delete)

### ➕ Add New Product
Click the "Add Product" button to create a new product with:
- **Product Name** - The display name
- **Description** - Full product description
- **Price** - Product price in PHP
- **Category** - Select from: Laptops, Mice, Chairs
- **Stock** - Inventory quantity
- **Status** - Active, Inactive, or Out of Stock

### ✏️ Edit Product
- Click the pencil icon next to any product
- Update any field
- Changes apply immediately

### 🗑️ Delete Product
- Click the trash icon
- Confirm deletion
- Product is removed instantly

### 🔍 Search Products
- Type in the search bar at the top
- Filter by product name or category
- Results update in real-time

## User Navigation Menu

When logged in as admin, click your avatar to see:
- **Admin Panel** ⚡ (Only for admins)
- Profile
- Orders
- Settings
- Log out

Regular users will NOT see the "Admin Panel" option.

## What Happens After Login

### For Admin Users (admin@example.com):
✅ Redirected to `/admin/products`
✅ See full CRUD interface
✅ Can add/edit/delete products
✅ Access admin panel from user menu

### For Regular Users (user@example.com):
✅ Redirected to `/` (homepage)
✅ Can shop normally
✅ Cannot access `/admin/*` routes
✅ No admin panel in user menu

## Troubleshooting

### Still Redirected to Homepage?
1. **Clear browser cache completely**
   - Ctrl + Shift + Delete
   - Clear all cookies and cache
   - Or use Incognito mode

2. **Restart dev server**
   ```bash
   # Stop server (Ctrl+C)
   pnpm dev
   ```

3. **Check console logs**
   - Open browser console (F12)
   - Look for authentication errors
   - Check terminal for server logs

### Cannot Access Admin Panel?
1. Make sure you're logged in as `admin@example.com`
2. Check that middleware is not blocking you
3. Try logging out and back in
4. Verify session is created (check browser cookies)

### Admin Panel Menu Not Showing?
1. Refresh the page after login
2. Check that `session.user.role === "admin"`
3. Look at browser console for errors
4. Try re-logging in

## Test the Full Flow

1. **Start fresh**
   ```bash
   pnpm dev
   ```

2. **Clear browser** (Ctrl+Shift+Delete)

3. **Login as admin**
   - Go to: http://localhost:3000/auth/signin
   - Use: admin@example.com / password

4. **You should see:**
   - Immediate redirect to `/admin/products`
   - Full product management table
   - Add/Edit/Delete buttons
   - Search functionality

5. **Try adding a product:**
   - Click "Add Product"
   - Fill in the form
   - Click "Save Product"
   - See it appear in the table immediately!

6. **Check user menu:**
   - Click your avatar (top right)
   - See "Admin Panel" option
   - Also see Settings, Orders, etc.

## Admin vs Regular User Comparison

| Feature | Admin | Regular User |
|---------|-------|--------------|
| Login redirect | `/admin/products` | `/` (homepage) |
| Admin Panel menu | ✅ Yes | ❌ No |
| Access `/admin/*` | ✅ Yes | ❌ Redirected to signin |
| Product CRUD | ✅ Yes | ❌ No |
| Shopping | ✅ Yes | ✅ Yes |
| Checkout | ✅ Yes | ✅ Yes |

## Quick Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production
pnpm start
```

## Admin Credentials

**Email:** admin@example.com
**Password:** password
**Role:** admin
**Access:** Full admin panel with CRUD

## Regular User Credentials

**Email:** user@example.com
**Password:** password
**Role:** user
**Access:** Shopping only

---

## Summary

✅ Admin login redirects to `/admin/products`
✅ Admin panel accessible from user menu
✅ Full CRUD operations available
✅ Role-based access control working
✅ Regular users cannot access admin panel
✅ Admin can manage all products in real-time

**Your admin panel is ready!** Login with `admin@example.com` / `password` and you'll go straight to the admin dashboard! 🎮⚡
