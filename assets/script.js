const generateJokeEl = document.querySelector("#generate-joke");
const saveJoke = document.getElementById("save-joke")
const generateRecipeEl = document.querySelector("#generate-recipe");
const getRandomImage = document.querySelector("#random-image");
const drinkName = document.querySelector('#drinkName');
const ingredientList = document.querySelector('#ingredientsList');
const savedJokesA = document.getElementById("saved-jokes");
const saveButton = document.querySelector('#save-recipe');
const savedDrinkName = document.getElementById('savedDrinkName');
const savedIngredientList = document.getElementById('savedIngredientList');


//function to generate random jokes
function generateJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then((response) => response.json())
        .then(function (data) {
            let generatedJoke = document.getElementById("joke1")
            console.log(data)
            setup = (data.setup)
            punchline = (data.punchline)
            generatedJoke.innerHTML = setup + "<br></br>" + punchline
            localStorage.setItem("joke", JSON.stringify(generatedJoke.innerHTML))
        })
        .catch(error => console.log(error))
};

//generate joke event listner
generateJokeEl.addEventListener('click', function () {
    generateJoke()
});

saveJoke.addEventListener("click", function () {
    //create init data for all jokes storage
    if (localStorage.getItem("init-data-jokes") != "true") {
        localStorage.setItem("init-data-jokes", "true")
        //add jokes to saved jokes and local storage
        var allJokes = []
        allJokes.push(JSON.parse(localStorage.getItem("joke")));
        localStorage.setItem('allJokes', JSON.stringify(allJokes));
        removeAllChildNodes(savedJokesA)
        listSavedJokes()
        return;
    }
    var initData = localStorage.getItem("init-data-jokes")
    if (initData = "true") {
        //add jokes to saved jokes and local storage
        allJokes = JSON.parse(localStorage.getItem("allJokes"));
        allJokes.push(JSON.parse(localStorage.getItem("joke")));
        localStorage.setItem('allJokes', JSON.stringify(allJokes));
        removeAllChildNodes(savedJokesA)
        let generatedJoke = document.getElementById("joke1")
        generatedJoke.innerHTML = '';
        listSavedJokes()
    }
})

//display saved jokees

function listSavedJokes() {
    var allJokes = JSON.parse(localStorage.getItem("allJokes"))
    console.log(allJokes)
    allJokesLength = allJokes.length
    for (let i = 0; i < allJokesLength; i++) {
        var savedJoke = document.createElement("p");
        savedJoke.classList.add("panel-block", "saved-joke");
        savedJoke.setAttribute("data-index", i);
        savedJoke.addEventListener("click", function (event) {
            if (event.target.nodeName === 'BUTTON') {
                let eTarget = event.currentTarget
                var index = eTarget.getAttribute("data-index");
                allJokes.splice(index, 1);
                localStorage.setItem('allJokes', JSON.stringify(allJokes))
                removeAllChildNodes(savedJokesA)
                listSavedJokes()
            }
        })
        savedJoke.innerHTML = allJokes[i] + '<button class="button is-medium has-text-danger"><i class="fas fa-trash-alt"></i></button>'
        savedJokesA.appendChild(savedJoke)
    };
}
listSavedJokes()

//remove all child nodes function
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// generate random drink and recipe

function generateJoke() {

};


const drinkHistory = JSON.parse(localStorage.getItem("drinkHistory")) || [];

const drinkButtonVariable = document.getElementById('drinkButton');
function generateRecipe() {
    const randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;

    // getting the data from the Url
    fetch(randomUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            const newDrink = {
                name: data.drinks[0].strDrink,
                ingredients: [],
            };

            // creates an array out of the object
            const drinkarr = Object.entries(data.drinks[0]);

            // loops through the array to find ingredients used
            // savedDrink array to push ingredients into
            const oldRecipes = document.querySelectorAll('.recipe-item');

            for (let i = 0; i < oldRecipes.length; i++) {
                oldRecipes[i].remove();
            }
            drinkName.textContent = data.drinks[0].strDrink;
            for (let i = 0; i < drinkarr.length; i++) {
                const key = drinkarr[i][0];
                const value = drinkarr[i][1];



                // finds the ingriendients in the array by selecting key values that have "ingredient"       
                if (key.toLowerCase().includes('ingredient') && value) {
                    const listEl = document.createElement('li');
                    newDrink.ingredients.push(value);
                    listEl.classList.add("recipe-item")
                    listEl.textContent = value;
                    ingredientList.append(listEl);
                };
            }

            drinkHistory.unshift(newDrink);
            localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));

        });
}

function renderSavedDrink() {

    savedIngredientList.innerHTML = "";

    // append each drink item to the saved recipe list
    for (let i = 0; i < drinkHistory.length; i++) {
        const saved = drinkHistory[i];

        const p = document.createElement("p");
        p.setAttribute("data-index", i);
        p.textContent = (saved.name + " --- " + saved.ingredients);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";

        p.append(" ", deleteButton);
        savedIngredientList.append(p);


        // delete each item from list
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            const element = event.target;
            if (element.matches("button") === true) {
                const index = element.parentElement.getAttribute("data-index");
                drinkHistory.splice(index, 1);
                localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));

                renderSavedDrink();
            }

        });
    }

}

saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    renderSavedDrink();
});

generateRecipeEl.addEventListener('click', generateRecipe);

