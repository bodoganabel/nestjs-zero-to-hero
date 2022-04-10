import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IJwtTokenShape {
  username: string;
  permissions: string[] | undefined;
}
export type JwtRefreshTokenDocument = JwtRefreshToken & Document;
@Schema()
export class JwtRefreshToken {
  @Prop({ unique: true })
  token: string;

  @Prop()
  autoLogout: Date;
}
export const JwtRefreshTokenSchema =
  SchemaFactory.createForClass(JwtRefreshToken);
