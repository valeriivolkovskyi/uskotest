import { ValidationError } from 'common/errors';

export interface LoadRecordDTO {
  id: string;
  customerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  scheduledTime: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
  policyNotes?: string;
}

interface ICreateLoadInputDTO {
  customerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  scheduledTime: Date;
  companyType: 'logistics' | 'expedite';
  policyNotes?: string;
}

export class CreateLoadInputDTO {
  public customerId: string;
  public pickupLocation: string;
  public dropoffLocation: string;
  public scheduledTime: Date;
  public companyType: 'logistics' | 'expedite';
  public policyNotes?: string;

  constructor(data: ICreateLoadInputDTO) {
    if (!data) {
      throw new ValidationError('Input data is required');
    }

    const {
      customerId,
      pickupLocation,
      dropoffLocation,
      scheduledTime,
      companyType,
      policyNotes,
    } = data;

    if (!customerId) {
      throw new ValidationError('customerId must be a non-empty string');
    }

    if (!pickupLocation) {
      throw new ValidationError('pickupLocation must be a non-empty string');
    }

    if (!dropoffLocation) {
      throw new ValidationError('dropoffLocation must be a non-empty string');
    }

    if (!scheduledTime) {
      throw new ValidationError('scheduledTime must be a valid Date');
    }

    if (!['logistics', 'expedite'].includes(companyType)) {
      throw new ValidationError(`Invalid companyType: ${companyType}`);
    }

    if (policyNotes !== undefined && typeof policyNotes !== 'string') {
      throw new ValidationError('policyNotes must be a string if provided');
    }

    this.customerId = customerId;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.scheduledTime = scheduledTime;
    this.companyType = companyType;
    this.policyNotes = policyNotes;
  }
}

interface IUpdateLoadInputDTO {
  companyType: 'logistics' | 'expedite';
  status: string;
  id: string;
}

export class UpdateLoadInputDTO {
  public companyType: 'logistics' | 'expedite';
  public status: string;
  public id: string;

  constructor(data: IUpdateLoadInputDTO) {
    if (!data) {
      throw new ValidationError('Input data is required');
    }

    const { companyType, status, id } = data;

    if (!['logistics', 'expedite'].includes(companyType)) {
      throw new ValidationError(`Invalid companyType: ${companyType}`);
    }

    if (!status) {
      throw new ValidationError('Status must be a non-empty string');
    }

    if (!id) {
      throw new ValidationError('ID must be a non-empty string');
    }

    this.companyType = companyType;
    this.status = status;
    this.id = id;
  }
}
