import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoritesDocument = Favorites & Document;

@Schema()
export class Favorites extends Document {
  @Prop({ required: true })
  list: Array<IFavorites>;
}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
