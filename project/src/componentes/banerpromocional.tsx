import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PromotionalBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const isProductsPage = location.pathname === '/productos';

  const bannerImages = [
    'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
    'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  // Efecto para el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-96 overflow-hidden w-full group">
      <div className="relative w-full h-full">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`Promoción ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Personaliza tus productos</h2>
                <p className="text-xl mb-6">De tu sueño a la realidad</p>
                {!isProductsPage && (
                  <Link to="productos" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors">
                    Explorar Productos
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierdo */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-50"
        aria-label="Anterior"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Botón derecho */}
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-50"
        aria-label="Siguiente"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotionalBanner;