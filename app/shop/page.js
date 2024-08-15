import styles from "./page.module.scss";
import Breadcrumbs from "@/components/UI/breadcrumbs";
import { getByField } from "@/lib/mongo";
import ProductsWithFilters from "@/components/shop-page/products-with-filters";

const ShopPage = async () => {
  let products = await getByField({});

  return (
    <div className={styles["shop-page"]}>
      <Breadcrumbs links={["Home"]} current="Shop" />
      <hr></hr>
      <ProductsWithFilters products={products} />
    </div>
  );
};

export default ShopPage;
