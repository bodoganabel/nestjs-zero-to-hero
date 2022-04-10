import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export enum EPermissions {
  GET_USERS = 'GET_USERS',
  DELETE_USERS = 'DELETE_USERS',
  GET_PERMISSIONS = 'GET_PERMISSIONS',
  UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS',
}

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ unique: true })
  name: EPermissions;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  user: User[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
