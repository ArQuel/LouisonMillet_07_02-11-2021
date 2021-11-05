import recipes from './recipes.js'

let ingredientsTab = []

for (let i = 0; i < recipes.length; i ++) {
  for (let j = 0; j < recipes[i].ingredients.length; j++) {
        ingredientsTab.push(recipes[i].ingredients[j].ingredient)        
  }
}

// filtrer le tableau en mettant en minuscule et retirer les doublons
let tmp = ingredientsTab.join('~').toLowerCase()
ingredientsTab = tmp.split('~')
let ingredientTabFiltered = []
ingredientTabFiltered = new Set(ingredientsTab)

console.log(ingredientTabFiltered)



