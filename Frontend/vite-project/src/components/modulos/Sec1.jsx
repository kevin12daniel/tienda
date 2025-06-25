// src/components/Bienvenida.jsx
import React from 'react';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

const Bienvenida = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold">
                <Typewriter 
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Bienvenido a <br/><span style="color: #00a99d;">TechStore</span>')
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString('Todo lo que imaginas en<br/><span style="color: #00a99d;">tecnología,</span><br/>lo encuentras aquí.')
                      .start();
                  }}
                />
        </h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Explora lo último en tecnología y gestiona fácilmente tus productos en un solo lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg transition duration-300 cursor-pointer">
                Comprar ahora
            </button>
            </Link>
            <Link to="/productos">
          <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow-lg transition duration-300 cursor-pointer" >
            Administrar productos
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;
