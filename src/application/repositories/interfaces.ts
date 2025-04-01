import { LoadRecordDTO } from 'application/dtos/loadRecordDTO';

export interface ICreateLoadRepository {
  create(load: LoadRecordDTO): Promise<void>;
}

export interface IUpdateLoadRepository {
  update(load: LoadRecordDTO): Promise<void>;

  findById(id: string): Promise<LoadRecordDTO | null>;
}
