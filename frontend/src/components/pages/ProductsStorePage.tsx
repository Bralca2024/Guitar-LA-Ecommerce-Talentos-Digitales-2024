import { Link } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import Pagination from "../../utilities/Pagination";

export default function ProductsStorePage() {
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
  const allProducts = useProductStore((state) => state.allProducts);
  const loading = useProductStore((state) => state.loading);

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Calcula los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcula el número total de páginas
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  return (
    <main>
      <section className="max-w-5xl mx-auto py-16">
        <h2 className="text-5xl text-center text-orange-600 font-bold mb-10">
          Nuestros productos
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12 lg:gap-6 md:px-4 place-items">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex mb-4 flex-col h-full hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={`${product.imageUrl}`}
                      alt={`Imagen de ${product.productName}`}
                      className="w-20 h-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between text-center">
                    <h3 className="text-xl font-bold mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.shortDescription}
                    </p>
                    <p className="text-orange-500 text-3xl font-bold mb-4">
                      $ {product.price}
                    </p>
                    <Link to={`/product/${product._id}`}>
                      <button
                        type="button"
                        className="w-full py-2 text-white font-bold uppercase bg-orange-700 rounded-lg hover:bg-opacity-90 transition duration-300"
                      >
                        Ver detalles
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Componente de Paginación */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </main>
  );
}
