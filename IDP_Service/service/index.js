import express from "express";
import {Level }from "level"; 
import ttl from "level-ttl";
import mongoose from "mongoose";

import createCredentialsHandler from "./handlers/create-credentials";
//import exchangeCredentialsHandler from "./handlers/exchange-credentials";

const app = express();
app.locals.store = new Level("./store",{ valueEncoding: 'view' });
//app.locals.ttl = ttl(app.locals.store);

app.post("/create-credentials", createCredentialsHandler);
//app.post("/exchange-credentials", exchangeCredentialsHandler);


const CONNECTION_URL = "mongodb+srv://techinfini:techinfini123@cluster0.q2djkwz.mongodb.net/IDP_Service=true&w=majority";
const PORT = process.env.PORT|| 3030;
// IIFE so we don't need to define `port` as `let` ¯\_(ツ)_/¯
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>  app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);


// to run:  node -r esm service/index.js