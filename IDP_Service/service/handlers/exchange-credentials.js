import express from "express";
import crypto from "crypto";
import argon from "argon2";
import JSONWebToken from "jsonwebtoken";
import ms from "ms";
import UUID from "pure-uuid"

async function getIdentityForUsernamePasswordCredentials(request, response) {
  const store = request.app.locals.store;
  const username = request.body.email.trim();
  const lowerCaseUsername = username.toLowerCase();
  const credentialsKey = `credentials:${lowerCaseUsername}`;
  const passwordInformation = await store
    .get(credentialsKey)
    .catch(() => undefined);
    console.log("===",passwordInformation)
    let keys=new Buffer.from(passwordInformation, 'utf8').toString()
    console.log(JSON.parse(keys).hash)
  if (
    typeof request.body.email !== "string" ||
    request.body.email.length < 1
  ) {
    return response.sendStatus(400);
  }
  // We aren't validating the length here except for requiring at least one character
  // the verification that it is correct will be done by comparing the hash
  if (
    typeof request.body.password !== "string" ||
    request.body.password.length < 1
  ) {
    return response.sendStatus(400);
  }

  // We're going to validate our password here and then return the associated identity
  if (!(JSON.parse(passwordInformation) && JSON.parse(passwordInformation).hash && JSON.parse(passwordInformation).identity)) {
    
    response.sendStatus(402);
 // Already handled
 return undefined;
}
const match = await argon.verify(JSON.parse(passwordInformation).hash, request.body.password);
console.log(match)
if (!match) {
   response.sendStatus(401);
 // Already handled
 return undefined;
}

return JSON.parse(passwordInformation).identity;
}

async function getIdentityForCredentials(request, response) {
  switch (request.body.from) {
    case "username-password":
      return getIdentityForUsernamePasswordCredentials(request, response);
    default:
      response.sendStatus(400);
  }
}

async function createKeyPair() {
    return new Promise(
        (resolve, reject) => crypto.generateKeyPair(
          'rsa', 
          {
            modulusLength: 2048,
            publicKeyEncoding: {
              type: "spki",
              format: "pem"
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem"
            }
          }, 
          (error, publicKey, privateKey) => error ? reject(error) : resolve({ publicKey, privateKey })
        )
      );
  // We're going to create a key pair for use with jsonwebtoken here
}

async function generateBearerTokenCredentials(request, response, identity) {
  // We're going to generate our token here
  const { publicKey, privateKey } = await createKeyPair();
  console.log("----",request.body.email)
const expiryInMS = ms("1 day");
const expiresAtInMS = Date.now() + expiryInMS;
const payload = {
    sub: identity,
    user:request.body.email,
  // exp is in **seconds**, not milliseconds
  // Floor so that we have an integer
  exp: Math.floor(expiresAtInMS / 1000)
};
const keyid = new UUID(4).format();
const algorithm = "RS256";
const token = await new Promise(
  (resolve, reject) => JSONWebToken.sign(
      payload,
    privateKey,
    {
      algorithm,
      keyid
    },
    (error, token) => error ? reject(error) : resolve(token)
  )
);
const store = request.app.locals.store;
// This can be retrieved later for validation
await store.put(`jwt-key:${keyid}`, JSON.stringify({
  algorithm,
  publicKey
}));
// Mark our value for expiry:********************************************************
// await new Promise(
//   (resolve, reject) => request.app.locals.ttl.ttl(
//     `jwt-key:${keyid}`, 
//     expiryInMS,
//         (error) => error ? reject(error) : resolve()
//   )
// );
response.json({
    token,
  tokenType: "bearer",
  expiresAt: expiresAtInMS
});
}

async function generateCredentials(request, response, identity) {
  switch (request.body.to) {
    case "bearer":
      return generateBearerTokenCredentials(request, response, identity);
    default:
      response.sendStatus(400);
  }
}

function handleExchangeCredentialsRoute(request, response, next) {
  if (!request.body) {
    return response.sendStatus(400);
  }
  getIdentityForCredentials(request, response)
    .then((identity) => {
      console.log("*",identity)
      if (!identity) {
        // Already handled
        return;
      }
      return generateCredentials(request, response, identity);
    })
    .catch(next);
}

// express allows a "handler" to be an array, as it will flatten out the
// list of handlers and invoke them in serial
export default [
  // Parse our body as json
  express.json(),
  handleExchangeCredentialsRoute,
];
