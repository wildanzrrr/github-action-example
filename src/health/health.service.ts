import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export interface HealthCheckResponse {
  status: 'ok' | 'error';
  timestamp: string;
  database: {
    status: 'connected' | 'disconnected';
    responseTime?: number;
    error?: string;
  };
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  constructor(private readonly prisma: PrismaService) {}

  async checkHealth(): Promise<HealthCheckResponse> {
    const timestamp = new Date().toISOString();
    const startTime = Date.now();

    try {
      this.logger.debug('Performing health check...');
      // Perform a simple database query to check connection
      await this.prisma.$queryRaw`SELECT 1`;
      const responseTime = Date.now() - startTime;
      this.logger.log('Database connection successful.', responseTime);
      return {
        status: 'ok',
        timestamp,
        database: {
          status: 'connected',
          responseTime,
        },
      };
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      return {
        status: 'error',
        timestamp,
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }
}
