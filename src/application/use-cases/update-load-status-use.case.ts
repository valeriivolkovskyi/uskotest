import {
  CreateLoadInputDTO,
  LoadRecordDTO,
  UpdateLoadInputDTO,
} from 'application/dtos/loadRecordDTO';
import { LoadMapper } from 'application/data-mappers/LoadMapper';
import { IUpdateLoadRepository } from 'application/repositories/interfaces';
import { NotFoundError } from 'common/errors';
import { DefaultLoadFactory } from 'application/factories/load.factory';

export class UpdateLoadStatusUseCase {
  private readonly loadFactory = new DefaultLoadFactory();

  constructor(private readonly loadRepository: IUpdateLoadRepository) {}

  async execute(input: UpdateLoadInputDTO): Promise<LoadRecordDTO> {
    const existingRecord = await this.loadRepository.findById(input.id);

    if (!existingRecord) {
      throw new NotFoundError(`Load with ID ${input.id} not found`);
    }

    const mapper = new LoadMapper();
    const dto: CreateLoadInputDTO = {
      ...existingRecord,
      companyType: input.companyType as 'logistics' | 'expedite',
    };
    const loadEntity = this.loadFactory.create(dto);

    loadEntity.updateStatus(LoadMapper.mapStatus(input.status));

    const updatedDTO = mapper.toRecordDTO(loadEntity);

    await this.loadRepository.update(updatedDTO);
    return updatedDTO;
  }
}
