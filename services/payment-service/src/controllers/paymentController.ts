import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPayment = async (req: Request, res: Response) => {
  const { ticketId, buyerId, sellerId, amount } = req.body;

  try {
    // todo: integrate with a real payment gateway here
    const gstAmount = amount * 0.18; // Assuming 18% GST
    const payment = await prisma.transaction.create({
      data: {
        ticketId,
        buyerId,
        sellerId,   
        amount,
        gstAmount,
        status: 'PENDING'// In reality, this would be set/COMPLETED after confirming with the payment gateway
      }
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payment = await prisma.transaction.findUnique({
      where: { id: Number(id) }
    });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment' });
  }
};

export const refundPayment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const payment = await prisma.transaction.update({
            where: { id: Number(id) },
            data: { status: 'REFUNDED' }
        });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error refunding payment' });
    }
};