import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BlogsPage() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);

  // Cargar los blogs
  useEffect(() => {
    if (!id) {
      // Si no hay ID, cargamos todos los blogs
      axios
        .get("http://localhost:3000/api/blogs")
        .then((response) => {
          setBlogs(response.data);
          // Abrimos el primer acordeón por defecto
          setOpenIndex(0); // Establecer el índice del primer acordeón como abierto
        })
        .catch((error) => {
          console.error("Error al cargar los blogs:", error);
        });
    } else {
      // Si hay un ID, buscamos un blog específico (para el caso de editar)
      axios
        .get(`http://localhost:3000/api/blogs/${id}`)
        .then((response) => {
          console.log(response.data);
          // Aquí podrías manejar el blog para editarlo o mostrar más información
        })
        .catch((error) => {
          console.error("Error al obtener el blog:", error);
        });
    }
  }, [id]);

  // Estado para manejar qué acordeón está abierto
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Si el acordeón está abierto, lo cierra, si está cerrado lo abre
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Mostrar lista de blogs */}
      <div>
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Todos los Blogs</h1>
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <div key={blog._id} className="bg-white border-2 border-orange-600 rounded-lg shadow-md">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-4 bg-orange-600 text-white font-semibold text-lg rounded-t-lg focus:outline-none"
              >
                {blog.title}
              </button>
              <div
                className={`${
                  openIndex === index ? "block" : "hidden"
                } p-4 bg-gray-100 rounded-b-lg transition-all duration-300`}
              >
                <p className="text-gray-600 mb-4">{blog.content}</p>
                {blog.author && <p className="text-gray-500"><strong>Autor:</strong> {blog.author}</p>}
                {blog.date && (
                  <p className="text-gray-500">
                    <strong>Fecha:</strong> {new Date(blog.date).toLocaleDateString()}
                  </p>
                )}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="mt-4 w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
