import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.NameWithoutBrand}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}

export default class ProductList{
  constructor(category = "tents", dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
      this.sortBy = "name"; // initialize the default sorting order
  }

  async init() {
    // Fill the title with the category name:
    document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    // Our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // Sort the list based on the default sorting order
    this.sortList(list);
    // Render the sorted list
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin");

    // Add a toggle button for sorting by name or price
    const sortToggle = document.createElement("button");
    sortToggle.textContent = "Sort by Price";
    sortToggle.addEventListener("click", async () => {
        if (this.sortBy === "price") {
            this.sortBy = "name";
            sortToggle.textContent = "Sort by Name";
        } else {
            this.sortBy = "price";
            sortToggle.textContent = "Sort by Price";
        }
        // Clear the rendered product list
        this.listElement.innerHTML = "";
        // Fetch the latest product list from the data source
        const updatedList = await this.dataSource.getData(this.category);
        // Sort the updated list based on the updated sorting order
        this.sortList(updatedList);
        // Re-render the sorted list
        renderListWithTemplate(productCardTemplate, this.listElement, updatedList, "afterbegin");
    });
    this.listElement.before(sortToggle);
}

  sortList(list) {
      if (this.sortBy === "name") {
          list.sort((a, b) => a.Name.localeCompare(b.Name));
      } else {
          list.sort((a, b) => a.FinalPrice - b.FinalPrice);
      }
  }
}
