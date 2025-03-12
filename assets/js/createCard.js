// Importations
import { SelectorDivAnimeContainer } from "./mainSelector.js" // Fonction pour sélectionner le conteneur
import { fetchAllData } from "./fetchDB.js" // Fonction pour récupérer les données

// Sélection du conteneur principal
const SELECTORDIVANIMECONTAINER = SelectorDivAnimeContainer()

// Ajout d'un gap entre les cartes
SELECTORDIVANIMECONTAINER.classList.add(
  "flex",
  "items-center",
  "flex-col",
  "gap-4",
  "lg:grid",
  "lg:grid-cols-[500px_500px_500px]",
  "lg:grid-row-3",
  "lg:gap-4",
  "lg:w-full",
  "lg:justify-items-center",
  "lg:justify-evenly",
)

// Variable pour stocker les données globales
let globalAnimeData = []

function getBackgroundColor(genre) {
  switch (genre) {
    case "Action":
      return "bg-red-300" // Red
    case "Aventure":
      return "bg-orange-300" // Orange
    case "Shounen":
      return "bg-blue-300" // Blue
    case "Comédie":
      return "bg-yellow-300" // Yellow
    case "Drame":
      return "bg-purple-300" // Purple
    case "Fantasy":
      return "bg-green-300" // Green
    case "Science-fiction":
      return "bg-gray-300" // Gray
    case "Super-pouvoirs":
      return "bg-cyan-300" // Cyan
    case "Horreur":
      return "bg-purple-600" // Darker gray for horror (lighter than black)
    case "Surnaturel":
      return "bg-red-300" // Dark Red
    case "Psychologique":
      return "bg-blue-300" // Dark Blue
    case "Mecha":
      return "bg-stone-300" // Steel Blue (Tailwind does not have steelblue by default)
    case "Thriller":
      return "bg-amber-500" // Brown
    case "Mystère":
      return "bg-teal-300" // Teal
    case "Cyberpunk":
      return "bg-cyan-300" // Dark Cyan
    case "Space Western":
      return "bg-indigo-300" // Navy
    case "Romance":
      return "bg-pink-500" // Pink
    case "Historique":
      return "bg-yellow-300" // Goldenrod
    case "Super-héros": // New genre added
      return "bg-blue-500" // Blue for Super-héros
    default:
      return "bg-white" // White
  }
}

// Fonction pour obtenir le nom du genre à partir de l'ID de la checkbox
function getGenreFromCheckboxId(id) {
  const genreMap = {
    action: "Action",
    adventure: "Aventure",
    shounen: "Shounen",
    comedy: "Comédie",
    drama: "Drame",
    fantasy: "Fantasy",
    "sci-fi": "Science-fiction",
    "super-pouvoirs": "Super-pouvoirs",
    horror: "Horreur",
    supernaturel: "Surnaturel",
    psychologique: "Psychologique",
    mecha: "Mecha",
    thriller: "Thriller",
    mystery: "Mystère",
    cyberpunk: "Cyberpunk",
    "space-western": "Space Western",
    romance: "Romance",
    historique: "Historique",
    "super-heros": "Super-héros",
  }

  return genreMap[id] || id
}

// Fonction pour filtrer les animes
function filterAnimes() {
  console.log("Filtrage en cours...")

  // Récupérer les genres sélectionnés
  const checkboxes = document.querySelectorAll(".checkbox:checked")
  console.log("Checkboxes cochées:", checkboxes.length)

  // Utiliser l'ID ou le nom de la checkbox pour obtenir le genre correspondant
  const selectedGenres = Array.from(checkboxes).map((checkbox) => getGenreFromCheckboxId(checkbox.id))
  console.log("Genres sélectionnés:", selectedGenres)

  // Si aucun genre n'est sélectionné, afficher tous les animes
  if (selectedGenres.length === 0) {
    console.log("Aucun genre sélectionné, affichage de tous les animes")
    displayAllCards()
    return
  }

  // Parcourir toutes les cartes et les afficher/masquer selon les genres
  const allCards = document.querySelectorAll('[class*="anime-card-wrapper-"]')
  console.log("Nombre total de cartes:", allCards.length)

  let visibleCount = 0

  allCards.forEach((card, index) => {
    const animeData = globalAnimeData[index]
    if (!animeData) return

    const animeGenres = Array.isArray(animeData.genres)
      ? animeData.genres
      : typeof animeData.genres === "string"
        ? animeData.genres.split(",").map((g) => g.trim())
        : []

    console.log(`Carte ${index} - ${animeData.title}:`, animeGenres)

    // Vérifier si au moins un des genres de l'anime correspond à un genre sélectionné
    const shouldShow = animeGenres.some((genre) => selectedGenres.includes(genre))

    if (shouldShow) {
      card.style.display = ""
      visibleCount++
    } else {
      card.style.display = "none"
    }
  })

  console.log("Cartes visibles après filtrage:", visibleCount)
}

// Fonction pour afficher toutes les cartes
function displayAllCards() {
  const allCards = document.querySelectorAll('[class*="anime-card-wrapper-"]')
  allCards.forEach((card) => {
    card.style.display = ""
  })
}

// Fonction principale pour créer une carte
export function createCard(animeData = null) {
  // Si des données sont passées, utiliser ces données, sinon les récupérer
  const dataPromise = animeData ? Promise.resolve(animeData) : fetchAllData()

  dataPromise
    .then((data) => {
      // Stocker les données pour une utilisation ultérieure dans le filtrage
      if (!animeData) {
        globalAnimeData = data
      }

      if (SELECTORDIVANIMECONTAINER) {
        // Vider le conteneur avant d'ajouter de nouvelles cartes si on recrée toutes les cartes
        if (!animeData) {
          SELECTORDIVANIMECONTAINER.innerHTML = ""
        }

        data.forEach((item, i) => {
          // Créer une div englobante
          const wrapperDiv = document.createElement("div")
          wrapperDiv.classList.add(
            `anime-card-wrapper-${i}`,
            "bg-white",
            "rounded-lg",
            "shadow-[12px_4px_6px_-1px_rgba(0,0,0,0.3)]",
            "p-8",
            "flex",
            "items-center",
            "gap-4",
            "lg:w-auto",
            "border",
            "border-[rgba(170,167,168,0.3)]",
          )

          // Stocker les genres dans un attribut data pour faciliter le filtrage
          wrapperDiv.setAttribute(
            "data-genres",
            Array.isArray(item.genres) ? item.genres.join(",") : typeof item.genres === "string" ? item.genres : "",
          )

          // Conteneur pour l'image et les genres
          const CONTAINERIMAGEGENRE = document.createElement("div")
          CONTAINERIMAGEGENRE.classList.add("flex", "flex-col", "items-center", "gap-2", "relative") // relative pour positionner le X

          // Création de l'image
          const img = document.createElement("img")
          img.src = item.cover_image
          img.alt = item.title
          img.classList.add("rounded-lg", "w-40", "object-cover", "lg:w-70", "ml-[5%]", "mt-[5%]")
          img.style.marginLeft = "5%" // Ajout du margin-left
          img.style.marginTop = "5%" // Ajout du margin-top

          // Création du bouton "X"
          const closeButton = document.createElement("div")
          closeButton.textContent = "X" // Le X
          closeButton.classList.add(
            "absolute",
            "top-0",
            "right-0",
            "bg-red-500",
            "text-white",
            "rounded-full",
            "w-6",
            "h-6",
            "flex",
            "items-center",
            "justify-center",
            "cursor-pointer",
            "font-bold",
          )

          // Éventuellement, ajouter une action au X (par exemple, pour supprimer l'image ou l'élément)
          closeButton.addEventListener("click", (e) => {
            e.stopPropagation() // Empêche la propagation de l'événement
            wrapperDiv.remove() // Cela supprime la carte entière
          })

          // Ajout du X à l'image
          CONTAINERIMAGEGENRE.appendChild(closeButton)

          // Ajout de l'image au conteneur
          CONTAINERIMAGEGENRE.appendChild(img)

          // Conteneur des genres
          const genreContainer = document.createElement("div")
          genreContainer.classList.add("flex", "gap-2", "flex-wrap", "justify-center", "mt-2", "w-full")

          // Traitement des genres
          if (Array.isArray(item.genres)) {
            item.genres.forEach((genre) => {
              const genreDiv = document.createElement("div")
              const bgColor = getBackgroundColor(genre) // Utilisation de la fonction pour obtenir la couleur
              genreDiv.classList.add(
                "text-xs",
                "font-semibold",
                "px-3",
                "py-1",
                "rounded-full",
                bgColor,
                "text-gray-700",
              ) // Appliquer la couleur de fond dynamique
              genreDiv.textContent = genre.trim()
              genreDiv.style.paddingLeft = "5%" // Ajout du padding-left
              genreDiv.style.paddingRight = "5%" // Ajout du padding-right
              genreContainer.appendChild(genreDiv)
            })
          } else if (typeof item.genres === "string") {
            const genres = item.genres.split(",")
            genres.forEach((genre) => {
              const genreDiv = document.createElement("div")
              const bgColor = getBackgroundColor(genre.trim()) // Utilisation de la fonction pour obtenir la couleur
              genreDiv.classList.add(
                "text-xs",
                "font-semibold",
                "px-3",
                "py-1",
                "rounded-full",
                bgColor,
                "text-gray-700",
              ) // Appliquer la couleur de fond dynamique
              genreDiv.textContent = genre.trim()
              genreDiv.style.paddingLeft = "5%" // Ajout du padding-left
              genreDiv.style.paddingRight = "5%" // Ajout du padding-right
              genreContainer.appendChild(genreDiv)
            })
          } else {
            const defaultGenreDiv = document.createElement("div")
            defaultGenreDiv.classList.add(
              "text-xs",
              "font-semibold",
              "px-3",
              "py-1",
              "rounded-full",
              "bg-gray-200",
              "text-gray-700",
              "pl-[2%]",
            )
            defaultGenreDiv.textContent = "Genre inconnu"
            genreContainer.appendChild(defaultGenreDiv)
          }

          // Ajout du conteneur des genres à CONTAINERIMAGEGENRE
          CONTAINERIMAGEGENRE.appendChild(genreContainer)

          // Création du bouton SVG
          const toggleButton = document.createElement("button")
          toggleButton.innerHTML = `  
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C4.5 4 2 12 2 12C2 12 4.5 20 12 20C19.5 20 22 12 22 12C22 12 19.5 4 12 4Z" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          `
          toggleButton.classList.add(
            "w-8",
            "h-8",
            "cursor-pointer",
            "mt-2",
            "transition",
            "duration-300",
            "hover:opacity-75",
          )

          // Ajout du bouton SVG dans le conteneur image + genre
          CONTAINERIMAGEGENRE.appendChild(toggleButton)

          // Conteneur du synopsis
          const synopsisTitle = document.createElement("div")
          synopsisTitle.classList.add(
            "bg-white",
            "shadow-md",
            "rounded-lg",
            "w-0",
            "overflow-hidden",
            "h-40",
            "transition-all",
            "duration-500",
            "ease-in-out",
            "mt-2",
            "p-0",
          )

          // Animation du synopsis au clic
          toggleButton.addEventListener("click", () => {
            if (synopsisTitle.classList.contains("w-0")) {
              synopsisTitle.classList.remove("w-0", "p-0")
              synopsisTitle.classList.add("w-64", "p-4")
            } else {
              synopsisTitle.classList.remove("w-64", "p-4")
              synopsisTitle.classList.add("w-0", "p-0")
            }
          })

          // Conteneur infos
          const containerInfo = document.createElement("div")
          containerInfo.classList.add("anime-info-container")

          // Création du titre
          const title = document.createElement("h3")
          title.classList.add("text-lg", "font-bold", "text-gray-800")
          title.textContent = item.title

          // Création du synopsis
          const synopsis = document.createElement("p")
          synopsis.classList.add("text-sm", "text-gray-600")
          synopsis.textContent = item.synopsis

          // Date de sortie
          const date = document.createElement("p")
          date.classList.add("text-sm", "text-gray-600")
          date.textContent = item.release_date

          // Ajouter les éléments
          containerInfo.appendChild(date)

          synopsisTitle.appendChild(title)
          synopsisTitle.appendChild(synopsis)
          synopsisTitle.appendChild(containerInfo)

          // Ajout des éléments dans la carte
          wrapperDiv.appendChild(CONTAINERIMAGEGENRE)
          wrapperDiv.appendChild(synopsisTitle)

          SELECTORDIVANIMECONTAINER.appendChild(wrapperDiv)
        })

        // Ajouter les écouteurs d'événements pour les filtres
        const checkboxes = document.querySelectorAll(".checkbox")
        checkboxes.forEach((checkbox) => {
          // Supprimer les écouteurs existants pour éviter les doublons
          checkbox.removeEventListener("change", filterAnimes)
          // Ajouter le nouvel écouteur
          checkbox.addEventListener("change", filterAnimes)
        })

        console.log("Cartes créées:", data.length)
        console.log("Checkboxes trouvées:", document.querySelectorAll(".checkbox").length)
      } else {
        console.error("Le conteneur 'containerAnimeCard' n'a pas été trouvé.")
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données :", error)
    })
}

// Ajouter les écouteurs d'événements pour les filtres après le chargement initial
document.addEventListener("DOMContentLoaded", () => {
  // Charger les cartes initiales
  createCard()

  // Ajouter un écouteur pour le bouton de réinitialisation si présent
  const resetButton = document.querySelector("#reset-filter")
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      // Décocher toutes les checkboxes
      const checkboxes = document.querySelectorAll(".checkbox")
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false
      })

      // Afficher toutes les cartes
      displayAllCards()
    })
  }
})

