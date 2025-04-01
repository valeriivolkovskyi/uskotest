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

export interface CreateLoadInputDTO extends LoadRecordDTO {
  companyType: 'logistics' | 'expedite';
}

export interface UpdateLoadInputDTO {
  companyType: 'logistics' | 'expedite';
  status: string;
  id: string;
}
