export function createDiv(content = "Nouvelle div", parent = null) {
    const newDiv = document.createElement("div");
  
    // Ajouter du contenu ou d'autres propriétés à la div
    newDiv.textContent = content;
  
    // Si un parent est spécifié, l'ajouter, sinon l'ajouter au body par défaut
    if (parent) {
      parent.appendChild(newDiv);
    } else {
      document.body.appendChild(newDiv);
    }
  
    return newDiv; // Renvoie la nouvelle div créée
  }