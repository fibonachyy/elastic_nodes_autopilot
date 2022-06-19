const { Client } = require("@elastic/elasticsearch");

var client = new Client({
  auth: { apiKey: "base64EncodedKey" },
  node: "http://127.0.0.1:9200",
});

client.ping(
  {
    requestTimeout: 30000,
  },
  async function (error) {
    if (error) {
      console.error("Cannot connect to Elasticsearch.");
    } else {
      console.log("Connected to Elasticsearch was successful!");
    }
  }
);

async function run() {
  // Let's start by indexing some data
  //   for (let i = 0; i <= 1000000; i++) {
  //     console.log(i);
  //     await client.index({
  //       index: "test_elastic",
  //       type: ["doc"],
  //       body: {
  //         character: `Ned Stark ${i}`,
  //         quote: `Winter is coming. ${i}`,
  //       },
  //     });
  //   }

  //   await client.index({
  //     index: "game-of-thrones",
  //     document: {
  //       character: "Daenerys Targaryen",
  //       quote: "I am the blood of the dragon.",
  //     },
  //   });

  //   await client.index({
  //     index: "game-of-thrones",
  //     document: {
  //       character: "Tyrion Lannister",
  //       quote: "A mind needs books like a sword needs a whetstone.",
  //     },
  //   });

  //   // here we are forcing an index refresh, otherwise we will not
  //   // get any result in the consequent search
  await client.indices.refresh({ index: "test_elastic" });

  //   // Let's search!
  console.time("search time");
  const result = await client.search({
    index: "test_elastic",

    scroll: "100s",
    query: {
      match: { quote: "ned" },
    },
  });
  console.log(result.body.hits);
  console.timeEnd("search time");
}

run();
