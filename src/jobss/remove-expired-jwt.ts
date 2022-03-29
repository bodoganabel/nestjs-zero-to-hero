import {
  authConfig,
  IRefreshToken,
  refreshTokens,
} from '../../auth/jwt/jwt-auth-server';

const removeExpiredJwtRefreshTokens = () => {
  const newRefreshTokens = refreshTokens.filter(
    (token: IRefreshToken) => token.autoLogout.getTime() > new Date().getTime(),
  );
  refreshTokens.splice(0, refreshTokens.length); //empty refreshTokens
  refreshTokens.push(...newRefreshTokens);
};

export async function runInterval_removeExpiredJwtRefreshTokens() {
  setInterval(() => {
    removeExpiredJwtRefreshTokens();
    console.log('removed unnecessary jwt refresh tokens');
    console.log(refreshTokens);
  }, authConfig.cleanExpiredTokensPeriodMs);
}
