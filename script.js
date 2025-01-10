var recipeData = {
  1: {
    name: "Veggie Stir-fry with Rice",
    ingredients: [
      "bell peppers",
      "onions",
      "garlic",
      "carrots",
      "spinach",
      "soy sauce",
      "rice",
      "olive oil",
    ],
    steps: [
      "Cook rice and set aside.",
      "Sauté onions, garlic, carrots, and bell peppers in olive oil until softened.",
      "Add spinach and stir until wilted.",
      "Stir in cooked rice and soy sauce, mix well, and serve.",
    ],
    imageUrl: "images/VeggieStir-frywithRice.jpg",
  },
  2: {
    name: "Veggie Tacos",
    ingredients: [
      "bell peppers",
      "onions",
      "garlic",
      "tortillas",
      "tomatoes",
      "avocados",
      "canned beans",
    ],
    steps: [
      "Sauté onions, garlic, and bell peppers in olive oil.",
      "Warm tortillas and layer with sautéed veggies, chopped tomatoes, and beans.",
      "Top with sliced avocado and serve.",
    ],
    imageUrl: "images/veggietacos.jpg",
  },
  3: {
    name: "Cheesy Veggie Quesadillas",
    ingredients: ["tortillas", "cheese", "bell peppers", "onions", "spinach"],
    steps: [
      "Sauté bell peppers, onions, and spinach until softened.",
      "Place a tortilla in a pan, sprinkle cheese, and add the sautéed veggies.",
      "Top with another tortilla and cook until golden brown on both sides.",
      "Serve with salsa or sour cream.",
    ],
    imageUrl: "images/CheesyVeggieQuesadillas.jpg",
  },

  4: {
    name: "Chicken and Veggie Stir-fry",
    ingredients: [
      "chicken-breast",
      "bell peppers",
      "onions",
      "garlic",
      "carrots",
      "soy sauce",
      "olive oil",
    ],
    steps: [
      "Cut chicken breast into strips and sauté in olive oil until cooked.",
      "Add garlic, onions, bell peppers, and carrots, stir-fry until tender.",
      "Drizzle with soy sauce and serve over rice.",
    ],
    imageUrl: "images/ChickenVeggieStir-fry.jpg",
  },
  5: {
    name: "Egg Fried Rice",
    ingredients: [
      "rice",
      "eggs",
      "onions",
      "garlic",
      "bell peppers",
      "soy sauce",
      "olive oil",
    ],
    steps: [
      "Scramble eggs in a pan and set aside.",
      "Sauté onions, garlic, and bell peppers in olive oil.",
      "Add cooked rice, soy sauce, and scrambled eggs, stir-fry for 5 minutes.",
    ],
    imageUrl: "images/EggFriedRice.jpg",
  },
  6: {
    name: "Avocado and Bean Salad",
    ingredients: [
      "avocados",
      "canned beans",
      "tomatoes",
      "onions",
      "olive oil",
    ],
    steps: [
      "Drain and rinse the beans.",
      "Chop avocados, tomatoes, and onions.",
      "Combine all ingredients in a bowl, drizzle with olive oil, and toss.",
      "Serve chilled.",
    ],
    imageUrl: "images/AvocadoBeanSalad.webp",
  },
  7: {
    name: "Chicken Fajitas",
    ingredients: [
      "chicken breast",
      "bell peppers",
      "onions",
      "garlic",
      "tortillas",
      "olive oil",
    ],
    steps: [
      "Slice chicken breast, bell peppers, and onions.",
      "Sauté garlic and onions in olive oil until soft.",
      "Add chicken and bell peppers, cook until the chicken is done.",
      "Warm tortillas and fill with the chicken mixture. Serve with avocado slices.",
    ],
    imageUrl: "images/ChickenFajitas.jpg",
  },
};

function logSelectedIngredients(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get all checkboxes with the name "ingredient"
  var checkboxes = document.getElementsByName("ingredient");
  var selectedIngredients = [];

  // Loop through checkboxes and check their state
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedIngredients.push(checkboxes[i].value);
    }
  }

  // Log the selected items to the console
  console.log("Selected Ingredients:", selectedIngredients);
  displayMatchingRecipes(selectedIngredients);
}

function displayMatchingRecipes(selectedIngredients) {
  var recipeContainer = document.getElementsByClassName("recipes")[0];
  var recipeCards = document.getElementsByClassName("recipecards");
  var instructions = document.getElementsByClassName("instructions-content");
  instructions[0].style.display = "none";
  var backbutton = document.getElementsByClassName("recipe-back-button");
  backbutton[0].style.display = "block";
  var threshold = 0.8; // 80% match threshold
  var errorElement = document.getElementsByClassName("error")[0]; // Assuming one error element exists
  var form = document.getElementById("ingredients-form");

  var recipesFound = false;
  previouslyDisplayedCards = [];
  // Loop through the recipe cards and check for a match
  for (let i = 0; i < recipeCards.length; i++) {
    var card = recipeCards[i];
    var recipeIngredients = card.getAttribute("data-ingredients").split(",");
    var recipeName = card.getAttribute("data-name");
    console.log(recipeName, recipeIngredients, recipeIngredients.length);

    let matchCount = 0;

    // Compare selected ingredients with recipe ingredients
    for (let j = 0; j < selectedIngredients.length; j++) {
      if (recipeIngredients.includes(selectedIngredients[j].toLowerCase())) {
        matchCount++;
      }
    }
    var matchPercentage = matchCount / recipeIngredients.length;
    if (matchPercentage >= threshold) {
      recipesFound = true;
      card.style.display = "block"; // Show the recipe card
      previouslyDisplayedCards.push(card);
    } else {
      card.style.display = "none"; // Hide the recipe card
    }
  }

  if (!recipesFound) {
    if (errorElement) {
      errorElement.textContent = "No recipes match your selected ingredients.";
      errorElement.style.display = "block";
    }
  } else {
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  form.style.display = "none"; // Hide the form
  recipeContainer.style.display = "flex"; // Show the recipe container
}

function showRecipePage(recipeId) {
  var recipeContainer = document.getElementsByClassName("recipes")[0];
  var recipePage = document.getElementsByClassName("recipeDetail")[0];
  var recipe = recipeData[recipeId];
  var recipeTitle = document.getElementById("recipeTitle");
  var recipeIngredients = document.getElementById("recipeIngredients");
  var recipeSteps = document.getElementById("recipeSteps");
  var recipeImage = document.getElementById("recipeImage");
  var backbutton = document.getElementsByClassName("recipe-back-button");
  backbutton[0].style.display = "none";
  recipeContainer.style.display = "none";
  console.log(recipePage);
  recipePage.style.display = "flex";
  recipeTitle.textContent = recipe.name;
  recipeIngredients.innerHTML = ""; // Clear previous list items
  var ingredientList = recipe.ingredients;
  for (var k = 0; k < ingredientList.length; k++) {
    var li = document.createElement("li");
    li.textContent = ingredientList[k];
    recipeIngredients.appendChild(li);
  }
  recipeSteps.innerHTML = ""; // Clear previous list items
  var stepsList = recipe.steps;
  for (var j = 0; j < stepsList.length; j++) {
    var li = document.createElement("li");
    li.textContent = stepsList[j];
    recipeSteps.appendChild(li);
  }
  console.log(recipe.imageUrl);
  recipeImage.src = recipe.imageUrl;
  recipeImage.alt = "Picture of " + recipe.name;
}

function backToIngredients() {
  // Get the first element with the class "ingredients"
  var ingredientsPage = document.getElementsByName("ingredient")[0];
  // Get the first element with the class "recipe-detail"
  var recipePage = document.getElementsByClassName("recipeDetail")[0];
  var form = document.getElementById("ingredients-form");
  var recipeContainer = document.getElementsByClassName("recipes")[0];
  var instructions = document.getElementsByClassName("instructions-content");
  instructions[0].style.display = "block";
  var backbutton = document.getElementsByClassName("recipe-back-button");
  backbutton[0].style.display = "none";
  recipeContainer.style.display = "none";
  // Check if the ingredientsPage and recipePage exist
  if (ingredientsPage && recipePage) {
    // Hide the recipe page
    recipePage.style.display = "none";

    // Show the ingredients page
    ingredientsPage.style.display = "block";

    // Show the form
    form.style.display = "block";
  } else {
    console.error(
      "One or more elements are missing. Ensure 'ingredients' and 'recipe-detail' classes are present."
    );
  }
}
function backToRecipes() {
  // Get the recipe container (the recipe cards)
  var recipeContainer = document.getElementsByClassName("recipes")[0];
  var backbutton = document.getElementsByClassName("recipe-back-button");
  backbutton[0].style.display = "block";
  // Get the recipe details container
  var recipePages = document.getElementsByClassName("recipeDetail");

  // Hide the recipe details and show the recipe cards
  for (let i = 0; i < recipePages.length; i++) {
    recipePages[i].style.display = "none"; // Hide all recipe details
  }
  recipeContainer.style.display = "flex"; // Show the recipe cards
}
