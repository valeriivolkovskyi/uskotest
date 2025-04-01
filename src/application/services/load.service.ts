import { Injectable } from '@nestjs/common';
import { CreateLoadUseCase } from 'application/use-cases/create-load.use-case';
import { UpdateLoadStatusUseCase } from 'application/use-cases/update-load-status-use.case';
import {
  CreateLoadInputDTO,
  LoadRecordDTO,
  UpdateLoadInputDTO,
} from 'application/dtos/loadRecordDTO';

@Injectable()
export class LoadService {
  constructor(
    private readonly createLoadUseCase: CreateLoadUseCase,
    private readonly updateLoadStatusUseCase: UpdateLoadStatusUseCase,
  ) {}

  async create(companyType: string, props: LoadRecordDTO) {
    const input: CreateLoadInputDTO = {
      ...props,
      companyType: companyType as 'logistics' | 'expedite',
    };

    return this.createLoadUseCase.execute(input);
  }

  async updateStatus(companyType: string, loadId: string, newStatus: string) {
    const input: UpdateLoadInputDTO = {
      companyType: companyType as 'logistics' | 'expedite',
      id: loadId,
      status: newStatus,
    };

    return this.updateLoadStatusUseCase.execute(input);
  }
}
