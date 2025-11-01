import { Injectable } from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColisService {
  private baseUrl = `${environment.apiUrl}/Authenticate`;
  private colisData = [
    {
      idColis: 1,
      codeColis: "CO1",
      libelleColis: "Pack de documents",
      descriptionColis: "Dossier administratif urgent",
      poidsColis: "1.2 kg",
      typeColis: "Papier",
    },
    {
      idColis: 2,
      codeColis: "CO2",
      libelleColis: "Colis électronique",
      descriptionColis: "Tablette numérique avec accessoires",
      poidsColis: "2.5 kg",
      typeColis: "Électronique",
    },
    {
      idColis: 3,
      codeColis: "CO3",
      libelleColis: "Vêtements d’été",
      descriptionColis: "T-shirts, shorts et sandales",
      poidsColis: "3.1 kg",
      typeColis: "Textile",
    },
    {
      idColis: 4,
      codeColis: "CO4",
      libelleColis: "Matériel de bureau",
      descriptionColis: "Stylos, carnets et dossiers",
      poidsColis: "4.0 kg",
      typeColis: "Fournitures",
    },
    {
      idColis: 5,
      codeColis: "CO5",
      libelleColis: "Accessoires informatiques",
      descriptionColis: "Claviers, souris, câbles USB",
      poidsColis: "3.8 kg",
      typeColis: "Informatique",
    },
    {
      idColis: 6,
      codeColis: "CO6",
      libelleColis: "Produits cosmétiques",
      descriptionColis: "Lot de crèmes et parfums",
      poidsColis: "1.7 kg",
      typeColis: "Beauté",
    },
    {
      idColis: 7,
      codeColis: "CO7",
      libelleColis: "Outils de bricolage",
      descriptionColis: "Tournevis, marteau, ruban adhésif",
      poidsColis: "5.4 kg",
      typeColis: "Bricolage",
    },
    {
      idColis: 8,
      codeColis: "CO8",
      libelleColis: "Produits alimentaires",
      descriptionColis: "Pâtes, riz, conserves et sauces",
      poidsColis: "6.2 kg",
      typeColis: "Alimentaire",
    },
    {
      idColis: 9,
      codeColis: "CO9",
      libelleColis: "Accessoires de sport",
      descriptionColis: "Gants, gourde, corde à sauter",
      poidsColis: "2.0 kg",
      typeColis: "Sport",
    },
    {
      idColis: 10,
      codeColis: "CO10",
      libelleColis: "Cadeaux divers",
      descriptionColis: "Petits articles de décoration",
      poidsColis: "1.5 kg",
      typeColis: "Divers",
    },
    {
      idColis: 10,
      codeColis: "CO10",
      libelleColis: "Cadeaux divers",
      descriptionColis: "Petits articles de décoration",
      poidsColis: "1.5 kg",
      typeColis: "Divers",
    },
    {
      idColis: 10,
      codeColis: "CO10",
      libelleColis: "Cadeaux divers",
      descriptionColis: "Petits articles de décoration",
      poidsColis: "1.5 kg",
      typeColis: "Divers",
    },
    {
      idColis: 10,
      codeColis: "CO10",
      libelleColis: "Cadeaux divers",
      descriptionColis: "Petits articles de décoration",
      poidsColis: "1.5 kg",
      typeColis: "Divers",
    },
  ];

  constructor(
    private http : HttpClient
  ) { }

  getAllColis(){
    return this.colisData;
  }
}
