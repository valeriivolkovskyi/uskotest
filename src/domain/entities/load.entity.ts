import { v4 as uuidv4 } from 'uuid';

import { DomainError } from 'common/errors';
import { LoadData, LoadProps, Status } from 'domain/data/load.data';

export class LoadEntity {
  protected id?: string;
  protected customerId: string;
  protected pickupLocation: string;
  protected dropoffLocation: string;
  protected scheduledTime: Date;
  protected createdAt?: Date;
  protected updatedAt?: Date;
  protected status?: Status;

  constructor(props: LoadProps) {
    this.validateCreatedAtProp(props.createdAt);

    this.id = props.id;
    this.customerId = props.customerId;
    this.pickupLocation = props.pickupLocation;
    this.dropoffLocation = props.dropoffLocation;
    this.scheduledTime = props.scheduledTime;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.status = props.status;
  }

  createLoad() {
    if (this.createdAt || this.id) {
      throw new DomainError('Load was already created');
    }

    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
    this.status = Status.PENDING;
  }

  getLoadData(): LoadData {
    const id = this.id;
    const createdAt = this.createdAt;
    const updatedAt = this.updatedAt;
    const status = this.status;

    if (!id || !updatedAt || !createdAt || !status)
      throw new DomainError("Load isn't created");

    return {
      id,
      customerId: this.customerId,
      pickupLocation: this.pickupLocation,
      dropoffLocation: this.dropoffLocation,
      scheduledTime: this.scheduledTime,
      createdAt,
      updatedAt,
      status,
    };
  }

  updateStatus(newStatus: Status) {
    if (this.status === newStatus) {
      return;
    }

    if (this.status === Status.CANCELED) {
      throw new Error(
        'Cannot update status: load has already has been canceled.',
      );
    }

    if (this.status === Status.CONFIRMED && newStatus === Status.PENDING) {
      throw new Error(
        "Cannot update status: confirmed load can't be changed to pending.",
      );
    }

    this.status = newStatus;
    this.setLastUpdate(new Date());
  }

  private validateCreatedAtProp(createdAt?: Date) {
    if (!createdAt) return;

    const timestamp = new Date(createdAt).getTime();
    if (isNaN(timestamp)) {
      throw new DomainError('Invalid createdAt value.');
    }

    if (createdAt > new Date()) {
      throw new DomainError('createdAt cannot be in the future.');
    }
  }

  private setLastUpdate(lastUpdate: Date) {
    this.updatedAt = lastUpdate;
  }
}
