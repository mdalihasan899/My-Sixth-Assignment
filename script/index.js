const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories))
}

const loadPlants = (id) => {
  managelode(true);
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
  newCategorieBtns.forEach((newCategorieBtn) => newCategorieBtn.classList.remove("active"));

}

const plantDitels = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  fetch(url)
    .then((res) => res.json())
    .then((ditels) => aboutPlants(ditels.plants))
}

const managelode = (status) => {
  if (status == true) {
    document.getElementById("load-spin").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  }
  else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("load-spin").classList.add("hidden");
  }
}


const aboutPlants = (plants) => {

  const plantsDitelsBox = document.getElementById("details-container");
  plantsDitelsBox.innerHTML = `
        <div>
          <h2 class="font-semibold text-2xl">${plants.name}</h2>
        </div>
        <div>
          <img class="py-2" width='250' src="${plants.image}" alt="">
        </div>
        <h1><span class="font-semibold text-base">Category: </span>${plants.category}</h1>
        <h1 class="py-2"><span class="font-semibold text-base">price: </span>${plants.price}</h1>
        <p class="pb-8"><span class="font-semibold text-base">Description: </span>${plants.description}</p>
        `;
  document.getElementById("plants_modal").showModal();
}



const displayDifPlants = (DifPlants) => {
  
  const plantsContainer = document.getElementById("card-container");
  plantsContainer.innerHTML = "";
  DifPlants.forEach(DifPlant => {
    const plantsByCategoris = document.createElement("div");
    plantsByCategoris.innerHTML = `
    <div class="max-w-sm bg-white rounded-lg shadow p-4 items-center">
            <img class="w-full h-40 object-cover rounded-md mb-4" src="${DifPlant.image}" alt="">
            <button onclick="plantDitels(${DifPlant.id})" class="font-semibold text-gray-800">${DifPlant.name}</button>
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
              class="cart-btn w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition">
              Add to Cart
            </button>
          </div>
    `

    plantsContainer.appendChild(plantsByCategoris);
    
    const yourCartBtn = plantsByCategoris.querySelector(".cart-btn");
    yourCartBtn.addEventListener("click", function () {
      const treeName = DifPlant.name;
      const treePrice = DifPlant.price;

      const yourCart = document.getElementById("cart_container");
      const yourCartCard = document.createElement("div");
      yourCartCard.innerHTML = `
        <div class="cart-card flex justify-between items-center mx-4 px-3 py-2 mt-2 rounded-lg bg-[#F0FDF4]">
          <div>
            <h1>${treeName}</h1>
            <p>৳${treePrice}</p>
          </div>
          <div>
            <button class="x-btn btn btn-square bg-transparent border-none hover:shadow-none justify-end">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      `;

      alert(`"${treeName}" has been added to the cart`);
      const totalPriceElement = document.getElementById("total-peice");
      const currentTotal = Number(totalPriceElement.innerText);
      const newTotal = currentTotal + Number(treePrice);
      totalPriceElement.innerText = newTotal;
      yourCart.append(yourCartCard);

      const cancelBtn = yourCartCard.querySelector(".x-btn");
      cancelBtn.addEventListener("click", function () {
        yourCartCard.remove();
        const addNewTotal = Number(totalPriceElement.innerText) - treePrice;
        totalPriceElement.innerText = addNewTotal;

      });
    });
  })
  managelode(false);
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
  managelode(true);
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
            <button onclick="plantDitels(${Tree.id})" class="font-semibold text-gray-800">${Tree.name}</button>
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
              class="cart-btn w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-full font-medium transition">
              Add to Cart
            </button>
          </div>
        
        `
    TreeContainer.appendChild(TreeCard);

    const yourCartBtn = TreeCard.querySelector(".cart-btn");
    yourCartBtn.addEventListener("click", function () {
      const treeName = Tree.name;
      const treePrice = Tree.price;

      const yourCart = document.getElementById("cart_container");
      const yourCartCard = document.createElement("div");
      yourCartCard.innerHTML = `
        <div class="cart-card flex justify-between items-center mx-4 px-3 py-2 mt-2 rounded-lg bg-[#F0FDF4]">
          <div>
            <h1>${treeName}</h1>
            <p>৳${treePrice}</p>
          </div>
          <div>
            <button class="x-btn btn btn-square bg-transparent border-none hover:shadow-none justify-end">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      `;

      alert(`"${treeName}" has been added to the cart`);
      const totalPriceElement = document.getElementById("total-peice");
      const currentTotal = Number(totalPriceElement.innerText);
      const newTotal = currentTotal + treePrice;
      totalPriceElement.innerText = newTotal;

      yourCart.append(yourCartCard);

      const cancelBtn = yourCartCard.querySelector(".x-btn");
      cancelBtn.addEventListener("click", function () {
        yourCartCard.remove();
        const addNewTotal = Number(totalPriceElement.innerText) - treePrice;
        totalPriceElement.innerText = addNewTotal;

      })


    });
  }
   managelode(false);
}
loadAllTrees();
