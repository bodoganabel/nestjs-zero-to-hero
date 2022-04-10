export enum EDatabaseType {
  NOSQL = 'NOSQL',
  SQL = 'SQL',
}

export const appConfig = {
  databaseType: EDatabaseType.SQL,
};

export const authConfig = {
  accessToxenExpiration: process.env.STAGE === 'developnet' ? '30m' : '15s', //jwt expiration string
  autoLogoutPeriodMs: 30 * 60 * 1000,
  cleanExpiredTokensPeriodMs: 60 * 60 * 1000,
};

export function getMongodbConnectionString() {
  const connectionString = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`;
  console.log('MONGODB connection string:');
  console.log(connectionString);

  return connectionString;
}
