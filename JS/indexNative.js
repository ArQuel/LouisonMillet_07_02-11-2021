import recipes from './recipes.js'

let ingredientsTab = []
let ustensilsTab = []
let applianceTab = []




main();



function main (){
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
          ustensilsTab.push(recipes[i].ustensils[j])
        }
      } else {
        ustensilsTab.push(recipes[i].ustensils)
      }
}

let iFinal = formatTab(ingredientsTab)

let aFinal = formatTab(applianceTab)

let uFinal = formatTab(ustensilsTab)

const containerIngredients = document.querySelector('.container-ingredients')
const containerAppareils = document.querySelector('.container-appareil')
const containerUstensils = document.querySelector('.container-ustensil')

  addEventsTo(containerIngredients, containerAppareils, containerUstensils , iFinal, aFinal, uFinal)
  // displayCard()
}


function formatTab(tab){
  // filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
let tmp = tab.join('~').toLowerCase()
const newTab = tmp.split('~')

return Array.from(new Set(newTab))
}


function addEventsTo (containerIngredients, containerAppareils, containerUstensils, iFinal, aFinal, uFinale) {
    // Afficher les ingrédients dans la liste
  containerIngredients.addEventListener('click', (e) => {
    const ListGroupIngredients = document.querySelector('.ingredients-list')
    displayList(ListGroupIngredients, iFinal, 'ingredients')
    dropUp(containerIngredients)
  })

  // Afficher les appareils dans la liste
  containerAppareils.addEventListener('click', (e) => {
    const ListGroupAppliance = document.querySelector('.appareil-list')
    displayList(ListGroupAppliance, aFinal, 'appareils')
    dropUp(containerAppareils)

  })

  // Afficher les ustensils dans la liste
  containerUstensils.addEventListener('click', (e) => {
    const ListGroupUstensils = document.querySelector('.ustensil-list')
    displayList(ListGroupUstensils, uFinale, 'ustensils')
    dropUp(containerUstensils)
  })

}



function displayList (list, currentTab, tabName) {
  list.innerHTML = ''
  for (let i = 0; i < currentTab.length; i ++) {
            list.innerHTML += `<div class="list-group-item ${tabName}">${currentTab[i][0].toUpperCase() + currentTab[i].slice(1)}</div>`              
              let items = document.querySelectorAll(`.${tabName}`)
              for (let i = 0; i < items.length; i++) {
                items[i].addEventListener('click', (e) => {
                  let tagContainer = document.querySelector('.tags')
                  tagContainer.innerHTML += `<div class="tag">
                    <p>${items[i].innerText}</p>
                    <span class="cross-${tabName}">X</span>
                  </div>`
                  // Retirer le tag de la liste
                  currentTab.splice(i, 1);

                  let cross = document.querySelectorAll(`.cross-${tabName}`)
                  for (let j = 0; j < cross.length; j++){
                    cross[j].addEventListener('click', (e) => {
                      let tagElt = cross[j].parentNode
                      let value = tagElt.firstElementChild.innerText
                      currentTab.push(value)
                      tagElt.parentNode.removeChild(tagElt)
                      displayList(list, currentTab, tabName)
                    })
                  }
                  let search = items[i].innerText
                  let result = getRecipesWithIngredient(recipes, search)
                  displayCards(result)
                })
              }
  }
}


function getRecipesWithIngredient (recipes, search) {
  let recipesWithIngredient = []
  for (let index = 0; index < recipes.length; index ++) {
    const recipe = recipes[index]

    for (let i = 0; i < recipe.ingredients.length; i ++) {
      let ingredient = recipe.ingredients[i].ingredient;
      if (ingredient === search) {
        recipesWithIngredient.push(recipe)
      }
    }
  }
  return [... new Set(recipesWithIngredient)]
}

function dropUp(ctnElt){
  document.addEventListener('click', function(event) {
    let isClickInsideElement = ctnElt.contains(event.target)
    if (!isClickInsideElement) {
      console.log('pas dedans')
      ctnElt.classList.remove("active")
    }
    else {
      console.log('dedans')
      ctnElt.classList.add("active")
    }
})
}

function displayCards (result) {
  const cardsCtn = document.querySelector('.cards')
  for (let i = 0; i < result.length; i ++){
    let recette = result[i]
    console.log(recette)
    cardsCtn.innerHTML += `<div class="cards">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="./Style/img/Capture.JPG" alt="Card image cap">
      <div class="card-body" id="${recette.id}">
        <h5 class="card-title">${recette.name}</h5>
        <p class="card-text">${recette.description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>`
    for (let j = 0; j < recette.ingredients.length; j ++){
      let ingredient = recette.ingredients[j].ingredient
    const cardBody = document.getElementById(recette.id)
    cardBody.innerHTML += `<p class="card-text">${ingredient}</p>`

    }
  }
}






//        ---------------------------------------------------------------------- POUR LA PROCHAINE PARTIE --------------------------------------------------------------------------------



// containerIngredients.addEventListener('click', (e) => {
//   ListGroupIngredients.innerHTML = ingredientsTabFinal.map(elt =>  `<li class="list-group-item">${elt}</li>` ).join('')
// })


// function formatList(list){
//   // filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
// const newList = list.map(elt => elt.toLowerCase())
// return Array.from(new Set(newList))
// }
