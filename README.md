# @stellarguard/secret-memo

Create secret memos for Stellar transactions in NodeJS.

Uses AES-256 with a random initialization vector to encrypt and decrypt memos.

Use this if you want to place data in Stellar memos that you don't want other to be able to read. Also, because of the random initilization vector used when encrypting the memo, the result will be different even when run with the same data. This makes it perfect to use when you want to protect your users from data leakage that could allow someone to link two accounts together, such as when reusing the same id for exchange deposits.

Combine that with a federation server that is used to generate the memo and you all of a sudden have a convenient, safe, and private deposit experience.

Note: Because of the randomness added when encrypting, Secret memos can only be 23 characters long.

# Installation

## npm

`npm install --save @stellarguard/anoymous-memo`

## yarn

`yarn add @stellarguard/anonymous-memo`

Requires `stellar-sdk` as an peer dependency.

# Usage

```js
import { SecretMemo } from '@stellarguard/secret-memo';
// or const { SecretMemo } = require('@stellarguard/secret-memo');

const secretKey = 'its a secret to everybody'; // keep it secret, keep it safe
const secretMemo = new SecretMemo(secretKey);

// create the secret and add to a transaction
const transaction = new TransactionBuilder(sourceAccount)
  .addMemo(secretMemo.toMemo('drink more ovaltine'))
  .addOperation(operation)
  .build();

// read the secret from the transaction
const mySecret = secretMemo.fromMemo(transaction.memo); // drink more ovaltine
```

See a [working example](./examples/examples.js) for more details.
