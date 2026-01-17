import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get application version',
    description:
      'Returns a hello world message with the current application version',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Application version retrieved successfully',
    schema: {
      example: 'Hello from FLOW Africa Strategy version: 0.0.1',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
