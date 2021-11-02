import recipes from './recipes.js'

for (let i = 0; i < recipes.length; i ++) {
    console.log(recipes[i].name)
    for (let j = 0; j < recipes[i].ingredients.length; j++) {
        console.log(recipes[i].ingredients[j])
    }
}