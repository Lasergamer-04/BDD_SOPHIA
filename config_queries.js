// 2. CATALOGUE DE REQUÊTES SQL
// Bonne pratique : stockez vos requêtes ici pour les réutiliser et garder PAGES_CONFIG lisible.
const SQL_QUERIES = {
    setup: { get_status: 'SELECT VALUE initialise FROM setup WHERE id = 1' },

    velos: {
        en_panne: "SELECT * FROM velos WHERE en_panne = 1",
        charge_faible: "SELECT * FROM velos WHERE niv_charge < 20",
        inventaire_borne: "SELECT ID_borne, COUNT(*) AS total_velos FROM velos GROUP BY ID_borne",
        charge_moyenne_globale: "SELECT AVG(niv_charge) AS avg_charge FROM velos"
    },
    clients: {
        trier_nom: "SELECT * FROM clients ORDER BY nom_client ASC",
        recherche_d: "SELECT * FROM clients WHERE nom_client LIKE 'D%'",
        avec_penalite: "SELECT * FROM clients WHERE ID_client IN (SELECT ID_client FROM penalite)",
        top_interventions: `
            SELECT C.nom_client, C.prenom_client, COUNT(*) AS nb_interventions
            FROM clients C
            JOIN reservations R ON C.ID_client = R.ID_client
            JOIN interventions I ON I.ID_velo = R.ID_velo
            GROUP BY C.ID_client ORDER BY nb_interventions DESC LIMIT 1`
    },
    abonnements: {
        actifs: "SELECT * FROM abonnement WHERE statut_abo = 'Actif'",
        par_periode: "SELECT * FROM abonnement WHERE date_fin BETWEEN '2024-02-01' AND '2024-02-29'",
        liste_clients: "SELECT A.ID_abo, A.type_abo, C.nom_client, C.prenom_client FROM abonnement A JOIN clients C ON A.ID_client = C.ID_client",
        multi_abos: "SELECT ID_client, COUNT(*) AS nb_abos FROM abonnement GROUP BY ID_client HAVING nb_abos > 1"
    },
    technique: {
        interventions_detail: `
            SELECT I.ID_inter, I.type_inter, V.ID_velo, T.nom_tech
            FROM interventions I
            JOIN velos V ON I.ID_velo = V.ID_velo
            JOIN faire F ON F.ID_inter = I.ID_inter
            JOIN techniciens T ON T.ID_tech = F.ID_tech`,
        velos_en_panne_avec_inter: "SELECT * FROM velos WHERE ID_velo IN (SELECT ID_velo FROM interventions) AND en_panne = 1",
        rang_interventions: `
            SELECT ID_velo, COUNT(*) AS nb_interventions, 
            RANK() OVER (ORDER BY COUNT(*) DESC) AS rang
            FROM interventions GROUP BY ID_velo`
    },
    analyse: {
        charge_par_quartier: `
            SELECT Q.nom_quartier, AVG(V.niv_charge) AS avg_charge
            FROM quartiers Q
            JOIN bornes B ON B.nom_quartier = Q.nom_quartier
            JOIN velos V ON V.ID_borne = B.ID_borne
            GROUP BY Q.nom_quartier ORDER BY avg_charge DESC`,

        argent_par_quartier: `
            SELECT Q.nom_quartier, SUM(P.montant) AS chiffre_affaires
            FROM quartiers Q
            JOIN bornes B ON Q.nom_quartier = B.nom_quartier
            JOIN velos V ON B.ID_borne = V.ID_borne
            JOIN paiement P ON V.ID_velo = P.ID_abo
            GROUP BY Q.nom_quartier ORDER BY chiffre_affaires DESC`,
    }
};
