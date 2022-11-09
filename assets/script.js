const generateJokeEl = document.querySelector("#generate-joke");
const generateRecipeEl = document.querySelector("#generate-recipe");
const getRandomImage = document.querySelector("#random-image");




function generateJoke() {

};

function generateRecipe() {

};

function getRandomImage() {
};


generateJokeEl.addEventListener('click', generateJoke());
generateRecipeEl.addEventListener('click', generateRecipe());

const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});