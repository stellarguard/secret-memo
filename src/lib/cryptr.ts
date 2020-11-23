import crypto from 'crypto';

const algorithm = 'aes-256-ctr';

export default class Cryptr {
  private key: Buffer;

  constructor(secret: string) {
    if (!secret || typeof secret !== 'string') {
      throw new Error('Cryptr: secret must be a non-0-length string');
    }

    this.key = crypto.createHash('sha256').update(String(secret)).digest();
  }

  public encrypt(value: string): string {
    if (value == null) {
      throw new Error('value must not be null or undefined');
    }

    const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
    const cipher = crypto.createCipheriv(algorithm, this.key, iv);
    const encrypted =
      cipher.update(String(value), 'utf8', 'hex') + cipher.final('hex');

    return iv + encrypted;
  }

  public decrypt(value: string | Buffer): string {
    if (value == null) {
      throw new Error('value must not be null or undefined');
    }

    const stringValue = String(value);
    const iv = stringValue.slice(0, 16);
    const encrypted = stringValue.slice(16);

    const decipher = crypto.createDecipheriv(algorithm, this.key, iv);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  }
}
