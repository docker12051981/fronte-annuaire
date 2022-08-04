import { Gouvernoratdto } from "../local/gouvernoratdto.model";
import { Villedto } from "../local/villedto.model";
import { Delegationdto } from "../local/delegationdto.model";
export class Adresse {
    gouvernorat: Gouvernoratdto;
    ville: Villedto;
    delegation: Delegationdto;
    rue_fr: string;
    rue_ar: string;
    num: number;
    postal: number;
}
