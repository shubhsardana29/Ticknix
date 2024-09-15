import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();
    const eventCount = await prisma.event.count();
    const ticketCount = await prisma.ticket.count();
    const totalSales = await prisma.transaction.aggregate({
      _sum: { amount: true }
    });

    res.json({
      userCount,
      eventCount,
      ticketCount,
      totalSales: totalSales._sum.amount || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

export const getTransactionReport = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        ticket: { include: { event: true } }
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction report' });
  }
};

export const getUserReport = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,    
        role: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user report' });
  }
};