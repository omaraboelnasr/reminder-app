export type CreateMedicationParams = {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: number;
  userId: any;
  initialStock: number;
  lowStock?: boolean;
  medicationNotes?: string;
  firstIntakeDate?: Date;
  startDate?: Date;
  endDate?: Date;
};

export type UpdateMedicationParams = Partial<CreateMedicationParams>;

export type ListMedicationParams = {
  skip: number;
  limit: number;
};
