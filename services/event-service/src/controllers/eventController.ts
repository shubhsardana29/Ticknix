import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, time, venue, city, totalCapacity, basePrice, gstRate } = req.body;

  try {
    const event = await prisma.event.create({
      data: { name, date, time, venue, city, totalCapacity, basePrice, gstRate }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({ where: { id: Number(id) } });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date, time, venue, city, totalCapacity, basePrice, gstRate } = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: { name, date, time, venue, city, totalCapacity, basePrice, gstRate }
    });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.event.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
};