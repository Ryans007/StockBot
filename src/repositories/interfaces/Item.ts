import Item from "../../entities/Item.ts";

export default class ItemInterfaceRepository {
    create(item: Item): Promise<object>;
    list(): Promise<void>;
    update(id: number, item: item): Promise<object>;
    delete(id: number): Promise<object>;
}