import {
  ICreateLoadRepository,
  IUpdateLoadRepository,
} from 'application/repositories/interfaces';
import { LoadRecordDTO } from 'application/dtos/load.dto';
import { NotFoundError } from 'common/errors';

// for debug
const singletonStore = new Map();

export class InMemoryLoadRepository
  implements ICreateLoadRepository, IUpdateLoadRepository
{
  private store: Map<string, LoadRecordDTO> = singletonStore;

  async create(load: LoadRecordDTO): Promise<void> {
    this.store.set(load.id, load);
    console.log(this.store);
  }

  async update(load: LoadRecordDTO): Promise<void> {
    const id = load.id;
    if (!this.store.has(id)) {
      throw new NotFoundError(`Load with id ${id} not found`);
    }

    this.store.set(id, load);
    console.log(this.store);
  }

  async findById(id: string): Promise<LoadRecordDTO | null> {
    console.log(this.store, this.store.get(id));
    return this.store.get(id) || null;
  }
}
