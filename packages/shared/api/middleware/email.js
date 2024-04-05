const postmark = require("postmark");

let client;

function getClient() {
  if (!client) {
    client = new postmark.ServerClient("");
  }
  return client;
}

module.exports = { getClient };