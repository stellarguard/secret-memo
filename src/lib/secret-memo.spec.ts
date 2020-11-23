// tslint:disable:no-expression-statement
import test from 'ava';
import { Memo } from 'stellar-sdk';
import { SecretMemo } from './secret-memo';

test('encrypts and decrypts to the same thing', (t) => {
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

test('decrypts to text', (t) => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = 'tippity top secret';
  const memo = secretMemo.toMemo(data);

  t.is(secretMemo.fromMemoHash((memo.value as Buffer).toString('hex')), data);
});

test('allows 23 characters of data', (t) => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = getData(23);
  const memo = secretMemo.toMemo(data);
  t.truthy(memo);
});

test('does not allow more than 23 characters of data', (t) => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = getData(24);
  t.throws(() => secretMemo.toMemo(data));
});

test('only allows memos of type hash to be decrypted', (t) => {
  const secretMemo = new SecretMemo('encryption secret');

  t.throws(() => secretMemo.fromMemo(Memo.text('text')));
});

test('the example works', (t) => {
  const secretMemo = new SecretMemo('encryption secret');
  const data = 'drink more ovaltine';
  const memo = secretMemo.toMemo(data);

  t.is(secretMemo.fromMemo(memo), 'drink more ovaltine');
});

function getData(length: number): string {
  let data = '';
  for (let i = 0; i < length; ++i) {
    data += 'a';
  }
  return data;
}
