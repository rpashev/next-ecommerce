import CartSummary from "../../components/cart-page/cart-summary";
import CheckoutForm from "../../components/checkout-page/checkout-form";
import CheckoutItem from "../../components/checkout-page/checkout-item";
import Button from "../../components/UI/button";
import { selectTotalPrice } from "../../store/cart-slice";
import styles from "./page.module.scss";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Checkout = async (props) => {
  const result = await verifyAuth();
  if (!result) {
    return redirect("/");
  }
  const cart = props.cart;

  const totalPrice = selectTotalPrice(cart);

  return (
    <div className={`container`}>
      <div className={styles.checkout}>
        <CheckoutForm />
        <div className={styles["cart-checkout"]}>
          <CartSummary subtotal={totalPrice} fromCheckout />
          <div>
            {cart?.map((item) => {
              return (
                <CheckoutItem
                  imgLink={item.imgLink}
                  price={item.price}
                  name={item.name}
                  quantity={item.quantity}
                  size={item.size}
                  key={item.slug + item.size}
                />
              );
            })}
            <Button dark small to="/cart">
              EDIT CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   } else {
//     const client = await connectToDatabase();
//     if (!client) {
//       return;
//     }
//     const db = client.db();
//     const user = await db
//       .collection("users")
//       .findOne({ email: session.user.email });
//     if (!user) {
//       throw new Error({ message: "No such user" });
//     }

//     return {
//       props: {
//         cart: user.cart,
//       },
//     };
//   }
// }
