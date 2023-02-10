import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const category = getParam('category');

const dataSource = new ProductData();
const productId = getParam("product");
const productDetails = new ProductDetails(category, productId, dataSource);
productDetails.init();
