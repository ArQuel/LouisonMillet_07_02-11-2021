import recipes from './recipes.js'

let ingredientsTab = []
let ustensilsTab = []

// Aller chercher les ingrédients et les mettre dans un tableau
for (let i = 0; i < recipes.length; i ++) {
  for (let j = 0; j < recipes[i].ingredients.length; j++) {
        ingredientsTab.push(recipes[i].ingredients[j].ingredient)        
  }
}

// Aller chercher les ustensiles et les mettre dans un tableau
for (let i = 0; i < recipes.length; i ++) {
        if (recipes[i].ustensils.length > 1 ) {
          for (let j = 0; j < recipes[i].ustensils.length; j++) {
          let tmp = recipes[i].ustensils[j]
          ustensilsTab.push(recipes[i].ustensils[j])
        }
      } else {
        ustensilsTab.push(recipes[i].ustensils)
      }
}

// filtrer le tableau des ingrédients en mettant en minuscule et retirer les doublons
let tmpIngredients = ingredientsTab.join('~').toLowerCase()
ingredientsTab = tmpIngredients.split('~')
let ingredientTabFiltered = []
ingredientTabFiltered = new Set(ingredientsTab)

console.log(ingredientTabFiltered)

// filtrer le tableau des ustensils en mettant en minuscule et retirer les doublons
let tmpUstensils = ustensilsTab.join('~').toLowerCase()
ustensilsTab = tmpUstensils.split('~')
let ustensilsTabFiltered = []
ustensilsTabFiltered = new Set(ustensilsTab)

console.log(ustensilsTabFiltered)


// const bouton = document.querySelector('#bouton')
// const ListGroup = document.querySelector('.list-group')
// bouton.addEventListener('click', (e) => {
// for (let i = 0; i < recipes.length; i ++) {
//     console.log(recipes[i].name)
//     for (let j = 0; j < recipes[i].ingredients.length; j++) {
//           ListGroup.innerHTML += 
//           `<li class="list-group-item">${recipes[i].ingredients[j].ingredient}</li>`
//     }
// }
// })


// let buttonDD = document.getElementsByClassName('dropbtn')[0]

// buttonDD.addEventListener('click', function(){
//     document.getElementById("myDropdown").classList.toggle("show");
// })

// let buttonInput = document.getElementById('myInput')

// buttonInput.addEventListener('click', function(){
//     var input, filter, ul, li, a, i, div, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//       txtValue = a[i].textContent || a[i].innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
// })
