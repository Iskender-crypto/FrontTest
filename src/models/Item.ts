export class Item {
    public id!: number;
    public color: string = '';
    public positionId: number = 0;
    public count: number = 0;
    constructor(instance: Partial<Item>) {
        Object.assign(this, instance);
    }
}