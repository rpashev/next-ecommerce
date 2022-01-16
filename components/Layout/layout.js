import { useSession } from "next-auth/client";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Footer from "./footer";
import Header from "./header";

const Layout = (props) => {
  const [session, loading] = useSession();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.items);

  useEffect(() => {
    if (session && !loading) {
      console.log("here")
      // console.log(session);
      if (!cart || cart.length === 0) {
        dispatch(cartActions.setCart({ items: session.user.cart }));
      }
    }
  }, [session?.user?.email]);

  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
