import express from "express";
import argon from "argon2";
import UUID from "pure-uuid";
import identitySchema from "../models/user";



async function handleCreateCredentialsUsernamePassword(request, response) {
  console.log("detais",request.body)
  if (typeof request.body.email !== "string" || request.body.email.length < 1) {
      return response.sendStatus(401); 
  }
  if (typeof request.body.password !== "string" || request.body.password.length < 8) {
      return response.sendStatus(401); 
  }
     // We're going to create our credentials here!

const hash = await argon.hash(request.body.password);
const username = request.body.email.trim();
const lowerCaseUsername = username.toLowerCase();
const credentialsKey = `credentials:${lowerCaseUsername}`;
const store = request.app.locals.store;
// Ensure it doesn't already exist
// Use catch to return falsy if the key doesn't exist


//const oldUser = await UserModal.findOne({ email });
//console.log( new Buffer.from(await store.get(credentialsKey).catch((e) => undefined), 'utf8').toString())

if (await store.get(credentialsKey).catch((e) => undefined)) {
      console.log("*****Key");
      return response.sendStatus(409); // Conflict 

}
// Create identifier scoped to our host
const uuid = new UUID(4).format();
const identity = {
  id: uuid,
  primaryUsername: username
};
// Store our identity

// await UserModal.create(`identity:${uuid}`,JSON.stringify(identity));
await identitySchema.create({id:`identity:${uuid}`,email:username ,password:hash,name:username});
await store.put(`identity:${uuid}`, JSON.stringify(identity));
// Store our new credentials
await store.put(credentialsKey, JSON.stringify({
    hash,
  identity: uuid
}));
// Return 201, return our new id, it doesn't let the caller 
// do any additional with it, they will next need to invoke exchange-credentials 
// to make use of their new identity
return response.status(201).json({
  id: uuid
});
}

function handleCreateCredentialsRoute(request, response, next) {
    if (!request.body) {
    return response.sendStatus(400);
  }
  // In future articles we're going to add new credential types! So lets prepare for that using a switch here
  switch(request.body.type) {
    case "username-password": return handleCreateCredentialsUsernamePassword(request, response).catch(next);
    default: response.sendStatus(400);
  }
}

// express allows a "handler" to be an array, as it will flatten out the 
// list of handlers and invoke them in serial
export default [
  // Parse our body as json
  express.json(),
  handleCreateCredentialsRoute
];