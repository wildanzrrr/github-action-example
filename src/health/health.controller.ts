import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check endpoint',
    description:
      'Returns the health status of the application including database connectivity',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check successful',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-01-09T12:00:00.000Z',
        database: {
          status: 'connected',
          responseTime: 15,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check failed - database disconnected',
    schema: {
      example: {
        status: 'error',
        timestamp: '2026-01-09T12:00:00.000Z',
        database: {
          status: 'disconnected',
          error: 'Connection timeout',
        },
      },
    },
  })
  async checkHealth() {
    return this.healthService.checkHealth();
  }
}
