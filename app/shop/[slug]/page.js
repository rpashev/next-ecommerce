import Breadcrumbs from "../../../components/UI/breadcrumbs";
import styles from "./page.module.scss";
import { getByField } from "../../../lib/mongo";
import ProductList from "../../../components/products/product-list";
import DetailsContent from "@/components/product-details/details-content";

const getPageData = async (params) => {
  const { slug } = params;
  const products = await getByField({ slug: slug });
  const product = products[0];

  const onSaleProducts = await getByField({ onSale: true });
  return {
    product,
    onSaleProducts: onSaleProducts,
    key: product.slug,
  };
};

const Details = async ({ params }) => {
  const response = await getPageData(params);
  const links = ["Home", "Shop"];

  return (
    <section className="container py-4 ">
      <div className={`${styles["product-page"]}`}>
        <Breadcrumbs links={links} current={response.product.name} />

        <hr></hr>
        <DetailsContent product={response.product} />
        <ProductList
          title="Currently on sale"
          products={response.onSaleProducts}
        />
      </div>
    </section>
  );
};

export async function generateStaticParams() {
  const products = await getByField({});

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default Details;
