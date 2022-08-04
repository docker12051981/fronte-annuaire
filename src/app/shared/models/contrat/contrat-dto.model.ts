import { StatusEnum } from "../enumeration/StatusEnum";
import { Contratstatus } from "../enumeration/contratstatus.enum";
import { TypeDto } from "./type-dto.model";
import { FournisseurDto } from "./fournisseur-dto.model";
import { NatureDto } from "./nature-dto.model";
import { DateDto } from "./date-dto.modele=model";
export class ContratDto {
    id: string;
    nodeId: number;
    key: number;
    treeId: number;
    parentId: Array<any>;
    orgId: number;
    structureId: string;
    reference: string;
    objet: string;
    etat: StatusEnum;
    status: Contratstatus;
    typecontrat: TypeDto;
    naturecontrat: NatureDto;
    fournisseur: FournisseurDto;
    date_debut: DateDto;
    date_fin: DateDto;
    duree_annuel: number;
    echeance: number;
    isnode: boolean;
    createdBy: string;
    updatedBy: string;
}
