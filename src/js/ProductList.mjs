import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.NameWithoutBrand}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">${product.FinalPrice}</p></a>
  </li>`
}

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // Filter list of products to select the 4 tents needed:
    filterByTentsId(list) {
      //"344YJ" "880RR" "985PR" "989CG"
      const filteredList = list.filter(prod => prod.Id == "344YJ" || prod.Id == "880RR" 
      ||  prod.Id == "985PR" || prod.Id == "989CG");
      return filteredList
    }

    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);

        const filteredList = this.filterByTentsId(list);
        // render the list
       renderListWithTemplate(productCardTemplate, this.listElement, filteredList, "afterbegin");
      }

}