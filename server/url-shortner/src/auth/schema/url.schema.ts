
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Url extends Document {
  
  @Prop({ required: true,unique:true })
  shortUrl:string

  @Prop({ required: true,unique:true})
  longUrl:string

}
export const UrlSchema = SchemaFactory.createForClass(Url);