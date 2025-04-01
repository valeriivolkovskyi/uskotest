import { DomainError } from 'common/errors';
import { LoadEntity } from './load.entity';
import { ExpediteLoadProps, ExpediteLoadData } from 'domain/data/load.data';

export class ExpediteLoadEntity extends LoadEntity {
  readonly policyNotes: string;

  constructor(props: ExpediteLoadProps) {
    super(props);

    this.validatePolicyNotes(props.policyNotes);

    this.policyNotes = props.policyNotes;
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
      throw new DomainError('Expedite load requires policyNotes.');
    }
  }
}
