const { secp256k1 } = require('@noble/curves/secp256k1');

(async () => {
  const privKeyStr = "";
	const pubKeyStr = "";
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
