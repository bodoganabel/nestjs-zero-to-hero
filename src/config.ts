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
