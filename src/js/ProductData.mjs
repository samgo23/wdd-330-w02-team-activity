const baseURL = 'https://wdd330-backend.onrender.com/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(products);
    return data.Result;
  }
}
