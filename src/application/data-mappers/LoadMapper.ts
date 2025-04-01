import { LoadEntity } from 'domain/entities/load.entity';
import { LoadRecordDTO } from 'application/dtos/loadRecordDTO';
import { ExpediteLoadEntity } from 'domain/entities/expedite-load.entity';
import { AppError } from 'common/errors';
import { LoadProps, Status } from 'domain/data/load.data';

export class LoadMapper {
  toRecordDTO(load: LoadEntity): LoadRecordDTO {
    const data = load.getLoadData();
    return {
      ...data,
      policyNotes: this.getPolicyNotes(load),
    };
  }

  toProps(dto: LoadRecordDTO): LoadProps {
    return {
      ...dto,
      ...(dto.status && { status: LoadMapper.mapStatus(dto.status) }),
      ...(dto.policyNotes && { policyNotes: dto.policyNotes }),
    };
  }

  private getPolicyNotes(load: LoadEntity): string | undefined {
    if (load instanceof ExpediteLoadEntity) {
      return load.getPolicyNotes();
    }
  }

  static mapStatus(value: string): Status {
    switch (value) {
      case 'pending':
        return Status.PENDING;
      case 'canceled':
        return Status.CANCELED;
      case 'confirmed':
        return Status.CONFIRMED;
      default:
        throw new AppError(`Invalid load status: ${value}`);
    }
  }
}
