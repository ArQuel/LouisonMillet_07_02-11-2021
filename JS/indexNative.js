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
// Pour la deuxième partie
// boutonIngredients.addEventListener('click', (e) => {
//   ListGroupIngredients.innerHTML = ingredientsTabFinal.map(elt =>  `<li class="list-group-item">${elt}</li>` ).join('')
// })
boutonIngredients.addEventListener('click', (e) => {
  // Ajouter des Elts dans le html de ListGroupIngredients déploie les autres containers 
  const ListGroupIngredients = document.querySelector('.ingredients-list')
  actualiserTableau(ListGroupIngredients, ingredientsTabFinal)
})

function actualiserTableau(list, currentTab) {
  list.innerHTML = ''
  for (let i = 0; i < 30; i ++) {
            list.innerHTML += 
            `<div class="list-group-item ingredients">${currentTab[i][0].toUpperCase() +  
              currentTab[i].slice(1)}</div>`
              // Comment faire pour réutiliser cette fonction avec ustensils et appareils ?
              let items = document.querySelectorAll('.ingredients')
              for (let i = 0; i < items.length; i++) {
                items[i].addEventListener('click', (e) => {
                  let tagContainer = document.querySelector('.tags')
                  tagContainer.innerHTML += `<div class="tag">
                    <p>${items[i].innerText}</p>
                    <span class="cross-ingredients">X</span>
                  </div>`
                  // Retirer le tag de la liste
                  currentTab.splice(i, i);
                  let cross = document.querySelectorAll('.cross-ingredients')
                  for (let j = 0; j < cross.length; j++){
                    cross[j].addEventListener('click', (e) => {
                      let tagElt = cross[j].parentNode
                      let value = tagElt.firstElementChild.innerText
                      console.log(tagElt)
                      currentTab.push(value)
                      tagElt.parentNode.removeChild(tagElt)
                      actualiserTableau(list, currentTab, items)
                    })
                  }
                })
              }
  }
}

// Afficher les appareils dans la liste
const boutonAppliance = document.querySelector('.container-appareil')
const ListGroupAppliance = document.querySelector('.appareil-list')
boutonAppliance.addEventListener('click', (e) => {
  ListGroupAppliance.innerHTML = ''
for (let i = 0; i < applianceTabFinal.length; i ++) {
          ListGroupAppliance.innerHTML += 
          `<div class="list-group-item appareils">${applianceTabFinal[i][0].toUpperCase() +  
            applianceTabFinal[i].slice(1)}</div>`
            let item = document.querySelectorAll('.appareils')
            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener('click', (e) => {
                let tagContainer = document.querySelector('.tags')
                tagContainer.innerHTML += `<div class="tag"><p>${item[i].innerText}</p><span class="cross-appareils">X</span></div>`
                // Retirer le tag de la liste
                applianceTabFinal.splice(i, i);
                let cross = document.querySelectorAll('.cross-appareils')

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
          `<div class="list-group-item ustensils">${ustensilsTabFinal[i][0].toUpperCase() +  
            ustensilsTabFinal[i].slice(1)}</div>`
            let item = document.querySelectorAll('.ustensils')
            for (let i = 0; i < item.length; i++) {
              item[i].addEventListener('click', (e) => {
                let tagContainer = document.querySelector('.tags')
                tagContainer.innerHTML += `<div class="tag"><p>${item[i].innerText}</p><span class="cross-ustensils">X</span></div>`
                // Retirer le tag de la liste
                ustensilsTabFinal.splice(i, i);
                let cross = document.querySelectorAll('.cross-ustensils')
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