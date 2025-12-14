import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("recipes")
export default class RecipeEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column("text")
    name: string;
    @Column("text")
    ingredients: string;
    @Column("text")
    preparationMethod: string;

    constructor(name: string, ingredients: string, preparationMethod: string) {
        this.name = name;
        this.ingredients = ingredients;
        this.preparationMethod = preparationMethod;
    }
}