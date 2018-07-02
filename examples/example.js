const { SecretMemo } = require('@stellarguard/secret-memo');
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const secretKey = 'its a secret to everybody'; // keep it secret, keep it safe
const secretMemo = new SecretMemo(secretKey);

const keypair = StellarSdk.Keypair.fromSecret(
  'SC4RKRR3SGL65IKBM2IQIBJGKUYELZXBFNTDHHAHNIFHXNHCWAYK65I7'
);

async function submitSecretMemo(secret) {
  const sourceAccount = await server.loadAccount(keypair.publicKey());
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
    .addMemo(secretMemo.toMemo(secret))
    .addOperation(
      StellarSdk.Operation.payment({
        amount: '1',
        asset: StellarSdk.Asset.native(),
        destination: keypair.publicKey()
      })
    )
    .build();

  transaction.sign(keypair);
  const result = await server.submitTransaction(transaction);
  console.log('Submit result: ', result);
  return result;
}

async function readSecretMemo(transactionId) {
  const result = await server
    .transactions()
    .transaction(transactionId)
    .call();

  const transaction = new StellarSdk.Transaction(result.envelope_xdr);
  console.log('Your Secret:', secretMemo.fromMemo(transaction.memo));
}

(async () => {
  const secret = 'drink more ovaltine';
  const txResult = await submitSecretMemo(secret);
  await readSecretMemo(txResult.hash);
})();
