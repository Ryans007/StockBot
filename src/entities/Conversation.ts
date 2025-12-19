import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("assistant")
export default class Conversation {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column("text")
    thread_id: string;

    @Column("text")
    user_message: string;

    @Column("text")
    ai_message: string;

    constructor(thread_id: string, user_message: string, ai_message: string) {
        this.thread_id = thread_id;
        this.user_message = user_message;
        this.ai_message = ai_message;
    }
}