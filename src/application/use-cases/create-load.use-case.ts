import { CreateLoadInputDTO } from 'application/dtos/load.dto';
import { UpdateLoadMapper } from 'application/data-mappers/load.data-mappers';
import { ICreateLoadRepository } from 'application/repositories/interfaces';
import { DefaultLoadFactory } from 'application/factories/load.factory';

export class CreateLoadUseCase {
  constructor(
    private readonly loadRepository: ICreateLoadRepository,
    private readonly loadFactory = new DefaultLoadFactory(),
  ) {}

  async execute(input: CreateLoadInputDTO) {
    const loadEntity = this.loadFactory.create(input);
    loadEntity.createLoad();
    const dto = new UpdateLoadMapper().toRecordDTO(loadEntity);

    await this.loadRepository.create(dto);
    return loadEntity;
  }
}
