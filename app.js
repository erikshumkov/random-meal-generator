const container = document.querySelector(".container");
const generateBtn = container.querySelector("a");
const showMeal = document.getElementById("meal");

// Get data from themealdb api
const getRandomMeal = async () => {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

  const data = await response.json();

  return data;
}

const html = (instructions) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (instructions[`strIngredient${i}`]) {
      ingredients.push(`${instructions[`strMeasure${i}`]} - ${instructions[`strIngredient${i}`]}`);
    } else {
      break;
    }
  }

  return showMeal.innerHTML = `
  <div class="wrapper">
    <h4>${instructions.strMeal}</h4>
        <div class="grid">
          <div class="image">
            <img src="${instructions.strMealThumb}" alt="Image of a meal">
            <p class="category"><span class="bold">Category:</span> ${instructions.strCategory}</p>
            <p class="area"><span class="bold">Area:</span> ${instructions.strArea}</p>

            ${instructions.strTags !== null && instructions.strTags !== "" ? `<p class="tags"><span class="bold">Tags:</span> ${instructions.strTags.split(',').join(', ')}</p>` : ""}            
          </div >

          <div class="ingredients">
            <h5>Ingredients</h5>
            <ul>
              ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
            </ul>
          </div>
        </div >
        <div class="instructions">
          <h5>Method</h5>
          <p>
            ${instructions.strInstructions}
          </p>
      </div>
      </div >
  `;
}

// Event Listener
generateBtn.addEventListener("click", () => {
  container.classList.add("adjustheight");
  const str = `Get new meal <span class="arrow">&#8594;</span>`
  generateBtn.innerHTML = str;
  getRandomMeal()
    .then(res => {
      html(res.meals[0]);
    });
});