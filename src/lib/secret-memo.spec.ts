// tslint:disable:no-expression-statement
import { test } from 'ava';
import { SecretMemo } from './secret-memo';

test('encrypts and decrypts to the same thing', t => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = 'tippity top secret';
  const memo = secretMemo.toMemo(data);
  t.is(memo.type, 'hash');
  t.not(
    (memo.value as Buffer).toString('utf8'),
    data,
    'Memo should have been encrypted'
  );
  t.is(secretMemo.fromMemo(memo), data);
});

test('decrypts to text', t => {
  const secreMemo = new SecretMemo('encryption secret');
  const data = 'tippity top secret';
  const memo = secreMemo.toMemo(data);

  t.is(secreMemo.fromMemoHash((memo.value as Buffer).toString('hex')), data);
});

function getData(length: number): string {
  let data = '';
  for (let i = 0; i < length; ++i) {
    data += 'a';
  }
  return data;
}

test('allows 23 characters of data', t => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = getData(23);
  const memo = secretMemo.toMemo(data);
  t.truthy(memo);
});

test('does not allow more than 23 characters of data', t => {
  const secreMemo = new SecretMemo('encryption secret');
  const data = getData(24);
  t.throws(() => secreMemo.toMemo(data));
});
