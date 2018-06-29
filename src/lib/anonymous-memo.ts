import Cryptr from 'cryptr';
import randomBytes from 'randombytes';
import { Memo } from 'stellar-sdk';

const MAX_MEMO_LENGTH = 23;

export default class MemoAnonymizer {
  private cryptr: Cryptr;

  constructor(secret: string) {
    this.cryptr = new Cryptr(secret);
  }

  public toMemo(data: string): Memo {
    if (data.length > MAX_MEMO_LENGTH) {
      throw new Error(
        `The data to anonymize cannot be longer than ${MAX_MEMO_LENGTH} characters`
      );
    }

    const paddingSize = MAX_MEMO_LENGTH - data.length;
    const padding = randomBytes(paddingSize)
      .toString('hex')
      .slice(0, paddingSize);
    const payload = data + padding + String.fromCharCode(paddingSize);
    const hash = this.cryptr.encrypt(payload);
    return Memo.hash(hash);
  }

  public fromMemo(memo: Memo): string {
    const hash = (memo.value as Buffer).toString('hex');
    const decrypted = this.cryptr.decrypt(hash);
    const paddingSize = decrypted.slice(-1).charCodeAt(0);
    return decrypted.slice(0, -(1 + paddingSize));
  }
}
