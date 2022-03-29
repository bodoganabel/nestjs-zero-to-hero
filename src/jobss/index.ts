import { runInterval_removeExpiredJwtRefreshTokens } from "./remove-expired-jwt";


export async function runJobs() {
  runInterval_removeExpiredJwtRefreshTokens();
}