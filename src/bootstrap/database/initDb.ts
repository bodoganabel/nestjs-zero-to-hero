import { EPermissions, ERoles } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { Connection } from 'typeorm';

export async function initDb(
  databaseConnection: Connection,
  userRepository: UserRepository,
) {
  if (process.env.STAGE === 'development') {
    await initRoles(databaseConnection);
    //await initPermissions(databaseConnection);
    await initUsers(userRepository);
  }
}

//* ROLES
async function initRoles(databaseConnection: Connection) {
  console.log('Roles are not implemented yet');
  /*   //Cleanup
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
  console.log(rolesResult); */
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

//* USERS
async function initUsers(userRepository: UserRepository) {
  //Cleanup
  await userRepository.delete({});

  //Insert default
  const users = [
    {
      username: 'admin',
      password: '$2b$10$WFS2aib5jttr8rrh9QCnYukBJbwnNrg.dyZv6vtt8NZa0RmHPYXGO',
      permissions: ERoles.ADMIN,
      task: [],
    },
    {
      username: 'user',
      password: '$2b$10$WFS2aib5jttr8rrh9QCnYukBJbwnNrg.dyZv6vtt8NZa0RmHPYXGO',
      permissions: [],
      task: [],
    },
  ];

  userRepository.create(users);
  const userResult = await userRepository.save(users);

  console.log('userResult');
  console.log(userResult);
}

//* ROLES PERMISSIONS
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
