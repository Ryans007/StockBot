import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("items")
export default class Item {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column("text")
    name: string;
    @Column("text")
    description: string;
    @Column("float")
    price: number;
    @Column("float")
    amount: number;

    constructor(name: string, description: string, price: number, amount: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }
}