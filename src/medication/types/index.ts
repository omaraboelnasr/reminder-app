export type CreateMedicationParams = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  userId: string;
  firstIntakeDate?: Date;
  startDate?: Date;
  endDate?: Date;
};

export type UpdateMedicationParams = Partial<CreateMedicationParams>;

export type ListMedicationParams = {
  skip: number;
  limit: number;
};
