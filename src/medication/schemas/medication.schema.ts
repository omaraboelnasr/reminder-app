import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Schema({ timestamps: true })
export class Medication extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dosage: string; // 1 pil

  @Prop({ required: true })
  frequency: string; // every 8 hours

  @Prop({ required: true })
  duration: string; // for 5 days

  @Prop()
  firstIntakeDate: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
}
export const MedicationSchema = SchemaFactory.createForClass(Medication);
