import { useSelector } from "react-redux";
import CheckoutForm from "../../components/checkout-page/checkout-form";

const Checkout = (props) => {
  const cart = useSelector((state) => state.items);

  return (
    <div className={`container`}>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;
