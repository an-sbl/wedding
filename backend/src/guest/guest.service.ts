import { Injectable } from '@nestjs/common';
import axios, { isAxiosError } from 'axios';
import { CreateGuestDto } from './dto/guest.dto';

@Injectable()
export class GuestService {
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwesZuq9Q6mbkv-vTyedh5H_gFdbm04IWF6uSRnh-ii9BvUAW9_u-LdN6kcH_aNbUTjbA/exec';

  async saveToGoogleSheets(guestData: CreateGuestDto): Promise<{ success: boolean; data?: any }> {
    try {
      const response = await axios.post(this.GOOGLE_SCRIPT_URL, guestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return { success: true, data: response.data };
    } catch (error: unknown) {
      // Обработка ошибок с правильной типизацией
      if (isAxiosError(error)) {
        console.error('Ошибка Axios:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
        throw new Error(`Ошибка при отправке в Google Sheets: ${error.message}`);
      }
      
      if (error instanceof Error) {
        console.error('Ошибка:', error.message);
        throw new Error(`Не удалось сохранить данные: ${error.message}`);
      }
      
      console.error('Неизвестная ошибка:', error);
      throw new Error('Не удалось сохранить данные');
    }
  }
}