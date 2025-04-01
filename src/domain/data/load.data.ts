export enum Status {
  PENDING = 'pending',
  CANCELED = 'canceled',
  CONFIRMED = 'confirmed',
}

export interface LoadProps {
  id?: string;
  customerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  scheduledTime: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status: Status;
}

export type LoadData = Required<LoadProps>;
export type ExpediteLoadData = Required<ExpediteLoadProps>;

export interface ExpediteLoadProps extends LoadProps {
  policyNotes: string;
}
