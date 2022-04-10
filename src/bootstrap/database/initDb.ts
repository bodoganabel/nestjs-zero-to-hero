import { EPermissions, ERoles, User, UserDocument } from 'src/auth/user.schema';
import { Connection } from 'typeorm';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from 'src/auth/permission.schema';
import { usersInit } from './users.init';

export async function initDb(
  userModel: Model<UserDocument>,
  permissionModel: Model<PermissionDocument>,
) {
  if (process.env.STAGE === 'development') {
    await initPermissions(permissionModel);
    await initUsers(userModel, permissionModel);
  }
}

// * ROLES
async function initRoles(databaseConnection: Connection) {
  console.log('Roles are not implemented yet');
}

//* PERMISSIONS
async function initPermissions(permissionModel: Model<PermissionDocument>) {
  //Cleanup
  await permissionModel.deleteMany({});
  //Insert default
  const permissions: Permission[] = [];
  Object.values(EPermissions).forEach((name) => {
    const permission = new Permission();
    permission.name = name;
    permissions.push(permission);
  });
  const permissionsResult = await permissionModel.insertMany(permissions);

  console.log('permissionsResult');
  console.log(permissionsResult);
}

// * USERS
async function initUsers(
  userModel: Model<UserDocument>,
  permissionModel: Model<PermissionDocument>,
) {
  //Cleanup
  await userModel.deleteMany({});

  const existingPermissions: Permission[] = await permissionModel.find();
  const usersToCreate = [];
  usersInit.forEach((user) => {
    const requestedPermissions = user.permissions;
    const permissionsToAdd = existingPermissions.filter((permission) =>
      requestedPermissions.includes(permission.name),
    );
    const permissionsToAddIds = permissionsToAdd.map(
      (permission) => permission._id,
    );
    const userToPush: any = user; // Overwriting Enum Permissions to database Permission instances
    userToPush.permissions = permissionsToAddIds;
    usersToCreate.push(userToPush);
  });

  const userResult = await userModel.insertMany(usersToCreate);

  console.log('userResult');
  console.log(userResult);
}

// * ROLES PERMISSIONS
async function connectRolesWithPermissions(databaseConnection: Connection) {
  //Cleanup
  await databaseConnection.query('DELETE FROM permission;');
  //Insert default
  const permissions: string[] = [];
  Object.values(EPermissions).forEach((permission) =>
    permissions.push(
      `INSERT INTO permission VALUES (uuid_generate_v4 ()::uuid,'${permission}');`,
    ),
  );
  const permissionsResult = await databaseConnection.query(
    permissions.join(' '),
  );

  console.log('permissionsResult');
  console.log(permissionsResult);
}
