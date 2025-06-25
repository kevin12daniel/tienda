import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const Contactanos = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.correo || !formulario.mensaje) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Mensaje enviado:", formulario);
    setEnviado(true);
    setFormulario({ nombre: '', correo: '', mensaje: '' });

    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Contáctanos</h2>

        <p className="text-center text-gray-600 mb-10">
          ¿Tienes alguna pregunta o sugerencia? ¡Escríbenos!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
            <input
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
            <textarea
              name="mensaje"
              value={formulario.mensaje}
              onChange={handleChange}
              placeholder="¿Cómo podemos ayudarte?"
              rows={5}
              className="w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300"
          >
            <Send size={18} />
            Enviar mensaje
          </button>
        </form>

        {enviado && (
          <p className="mt-6 text-center text-green-600 font-medium">
            ¡Tu mensaje ha sido enviado correctamente!
          </p>
        )}

        <div className="mt-10 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Mail size={18} /> contacto@techstore.com
          </div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Phone size={18} /> +57 300 123 4567
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;
