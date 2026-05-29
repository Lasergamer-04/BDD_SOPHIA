// 1. CONFIGURATION GÉNÉRALE DU SITE
const APP_CONFIG = {
    title: "🚲 VeloSystem", // Ton titre d'application
    db_name: "velo_db",    // Le nom de ta base
    page_details: "TEMPLATE_form.html",
    menu: [
        { label: "🏠 Accueil", url: "index.html" },
        
        // SECTION GESTION
        { label: "📋 Liste des Vélos", url: "velo_liste.html" },
        { label: "👥 Clients", url: "clients_liste.html" },
        { label: "📅 Abonnements", url: "abonnements_liste.html" },
        { label: "💰 Paiements", url: "paiements_liste.html" },
        
        // SECTION TECHNIQUE
        { label: "🛠️ Interventions", url: "interventions_liste.html" },
        { label: "⚠️ Vélos en Panne", url: "panne_liste.html" },
        
        // SECTION ANALYSE (Dashboard)
        { label: "📊 Statistiques & Charge", url: "dashboard.html" },
        { label: "📊 Statistiques & Charge", url: "dashboard_sec.html" },

        // SECTION VUE GLOBALE
        { label: "📍 Localisation des Vélos", url: "velo_localisation.html" }
    ]
};