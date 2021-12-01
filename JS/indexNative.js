import recipes from './recipes.js'

let ingredientsTab = []
let ustensilsTab = []
let applianceTab = []
let filtredRecipes = recipes;
let selectedTags = []



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


 
  displayCards(filtredRecipes)
  addEventsTo(containerIngredients, containerAppareils, containerUstensils , iFinal, aFinal, uFinal)
 
}


function formatTab(tab){
  // filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
let tmp = tab.join('~').toLowerCase()
const newTab = tmp.split('~')

return Array.from(new Set(newTab))
}


function addEventsTo (containerIngredients, containerAppareils, containerUstensils, iFinal, aFinal, uFinal) {
    // Afficher les ingrédients dans la liste
  containerIngredients.addEventListener('click', (e) => {
    const ListGroupIngredients = document.querySelector('.ingredients-list')
    displayList(ListGroupIngredients, iFinal, 'ingredients')
  })

  const inputIngredients = document.querySelector('#Ingredients')
  inputIngredients.addEventListener('keyup', (e) => {
    const ListGroupIngredients = document.querySelector('.ingredients-list')
    let ingredientTabSearch = []
    for (let i = 0; i < iFinal.length; i++) {
      console.log(inputIngredients.value, iFinal[i])
      if ( inputIngredients.value.toLowerCase() === iFinal[i]){
        ingredientTabSearch.push(iFinal[i])
        displayList(ListGroupIngredients, ingredientTabSearch, 'ingredients')
      }
    }
  })

  // Afficher les appareils dans la liste
  containerAppareils.addEventListener('click', (e) => {
    const ListGroupAppliance = document.querySelector('.appareil-list')
    displayList(ListGroupAppliance, aFinal, 'appareils')
    dropUp(containerAppareils)
  })

  const inputAppareils = document.querySelector('#Appareils')
  inputAppareils.addEventListener('keyup', (e) => {
    const ListGroupAppliance = document.querySelector('.appareil-list')
    let appareilTabSearch = []
    for (let i = 0; i < aFinal.length; i++) {
      console.log(inputAppareils.value, aFinal[i])
      if ( inputAppareils.value.toLowerCase() === aFinal[i]){
        appareilTabSearch.push(aFinal[i])
        displayList(ListGroupAppliance, appareilTabSearch, 'appareils')
      }
    }
  })

  // Afficher les ustensils dans la liste
  containerUstensils.addEventListener('click', (e) => {
    const ListGroupUstensils = document.querySelector('.ustensil-list')
    displayList(ListGroupUstensils, uFinal, 'ustensils')
    dropUp(containerUstensils)
  })

  const inputUstensils = document.querySelector('#Ustensils')
  inputUstensils.addEventListener('keyup', (e) => {
    const ListGroupUstensils = document.querySelector('.ustensil-list')
    let ustensilsTabSearch = []
    for (let i = 0; i < uFinal.length; i++) {
      console.log(inputUstensils.value, uFinal[i])
      if ( inputUstensils.value.toLowerCase() === uFinal[i]){
        ustensilsTabSearch.push(uFinal[i])
        displayList(ListGroupUstensils, ustensilsTabSearch, 'ustensils')
      } 
    }
  })

  dropUp(containerIngredients)
  dropUp(containerAppareils)
  dropUp(containerUstensils)

  
}



function displayList (list, currentTab, tabName) {
  list.innerHTML = ''
  for (let i = 0; i < currentTab.length; i ++) {
            list.innerHTML += `<div class="list-group-item ${tabName}">${currentTab[i][0].toUpperCase() + currentTab[i].slice(1)}</div>`              
              let items = document.querySelectorAll(`.${tabName}`)
              for (let i = 0; i < items.length; i++) {
                getTags(items, i, tabName, currentTab, list);
              }
  }
}


function getTags(items, i, tabName, currentTab, list) {
  items[i].addEventListener('click', (e) => {
    let tagContainer = document.querySelector('.tags');
    tagContainer.innerHTML += `<div class="tag tag-${tabName}" data-index="${selectedTags.length}">
                    <p>${items[i].innerText}</p>
                    <span class="cross-${tabName}">X</span>
                  </div>`;
    selectedTags.push(items[i].innerText);
    // Retirer le tag de la liste
    currentTab.splice(i, 1);
    addCross(tagContainer, currentTab, list, tabName);
    refreshRecipes(items, i);
  });
}

function refreshRecipes(items, i) {
  let search = items[i].innerText;
  let filtredIngredients, filtredAppliances, filtredUstensils;
  // Comment faire les troix en même temps ?
  filtredIngredients = [...getRecipesWithIngredient(filtredRecipes, search)];
  console.log(filtredIngredients);
  filtredAppliances = [...getRecipesWithAppliance(filtredRecipes, search)];
  console.log(filtredAppliances);
  filtredUstensils = [...getRecipesWithUstensil(filtredRecipes, search)];
  console.log(filtredUstensils);
  filtredRecipes = filtredIngredients.concat(filtredAppliances.concat(filtredUstensils));
  displayCards(filtredRecipes);
}

function addCross(tagContainer, currentTab, list, tabName) {
  let cross = tagContainer.querySelectorAll('span');
  for (let index = 0; index < cross.length; index++) {
    cross[index].addEventListener('click', (e) => {
      let tagElt = cross[index].parentNode;
      console.log(tagElt);
      let value = tagElt.innerText;
      currentTab.push(value);
      tagElt.parentNode.removeChild(tagElt);
      selectedTags.splice(e.target.closest('.tag').dataset.index, 1);
      displayList(list, currentTab, tabName);
    });
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

function getRecipesWithAppliance (recipes, search) {
  let recipesWithAppliance= []
  for (let index = 0; index < recipes.length; index ++) {
    const recipe = recipes[index]
      let appliance = recipe.appliance;
      if (appliance === search) {
        recipesWithAppliance.push(recipe)
      }
  }
  return [... new Set(recipesWithAppliance)]
}

function getRecipesWithUstensil (recipes, search) {
  let recipesWithUstensil = []
  for (let index = 0; index < recipes.length; index ++) {
    const recipe = recipes[index]
      let ustensil = recipe.ustensils;
      for (let i = 0; i < ustensil.length; i++){
        if (ustensil[i] === search.toLowerCase()) {
          recipesWithUstensil.push(recipe)
        }
      }
  }
  return [... new Set(recipesWithUstensil)]
}

function dropUp(ctnElt){
  document.addEventListener('click', function(event) {
    let isClickInsideElement = ctnElt.contains(event.target)
    if (!isClickInsideElement) {
      ctnElt.classList.remove("active")
    }
    else {
      ctnElt.classList.add("active")
    }
})
}

function displayCards (result) {
  console.log(result)
  if (result.length === 0){
    let noResultCtn = document.querySelector('.empty')
    noResultCtn.innerHTML += `
    <div class="no-result">
    <p> Désolé nous n'avons pas trouvé de résultats correspondant à votre recherche </p>
    </div>`

  } 
    const cardsCtn = document.querySelector('.cards')
    cardsCtn.innerHTML = ''
    for (let i = 0; i < result.length; i ++){
      let recette = result[i]
      cardsCtn.innerHTML += `
      <div class="card-recipe" id="${recette.id}">
        <img class="card-img-top" src="./Style/img/Capture.JPG" alt="Card image cap">
        <div class="card-body" id="${recette.id}">
          <h5 class="card-title">${recette.name}</h5>
          <h4> <i class="fas fa-clock"></i> ${recette.time} min</h4>
          <div class="card-text">
          ${recette.description}
          </div>
        </div>
      </div>
  `
      for (let j = 0; j < recette.ingredients.length; j ++){
        const cardBody = document.getElementById(recette.id)
        let ingredient = recette.ingredients[j].ingredient
        let quantity = recette.ingredients[j].quantity
        let unit = recette.ingredients[j].unit
        if (quantity === undefined || unit === undefined) {
          cardBody.innerHTML += `<p class="card-ingredient"><b>${ingredient}</b></p>`
        } else {
          cardBody.innerHTML += `<p class="card-ingredient"><b>${ingredient}</b> : ${quantity} ${unit}</p>`
        }
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
