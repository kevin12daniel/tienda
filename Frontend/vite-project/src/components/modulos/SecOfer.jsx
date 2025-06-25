import React from "react";
import { Gift, Heart, GraduationCap, MonitorSmartphone, ShoppingBag } from "lucide-react";

const OFERTAS_TEMPORALES = [
  {
    titulo: "Amor y Amistad",
    descripcion: "Celebra con descuentos especiales en tecnología para regalar.",
    icono: <Heart size={32} className="text-pink-500" />,
    activa: false,
  },
  {
    titulo: "Navidad",
    descripcion: "Las mejores ofertas navideñas en dispositivos y accesorios.",
    icono: <Gift size={32} className="text-red-500" />,
    activa: false,
  },
  {
    titulo: "Regreso a Clases",
    descripcion: "Todo lo que necesitas para comenzar con pie derecho.",
    icono: <GraduationCap size={32} className="text-yellow-500" />,
    activa: false,
  },
  {
    titulo: "Semana Tech",
    descripcion: "Ofertas exclusivas en productos seleccionados.",
    icono: <MonitorSmartphone size={32} className="text-blue-500" />,
    activa: false,
  },
  {
    titulo: "Black Friday",
    descripcion: "Precios locos solo por tiempo limitado.",
    icono: <ShoppingBag size={32} className="text-black" />,
    activa: false,
  },
];

const Ofertas = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Ofertas Especiales</h2>
        <p className="text-white mb-12">
          Actualmente no hay ofertas activas, pero estas temporadas vienen con grandes sorpresas. ¡Mantente atento!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {OFERTAS_TEMPORALES.map((oferta, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-2 shadow-md text-left transition duration-300   ${
                oferta.activa
                  ? "border-green-500 bg-white hover:shadow-xl"
                  : "border-white bg-white opacity-80"
              }`}
            >
              <div className="mb-4">{oferta.icono}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{oferta.titulo}</h3>
              <p className="text-black text-sm">{oferta.descripcion}</p>
              {!oferta.activa && (
                <p className="mt-4 text-sm font-medium text-gray-500 italic">Próximamente</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ofertas;
