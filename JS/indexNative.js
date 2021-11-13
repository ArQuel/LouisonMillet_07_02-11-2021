import recipes from './recipes.js'

let ingredientsTab = []
let ustensilsTab = []
let applianceTab = []


// Aller chercher les ingrédients et les mettre dans un tableau
for (let i = 0; i < recipes.length; i ++) {
  for (let j = 0; j < recipes[i].ingredients.length; j++) {
        ingredientsTab.push(recipes[i].ingredients[j].ingredient)        
  }
}

// Aller chercher les appareils et les mettre dans un tableau
for (let i = 0; i < recipes.length; i ++) {
  applianceTab.push(recipes[i].appliance)
}

// Aller chercher les ustensiles et les mettre dans un tableau
for (let i = 0; i < recipes.length; i ++) {
        if (recipes[i].ustensils.length > 0 ) {
          for (let j = 0; j < recipes[i].ustensils.length; j++) {
          let tmp = recipes[i].ustensils[j]
          ustensilsTab.push(recipes[i].ustensils[j])
        }
      } else {
        ustensilsTab.push(recipes[i].ustensils)
      }
}

let ingredientsTabFinal = formatList(ingredientsTab)


let applianceTabFinal = formatList(applianceTab)


let ustensilsTabFinal = formatList(ustensilsTab)



// Afficher les ingrédients dans la liste
const boutonIngredients = document.querySelector('.container-ingredients')
const ListGroupIngredients = document.querySelector('.ingredients-list')
// Pour la deuxième partie
// boutonIngredients.addEventListener('click', (e) => {
//   ListGroupIngredients.innerHTML = ingredientsTabFinal.map(elt =>  `<li class="list-group-item">${elt}</li>` ).join('')
// })
boutonIngredients.addEventListener('click', (e) => {
  ListGroupIngredients.innerHTML = ''
for (let i = 0; i < 30; i ++) {
          ListGroupIngredients.innerHTML += 
          `<div class="list-group-item">${ingredientsTabFinal[i][0].toUpperCase() +  
            ingredientsTabFinal[i].slice(1)}</div>`
            let item = document.querySelectorAll('.list-group-item')
            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener('click', (e) => {
                let tagContainer = document.querySelector('.tags')
                tagContainer.innerHTML += `<div class="tag">
                  <p>${item[i].innerText}</p>
                </div>`
                // Retirer le tag de la liste
                ingredientsTabFinal.splice(1, i);
              })
            }
}
})


// Afficher les appareils dans la liste
const boutonAppliance = document.querySelector('.container-appareil')
const ListGroupAppliance = document.querySelector('.appareil-list')
boutonAppliance.addEventListener('click', (e) => {
  ListGroupAppliance.innerHTML = ''
for (let i = 0; i < applianceTabFinal.length; i ++) {
          ListGroupAppliance.innerHTML += 
          `<div class="list-group-item">${applianceTabFinal[i][0].toUpperCase() +  
            applianceTabFinal[i].slice(1)}</div>`
            let item = document.querySelectorAll('.list-group-item')
            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener('click', (e) => {
                let tagContainer = document.querySelector('.tag')
                tagContainer.innerHTML += `<p>${item[i].innerText}</p>`
                // Retirer le tag de la liste
                ingredientsTabFinal.splice(1, i);
              })
            }
}
})

// Afficher les ustensils dans la liste
const boutonUstensils = document.querySelector('.container-ustensil')
const ListGroupUstensils = document.querySelector('.ustensil-list')
boutonUstensils.addEventListener('click', (e) => {
  ListGroupUstensils.innerHTML = ''
for (let i = 0; i < ustensilsTabFinal.length; i ++) {
          ListGroupUstensils.innerHTML += 
          `<div class="list-group-item">${ustensilsTabFinal[i][0].toUpperCase() +  
            ustensilsTabFinal[i].slice(1)}</div>`
            let item = document.querySelectorAll('.list-group-item')
            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener('click', (e) => {
                let tagContainer = document.querySelector('.tag')
                tagContainer.innerHTML += `<p>${item[i].innerText}</p>`
                // Retirer le tag de la liste
                ingredientsTabFinal.splice(1, i);
              })
            }
}
})

function formatList(list){
  // filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
let tmp = list.join('~').toLowerCase()
const newList = tmp.split('~')
// Pour la deuxième partie
// const newList = list.map(elt => elt.toLowerCase())
return Array.from(new Set(newList))
}