declare module 'cryptr' {
  export default class Cryptr {
    constructor(secret: string);

    encrypt(data: string): string;
    decrypt(data: string): string;
  }
}
