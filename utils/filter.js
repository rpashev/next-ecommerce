export const filterProducts = (
  category = "ALL",
  searchQuery = "",
  brand = "All brands",
  priceRange = 200,
  products
) => {
  if (
    category === "ALL" &&
    brand === "All brands" &&
    searchQuery === "" &&
    priceRange === 200
  ) {
    return products;
  }
  const updatedProducts = products.filter((p) => {
    if (
      (p.category === category || category === "ALL") &&
      (p.brand === brand || brand === "All brands") &&
      p.price <= priceRange &&
      (searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return p;
    }
  });
  return updatedProducts;
};
