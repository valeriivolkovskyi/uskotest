import { LoadEntity } from 'domain/entities/load.entity';
import { ExpediteLoadEntity } from 'domain/entities/expedite-load.entity';
import { LogisticsLoad } from 'domain/entities/logistics-load.entity';
import { CreateLoadMapper } from 'application/data-mappers/load.data-mappers';
import { CreateLoadInputDTO } from 'application/dtos/load.dto';

export class DefaultLoadFactory {
  create(input: CreateLoadInputDTO): LoadEntity {
    const mapper = new CreateLoadMapper();
    if (input.companyType === 'expedite') {
      return new ExpediteLoadEntity({
        ...mapper.toProps(input),
      });
    } else if (input.companyType === 'logistics') {
      return new LogisticsLoad(mapper.toProps(input));
    } else {
      throw new Error(`Unknown company type: ${input.companyType}`);
    }
  }
}
