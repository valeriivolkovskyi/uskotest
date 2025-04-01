import { LoadEntity } from 'domain/entities/load.entity';
import {
  CreateLoadInputDTO,
  LoadRecordDTO,
} from 'application/dtos/load.dto';
import { ExpediteLoadEntity } from 'domain/entities/expedite-load.entity';
import { ValidationError } from 'common/errors';
import { LoadProps, Status } from 'domain/data/load.data';

export class CreateLoadMapper {
  toProps(dto: CreateLoadInputDTO): LoadProps {
    return { ...dto };
  }
}

export class UpdateLoadMapper {
  toRecordDTO(load: LoadEntity): LoadRecordDTO {
    const data = load.getLoadData();
    return {
      ...data,
      policyNotes: this.getPolicyNotes(load),
    };
  }

  private getPolicyNotes(load: LoadEntity): string | undefined {
    if (load instanceof ExpediteLoadEntity) {
      return load.getPolicyNotes();
    }
    return undefined;
  }

  static mapStatus(value: string): Status {
    const statusMap: Record<string, Status> = {
      pending: Status.PENDING,
      canceled: Status.CANCELED,
      confirmed: Status.CONFIRMED,
    };

    const status = statusMap[value];
    if (!status) throw new ValidationError(`Invalid load status: ${value}`);
    return status;
  }
}
