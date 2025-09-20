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
    <section className="relative h-screen overflow-hidden w-full group">
      {/* Background decorativo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue/20 to-pink/20"></div>
      
      {/* Elementos decorativos flotantes */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-yellow/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-16 w-32 h-32 bg-pink/20 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue/40 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative w-full h-full">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={image} 
              alt={`Promoción ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
            
            {/* Contenido principal modernizado */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
              <div className="text-center lg:text-left text-white max-w-4xl mx-auto lg:ml-16 px-6">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-yellow/90 text-primary rounded-full text-sm font-bold mb-4 transform hover:scale-105 transition-transform">
                    YURY IMPRESIONES
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-yellow to-pink bg-clip-text text-transparent">
                    Personaliza
                  </span>
                  <span className="block text-white">
                    tus productos
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
                  Transforma tus ideas en realidad con nuestros productos personalizables de alta calidad
                </p>
                
                {!isProductsPage && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link 
                      to="products" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue to-blue/80 hover:from-blue/90 hover:to-blue text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <span className="relative z-10">Explorar Productos</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-yellow/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link 
                      to="products" 
                      className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
                    >
                      Ver Catálogo
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación modernizados */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 flex items-center justify-center"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 flex items-center justify-center"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores modernizados */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Efecto de scroll suave */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;