// File: bip39_secp256k1_keygen.js

const bip39 = require('bip39');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');

const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);

(async () => {
  try {
    // Step 1: Generate 128 bits of entropy
    const entropy = crypto.randomBytes(32); // 256 bits = 32 bytes

    // Step 2: Generate mnemonic from entropy
    const mnemonic = bip39.entropyToMnemonic(entropy.toString('hex'));
    // const mnemonic = 'drip pudding region dress youth team vague black web deer hurdle limit device worry federal dizzy curious trash segment leaf decline fuel strike trick';
    
    console.log('Mnemonic:', mnemonic);

    // Step 3: Generate seed from mnemonic (empty passphrase)
    const seed = await bip39.mnemonicToSeed(mnemonic, '');

    // Step 4: Extract a 32-byte child private key from the seed with child path m/0
    const root = bip32.fromSeed(seed);
    const child = root.derivePath("m/0");
    const privateKey = child.privateKey
    // console.log('Private Key (bytes):', privateKey);
    console.log('Private Key (hex):', Buffer.from(privateKey).toString('hex'));

    // Step 5: Generate the corresponding 65-byte uncompressed public key
    const publicKey = secp256k1.publicKeyCreate(privateKey, false); // false for uncompressed key
    console.log('pubkey len : ', publicKey.length)
    if (publicKey.length != 65) {
      console.error('invalid public key length', publicKey.length)
    }
    // console.log('Public Key (bytes):', publicKey);
    const publicKeyHex = Buffer.from(publicKey).toString('hex'); // Should be 65 bytes
    console.log('Public Key (hex):', publicKeyHex); 

  } catch (error) {
    console.error('Error:', error.message);
  }
})();
