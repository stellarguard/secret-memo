const { SecretMemo } = require('@stellarguard/secret-memo');
const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const secretKey = 'its a secret to everybody'; // keep it secret, keep it safe
const secretMemo = new SecretMemo(secretKey);

const keypair = StellarSdk.Keypair.fromSecret(
  'SC4RKRR3SGL65IKBM2IQIBJGKUYELZXBFNTDHHAHNIFHXNHCWAYK65I7'
);

async function submitSecretMemo(secret) {
  const fee = await server.fetchBaseFee();
  const sourceAccount = await server.loadAccount(keypair.publicKey());
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: String(fee),
    networkPassphrase: StellarSdk.Networks.TESTNET,
  })
    .addMemo(secretMemo.toMemo(secret))
    .addOperation(
      StellarSdk.Operation.payment({
        amount: '1',
        asset: StellarSdk.Asset.native(),
        destination: keypair.publicKey(),
      })
    )
    .setTimeout(0)
    .build();

  transaction.sign(keypair);
  const result = await server.submitTransaction(transaction);
  console.log('Submit result: ', result);
  return result;
}

async function readSecretMemo(transactionId) {
  const result = await server.transactions().transaction(transactionId).call();
  const transaction = StellarSdk.TransactionBuilder.fromXDR(
    result.envelope_xdr,
    StellarSdk.Networks.TESTNET
  );
  console.log('Your Secret:', secretMemo.fromMemo(transaction.memo));
}

(async () => {
  const secret = 'drink more ovaltine';
  const txResult = await submitSecretMemo(secret);
  await readSecretMemo(txResult.hash);
})();
