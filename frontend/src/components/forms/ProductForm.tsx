import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductType } from "../../types/type";
import { useProductStore } from "../../store/productStore";

const initialState = {
  productName: "",
  description: "",
  shortDescription: "",
  price: 0,
  isAvailable: true,
  stock: 50,
  imageUrl: null,
};

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm<ProductType>();
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const onRefresh = useProductStore((state) => state.fetchAllProducts);
  const { setIsModalOpen, isEditMode } = useProductStore();

  useEffect(() => {
    if (isEditMode && selectedProduct) {
      reset(selectedProduct);
    } else {
      reset(initialState);
    }
  }, [selectedProduct, reset, isEditMode]);

  // Función asíncrona que maneja el envío de datos de un producto
  const onSubmit = async (data: ProductType) => {
    const formData = new FormData(); // Crea un nuevo objeto FormData para enviar datos

    // Agrega los datos del producto al FormData
    formData.append("_id", data._id);
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("isAvailable", data.isAvailable.toString());

    // Si existe una imagen, la agrega al FormData
    const imageFile = data.imageUrl && data.imageUrl[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Llama a la función de actualización o creación según el modo de edición
    if (isEditMode) {
      await updateProduct(formData); // Actualiza el producto existente
    } else {
      await createProduct(formData); // Crea un nuevo producto
    }

    await onRefresh(); // Refresca la lista de productos
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            id="productName"
            {...register("productName", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Breve descripción
          </label>
          <textarea
            id="shortDescription"
            {...register("shortDescription", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            id="stock"
            type="number"
            {...register("stock", { required: true })}
            defaultValue={50}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageFile"
            className="block text-sm font-medium text-gray-700"
          >
            Imagen del producto
          </label>
          <input
            id="imageUrl"
            type="file"
            {...register("imageUrl")}
            accept=".jpg,.jpeg,.png"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isAvailable" className="flex items-center">
            <input
              id="isAvailable"
              type="checkbox"
              {...register("isAvailable")}
              defaultChecked={true}
              className="mr-2"
            />
            Disponible
          </label>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="mr-2 bg-gray-400 text-white py-2 px-4 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`${
              isEditMode ? "bg-green-600" : "bg-orange-600"
            } text-white py-2 px-4 rounded-md`}
          >
            {isEditMode ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
