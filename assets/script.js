const generateJokeEl = document.querySelector("#generate-joke");
const generateRecipeEl = document.querySelector("#generate-recipe");
const getRandomImage = document.querySelector("#random-image");
const drinkName = document.querySelector('#drinkName');
const ingredientList = document.querySelector('#ingredientsList');


function generateJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then((response) => response.json())
    .then(function(data){
        let generatedJoke = document.getElementById("joke1")
        console.log(data)
        setup = (data.setup)
        punchline = (data.punchline)
        generatedJoke.innerHTML = setup + "<br></br>" + punchline
        singleJoke = {setup, punchline}
        localStorage.setItem("joke", JSON.stringify(singleJoke))
  })
  .catch(error => console.log(error))
};



generateJokeEl.addEventListener('submit', function(){
    generateJoke();
});



// generate random drink and recipe 


const drinkButtonVariable = document.getElementById('drinkButton');
function generateRecipe() {
    const select = document.getElementById('drink');
    let liquor = select.options[select.selectedIndex].value;
    console.log(liquor);
    let randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=` + liquor;
    console.log(randomUrl);

    fetch(randomUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            const drinkNumber = data.drinks[0].idDrink;
            console.log(drinkNumber);

            // creates an array out of the object 
            const drinkarr = Object.entries(data.drinks[0]);
            console.log(drinkarr);

            // loops through the array to find ingredients used
            for (let i = 0; i < drinkarr.length; i++) {
                const key = drinkarr[i][0];
                const value = drinkarr[i][1];

                if (key.toLowerCase().includes('ingredient') && value) {
                    console.log(key, value);
                    const recipe = value;
                    console.log(recipe);
                    drinkName.textContent = data.drinks[0].strDrink;

                    const listEl = document.createElement('p');
                    listEl.textContent = recipe;
                    ingredientList.append(listEl);
                    
                };

            };
        });
}


// function getRandomImage() {
// };


// generateJokeEl.addEventListener('click', generateJoke());
generateRecipeEl.addEventListener('click', function() {
    generateRecipe();
});