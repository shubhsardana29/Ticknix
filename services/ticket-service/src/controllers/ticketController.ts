import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async (req: Request, res: Response) => {
  const { eventId, ticketTypeId, sellerId, price } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: { eventId, ticketTypeId, sellerId, price, status: 'AVAILABLE' },
      include: { event: true, ticketType: true, seller: true }
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket' });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { status: 'AVAILABLE' },
      include: { event: true, ticketType: true, seller: true }
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

export const buyTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { buyerId } = req.body;

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: { buyerId, status: 'SOLD' },
      include: { event: true, ticketType: true, buyer: true, seller: true }
    });
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error buying ticket' });
  }
};

export const cancelTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
        const cancelledTicket = await prisma.ticket.update({
            where: { id: Number(id) },
            data: { status: 'CANCELLED' },
            include: { event: true, ticketType: true, buyer: true, seller: true }
        });
        res.json(cancelledTicket);
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling ticket' });
    }
};
