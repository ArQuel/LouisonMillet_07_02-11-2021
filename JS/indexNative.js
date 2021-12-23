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

  recipes.forEach(recipe => {
    applianceTab.push(recipe.appliance);
    if (recipe.ustensils.length > 0) {
      recipe.ustensils.forEach(ustensil => {
        ustensilsTab.push(ustensil);
      })
    } else {
      ustensilsTab.push(recipe.ustensils);
    }    
      recipe.ingredients.forEach(ingredient => {
      ingredientsTab.push(ingredient.ingredient);
      })
  })
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
    iFinal.forEach(item => {
      if ( item.toLowerCase().includes(inputIngredients.value.toLowerCase())){
        ingredientTabSearch.push(item)
      }
    })
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
    aFinal.forEach(item => {
      if (item.toLowerCase().includes(inputAppareils.value.toLowerCase())){
        appareilTabSearch.push(item)
        displayList(ListGroupAppliance, appareilTabSearch, 'appareils')
      }
    })
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
    uFinal.forEach(item => {
      if (item.includes(inputUstensils.value.toLowerCase())){
        ustensilsTabSearch.push(item)
        displayList(ListGroupUstensils, ustensilsTabSearch, 'ustensils')
      } 
    })
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
  currentTab.forEach(item => {
    list.innerHTML += `<div class="list-group-item ${tabName}">${item[0].toUpperCase() + item.slice(1)}</div>`                         
                getTags(tabName, currentTab, list);
  })
}

// Affiche les tags quand cliqués dessus
function getTags(tabName, currentTab, list) {
  const ListGroupIngredients = document.querySelector('.ingredients-list')
let items = document.querySelectorAll(`.${tabName}`)
items.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    let tagContainer = document.querySelector('.tags');
    tagContainer.innerHTML += `<div class="tag tag-${tabName}" data-index="${selectedTags.length}">
                    <p>${item.innerText}</p>
                    <span class="cross-${tabName}">X</span>
                  </div>`;
    selectedTags.push(item.innerText);
    // Retirer le tag de la liste
    currentTab.splice(index, 1);
    addCross(tagContainer, currentTab, list, tabName);
    let search = item.innerText;
    refreshRecipes(search);
    setComponentsArrays(filtredRecipes);
    displayList(ListGroupIngredients, ingredientsTab, 'ingredients')
  });
})

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
  let crosses = tagContainer.querySelectorAll('span');
  crosses.forEach(cross => {
    cross.addEventListener('click', (e) => {
      let tagElt = cross.parentNode;
      tagElt.parentNode.removeChild(tagElt);
      selectedTags.splice(e.target.closest('.tag').dataset.index, 1);
      tagElt.removeChild(cross)
      let value = tagElt.innerText;
      currentTab.push(value);
      filtredRecipes = recipes
      selectedTags.forEach(selectedTag => {
        refreshRecipes(selectedTag)
      })
      const inputSearch = document.querySelector('#Search')
      mainSearch(inputSearch)
    })
  })
}

// Recherche par l'input
function getRecipesWithInput (recipes, search) {
  let recipesWithInput = []
  recipesWithInput = [...recipes.filter(
    recipe => recipe.name.toLowerCase().includes(search) ||
    recipe.ingredients.find(ingredient => ingredient.ingredient.toLowerCase().includes(search)) ||
    recipe.appliance.toLowerCase().includes(search) ||
    recipe.ustensils.find(ustensil => ustensil.toLowerCase().includes(search)))]
  return [... new Set(recipesWithInput)]
}

// Recherche par ingredients
function getRecipesWithIngredient (recipes, search) {
  let recipesWithIngredient = []
  recipesWithIngredient = [... recipes.filter(
    recipe => recipe.ingredients.find(ingredient => ingredient.ingredient === search))]
  return [... new Set(recipesWithIngredient)]
}

// Recherche par Appareils
function getRecipesWithAppliance (recipes, search) {
  let recipesWithAppliance= []
  recipesWithAppliance = [... recipes.filter(
    recipe => recipe.appliance === search
  )]
  return [... new Set(recipesWithAppliance)]
}

// Recherche par Ustensils
function getRecipesWithUstensil (recipes, search) {
  let recipesWithUstensil = []
  recipesWithUstensil = [...recipes.filter(
    recipe => recipe.ustensils.find(ustensil => ustensil === search)
  )]
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
function displayCards (results) {
    const cardsCtn = document.querySelector('.cards')
    cardsCtn.innerHTML = ''
    results.forEach(result => {
      let recette = result
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
    })

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