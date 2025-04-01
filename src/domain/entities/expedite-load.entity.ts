import { ValidationError } from 'common/errors';
import { LoadEntity } from './load.entity';
import { ExpediteLoadData, ExpediteLoadProps } from 'domain/data/load.data';

export class ExpediteLoadEntity extends LoadEntity {
  readonly policyNotes: string;

  constructor(props: ExpediteLoadProps) {
    super(props);

    this.policyNotes = this.validatePolicyNotes(props.policyNotes);
  }

  override getLoadData(): ExpediteLoadData {
    const base = super.getLoadData();

    return {
      ...base,
      policyNotes: this.policyNotes,
    };
  }

  getPolicyNotes(): string {
    return this.policyNotes;
  }

  private validatePolicyNotes(policyNotes?: string) {
    if (!policyNotes) {
      throw new ValidationError('Expedite load requires policyNotes.');
    }

    return policyNotes;
  }
}
