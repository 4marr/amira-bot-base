export default [{
  tag: "example",
  name: "test",
  command: ["test","tes"],
  code: async({ client, m, MessageCollector }) => {
    m.reply("Balas dengan pesan apapun!");
    
    // init MessageCollector
    const col = new MessageCollector(m, {
      timeout: 60000
    });
    
    // call MessageCollector
    col.on("collect", async(data) => {
      m.reply(`${JSON.stringify(data, null, 2)}`);
      col.exit();
    })
    
    col.on("end", () => {
      m.reply("Message collector diakhiri!")
    })
  }
}]