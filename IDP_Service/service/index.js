import express from "express";
import {Level }from "level"; 
import ttl from "level-ttl";
import mongoose from "mongoose";

import createCredentialsHandler from "./handlers/create-credentials";
import exchangeCredentialsHandler from "./handlers/exchange-credentials";
import bearer from "./middleware/verify-bearer.js";
import cors from 'cors';
import jwt from "jsonwebtoken";
const app = express();
app.locals.store = new Level("./store",{ valueEncoding: 'view' });
//app.locals.ttl = ttl(app.locals.store);
app.use(cors());
app.post("/create-credentials", createCredentialsHandler);
app.post("/exchange-credentials", exchangeCredentialsHandler);
//app.get("/check-authentication", bearer, (request, response) => response.send("`You're authenticated!"));
app.get("/check-authentication", bearer, (request, response) => {
  //const store = request.app.locals.store;
  //const keyInformation = await store.get(`jwt-key:${decoded.header.kid}`)
 // const token = jwt.sign({ email: request.body.email.trim(), id:"1234"}, "test", { expiresIn: "1h" });
 const decoded = jwt.decode(request.token, { complete: true });
  console.log("requested",decoded.payload.user,)
  const token = jwt.sign({ email: decoded.payload.user, id:decoded.payload.sub}, "test", { expiresIn: "1h" });
  response.send({"authenticated":true,user:decoded.payload.user,id:decoded.payload.sub,token})
});


const CONNECTION_URL = "mongodb+srv://techinfini:techinfini123@cluster0.q2djkwz.mongodb.net/IDP_Service=true&w=majority";
const PORT = process.env.PORT|| 3030;
// IIFE so we don't need to define `port` as `let` ¯\_(ツ)_/¯
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>  app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);


// to run:  node -r esm service/index.js