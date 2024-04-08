const postmark = require("postmark");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });


let client;

function getClient() {
  if (!client) {
    client = new postmark.ServerClient(process.env.POSTMARK);
  }
  return client;
}

module.exports = { getClient };