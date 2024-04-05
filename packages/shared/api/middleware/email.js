const postmark = require("postmark");

let client;

function getClient() {
  if (!client) {
    client = new postmark.ServerClient("582cbfbc-0e44-4993-bf51-c49b43a3d92b");
  }
  return client;
}

module.exports = { getClient };