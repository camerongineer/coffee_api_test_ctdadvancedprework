const coffeeApiUrl = 'https://api.sampleapis.com/coffee/';
const contentElement = document.getElementById('content');
const coffeeDrinks = {
    hot: [],
    iced: []
};

function loadCoffeeItems(url, type) {
    fetch(url + type)
        .then(response => response.json())
        .then(entry => {
            entry.forEach(value => {
                coffeeDrinks[type].push(new Coffee(value.id, value.title, value.description,
                    value.ingredients, value.image, type));
            });
        })
        .catch(error => {
            contentElement.innerHTML = '<p>Error occurred while fetching coffee drink!</p>';
            console.log(error);
        });
}

function loadAllCoffee() {
    loadCoffeeItems(coffeeApiUrl, 'hot');
    loadCoffeeItems(coffeeApiUrl, 'iced');
}

function createCoffeeDetails(coffee) {
    const container = document.createElement('div');
    container.classList.add('coffee-details');

    const titleRow = document.createElement('div');
    titleRow.setAttribute('class', 'row');
    const titleColumn = document.createElement('div');
    titleColumn.setAttribute('class', 'col');
    const title = document.createElement('h3');
    title.setAttribute('style', 'font-size: xxx-large; margin-top: 30px;');
    title.textContent = coffee.title;
    titleColumn.appendChild(title);
    titleRow.appendChild(titleColumn);
    container.appendChild(titleRow);

    const contentRow = document.createElement('div');
    contentRow.setAttribute('class', 'row justify-content-around');
    const imageColumn = document.createElement('div');
    imageColumn.setAttribute('class', 'col-7 d-flex align-items-center justify-content-center"');
    const image = document.createElement('img');
    image.src = coffee.image;
    image.alt = coffee.title;
    image.setAttribute('class', 'img-fluid m-auto rounded-5');
    imageColumn.appendChild(image);
    contentRow.appendChild(imageColumn)

    const descriptionColumn = document.createElement('div');
    descriptionColumn.setAttribute('class', 'col-5');
    const descriptionRow = document.createElement('div');
    descriptionRow.setAttribute('class', 'row');
    const description = document.createElement('p');
    description.textContent = coffee.description;

    descriptionRow.appendChild(description);
    descriptionColumn.appendChild(descriptionRow);

    const ingredientsRow = document.createElement('div');
    ingredientsRow.setAttribute('class', 'row justify-self-end');
    const ingredientsList = document.createElement('ul');
    const ingredientsLabel = document.createElement('legend');
    ingredientsLabel.textContent = 'Ingredients'
    ingredientsLabel.setAttribute('id', 'label-ingredients')
    ingredientsList.appendChild(ingredientsLabel)
    coffee.ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });

    ingredientsRow.appendChild(ingredientsList);
    descriptionColumn.appendChild(ingredientsRow);
    contentRow.appendChild(descriptionColumn);
    container.appendChild(contentRow);

    return container;
}



function Coffee(id, title, description, ingredients, image, type) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = Array.isArray(ingredients) ? ingredients : [ingredients];
    this.image = image;
    this.type = type;
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function displayCoffeeDetails(coffee) {
    const coffeeTable = createCoffeeDetails(coffee);
    contentElement.innerHTML = '';
    contentElement.appendChild(coffeeTable);
}

function loadRandomDrink(type) {
    const coffee = coffeeDrinks[type][randomNum(coffeeDrinks[type].length)];
    displayCoffeeDetails(coffee);
}
const loadRandomHotDrink = () => loadRandomDrink('hot');
const loadRandomIcedDrink = () => loadRandomDrink('iced');
document.addEventListener('DOMContentLoaded', () => {
    loadAllCoffee();
});