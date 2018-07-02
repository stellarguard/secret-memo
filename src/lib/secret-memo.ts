import { randomBytes } from 'crypto';
import Cryptr from 'cryptr';
import { Memo, MemoHash } from 'stellar-sdk';

const MAX_MEMO_LENGTH = 23; // 32 - 8 for randomness - 1 for padding length

/**
 * Utility to create secret Stellar memos.
 */
export class SecretMemo {
  private cryptr: Cryptr;

  /**
   *
   * @param secretKey The secret used to encrypt/decrypt the secret memo.
   *               Whoever knows the secret key will be able to read any memos created with this tool.
   */
  constructor(secretKey: string) {
    this.cryptr = new Cryptr(secretKey);
  }

  /**
   * Takes a string and turns it into a secret Stellar Memo.
   * The string will be padded with random bytes and encrypted so that running it multiple
   * times will produce different results each time.
   *
   * Because of the additional randomization added to the memo,
   * the data to keep secret must be 23 characters or less.
   *
   * @param data The data to secretize, like a user id or email.
   */
  public toMemo(data: string): Memo {
    if (data.length > MAX_MEMO_LENGTH) {
      throw new Error(
        `The data string cannot be longer than ${MAX_MEMO_LENGTH} characters`
      );
    }

    // Stellar 'hash' type memos must be exactly 64 characters, so we must pad the string to fill the hash
    // and we have to encode the size of the padding we used inside the data itself so we can recover the original string
    const paddingSize = MAX_MEMO_LENGTH - data.length;
    const padding = randomBytes(paddingSize)
      .toString('hex')
      .slice(0, paddingSize);
    const payload = data + padding + String.fromCharCode(paddingSize);
    const hash = this.cryptr.encrypt(payload);
    return Memo.hash(hash);
  }

  /**
   * Returns the original text from a secret Stellar Memo.
   * @param memo The Stellar Memo that contains the secret memo hash.
   */
  public fromMemo(memo: Memo): string {
    if (memo.type !== MemoHash) {
      throw new Error(`Only Memos of type ${MemoHash} can be used.`);
    }

    const memoHash =
      memo.value instanceof Buffer ? memo.value.toString('hex') : memo.value;
    return this.fromMemoHash(memoHash as string);
  }

  /**
   * Takes a secret memo hash and returns the original memo data.
   * @param memoHash The encrypted memo hash, a 64 hex-character string.
   */
  public fromMemoHash(memoHash: string): string {
    const decrypted = this.cryptr.decrypt(memoHash);
    const paddingSize = decrypted.slice(-1).charCodeAt(0);
    return decrypted.slice(0, -(1 + paddingSize));
  }
}
