import { Contact } from "./contact.model";
import { Adresse } from "./adresse.model";
import { TypeDto } from "./type-dto.model";
import { StatusEnum } from "../enumeration/StatusEnum";
import { SoustypeDto } from "./soustype-dto.model";
import { SecteureactiviteDto } from "./secteureactivite-dto.model";
export class StructureVO {
    id: string;
    key: number;
    treeId: number;
    parentId: Array<any>;
    orgId: number;
    title: string;
    name: string;
    lib_ar: string;
    abr_fr: string;
    abr_ar: string;
    logo: string;
    description_fr: string;
    description_ar: string;
    status: StatusEnum;
    type: TypeDto;
    soustype: SoustypeDto;
    Secteureactivite: SecteureactiviteDto;
    contact: Contact;
    adresse: Adresse;
    createdBy: string;
    updatedBy: string;
    createTime: string;
    updateTime: string;
    children: StructureVO;
    parents: StructureVO;
}
