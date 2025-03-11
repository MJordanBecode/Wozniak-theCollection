// Importations
import { SelectorDivAnimeContainer } from "./mainSelector.js"; // Fonction pour sélectionner le conteneur
import { fetchAllData } from "./fetchDB.js"; // Fonction pour récupérer les données

// Sélectionner le conteneur où les cartes seront ajoutées
const SELECTORDIVANIMECONTAINER = SelectorDivAnimeContainer();

// Ajouter un gap entre les cartes
SELECTORDIVANIMECONTAINER.classList.add("flex","items-center", "flex-col", "gap-4","lg:grid","lg:grid-cols-[500px_500px_500px]","lg:grid-row-3","lg:gap-4","lg:w-full","lg:justify-items-center","lg:justify-evenly");

// Fonction principale pour créer une carte
export function createCard() {
  fetchAllData()
    .then(data => {
      if (SELECTORDIVANIMECONTAINER) {
        data.forEach(item => {
          // Créer une div englobante
          const wrapperDiv = document.createElement("div");
          wrapperDiv.classList.add("anime-card-wrapper", "bg-red-100", "rounded-lg", "shadow-md","p-8", "flex", "items-center", "gap-4", "lg:w-auto");

          const synopsisTitle = document.createElement("div");
          synopsisTitle.classList.add("rouge", "flex", "flex-col", "justify-between","w-0", "overflow-hidden", "h-40", "shadow-md", "rounded-lg", "transition-all", "duration-500", "ease-in-out", "mt-2");

          // Créer un conteneur pour l'image et le bouton
          const imgButtonContainer = document.createElement("div");
          imgButtonContainer.classList.add("flex", "flex-col", "items-center"); // Flex vertical et centré

          // Création de l'image
          const img = document.createElement("img");
          img.src = item.cover_image;
          img.alt = item.title;
          img.classList.add("rounded-lg", "w-40", "content-cover", "lg:w-80");

          // Création du bouton
          const toggleButton = document.createElement("button");
          toggleButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "mt-2", "transition", "duration-300", "hover:bg-blue-700");
          toggleButton.textContent = "Voir plus";
          toggleButton.addEventListener("click", () => {
            if (synopsisTitle.classList.contains("w-0")) {
              synopsisTitle.classList.remove("w-0");
              synopsisTitle.classList.add("w-64", "p-4");
              toggleButton.textContent = "Voir moins";
            } else {
              synopsisTitle.classList.remove("w-64", "p-4");
              synopsisTitle.classList.add("w-0");
              toggleButton.textContent = "Voir plus";
            }
          });

          // Création du conteneur pour Genre et date de création
          const containerCreationDateMoreKind = document.createElement("div");
          containerCreationDateMoreKind.classList.add("aaaaar"); // Tu peux ajouter des classes spécifiques pour le styliser

          // Ajouter l'image et le bouton au conteneur
          imgButtonContainer.appendChild(img);
          imgButtonContainer.appendChild(toggleButton);

          // Création du titre
          const title = document.createElement("h3");
          title.classList.add("text-lg", "font-bold", "text-gray-800");
          title.textContent = item.title;

          // Création de la description
          const synopsis = document.createElement("p");
          synopsis.classList.add("text-sm", "text-gray-600");
          synopsis.textContent = item.synopsis;

          //ajouter date + genre 
          const date = document.createElement("p");
          date.classList.add("text-sm", "text-gray-600");
          date.textContent = item.release_date;

          const GENRE = document.createElement("p");
          // Ajouter le conteneur genre et date à la description
          synopsis.appendChild(containerCreationDateMoreKind);

          // Ajouter les éléments à la div englobante
          wrapperDiv.appendChild(imgButtonContainer); // Ajouter le conteneur image et bouton
          wrapperDiv.appendChild(synopsisTitle); // Ajouter la div du synopsis
          synopsisTitle.appendChild(title); // Ajouter le titre au synopsis
          synopsisTitle.appendChild(synopsis); // Ajouter la description au synopsis
          synopsisTitle.appendChild(containerCreationDateMoreKind);
          containerCreationDateMoreKind.appendChild(date)

          // Ajouter la div englobante au conteneur principal
          SELECTORDIVANIMECONTAINER.appendChild(wrapperDiv);
        });
      } else {
        console.error("Le conteneur 'containerAnimeCard' n'a pas été trouvé.");
      }
    })
    .catch(error => {
      console.error("Erreur lors du chargement des données :", error);
    });
}
