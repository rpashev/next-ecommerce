import axios from "axios";

export const updateCart = async (slug, size = "M", quantity = 1) => {
  try {
    await axios.patch("/api/user/cart-item", {
      slug,
      size,
      updatedQuantity: quantity,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = async (slug, size, all = false) => {
  try {
    await axios.delete("/api/user/cart-item", {
      data: {
        slug,
        size,
        all,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (payload) => {
  try {
    await axios.post("/api/user/cart-item", payload)
  } catch (err) {
    console.log(err);
  }
};
