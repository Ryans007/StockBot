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
    { "userInput": "Como fazer Omelete Simples?" },
    {
      streamMode: "updates",
      ...config
    }
  )) {
    console.log(chunk);
  }

  for await (const chunk of await graph.stream(
    { "userInput": "Tenho os ingredientes?" },
    {
      streamMode: "updates",
      ...config
    }
  )) {
    console.log(chunk);
  }
  // const response = await graph.invoke({ "userInput": "Salve a receita do açai na tigela com doce de leite" }, config);

  // console.log(response.messages[response.messages.length - 1]);
}

main().catch((err: any) => {
  console.error("Erro na aplicação:", err);
});