import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoadRecordDTO } from 'application/dtos/load.dto';
import { LoadService } from 'application/services/load.service';

@Controller('/:companyType/loads')
export class LoadController {
  constructor(private readonly loadService: LoadService) {}

  @Post()
  async createLoad(
    @Param('companyType') companyType: string,
    @Body() dto: LoadRecordDTO,
  ) {
    return await this.loadService.create(companyType, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('companyType') companyType: string,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    try {
      return await this.loadService.updateStatus(companyType, id, status);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
