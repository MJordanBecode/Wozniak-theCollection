export async function fetchAllData() {
    try {
        const response = await fetch('../db/anime.json'); // Récupération des données
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json(); // Conversion en JSON
        console.log(data); // Affiche toutes les données dans la console
        return data; // Retourne les données pour une utilisation ultérieure
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
}
