import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, phone: true, panNumber: true }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, panNumber } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, phone, panNumber },
      select: { id: true, name: true, email: true, phone: true, panNumber: true }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};