import { useEffect, useState } from "react";
import { useProductStore } from "../../store/productStore";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import LoadingSpinner from "../LoadingSpinner";

export default function ProductIDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const getOneProduct = useProductStore((state) => state.getOneProduct);
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct
  );
  const loading = useProductStore((state) => state.loading);
  const {addToCart} = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      setSelectedProduct(null);
      getOneProduct(id);
    }
  }, [getOneProduct, id]);

  const handleAddToCart = () => {
    if(!selectedProduct) return;
    const cartItem ={
      ...selectedProduct,
      quantity
    }
    addToCart(cartItem);
    alert(`${selectedProduct.productName} añadido al carrito`);
    }

  return (
    <>
      <div className="min-h-screen">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-4xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-16 rounded-xl">
              {/* Image */}
              <div className="flex items-center justify-center bg-white">
                <img
                  src={`${selectedProduct?.imageUrl}`}
                  alt={`${selectedProduct?.productName}`}
                  className="w-52"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center bg-white px-8">
                <h2 className="text-4xl text-start text-orange-600 font-bold mb-2">
                  {selectedProduct?.productName}
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  {selectedProduct?.shortDescription}
                </p>
                <p className="mb-8">{selectedProduct?.description}</p>
                <div className="flex justify-evenly gap-8">
                  <select
                    name="quantity"
                    id="quantity"
                    className="border border-slate-200 p-2 mb-6 flex-1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    <option value=""> -- </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <p className="text-2xl text-orange-600 font-bold">
                    $ {selectedProduct?.price}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-white uppercase font-bold bg-orange-600 py-2 rounded-xl"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
