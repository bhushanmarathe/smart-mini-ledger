import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationsModule } from './notifications/notifications.module';
@Module({
  imports: [PrismaModule, TransactionsModule, NotificationsModule],
})
export class AppModule {}
