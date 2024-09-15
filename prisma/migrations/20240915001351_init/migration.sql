-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "event";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "payment";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ticket";

-- CreateEnum
CREATE TYPE "auth"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ticket"."TicketStatus" AS ENUM ('AVAILABLE', 'SOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "payment"."TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED');

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phone" TEXT,
    "role" "auth"."Role" NOT NULL DEFAULT 'USER',
    "panNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "totalCapacity" INTEGER NOT NULL,
    "basePrice" DECIMAL(10,2) NOT NULL,
    "gstRate" DECIMAL(5,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event"."TicketType" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "minPrice" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket"."Ticket" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "ticketTypeId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "buyerId" INTEGER,
    "price" DECIMAL(10,2) NOT NULL,
    "status" "ticket"."TicketStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment"."Transaction" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "gstAmount" DECIMAL(10,2) NOT NULL,
    "status" "payment"."TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_panNumber_key" ON "auth"."User"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_ticketId_key" ON "payment"."Transaction"("ticketId");

-- AddForeignKey
ALTER TABLE "event"."TicketType" ADD CONSTRAINT "TicketType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket"."Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket"."Ticket" ADD CONSTRAINT "Ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "event"."TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket"."Ticket" ADD CONSTRAINT "Ticket_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "auth"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket"."Ticket" ADD CONSTRAINT "Ticket_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "auth"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."Transaction" ADD CONSTRAINT "Transaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"."Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."Transaction" ADD CONSTRAINT "Transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "auth"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment"."Transaction" ADD CONSTRAINT "Transaction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "auth"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
