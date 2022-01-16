import axios from "axios";

export const updateCart = async (slug, size = "M", quantity = 1) => {
  await axios.patch("/api/user/add-item", {
    slug,
    size,
    updatedQuantity: quantity,
  });
};
