import { Role } from "../enumeration/role.enum";
import { GroupeDto } from "./groupe-dto.model";
import { StatusEnum } from "../enumeration/StatusEnum";
export class UserDto {
    id: string;
    organismeId: string;
    groupes: GroupeDto[];
    role: Role;
    identifiant: string;
    password: string;
    status: StatusEnum;
    email: string;
    createdBy: string;
    createTime: string;
}
