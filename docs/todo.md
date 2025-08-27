**Prompt สำหรับ Cursor** 
ที่เน้นสร้าง **NestJS Backend** อย่างเดียว (ไม่มี UI) ทำงานเกี่ยวกับ Payment + Webhook + Bull Queue + Logging พร้อม Docker

---

# ✅ Prompt สำหรับ Cursor (NestJS Standard Project)

You are building a **Payment & Reservation Service** using **NestJS (TypeScript)** with **Supabase PostgreSQL** (no Prisma, no monorepo).

---

## 🎯 Features

1. **Health Check** endpoint (`/api/v1/health`)
2. **Seat Management**

   * List seats
   * Reserve seat (booking)
   * Cancel booking
3. **Payment Processing**

   * Create payment (Omise, QRCode, Bank Transfer, WeChat Pay)
   * Webhook listener (`/api/payment/webhook`)
   * Update transaction status (pending → paid → failed)
4. **Queue System (Bull)**

   * Store payment logs asynchronously
   * Retry failed logs
   * Worker runs inside Docker
5. **Logging**

   * All payment requests and webhook callbacks are stored in DB (`payment_logs`)
   * JSON structured logging with Winston
6. **Dockerized**

   * Backend runs on `/api/payment`
   * Nginx reverse proxy
   * PostgreSQL + Redis for queue

---

## 📂 Project Structure

```
/src
  /common
    /logger
  /payments
    payments.controller.ts
    payments.service.ts
    payments.module.ts
  /seats
    seats.controller.ts
    seats.service.ts
    seats.module.ts
  /webhook
    webhook.controller.ts
    webhook.service.ts
    webhook.module.ts
  /queue
    queue.module.ts
    queue.processor.ts
  /database
    entities/
      payment.entity.ts
      payment-log.entity.ts
      seat.entity.ts
    migrations/
  app.module.ts
  main.ts
```

---

## 🛠 Tech Stack

* NestJS + TypeScript
* PostgreSQL (Supabase)
* TypeORM
* Redis + BullMQ
* Winston Logger
* Omise SDK
* Docker + Nginx

---

## 📌 API Endpoints

### Health

* `GET /api/v1/health`

### Seat Management

* `GET /api/v1/seats` → list available seats
* `POST /api/v1/seats/reserve` → reserve a seat
* `POST /api/v1/seats/cancel` → cancel reservation

### Payments

* `POST /api/v1/payments/create` → create a payment (card/qr/bank/wechat)
* `POST /api/payment/webhook` → webhook for Omise

---

## 📦 Deliverables

1. NestJS backend project (scaffold + modules)
2. `package.json` with dependencies
3. Dockerfile + docker-compose.yml (with Postgres + Redis + Nginx)
4. Postman Collection (`postman.json`) with sample requests
5. README.md (setup guide + usage)

---

👉 **Prompt ที่ให้ Cursor รัน:**

```
Create a NestJS backend project called "payment-service".
- Add modules: Payments, Seats, Webhook, Queue, Common (logger).
- Use TypeORM with PostgreSQL (Supabase compatible).
- Use BullMQ with Redis for async logging of payments.
- Implement Omise payment integration (card, qrcode, banktransfer, wechat pay).
- Expose API under path `/api/payment`.
- Add structured logging with Winston and store logs in `payment_logs` table.
- Webhook endpoint must update payment transaction status.
- Include Dockerfile + docker-compose (backend, postgres, redis, nginx).
- Include Postman JSON for API testing.
- Include README.md with setup and run instructions.
```
