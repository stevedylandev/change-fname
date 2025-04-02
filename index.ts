import { makeUserNameProofClaim, ViemLocalEip712Signer } from '@farcaster/hub-nodejs';
import { mnemonicToAccount } from 'viem/accounts';
import { getAddress } from 'viem';

const FID = 6023 // Your FID
const OLD_NAME = "stevedylandev" // Your current fname
const NEW_NAME = "coolsteve" // Your desired fname
// Make sure it's available with this API endpoint:
// https://fnames.farcaster.xyz/transfers?name=farcaster

// Must be custody address mnemonic or private key
const app = mnemonicToAccount(process.env.MNEMONIC as string)

const accountKey = new ViemLocalEip712Signer(app);

const time = Math.floor(Date.now() / 1000)

// Your Custody address
const owner = getAddress(app.address)

// Start request to revoke
const claimRevoke = makeUserNameProofClaim({
  name: OLD_NAME, // current fname
  owner: owner,
  timestamp: time,
});


const signatureRevoke = (
  await accountKey.signUserNameProofClaim(claimRevoke)
)._unsafeUnwrap();


const signatureRevokeHex = '0x' + Buffer.from(signatureRevoke).toString('hex');


const payload = JSON.stringify({
  name: OLD_NAME, // current fname
  from: FID, // your fid
  to: 0, // registry
  fid: FID, // your fid
  owner: owner,
  timestamp: time,
  signature: signatureRevokeHex
})

const request = await fetch('https://fnames.farcaster.xyz/transfers', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: payload
})

const response = await request.json()
console.log(response)

// start new claim
const claim = makeUserNameProofClaim({
  name: NEW_NAME, // new fname you want to claim
  owner: owner,
  timestamp: time,
});


const signatureClaim = (
  await accountKey.signUserNameProofClaim(claim)
)._unsafeUnwrap();


const signatureClaimHex = '0x' + Buffer.from(signatureClaim).toString('hex');


const claimPayload = JSON.stringify({
  name: NEW_NAME,
  from: 0, // registry
  to: FID, // fid
  fid: FID,
  owner: owner,
  timestamp: time,
  signature: signatureClaimHex
})

const claimRequest = await fetch('https://fnames.farcaster.xyz/transfers', {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: claimPayload
})

const claimResponse = await claimRequest.json()
console.log(claimResponse)
