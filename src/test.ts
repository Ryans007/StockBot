import { AppDataSource } from "./config/dataSource";
import graph from "./graph/graph";

async function main() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Banco de dados inicializado!");
  }

  const config = {
    configurable: {
      thread_id: "teste-thread-2"
    }
  };

  for await (const chunk of await graph.stream(
    { "userInput": "Pesquise na internet uma receita de macarrão com almondegas" },
    {
      streamMode: "updates",
      ...config
    }
  )) {
    console.log(chunk);
  }
  // const response = await graph.invoke({ "userInput": "Olá, tudo bem?" }, config);

  // console.log(response.messages[response.messages.length - 1].content);
}

main().catch((err: any) => {
  console.error("Erro na aplicação:", err);
});