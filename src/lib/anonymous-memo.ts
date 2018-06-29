import Cryptr from 'cryptr';
import randomBytes from 'randombytes';
import { Memo } from 'stellar-sdk';

const MAX_MEMO_LENGTH = 22;

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
    const payload = data + padding + paddingSize.toString(16).padStart(2, '0');
    const hash = this.cryptr.encrypt(payload);
    return Memo.hash(hash);
  }

  public fromMemo(memo: Memo): string {
    const hash = (memo.value as Buffer).toString('hex');
    const decrypted = this.cryptr.decrypt(hash);
    const paddingSize = parseInt(decrypted.slice(-2), 16);
    return decrypted.slice(0, -(2 + paddingSize));
  }
}
