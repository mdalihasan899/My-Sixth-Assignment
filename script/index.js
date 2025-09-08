const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories))
}

// categories
const displayCategories = (categories) => {
    const categoriesConteiner = document.getElementById("cetagory-container");
    for (const categorie of categories) {
        const categorieBtn = document.createElement("div");
        categorieBtn.innerHTML = `
        <button href=""
            class="hover:bg-[#15803D] hover:scale-105 hover:text-white w-full text-start py-2 pl-[10px] rounded-[4px]">${categorie.category_name}</button>
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

const displayAllTrees = (plants) => {
    const plantContainer = document.getElementById("card-container");
    plantContainer.innerHTML = "";
    for (const plant of plants) {
        console.log(plant);

        const plantCard = document.createElement("div");
        plantCard.innerHTML = `
        <div class="max-w-sm bg-white rounded-lg shadow p-4 h-full items-center">
            <img class="w-full h-40 rounded-md mb-4" src="${plant.image}" alt="">
            <h3 class="font-semibold text-gray-800">${plant.name}</h3>
            <p class="text-sm text-gray-600 mt-1 line-clamp-3">
              ${plant.description}
            </p>
            <div class="flex items-center justify-between mt-3">
              <span class="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                ${plant.category}
              </span>
              <span class="font-semibold text-gray-800">৳${plant.price}</span>
            </div>
            <button
              class="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition">
              Add to Cart
            </button>
          </div>
        
        `

        plantContainer.appendChild(plantCard);
    }
}
loadAllTrees();



