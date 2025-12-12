import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("items")
export default class ItemEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    name: string;
    @Column("text")
    description: string;
    @Column("float")
    price: number;

    constructor(name: string, description: string, price: number) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}