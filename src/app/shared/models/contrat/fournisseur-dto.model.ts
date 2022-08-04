import { ResponsableDto } from "./responsable-dto.model";
export class FournisseurDto {
    id: string;
    organisme: string;
    raison_social: string;
    matricule_fiscale: string;
    email: string;
    num_tel: string;
    num_fax: string;
    adresse: string;
    responsable: ResponsableDto;
}
