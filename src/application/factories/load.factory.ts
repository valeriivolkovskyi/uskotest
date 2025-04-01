import { LoadEntity } from 'domain/entities/load.entity';
import { ExpediteLoadEntity } from 'domain/entities/expedite-load.entity';
import { LogisticsLoad } from 'domain/entities/logistics-load.entity';
import { LoadMapper } from 'application/data-mappers/LoadMapper';
import { AppError } from 'common/errors';
import { CreateLoadInputDTO } from 'application/dtos/loadRecordDTO';

export class DefaultLoadFactory {
  create({ companyType, ...props }: CreateLoadInputDTO): LoadEntity {
    const mapper = new LoadMapper();
    if (companyType === 'expedite') {
      const policyNotes = props.policyNotes;
      if (!policyNotes)
        throw new AppError('policyNotes is required for expedite loads.');

      return new ExpediteLoadEntity({
        ...mapper.toProps(props),
        policyNotes,
      });
    } else if (companyType === 'logistics') {
      return new LogisticsLoad(mapper.toProps(props));
    } else {
      throw new Error(`Unknown company type: ${companyType}`);
    }
  }
}
