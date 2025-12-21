import Recipe from "../../entities/Recipe.ts";

export default class RecipeInterfaceRepository {
    create(recipe: Recipe): Promise<object>;
    list(): Promise<void>;
    update(id: number, recipe: Recipe): Promise<object>
    delete(id: number): Promise<object>
}