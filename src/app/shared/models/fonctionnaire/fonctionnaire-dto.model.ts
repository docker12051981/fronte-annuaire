import { ClasseDto } from "./classe.model";
import { ContactDto } from "./contact.model";
import { DiplomeDto } from "./diplome.model";
import { FonctionDto } from "./fonction-dto.model";
import { GradeDto } from "./grade-dto.model";
import { DateNDto } from "../shared/date-ndto.model";
export class FonctionnaireDto {
    id: string;
    organismeId: string;
    structureId: string;
    identifiant: string;
    cin: string;
    nom_fr: string;
    nom_ar: string;
    prenom_fr: string;
    prenom_ar: string;
    date_naissance: DateNDto;
    genre: string;
    fonction: FonctionDto;
    grade: GradeDto;
    classe: ClasseDto;
    diplome: DiplomeDto;
    position: string;
    date_recrutement: DateNDto;
    contact: ContactDto;
    createdBy: string;
    createTime: string;
}
