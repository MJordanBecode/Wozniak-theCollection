import { SelectorDivAnimeContainer } from "./mainSelector.js"; // Importer la fonction qui sélectionne le conteneur
import { createCard } from "./createCard.js"; // Importer la fonction qui crée les cartes

// Sélectionner l'élément <main>
const main = SelectorDivAnimeContainer(); 

// Afficher le conteneur <main> dans la console
console.log(main); 

// Appeler createCard() pour créer les cartes (la fonction s'exécute mais ne retourne rien)
createCard(); 

// Si tu souhaites afficher des données récupérées, tu peux les loguer directement dans createCard()
