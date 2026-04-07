import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/guest.dto';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Post('rsvp')
  @HttpCode(HttpStatus.OK)
  async rsvp(@Body() guestData: CreateGuestDto): Promise<{ success: boolean; data?: any }> {
    return this.guestService.saveToGoogleSheets(guestData);
  }
}