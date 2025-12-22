import Recipe from "../../entities/Recipe.ts";

export default interface RecipeInterfaceRepository {
    create(recipe: Recipe): Promise<object>;
    list(): Array<Recipe> | Promise<Recipe[]>;
    update(id: number, recipe: Recipe): Promise<object>
    delete(id: number): Promise<object>
}