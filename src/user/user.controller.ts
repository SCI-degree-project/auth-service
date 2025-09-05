import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Request } from 'express';

@Controller('protected')
export class ProtectedController {
  @UseGuards(FirebaseAuthGuard)
  @Get()
  getData(@Req() req: Request) {
    const user = req['user'];
    return {
      message: 'Access granted',
      user,
    };
  }
}
