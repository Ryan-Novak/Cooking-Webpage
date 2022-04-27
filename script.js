// Start of searchbar code
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


FirebaseDatabase database = FirebaseDatabase.getInstance();
databaseUsers = database.getReference("Users");
String id = mAuth.getCurrentUser().getUid();
DatabaseReference username = databaseUsers.child(id).child("username");

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
  mealDetailsContent.parentElement.classList.remove('showRecipe')
})


/* Deal with this later
var introName = sessionStorage.getItem("introName");
document.getElementById("hello").innerText = introName;

https://stackoverflow.com/questions/60155498/how-to-retrieve-a-username-from-firebase-realtime-database

*/

// get meal list that matches with the ingredients
function getMealList(){
 // let selected = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selected}`)
  .then(response => response.json())
  .then(data => {
    let html = "";
    if(data.meals){
      data.meals.forEach(meal =>{
        html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
              <div class = "meal-img">
                <img src = "${meal.strMealThumb}" alt = "food">
              </div>
              <div class = "meal-name">
                <h3>${meal.strMeal}</h3>
                <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
            </div>
        `;
      });
      mealList.classList.remove('notFound');
    } else{
      html = `Sorry, we didn't find any recipes containing: ${selected}`;
      mealList.classList.add('notFound');
    }

    mealList.innerHTML = html;
  });
}

// end of searchbar code

// get recipe of the meal
function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals));
  }
}

// create a modal
function mealRecipeModal(meal){
  console.log(meal)
  meal = meal[0];
  let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" = "">
        </div>
        <div class = "recipe-link">
          <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}


// Ingredient button is clicked
const selected= [];
function clicked(button, food){
  food = food.replace("_"," ");
  if (selected.includes(food)){
    document.getElementById(button).style.backgroundColor = "white";
    for (let i in selected){
      if (selected[i] == food){
        selected.splice(i,1);
      }
    }
  }
  else{
    document.getElementById(button).style.backgroundColor = "#ff5f5f70";
    selected.push(food);
  }
  
}


function done(){
  document.getElementById("testTheList").innerHTML = selected;

  
}