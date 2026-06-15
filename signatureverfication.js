const { secp256k1 } = require('@noble/curves/secp256k1');

(async () => {
  const privKeyStr = "e795d69b53a86727d6bf1c090d04106f7ba8b6387a78792065e72ab7ad0a0dbf";
	const pubKeyStr = "04a216db9e21662dd78fdf7fda6ba704f3e903d358f9cc664ebb8e210c37ca470729471cf7b46b8c7bf78fc9b263f46e4996e408c49d61d5edf9d59ef3a7fadf99";
  const message = "5tZJVstcCmq3Cxum7u52y+nieWHma3Wawrbyi0tl0GQ=";
  
  const messagebyteArray = new Uint8Array(Buffer.from(message, "base64"));
  // console.log("msg (Uint8Array):", messagebyteArray);

  const signature = await secp256k1.sign(messagebyteArray, privKeyStr);
  const signatureDER = signature.toDERRawBytes();
  // console.log("signature (toDERRawBytes)" , signatureDER);
  const signatureBase64 = Buffer.from(signatureDER).toString('base64');
  console.log("signature (Base64):", signatureBase64);
  console.log("signature size (toDERRawBytes)" , signatureDER.length);
  const isValid = secp256k1.verify(signature, messagebyteArray, pubKeyStr);
  console.log('Is signature valid?', isValid);
})();
