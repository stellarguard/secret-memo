// tslint:disable:no-expression-statement
import { test } from 'ava';
import AnonymousMemo from './anonymous-memo';

test('encrypts and decrypts to the same thing', t => {
  const anonymousMemo = new AnonymousMemo('encryption secret');
  const data = 'tippity top secret';
  const memo = anonymousMemo.toMemo(data);
  t.is(memo.type, 'hash');
  t.not(
    (memo.value as Buffer).toString('utf8'),
    data,
    'Memo should have been encrypted'
  );
  t.is(anonymousMemo.fromMemo(memo), data);
});

function getData(length: number): string {
  let data = '';
  for (let i = 0; i < length; ++i) {
    data += 'a';
  }
  return data;
}

test('allows 22 characters of data', t => {
  const anonymousMemo = new AnonymousMemo('encryption secret');
  const data = getData(22);
  const memo = anonymousMemo.toMemo(data);
  t.truthy(memo);
});

test('does not allow more than 22 characters of data', t => {
  const anonymousMemo = new AnonymousMemo('encryption secret');
  const data = getData(23);
  t.throws(() => anonymousMemo.toMemo(data));
});
