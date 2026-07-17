import { Injectable, Logger } from '@nestjs/common';
import { TransactionType } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  notifyLargeExpense(
    title: string,
    amount: number,
    category: string,
    type: TransactionType,
  ) {
    if (type !== 'EXPENSE') return;

    if (amount < 10000) return;

    this.logger.warn(`
=========================================
🚨 LARGE EXPENSE DETECTED
Title: ${title}
Category: ${category}
Amount: ₹${amount}
=========================================
`);
  }
}
