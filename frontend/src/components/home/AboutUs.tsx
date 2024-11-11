import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <img
          src="/nosotros.jpg"
          alt="Sobre nosotros"
          className="h-auto  w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center max-h-auto bg-orange-600 py-12 px-8 lg:px-16">
        <h2 className="text-4xl text-white font-bold mb-6">Sobre nosotros</h2>
        <p className="text-white text-lg mb-6">
          Bienvenido a Guitar LA, tu destino en línea para todo lo relacionado
          con guitarras. Somos apasionados de la música y entendemos que cada
          guitarra cuenta una historia única. Nuestra misión es ofrecerte una
          cuidada selección de guitarras de alta calidad, accesorios y todo lo
          que necesitas para llevar tu pasión musical al siguiente nivel.
        </p>
        <Link to="/about_us">
          <button
            type="button"
            className="uppercase font-bold bg-transparent border border-white text-white px-4 py-2 hover:bg-white hover:text-orange-600 transition duration-300 rounded-xl"
          >
            Más información
          </button>
        </Link>
      </div>
    </div>
  );
}
