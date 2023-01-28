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

    renderList(list) {
        const htmlStrings = list.map(prod => productCardTemplate(prod));
        this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    }
    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();
        // render the list
       this.renderList(list);
      }
}