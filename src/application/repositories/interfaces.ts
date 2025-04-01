import { LoadRecordDTO } from 'application/dtos/load.dto';

export interface ICreateLoadRepository {
  create(load: LoadRecordDTO): Promise<void>;
}

export interface IUpdateLoadRepository {
  update(load: LoadRecordDTO): Promise<void>;

  findById(id: string): Promise<LoadRecordDTO | null>;
}
