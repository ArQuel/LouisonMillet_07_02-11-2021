import recipes from './recipes.js'

let ingredientsTab = []
let ustensilsTab = []
let applianceTab = []
let filtredRecipes = recipes;
let selectedTags = []
let filtredIngredients, filtredAppliances, filtredUstensils;
let mainSearchValue = ""



main();



function main (){
  // Aller chercher les ingrédients et les mettre dans un tableau
  setComponentsArrays(recipes);

let iFinal = formatTab(ingredientsTab)

let aFinal = formatTab(applianceTab)

let uFinal = formatTab(ustensilsTab)

const containerIngredients = document.querySelector('.container-ingredients')
const containerAppareils = document.querySelector('.container-appareil')
const containerUstensils = document.querySelector('.container-ustensil')


 
  displayCards(filtredRecipes)


  addEventsTo(containerIngredients, containerAppareils, containerUstensils , iFinal, aFinal, uFinal)


}


function setComponentsArrays(recipes) {
  ingredientsTab = []
  applianceTab = []
  ustensilsTab = []

  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
      ingredientsTab.push(recipes[i].ingredients[j].ingredient);
    }
  }
  // Aller chercher les appareils et les mettre dans un tableau
  for (let i = 0; i < recipes.length; i++) {
    applianceTab.push(recipes[i].appliance);
  }
  // Aller chercher les ustensiles et les mettre dans un tableau
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].ustensils.length > 0) {
      for (let j = 0; j < recipes[i].ustensils.length; j++) {
        ustensilsTab.push(recipes[i].ustensils[j]);
      }
    }
    else {
      ustensilsTab.push(recipes[i].ustensils);
    }
  }
}

function formatTab(tab){
  // filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
let tmp = tab.join('~').toLowerCase()
const newTab = tmp.split('~')

return Array.from(new Set(newTab))
}


function addEventsTo (containerIngredients, containerAppareils, containerUstensils, iFinal, aFinal, uFinal) {
  const inputIngredients = document.querySelector('#Ingredients')
  const inputAppareils = document.querySelector('#Appareils')
  const inputUstensils = document.querySelector('#Ustensils')
  const inputSearch = document.querySelector('#Search')

  // barre de recherche principale
  inputSearch.addEventListener('keyup', (e) => {
    let noResultCtn = document.querySelector('#empty');
    noResultCtn.innerHTML = ''
    if (e.target.value.length < mainSearchValue.length) {
      filtredRecipes = [...recipes]
    }
    mainSearch(inputSearch); 
  })
  
    // Afficher les ingrédients dans la liste
  containerIngredients.addEventListener('click', (e) => {
    const ListGroupIngredients = document.querySelector('.ingredients-list')
    displayList(ListGroupIngredients, ingredientsTab, 'ingredients')
    inputIngredients.value = ''
  })

      // Recherche section Ingredients
  inputIngredients.addEventListener('keyup', (e) => {
    const ListGroupIngredients = document.querySelector('.ingredients-list')
    let ingredientTabSearch = []
    for (let i = 0; i < iFinal.length; i++) {
      // Faire pareil pour les autres
      if ( iFinal[i].toLowerCase().includes(inputIngredients.value.toLowerCase())){
        ingredientTabSearch.push(iFinal[i])
      }
    }
    displayList(ListGroupIngredients, ingredientTabSearch, 'ingredients')
  })

  // Afficher les appareils dans la liste
  containerAppareils.addEventListener('click', (e) => {
    const ListGroupAppliance = document.querySelector('.appareil-list')
    displayList(ListGroupAppliance, aFinal, 'appareils')
    dropUp(containerAppareils)
    inputAppareils.value = ''
  })

  // Recherche section Appareils
  inputAppareils.addEventListener('keyup', (e) => {
    const ListGroupAppliance = document.querySelector('.appareil-list')
    let appareilTabSearch = []
    for (let i = 0; i < aFinal.length; i++) {
      if (aFinal[i].toLowerCase().includes(inputAppareils.value.toLowerCase())){
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
    inputUstensils.value = ''

  })

  // Recherche section Ustensils
  inputUstensils.addEventListener('keyup', (e) => {
    const ListGroupUstensils = document.querySelector('.ustensil-list')
    let ustensilsTabSearch = []
    for (let i = 0; i < uFinal.length; i++) {
      if (uFinal[i].includes(inputUstensils.value.toLowerCase())){
        ustensilsTabSearch.push(uFinal[i])
        displayList(ListGroupUstensils, ustensilsTabSearch, 'ustensils')
      } 
    }
  })


  
  dropUp(containerIngredients)
  dropUp(containerAppareils)
  dropUp(containerUstensils)

  
}


function mainSearch(inputSearch) {
  const ListGroupIngredients = document.querySelector('.ingredients-list')
  let search = inputSearch.value.toLowerCase();
  filtredRecipes = [...getRecipesWithInput(filtredRecipes, search)];

  displayCards(filtredRecipes);
  verifRecipes();
  setComponentsArrays(filtredRecipes);
  displayList(ListGroupIngredients, ingredientsTab, 'ingredients')
  mainSearchValue = search
}

// Affiche les items dans les contenairs
function displayList (list, currentTab, tabName) {
  list.innerHTML = ''
  for (let i = 0; i < currentTab.length; i ++) {
            list.innerHTML += `<div class="list-group-item ${tabName}">${currentTab[i][0].toUpperCase() + currentTab[i].slice(1)}</div>`                         
                getTags(tabName, currentTab, list);
  }
}

// Affiche les tags quand cliqués dessus
function getTags(tabName, currentTab, list) {
let items = document.querySelectorAll(`.${tabName}`)
for (let j = 0; j < items.length; j++) {
  items[j].addEventListener('click', (e) => {
    let tagContainer = document.querySelector('.tags');
    tagContainer.innerHTML += `<div class="tag tag-${tabName}" data-index="${selectedTags.length}">
                    <p>${items[j].innerText}</p>
                    <span class="cross-${tabName}">X</span>
                  </div>`;
    selectedTags.push(items[j].innerText);
    // Retirer le tag de la liste
    currentTab.splice(j, 1);
    addCross(tagContainer, currentTab, list, tabName);
    let search = items[j].innerText;
    refreshRecipes(search);
  });
}
}

// Met à jour les recettes filtrées
function refreshRecipes(search) {
  filtredIngredients = [...getRecipesWithIngredient(filtredRecipes, search)];
  filtredAppliances = [...getRecipesWithAppliance(filtredRecipes, search)];
  filtredUstensils = [...getRecipesWithUstensil(filtredRecipes, search)];
  filtredRecipes = filtredIngredients.concat(filtredAppliances.concat(filtredUstensils));
  displayCards(filtredRecipes);
}

// Ajoute un listener sur la croix des tags
function addCross(tagContainer, currentTab) {
  let cross = tagContainer.querySelectorAll('span');
  for (let index = 0; index < cross.length; index++) {
    cross[index].addEventListener('click', (e) => {
      let tagElt = cross[index].parentNode;
      tagElt.parentNode.removeChild(tagElt);
      selectedTags.splice(e.target.closest('.tag').dataset.index, 1);
      tagElt.removeChild(cross[index])
      let value = tagElt.innerText;
      currentTab.push(value);
      filtredRecipes = recipes
      for (let tagIndex = 0; tagIndex < selectedTags.length; tagIndex++){
        refreshRecipes(selectedTags[tagIndex])
      }
      // Pour la deuxième partie
      // selectedTags.forEach(tag => {
      //   console.log(tag)
      //   filtredRecipes = [... getRecipesWithIngredient(filtredRecipes, tag)]
      // })
      const inputSearch = document.querySelector('#Search')
      mainSearch(inputSearch)
    });
  }
}

// Recherche par l'input
function getRecipesWithInput (recipes, search) {
  let recipesWithInput = []
  for (let index = 0; index < recipes.length; index ++) {
    const recipe = recipes[index]
    if (recipe.name.toLowerCase().includes(search)) {
      recipesWithInput.push(recipe)
    }
    for (let i = 0; i < recipe.ingredients.length; i ++) {
      let ingredient = recipe.ingredients[i].ingredient;
      if (ingredient.toLowerCase().includes(search)) {
        recipesWithInput.push(recipe)
      }
    }
    let appliance = recipe.appliance;
      if (appliance.toLowerCase().includes(search)) {
        recipesWithInput.push(recipe)
      }
      let ustensil = recipe.ustensils;
      for (let i = 0; i < ustensil.length; i++){
        if (ustensil[i].toLowerCase().includes(search)) {
          recipesWithInput.push(recipe)
        }
      }
  }
  return [... new Set(recipesWithInput)]
}

// Recherche par ingredients
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

// Recherche par Appareils
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

// Recherche par Ustensils
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



// Afficher/Masquer les listes des sections Ingredients/Appareils/Ustensils
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

// Afficher les recettes filtrées
function displayCards (result) {
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
    verifRecipes()
}

function verifRecipes() {
  const cardsCtn = document.querySelector('.cards')
  let noResult = document.getElementById('empty').querySelector('.no-result')
  let noResultCtn = document.querySelector('#empty');
  noResultCtn.innerHTML = ''
  if (cardsCtn.hasChildNodes()) {
    noResultCtn.innerHTML = ``

  } else {
    noResultCtn.innerHTML += `
    <div class="no-result">
    <p> Désolé nous n'avons pas trouvé de résultats correspondant à votre recherche </p>
    </div>`
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
