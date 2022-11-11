const generateJokeEl = document.querySelector("#generate-joke");
const saveJoke = document.getElementById("save-joke")
const generateRecipeEl = document.querySelector("#generate-recipe");
const getRandomImage = document.querySelector("#random-image");
const drinkName = document.querySelector('#drinkName');
const ingredientList = document.querySelector('#ingredientsList');
const savedJokesA = document.getElementById("saved-jokes")

//function to generate random jokes
function generateJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then((response) => response.json())
    .then(function(data){
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
generateJokeEl.addEventListener('click', function(){
    generateJoke()
});

saveJoke.addEventListener("click", function(){
    //create init data for all jokes storage
    if (localStorage.getItem("init-data-jokes") != "true"){
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
    if (initData = "true"){
        //add jokes to saved jokes and local storage
        allJokes = JSON.parse(localStorage.getItem("allJokes"));
        allJokes.push(JSON.parse(localStorage.getItem("joke")));
        localStorage.setItem('allJokes', JSON.stringify(allJokes));
        removeAllChildNodes(savedJokesA)
        let generatedJoke = document.getElementById("joke1")
        generatedJoke.innerHTML = '';
        listSavedJokes()
}})

//display saved jokees

function listSavedJokes(){
    var allJokes = JSON.parse(localStorage.getItem("allJokes"))
    console.log (allJokes)
    allJokesLength = allJokes.length
    for(let i = 0; i < allJokesLength; i++){
        var savedJoke = document.createElement("p");
        savedJoke.classList.add("panel-block", "saved-joke");
        savedJoke.setAttribute("data-index", i);
        savedJoke.addEventListener("click", function(event){
                if(event.target.nodeName === 'BUTTON'){
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
