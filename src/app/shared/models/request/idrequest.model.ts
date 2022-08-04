export class IdRequest {
    id: string;
    key: number;
    parentid: number;
    constructor(id: string, key: number, parentid: number) {
        this.id = id;
        this.key = key;
        this.parentid = parentid;
    };

}