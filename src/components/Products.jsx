
import CreateProduct from "./create_product";
import ListProduct from "./list_product";

const Products = () => {
  return (
    <div className="bg-gray-100">
      <div className="py-28 px-4 sm:px-24 bg-[#f0f2f5]">
        <h2 className="text-[#344767] font-medium text-xl sm:text-2xl">
          Products
        </h2>
      </div>
      <CreateProduct />
      <ListProduct />
    </div>
  );
};

export default Products;
