import express from "express";
import {Level }from "level"; 
import createCredentialsHandler from "./handlers/create-credentials";

const app = express();
app.locals.store = new Level("./store");

app.post("/create-credentials", createCredentialsHandler);

// IIFE so we don't need to define `port` as `let` ¯\_(ツ)_/¯
const port = (() => {
  if (/^\d+$/.test(process.env.PORT)) {
      return +process.env.PORT;  
  }
  // Maybe you have other defaults you want to check here to decide on the port
  return 8080;
})();



// to run:  node -r esm service/index.js

app.listen(port, () => console.log(`Listening on port ${port}`));