import Item from "../../entities/Item.ts";

export default interface ItemInterfaceRepository {
    create(item: Item): Promise<object>;
    list(): Promise<void>;
    update(id: number, item: Item): Promise<object>;
    delete(id: number): Promise<object>;
}