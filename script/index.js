const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}


const loadPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const categorieButton = document.getElementById(`category-btn-${id}`);
      categorieButton.classList.add("active");
      displayDifPlants(data.plants)
    })
}

const removeActive = () => {
  const newCategorieBtns = document.querySelectorAll(".category-btn");
  newCategorieBtns.forEach((newCategorieBtn)=>newCategorieBtn.classList.remove("active")); 

}

const displayDifPlants = (DifPlants) => {
  const plantsContainer = document.getElementById("card-container");
  plantsContainer.innerHTML = "";
  DifPlants.forEach(DifPlant => {
    const plantsByCategoris = document.createElement("div");
    plantsByCategoris.innerHTML = `
    <div class="max-w-sm bg-white rounded-lg shadow p-4 items-center">
            <img class="w-full h-40 object-cover rounded-md mb-4" src="${DifPlant.image}" alt="">
            <h3 class="font-semibold text-gray-800">${DifPlant.name}</h3>
            <p class="text-sm text-gray-600 mt-1 line-clamp-3">
              ${DifPlant.description}
            </p>
            <div class="flex items-center justify-between mt-3">
              <span class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                ${DifPlant.category}
              </span>
              <span class="font-semibold text-gray-800">৳${DifPlant.price}</span>
            </div>
            <button
              class="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition">
              Add to Cart
            </button>
          </div>
    `

    plantsContainer.appendChild(plantsByCategoris);
  });
}



// categories
const displayCategories = (categories) => {
  const categoriesConteiner = document.getElementById("cetagory-container");
  for (const categorie of categories) {
    const categorieBtn = document.createElement("div");
    categorieBtn.innerHTML = `
        <button id="category-btn-${categorie.id}" onclick="loadPlants(${categorie.id})" href=""
            class="hover:bg-[#15803D] hover:scale-105 hover:text-white w-full text-start py-2 pl-[10px] rounded-[4px] mt-1 category-btn">${categorie.category_name}</button>
        `   
    categoriesConteiner.appendChild(categorieBtn);
  }

};
loadCategories();


// All Trees
const loadAllTrees = () => {
  fetch(`https://openapi.programming-hero.com/api/plants`)
    .then((res) => res.json())
    .then((json) => displayAllTrees(json.plants))
}

const displayAllTrees = (Trees) => {
  const TreeContainer = document.getElementById("card-container");
  TreeContainer.innerHTML = "";
  for (const Tree of Trees) {
    const TreeCard = document.createElement("div");
    TreeCard.innerHTML = `
        <div class="max-w-sm bg-white rounded-lg shadow p-4 h-full items-center">
            <img class="w-full h-40 object-cover rounded-md mb-4" src="${Tree.image}" alt="">
            <h3 class="font-semibold text-gray-800">${Tree.name}</h3>
            <p class="text-sm text-gray-600 mt-1 line-clamp-3">
              ${Tree.description}
            </p>
            <div class="flex items-center justify-between mt-3">
              <span class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                ${Tree.category}
              </span>
              <span class="font-semibold text-gray-800">৳${Tree.price}</span>
            </div>
            <button
              class="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition">
              Add to Cart
            </button>
          </div>
        
        `

    TreeContainer.appendChild(TreeCard);
  }
}
loadAllTrees();



