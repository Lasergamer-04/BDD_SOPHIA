// 3. CONFIGURATION DES PAGES (Le cœur du système)
// Pour chaque fichier HTML que vous créez, vous devez ajouter sa "recette" ici.
// La clé (ex: "emprunts_liste") doit correspondre au PAGE_ID dans votre fichier HTML.
const PAGES_CONFIG = {
    // 1. PAGES DE LISTES (Tableaux simples)
    "velos":{
        title: "Liste des Vélos",
        table_name: "Velo",
        query: "SELECT * FROM velos",
        form_page_url: "form_velo.html"
    },
    "velos_panne": {
        title: "Vélos en Panne",
        table_name: "Velo",
        query: SQL_QUERIES.velos.en_panne,
        form_page_url: "form_panne.html"
    },
    "clients_liste": {
        title: "Annuaire des Clients",
        table_name: "client",
        query: SQL_QUERIES.clients.trier_nom,
        form_page_url: "form_clients.html"
    },
    "abonnements_actifs": {
        title: "Abonnements en cours",
        table_name: "Abonnement",
        query: SQL_QUERIES.abonnements.actifs,
        form_page_url: "formulaire_abonnement.html"
    },

    // 2. PAGES AVEC JOINTURES (Données enrichies)
    "interventions_detail": {
        title: "Historique des Interventions",
        table_name: "Intervention",
        query: SQL_QUERIES.technique.interventions_detail,
        form_page_url: "form_intervention.html"
    },
    "paiements_suivi": {
        title: "Suivi des Paiements",
        table_name: "paiement",
        query: `SELECT C.nom_client, C.prenom_client, A.type_abo, P.montant, P.date_paiement
                FROM paiement P
                JOIN abonnement A ON P.ID_abo = A.ID_abo
                JOIN clients C ON C.ID_client = P.ID_client`,
        form_page_url: "form_paiement.html"
    },

    // 3. DASHBOARD (Graphiques et statistiques)
    "dashboard_principal": {
        title: "Tableau de Bord Technique",
        charts: [
            {
                id: "chartCharge",
                type: "bar",
                title: "Charge moyenne par Quartier",
                query: SQL_QUERIES.analyse.charge_par_quartier,
                label_col: "nom_quartier",
                value_col: "avg_charge"
            },
            {
                id: "chartInterventions",
                type: "bar",
                title: "Nombre d'interventions pour le Velo",
                query: "SELECT ID_velo, COUNT(*) AS nb_interventions FROM interventions GROUP BY ID_velo",
                label_col: "ID_velo",
                value_col: "nb_interventions"
            }
        ]
    },

    "dashboard_secondaire": {
        title: "Tableau de Bord Technique",
        charts: [
            {
            id: "chartUmsatz",
            type: "bar",
            title: "Gain par Quartier (€)",
            query: SQL_QUERIES.analyse.argent_par_quartier,
            label_col: "nom_quartier",
            value_col: "chiffre_affaires"
        },
    ]
    },




    // 4. Vue Globale
    // Pas besoin de form_page_url ici si c'est juste une vue de consultation
    "velo_localisation": {
        title: "Localisation des Vélos",
        table_name: "Velo",
        query: `SELECT V.ID_velo, V.niv_charge, B.adresse_borne 
                FROM velos V 
                LEFT JOIN bornes B ON V.ID_borne = B.ID_borne`,
    },

    // 5. FORMULAIRE

    "formulaire_velo": {
        title: "Fiche Vélo",
        table_name: "Velo",
        fields: [
            { name: "ID_velo", label: "ID du Vélo", type: "number" },
            { name: "niv_charge", label: "Niveau de charge (%)", type: "number" },
            { name: "en_panne", label: "En panne (1 pour Oui, 0 pour Non)", type: "number" },
            { name: "ID_borne", label: "ID de la borne", type: "number" }
        ],
        query_get_one: "SELECT * FROM velos WHERE ID_velo = ?",
        query_insert: "INSERT INTO velos (ID_velo, niv_charge, en_panne, ID_borne) VALUES (?, ?, ?, ?)",
        query_update: "UPDATE velos SET niv_charge = ?, en_panne = ?, ID_borne = ? WHERE ID_velo = ?"
    },
    "formulaire_abonnement": {
        title: "Gestion des Abonnements",
        table_name: "abonnement",
        fields: [
            { name: "ID_abo", label: "ID Abonnement", type: "number" },
            { name: "type_abo", label: "Type (ex: Annuel, Mensuel)", type: "text" },
            { name: "prix_abo", label: "Prix (€)", type: "number" },
            { name: "statut_abo", label: "Statut (Actif/Inactif)", type: "text" },
            { name: "date_debut", label: "Date de début", type: "date" },
            { name: "date_fin", label: "Date de fin", type: "date" },
            { name: "ID_client", label: "ID du Client associé", type: "number" }
        ],
        query_get_one: "SELECT * FROM abonnement WHERE ID_abo = ?",
        query_insert: "INSERT INTO abonnement (ID_abo, type_abo, prix_abo, statut_abo, date_debut, date_fin, ID_client) VALUES (?, ?, ?, ?, ?, ?, ?)",
        query_update: "UPDATE abonnement SET type_abo = ?, prix_abo = ?, statut_abo = ?, date_debut = ?, date_fin = ?, ID_client = ? WHERE ID_abo = ?"
    },
    "formulaire_client": {
        title: "Fiche Client",
        table_name: "client",
        fields: [
            { name: "ID_client", label: "ID Client", type: "number" },
            { name: "nom_client", label: "Nom", type: "text" },
            { name: "prenom_client", label: "Prénom", type: "text" },
            { name: "adresse_client", label: "Adresse", type: "text" }
        ],
        query_get_one: "SELECT * FROM clients WHERE ID_client = ?",
        query_insert: "INSERT INTO clients (ID_client, nom_client, prenom_client, adresse_client) VALUES (?, ?, ?, ?)",
        query_update: "UPDATE clients SET nom_client = ?, prenom_client = ?, adresse_client = ? WHERE ID_client = ?"
    },
    "formulaire_interventions": {
        title: "Fiche Intervention",
        table_name: "intervention",
        fields: [
            { name: "ID_inter", label: "ID Intervention", type: "number" },
            { name: "prix_inter", label: "Prix (€)", type: "number" },
            { name: "date_inter", label: "Date", type: "date" },
            { name: "type_inter", label: "Type d'intervention", type: "text" },
            { name: "ID_velo", label: "ID du Vélo concerné", type: "number" }
        ],
        query_get_one: "SELECT * FROM interventions WHERE ID_inter = ?",
        query_insert: "INSERT INTO interventions (ID_inter, prix_inter, date_inter, type_inter, ID_velo) VALUES (?, ?, ?, ?, ?)",
        query_update: "UPDATE interventions SET prix_inter = ?, date_inter = ?, type_inter = ?, ID_velo = ? WHERE ID_inter = ?"
    },
    "formulaire_paiement": {
        title: "Enregistrement d'un Paiement",
        table_name: "paiement",
        fields: [
            { name: "ID_paiement", label: "ID Paiement", type: "number" },
            { name: "montant", label: "Montant (€)", type: "number" },
            { name: "date_paiement", label: "Date", type: "date" },
            { name: "type_paiement", label: "Type (CB, Virement, etc.)", type: "text" },
            { name: "statut_paiement", label: "Statut (Payé/En attente)", type: "text" },
            { name: "ID_client", label: "ID du Client", type: "number" },
            { name: "ID_abo", label: "ID de l'Abonnement", type: "number" }
        ],
        query_get_one: "SELECT * FROM paiement WHERE ID_paiement = ?",
        query_insert: "INSERT INTO paiement (ID_paiement, montant, date_paiement, type_paiement, statut_paiement, ID_client, ID_abo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        query_update: "UPDATE paiement SET montant = ?, date_paiement = ?, type_paiement = ?, statut_paiement = ?, ID_client = ?, ID_abo = ? WHERE ID_paiement = ?"
    },
    "formulaire_panne": {
        title: "Gestion des Pannes",
        table_name: "Velo",
        fields: [
            { name: "ID_velo", label: "ID du Vélo", type: "number" },
            { name: "en_panne", label: "État (1=En Panne, 0=Opérationnel)", type: "number" },
            { name: "niv_charge", label: "Niveau de charge (%)", type: "number" }
        ],
        query_get_one: "SELECT ID_velo, en_panne, niv_charge FROM velos WHERE ID_velo = ?",
        query_insert: "INSERT INTO velos (ID_velo, en_panne, niv_charge) VALUES (?, ?, ?)",
        query_update: "UPDATE velos SET en_panne = ?, niv_charge = ? WHERE ID_velo = ?"
    },
};