import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        date: new Date(createTransactionDto.date),
      },
    });

    this.notifications.notifyLargeExpense(
      transaction.title,
      Number(transaction.amount),
      transaction.category,
      transaction.type,
    );

    return transaction;
  }

  findAll() {
    return this.prisma.transaction.findMany({
      orderBy: {
        date: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  async getSummary() {
    const [incomeResult, expenseResult] = await Promise.all([
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'INCOME' },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'EXPENSE' },
      }),
    ]);

    const income = Number(incomeResult._sum.amount ?? 0);
    const expense = Number(expenseResult._sum.amount ?? 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }
}
