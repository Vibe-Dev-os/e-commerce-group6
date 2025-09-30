# Payment System Documentation

## Overview
Full payment processing system with support for **Bank Transfer**, **Cash on Delivery (COD)**, and **GCash** payment methods for the Philippine market.

## Payment Methods

### 1. Bank Transfer (BDO)
- **Bank Name:** BDO Unibank
- **Account Name:** ACME Gaming Store
- **Account Number:** 1234-5678-9012
- **Process:** 
  - Customer selects Bank Transfer
  - Order is created with "pending" payment status
  - Customer receives bank details on confirmation page
  - Customer transfers payment and sends proof to orders@acmestore.com
  - Admin verifies payment and updates order status

### 2. Cash on Delivery (COD)
- **Process:**
  - Customer selects COD
  - Order is created with "pending" payment status but "confirmed" order status
  - No upfront payment required
  - Customer prepares exact amount
  - Delivery rider collects payment upon delivery
  - Payment confirmed after successful delivery

### 3. GCash Mobile Wallet
- **GCash Number:** 0917-123-4567
- **Account Name:** ACME Gaming Store
- **Process:**
  - Customer selects GCash
  - Order is created with "pending" payment status
  - Customer receives GCash details on confirmation page
  - Customer sends payment via GCash app
  - Customer sends screenshot to orders@acmestore.com
  - Admin verifies payment and updates order status

## System Architecture

### Files Created

#### 1. `/lib/orders.ts`
Order management system with in-memory storage:
- `Order` interface with full order details
- `createOrder()` - Creates new orders
- `getOrderById()` - Retrieves order by ID
- `getOrderByNumber()` - Retrieves order by order number
- `updateOrderStatus()` - Updates order processing status
- `updatePaymentStatus()` - Updates payment status

#### 2. `/app/api/orders/route.ts`
REST API endpoint for order processing:
- **POST /api/orders** - Creates new order
- Validates required fields
- Sets initial payment/order status based on method
- Returns payment instructions based on selected method
- Generates unique order numbers (format: ORD-{timestamp}-{random})

#### 3. `/app/order-confirmation/page.tsx`
Order confirmation page that displays:
- Order number with copy functionality
- Payment instructions based on selected method
- Bank/GCash account details
- Next steps for customer
- Print functionality
- Support contact information

#### 4. `/app/checkout/page.tsx` (Updated)
Enhanced checkout with:
- Full order processing integration
- API call to create order
- Loading states during processing
- Error handling
- Redirect to confirmation page
- Philippine address format (regions)

## Order Flow

### 1. Customer Journey
```
Shopping Cart → Checkout
  ↓
Information Step (Email, Address)
  ↓
Shipping Step (Delivery Method)
  ↓
Payment Step (Select: Bank/COD/GCash)
  ↓
Complete Order (Creates order via API)
  ↓
Order Confirmation Page (Payment Instructions)
```

### 2. Order Status Flow
```
COD Orders:
  processing → confirmed → shipped → delivered

Bank/GCash Orders:
  processing → (payment verified) → confirmed → shipped → delivered
```

### 3. Payment Status Flow
```
COD:
  pending → (on delivery) → paid

Bank/GCash:
  pending → (proof submitted) → (verified) → paid
```

## Order Object Structure

```typescript
{
  id: "order_1234567890",
  orderNumber: "ORD-1234567890-ABC123XYZ",
  customerInfo: {
    email: "customer@example.com",
    firstName: "Juan",
    lastName: "Dela Cruz"
  },
  shippingAddress: {
    address: "123 Main Street",
    apartment: "Unit 4B",
    city: "Manila",
    region: "NCR",
    zipCode: "1000",
    country: "Philippines"
  },
  items: [...],
  paymentMethod: "gcash" | "bank" | "cod",
  paymentStatus: "pending" | "paid" | "failed",
  orderStatus: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled",
  subtotal: 2500.00,
  shipping: 0,
  total: 2500.00,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z"
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "order": {
    "id": "order_1234567890",
    "orderNumber": "ORD-1234567890-ABC123XYZ",
    "total": 2500.00,
    "paymentMethod": "gcash"
  },
  "paymentInstructions": {
    "type": "gcash",
    "gcashNumber": "0917-123-4567",
    "accountName": "ACME Gaming Store",
    "amount": 2500.00,
    "reference": "ORD-1234567890-ABC123XYZ",
    "instructions": "Send payment via GCash..."
  }
}
```

### Error Response
```json
{
  "error": "Missing required fields"
}
```

## Features Implemented

### ✅ Order Processing
- [x] Create orders with unique order numbers
- [x] Store customer and shipping information
- [x] Handle multiple payment methods
- [x] Generate payment instructions dynamically

### ✅ Payment Method Selection
- [x] Radio button selection UI
- [x] Hover effects and visual feedback
- [x] Selected state indication
- [x] Payment-specific instructions

### ✅ Order Confirmation
- [x] Professional confirmation page
- [x] Order number display and copy
- [x] Payment instructions based on method
- [x] Bank/GCash details with copy buttons
- [x] What's next section
- [x] Print functionality
- [x] Support contact info

### ✅ User Experience
- [x] Loading states during processing
- [x] Error handling and user feedback
- [x] Responsive design
- [x] Copy-to-clipboard for account details
- [x] Clear next steps guidance

### ✅ Philippine Localization
- [x] 17 Philippine regions in dropdown
- [x] Postal code instead of ZIP code
- [x] Philippines as default country
- [x] Local payment methods (GCash, BDO)
- [x] PHP currency formatting

## Future Enhancements

### Database Integration
- Replace in-memory storage with database (MongoDB, PostgreSQL)
- Implement proper order persistence
- Add order history for customers

### Payment Verification
- Admin panel for payment verification
- Image upload for payment proofs
- Automatic payment status updates
- Email notifications

### Email Notifications
- Order confirmation emails
- Payment instruction emails
- Order status update emails
- Delivery tracking emails

### Order Tracking
- Customer order history page
- Real-time order status tracking
- Delivery tracking integration

### Enhanced Security
- Order authentication
- Secure payment proof upload
- Rate limiting on order creation
- CSRF protection

### Admin Features
- Order management dashboard
- Payment verification interface
- Order status management
- Sales analytics

## Testing

### Test Scenarios

1. **Bank Transfer Order**
   - Add items to cart
   - Complete checkout with bank transfer
   - Verify order confirmation shows bank details
   - Copy bank account number
   - Verify order created with correct payment method

2. **COD Order**
   - Add items to cart
   - Complete checkout with COD
   - Verify order confirmation shows COD instructions
   - Verify order status is "confirmed" immediately

3. **GCash Order**
   - Add items to cart
   - Complete checkout with GCash
   - Verify order confirmation shows GCash details
   - Copy GCash number
   - Verify order created with correct payment method

### Test Payment Details
- **Bank Transfer:** BDO 1234-5678-9012
- **GCash:** 0917-123-4567
- **COD:** No test details needed

## Contact Information

**For Payment Verification:**
- Email: orders@acmestore.com
- Phone: 0917-123-4567

**Bank Details:**
- Bank: BDO Unibank
- Account: ACME Gaming Store
- Number: 1234-5678-9012

**GCash Details:**
- Number: 0917-123-4567
- Name: ACME Gaming Store

---

## Notes

- All order data is currently stored in memory and will be lost on server restart
- For production, implement proper database storage
- Payment verification is manual - admin needs to check bank/GCash accounts
- No automated payment gateway integration (intentional for local payment methods)
- Email sending is not implemented - add email service for notifications
