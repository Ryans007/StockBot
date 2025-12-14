import "reflect-metadata";
import { AppDataSource } from "../config/dataSource";
import ItemEntity from "../entities/ItemEntity";
import RecipeEntity from "../entities/RecipeEntity";

async function populateDatabase() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Banco de dados conectado!");
        }

        const itemRepository = AppDataSource.getRepository(ItemEntity);
        const recipeRepository = AppDataSource.getRepository(RecipeEntity);

        await recipeRepository.clear();
        await itemRepository.clear();
        console.log("Dados anteriores removidos");

        const items = [
            new ItemEntity("Arroz Branco".toLowerCase(), "Arroz branco tipo 1, pacote de 5kg".toLowerCase(), 12.50, 10),
            new ItemEntity("Feijão Preto".toLowerCase(), "Feijão preto carioca, pacote de 1kg".toLowerCase(), 8.90, 20),
            new ItemEntity("Óleo de Soja".toLowerCase(), "Óleo de soja refinado, garrafa de 900ml".toLowerCase(), 7.20, 30),
            new ItemEntity("Sal Refinado".toLowerCase(), "Sal refinado iodado, pacote de 1kg".toLowerCase(), 2.50, 20),
            new ItemEntity("Açúcar Cristal".toLowerCase(), "Açúcar cristal especial, pacote de 1kg".toLowerCase(), 4.80, 2),
            new ItemEntity("Macarrão Espaguete".toLowerCase(), "Massa de trigo espaguete, pacote de 500g".toLowerCase(), 3.90, 5),
            new ItemEntity("Tomate".toLowerCase(), "Tomate vermelho maduro, por kg".toLowerCase(), 6.50, 10),
            new ItemEntity("Cebola".toLowerCase(), "Cebola amarela, por kg".toLowerCase(), 4.20, 11),
            new ItemEntity("Alho".toLowerCase(), "Alho roxo nacional, por kg".toLowerCase(), 28.00, 12),
            new ItemEntity("Peito de Frango".toLowerCase(), "Peito de frango congelado, por kg".toLowerCase(), 14.90, 13),
            new ItemEntity("Carne Moída".toLowerCase(), "Carne bovina moída (patinho), por kg".toLowerCase(), 22.90, 15),
            new ItemEntity("Ovos".toLowerCase(), "Ovos brancos grandes, cartela com 12 unidades".toLowerCase(), 8.50, 18),
            new ItemEntity("Leite Integral".toLowerCase(), "Leite integral UHT, caixa de 1 litro".toLowerCase(), 4.20, 19),
            new ItemEntity("Queijo Mussarela".toLowerCase(), "Queijo mussarela fatiado, pacote de 200g".toLowerCase(), 9.80, 20),
            new ItemEntity("Pão de Forma".toLowerCase(), "Pão de forma integral, pacote de 500g".toLowerCase(), 6.90, 21),
            new ItemEntity("Manteiga".toLowerCase(), "Manteiga com sal, pote de 200g".toLowerCase(), 7.50 , 45),
            new ItemEntity("Farinha de Trigo".toLowerCase(), "Farinha de trigo tipo 1, pacote de 1kg".toLowerCase(), 5.20, 23),
            new ItemEntity("Batata".toLowerCase(), "Batata inglesa, por kg".toLowerCase(), 5.80, 3),
            new ItemEntity("Cenoura".toLowerCase(), "Cenoura orgânica, por kg".toLowerCase(), 7.20, 4),
            new ItemEntity("Azeite Extra Virgem".toLowerCase(), "Azeite de oliva extra virgem, garrafa de 500ml".toLowerCase(), 18.90, 6)
        ];

        await itemRepository.save(items);
        console.log(`${items.length} itens adicionados ao estoque`);

        const recipes = [
            new RecipeEntity(
                "Arroz com Feijão".toLowerCase(),
                "2 xícaras de arroz, 1 xícara de feijão preto, 1 cebola, 2 dentes de alho, sal, óleo".toLowerCase(),
                "Refogue a cebola e alho no óleo. Adicione o arroz e doure. Acrescente água fervente e cozinhe por 18 minutos. Para o feijão, deixe de molho e cozinhe em panela de pressão por 20 minutos.".toLowerCase()
            ),
            new RecipeEntity(
                "Macarrão à Bolonhesa".toLowerCase(),
                "500g de macarrão espaguete, 400g de carne moída, 2 tomates, 1 cebola, 3 dentes de alho, sal, óleo".toLowerCase(),
                "Cozinhe o macarrão al dente. Refogue cebola e alho, adicione a carne moída e doure. Acrescente os tomates picados e temperos. Cozinhe por 15 minutos e sirva sobre o macarrão.".toLowerCase()
            ),
            new RecipeEntity(
                "Omelete Simples".toLowerCase(),
                "3 ovos, sal, pimenta, 1 colher de manteiga, queijo mussarela a gosto".toLowerCase(),
                "Bata os ovos com sal e pimenta. Aqueça a manteiga na frigideira. Despeje os ovos e adicione queijo por cima. Dobre ao meio quando dourar embaixo.".toLowerCase()
            ),
            new RecipeEntity(
                "Frango Grelhado".toLowerCase(),
                "1 peito de frango, sal, pimenta, alho, azeite extra virgem".toLowerCase(),
                "Tempere o frango com sal, pimenta e alho amassado. Deixe marinar por 30 minutos. Grelhe em frigideira com azeite por 8 minutos de cada lado.".toLowerCase()
            ),
            new RecipeEntity(
                "Purê de Batata".toLowerCase(),
                "1kg de batata, 200ml de leite integral, 50g de manteiga, sal a gosto".toLowerCase(),
                "Descasque e cozinhe as batatas em água com sal até ficarem macias. Escorra e amasse. Adicione leite morno, manteiga e sal. Misture até ficar cremoso.".toLowerCase()
            ),
            new RecipeEntity(
                "Refogado de Cenoura".toLowerCase(),
                "500g de cenoura, 1 cebola pequena, 2 dentes de alho, sal, óleo de soja".toLowerCase(),
                "Corte as cenouras em rodelas. Refogue cebola e alho no óleo. Adicione as cenouras, sal e um pouco de água. Cozinhe tampado por 10 minutos.".toLowerCase()
            ),
            new RecipeEntity(
                "Sanduíche Natural".toLowerCase(),
                "4 fatias de pão de forma integral, 4 fatias de queijo mussarela, 1 tomate, manteiga".toLowerCase(),
                "Passe manteiga nas fatias de pão. Recheie com queijo e fatias de tomate. Opcional: grelhe na frigideira até dourar.".toLowerCase()
            )
        ];

        await recipeRepository.save(recipes);
        console.log(`${recipes.length} receitas adicionadas`);

        console.log("\nBanco de dados populado com sucesso!");

        const totalItems = await itemRepository.count();
        const totalRecipes = await recipeRepository.count();

        console.log(`\n Resumo:`);
        console.log(`   • ${totalItems} itens no estoque`);
        console.log(`   • ${totalRecipes} receitas cadastradas`);

    } catch (error) {
        console.error("Erro ao popular banco de dados:", error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Conexão com banco encerrada");
        }
    }
}

populateDatabase().then(r => "Processo concluído.");
