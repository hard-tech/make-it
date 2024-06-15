// utils/generateRandomString.ts
export function generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const crypto = require('crypto');
    const randomBytes = crypto.randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % charset.length;
      result += charset[index];
    }
    return result;
  }
  