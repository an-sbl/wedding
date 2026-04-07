export class CreateGuestDto {
  fullName: string;
  attendance: string;
  wishes: string[];
  
  constructor(data: Partial<CreateGuestDto> = {}) {
    this.fullName = data.fullName || '';
    this.attendance = data.attendance || 'yes';
    this.wishes = data.wishes || [];
  }
}