# Vercel Deployment Guide with MongoDB

## 🚀 Deploy Your E-Commerce Store to Vercel

This guide will help you deploy your gaming e-commerce store to Vercel with MongoDB Atlas as the database.

## Database Recommendation: MongoDB Atlas

### Why MongoDB Atlas?

✅ **Perfect for E-Commerce:**
- Flexible product schema (easy to add new fields)
- JSON-like documents match your current structure
- Great for products with varying attributes
- Fast queries for product catalogs

✅ **Vercel Compatible:**
- Serverless-friendly
- Works with Vercel's edge network
- Connection pooling built-in
- Environment variable support

✅ **Free Tier:**
- 512MB storage
- Shared cluster
- Enough for development and small stores
- No credit card required

✅ **Easy to Use:**
- Intuitive dashboard
- One connection string
- Works with Mongoose ORM
- Simple setup

## Step-by-Step Deployment

### Part 1: Set Up MongoDB Atlas

#### 1. Create MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create organization and project

#### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose **FREE tier** (M0 Sandbox)
3. Select region closest to your users
4. Name your cluster (e.g., "ecommerce-cluster")
5. Click "Create"

#### 3. Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin` (or your choice)
5. Password: Generate strong password
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

#### 4. Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Use Vercel's IP addresses
4. Click "Confirm"

#### 5. Get Connection String
1. Go to "Database" → Your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `/ecommerce` before the `?`
   ```
   mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### Part 2: Install Dependencies

```bash
# Install MongoDB driver and Mongoose
pnpm add mongodb mongoose

# Install TypeScript types
pnpm add -D @types/mongoose
```

### Part 3: Set Up Local Environment

Update your `.env` file:

```env
# Authentication
AUTH_SECRET=v9U9QKqmpKvquVC+tAIdnPeD4MhwpCn112AwkCw0TiA=
NEXTAUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Part 4: Deploy to Vercel

#### 1. Prepare for Deployment

Create `.vercelignore`:
```
.env
.env.local
node_modules
.next
```

#### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Complete e-commerce store with MongoDB"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-store.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

**Option A: Vercel Dashboard**
1. Go to: https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`

**Option B: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### 4. Add Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
AUTH_SECRET=v9U9QKqmpKvquVC+tAIdnPeD4MhwpCn112AwkCw0TiA=
NEXTAUTH_URL=https://your-domain.vercel.app
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

4. Click "Save"
5. Redeploy your application

## Database Schema Design

### Products Collection

```javascript
{
  _id: ObjectId("..."),
  id: "product_1234567890",
  name: "Gaming Laptop Pro",
  description: "High-performance gaming laptop",
  price: 1299.99,
  category: "laptops",
  stock: 15,
  status: "active",
  images: [
    "/gaming-laptop-1.jpg",
    "/gaming-laptop-2.jpg"
  ],
  colors: [
    { name: "Black", value: "black" },
    { name: "Silver", value: "silver" }
  ],
  sizes: ["RTX 4060", "RTX 4070", "RTX 4090"],
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-01T00:00:00Z")
}
```

### Orders Collection

```javascript
{
  _id: ObjectId("..."),
  orderNumber: "ORD-1234567890-ABC123",
  customerInfo: {
    email: "customer@example.com",
    firstName: "Juan",
    lastName: "Dela Cruz"
  },
  shippingAddress: {
    address: "123 Main St",
    city: "Manila",
    region: "NCR",
    zipCode: "1000",
    country: "Philippines"
  },
  items: [
    {
      productId: "product_123",
      name: "Gaming Mouse",
      price: 89.99,
      quantity: 1,
      image: "/mouse.jpg"
    }
  ],
  paymentMethod: "gcash",
  paymentStatus: "pending",
  orderStatus: "processing",
  total: 89.99,
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-01T00:00:00Z")
}
```

### Users Collection (Optional)

```javascript
{
  _id: ObjectId("..."),
  email: "admin@example.com",
  password: "$2a$10$...", // hashed
  name: "Admin User",
  role: "admin",
  createdAt: ISODate("2024-01-01T00:00:00Z")
}
```

## Vercel Configuration

### vercel.json (Optional)

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "regions": ["sin1"],
  "env": {
    "MONGODB_URI": "@mongodb_uri"
  }
}
```

## Performance Optimization

### 1. Connection Pooling

MongoDB connections are reused across requests:
```typescript
// lib/mongodb.ts will handle this
let cached = global.mongoose
```

### 2. Edge Caching

```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

### 3. Image Optimization

Use Vercel's Image Optimization:
```tsx
import Image from "next/image"

<Image
  src="/product.jpg"
  width={500}
  height={500}
  alt="Product"
/>
```

## Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string obtained
- [ ] Local .env configured
- [ ] Dependencies installed
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set in Vercel
- [ ] Application deployed successfully
- [ ] Test admin login
- [ ] Test product CRUD
- [ ] Test order creation
- [ ] Test payment flow

## Monitoring & Maintenance

### Vercel Dashboard
- View deployment logs
- Monitor function execution
- Check error rates
- View analytics

### MongoDB Atlas
- Monitor database performance
- View query patterns
- Check storage usage
- Set up alerts

## Costs

### Free Tier Limits

**Vercel:**
- 100GB bandwidth/month
- 100 hours serverless function execution
- Unlimited projects
- Automatic HTTPS

**MongoDB Atlas:**
- 512MB storage
- Shared CPU
- 500 connections
- Backups not included

### When to Upgrade

**Vercel Pro ($20/month):**
- More bandwidth
- Advanced analytics
- Team features

**MongoDB M10 ($57/month):**
- 10GB storage
- Dedicated cluster
- Automated backups

## Troubleshooting

### Connection Issues

**Error:** "Could not connect to MongoDB"

**Solutions:**
1. Check MONGODB_URI in Vercel env vars
2. Verify MongoDB user password
3. Confirm IP whitelist (0.0.0.0/0)
4. Check connection string format

### Build Errors

**Error:** "Module not found"

**Solutions:**
1. Ensure all dependencies in package.json
2. Run `pnpm install` locally
3. Check import paths
4. Clear Vercel cache and redeploy

### Environment Variables

**Error:** "AUTH_SECRET is not defined"

**Solutions:**
1. Add to Vercel environment variables
2. Redeploy after adding
3. Check variable names match exactly

## Alternative Databases

### If MongoDB doesn't fit:

**Vercel Postgres:**
- Relational data
- SQL queries
- Native Vercel integration

```bash
pnpm add @vercel/postgres
```

**Supabase:**
- PostgreSQL + real-time
- Built-in authentication
- File storage included

```bash
pnpm add @supabase/supabase-js
```

**PlanetScale:**
- MySQL-compatible
- Branch-based workflow
- Automatic backups

```bash
pnpm add @planetscale/database
```

## Summary

✅ **MongoDB Atlas** is the best choice for your e-commerce store
✅ **Free tier** is enough to start
✅ **Easy deployment** with Vercel
✅ **Scalable** as your business grows
✅ **Great documentation** and community support

## Next Steps

1. Create MongoDB Atlas account
2. Set up database cluster
3. Update your code to use MongoDB (I can help with this)
4. Test locally
5. Push to GitHub
6. Deploy to Vercel
7. Add environment variables
8. Test production deployment

**Ready to start?** Let me know and I'll help you integrate MongoDB into your application! 🚀
