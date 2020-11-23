// tslint:disable:no-expression-statement
import Cryptr from './cryptr';
import test from 'ava';

const testSecret = 'myTotalySecretKey';
const testData = 'bacon';

test('works...', (t) => {
  t.plan(1);

  const cryptr = new Cryptr(testSecret);
  const encryptedString = cryptr.encrypt(testData);
  const decryptedString = cryptr.decrypt(encryptedString);

  t.is(decryptedString, testData, 'decrypted aes256 correctly');
});

test('works with utf8 specific characters', (t) => {
  t.plan(1);

  const testString = 'ßáÇÖÑ 🥓';
  const cryptr = new Cryptr(testSecret);
  const encryptedString = cryptr.encrypt(testString);
  const decryptedString = cryptr.decrypt(encryptedString);

  t.is(
    decryptedString,
    testString,
    'decrypted aes256 correctly with UTF8 chars'
  );
});

test('goes bang if bad secret', (t) => {
  const badSecrets = [
    null,
    undefined,
    0,
    123451345134,
    '',
    Buffer.from('buffer'),
    {},
  ] as any[];

  t.plan(badSecrets.length);

  for (const badSecret of badSecrets) {
    t.throws(
      () => new Cryptr(badSecret),
      { message: 'Cryptr: secret must be a non-0-length string' },
      `throws on bad secret ${badSecret}`
    );
  }
});

test('encrypt goes bang if value is null or undefined', (t) => {
  const cryptr = new Cryptr(testSecret);
  const badValues = [null, undefined] as any[];

  t.plan(badValues.length);

  for (const badValue of badValues) {
    t.throws(
      () => cryptr.encrypt(badValue),
      { message: 'value must not be null or undefined' },
      `throws on value ${badValue}`
    );
  }
});

test('decrypt goes bang if value is null or undefined', (t) => {
  const cryptr = new Cryptr(testSecret);
  const badValues = [null, undefined] as any[];

  t.plan(badValues.length);

  for (const badValue of badValues) {
    t.throws(
      () => cryptr.decrypt(badValue),
      { message: 'value must not be null or undefined' },
      `throws on value ${badValue}`
    );
  }
});
