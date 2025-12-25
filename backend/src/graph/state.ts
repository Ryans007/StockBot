import { registry } from "@langchain/langgraph/zod";
import * as z from "zod";

const AgentState = z.object({
  userInput: z.string().describe("A mensagem enviada pelo usuário."),
  nextAgent: z.string().describe("O próximo agente a ser chamado"),
  orchestratorExplanation: z.string().describe("Instruções do agente orquestrador sobre qual agente especializado chamar e como proceder."),
  revisorExplanation: z.string().describe("Instruções do agente revisor sobre qual agente especializado chamar e como proceder."),
  querySQL: z.string().describe("Consulta SQL a ser executada, se aplicável."),
  queryWeb: z.string().describe("Consulta web a ser executada, se aplicável."),
  sqlResponse: z.string().describe("Resposta obtida da consulta SQL, se aplicável."),
  finalAnswer: z.string().describe("Resposta final para o usuário."),
  messages: z.array(z.string()).register(registry, {
    reducer: {
      fn: (x, y) => x.concat(y),
    },
    default: () => [] as string[],
  }),
});

export default AgentState;
