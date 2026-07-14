# Roadster Booking API Documentation

## Base URL
- **Development:** `http://localhost:3000/api`
- **Production:** `https://your-project.vercel.app/api`

---

## Endpoints

### 1. GET /api/availability

Check car availability by getting all existing bookings for a specific car.

**Query Parameters:**
- `carId` (required) - Car identifier (e.g., "mercedes-cla", "thar", "scorpio")

**Example Request:**
```
GET /api/availability?carId=mercedes-cla
```

**Success Response (200):**
```json
{
  "success": true,
  "carId": "mercedes-cla",
  "bookings": [
    {
      "_id": "6a4abf1c8a05f7afd7847b90",
      "startDateTime": "2026-07-15T10:00:00.000Z",
      "endDateTime": "2026-07-15T22:00:00.000Z",
      "status": "confirmed"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "error": "Missing required parameter: carId"
}
```

---

### 2. POST /api/bookings

Create a new booking with server-side overlap validation.

**Request Body:**
```json
{
  "carId": "mercedes-cla",
  "carName": "Mercedes CLA 200",
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "startDateTime": "2026-07-20T10:00:00",
  "endDateTime": "2026-07-20T22:00:00",
  "durationType": "12hr"
}
```

**Field Validation:**
- `carId` - Required, string
- `carName` - Required, string
- `customerName` - Required, string
- `customerPhone` - Required, 10-digit Indian mobile number
- `startDateTime` - Required, valid ISO date (must be in future)
- `endDateTime` - Required, valid ISO date (must be after startDateTime)
- `durationType` - Required, either "12hr" or "24hr"

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "6a4abf1c8a05f7afd7847b90",
    "carId": "mercedes-cla",
    "carName": "Mercedes CLA 200",
    "customerName": "John Doe",
    "customerPhone": "9876543210",
    "startDateTime": "2026-07-20T10:00:00.000Z",
    "endDateTime": "2026-07-20T22:00:00.000Z",
    "durationType": "12hr",
    "status": "pending",
    "createdAt": "2026-07-06T20:30:00.000Z"
  }
}
```

**Error Response - Overlap (409):**
```json
{
  "error": "Booking conflict",
  "message": "This car is already booked for the selected time slot. Please choose a different time or vehicle."
}
```

**Error Response - Validation (400):**
```json
{
  "error": "Missing required fields",
  "required": ["carId", "carName", "customerName", "customerPhone", "startDateTime", "endDateTime", "durationType"]
}
```

---

### 3. GET /api/bookings

Get all bookings, sorted by start date (newest first).

**Example Request:**
```
GET /api/bookings
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "bookings": [
    {
      "_id": "6a4abf1c8a05f7afd7847b90",
      "carId": "mercedes-cla",
      "carName": "Mercedes CLA 200",
      "customerName": "John Doe",
      "customerPhone": "9876543210",
      "startDateTime": "2026-07-20T10:00:00.000Z",
      "endDateTime": "2026-07-20T22:00:00.000Z",
      "durationType": "12hr",
      "status": "confirmed",
      "createdAt": "2026-07-06T20:30:00.000Z"
    }
  ]
}
```

---

### 4. GET /api/bookings/[id]

Get a single booking by ID.

**Example Request:**
```
GET /api/bookings/6a4abf1c8a05f7afd7847b90
```

**Success Response (200):**
```json
{
  "success": true,
  "booking": {
    "_id": "6a4abf1c8a05f7afd7847b90",
    "carId": "mercedes-cla",
    "carName": "Mercedes CLA 200",
    "customerName": "John Doe",
    "customerPhone": "9876543210",
    "startDateTime": "2026-07-20T10:00:00.000Z",
    "endDateTime": "2026-07-20T22:00:00.000Z",
    "durationType": "12hr",
    "status": "pending",
    "createdAt": "2026-07-06T20:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Booking not found"
}
```

---

### 5. PATCH /api/bookings/[id]

Update booking status (admin functionality).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `pending` - Initial state when booking is created
- `confirmed` - Admin confirmed the booking
- `cancelled` - Booking was cancelled
- `completed` - Booking was fulfilled

**Example Request:**
```
PATCH /api/bookings/6a4abf1c8a05f7afd7847b90
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "booking": {
    "_id": "6a4abf1c8a05f7afd7847b90",
    "carId": "mercedes-cla",
    "carName": "Mercedes CLA 200",
    "customerName": "John Doe",
    "customerPhone": "9876543210",
    "startDateTime": "2026-07-20T10:00:00.000Z",
    "endDateTime": "2026-07-20T22:00:00.000Z",
    "durationType": "12hr",
    "status": "confirmed",
    "createdAt": "2026-07-06T20:30:00.000Z",
    "updatedAt": "2026-07-06T20:35:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Invalid status",
  "message": "Status must be one of: pending, confirmed, cancelled, completed"
}
```

---

## Car ID Reference

Use these exact `carId` values when creating bookings (must match Fleet.jsx):

- `maruti-brezza` - Maruti Brezza Petrol
- `maruti-swift` - Maruti Custom Swift
- `maruti-fronx` - Maruti Fronx CNG
- `scorpio-classic` - Mahindra Scorpio Classic
- `thar` - Mahindra Thar
- `mercedes-cla` - Mercedes CLA 200

---

## Overlap Detection Logic

The server validates that no two bookings for the same car overlap in time:

**Overlap exists if:**
```
newBooking.startDateTime < existingBooking.endDateTime 
AND 
newBooking.endDateTime > existingBooking.startDateTime
```

**Only considers bookings with status:**
- `pending`
- `confirmed`

**Ignores bookings with status:**
- `cancelled`
- `completed`

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `405` - Method Not Allowed
- `409` - Conflict (booking overlap)
- `500` - Internal Server Error

---

## CORS

All endpoints support CORS and accept requests from any origin (`*`).

---

## Environment Variables (Vercel)

Add these to your Vercel project settings:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/roadster?retryWrites=true&w=majority
NODE_ENV=production
```
