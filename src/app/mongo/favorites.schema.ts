import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { Location } from './calendar.schema';

class Favorites_ extends Location {}

export type FavoritesDocument = Favorites & Document;

@Schema()
export class Favorites extends Document {
  @Prop({ type: MongooseSchema.Types.Array, required: true })
  list: Favorites_[];
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
