import { EPermissions } from 'src/auth/permission.entity';
import { ERoles } from 'src/auth/role.entity';
import { Connection } from 'typeorm';

export async function initDb(databaseConnection: Connection) {
  if (process.env.STAGE === 'development') {
    await initRoles(databaseConnection);
    await initPermissions(databaseConnection);
  }
}

//* ROLES
async function initRoles(databaseConnection: Connection) {
  //Cleanup
  await databaseConnection.query('DELETE FROM role;');
  //Insert default
  const roles: string[] = [];
  Object.values(ERoles).forEach((role) =>
    roles.push(
      `INSERT INTO role VALUES (uuid_generate_v4 ()::uuid,'${role}');`,
    ),
  );
  const rolesResult = await databaseConnection.query(roles.join(' '));

  console.log('rolesResult');
  console.log(rolesResult);
}

//* PERMISSIONS
async function initPermissions(databaseConnection: Connection) {
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
