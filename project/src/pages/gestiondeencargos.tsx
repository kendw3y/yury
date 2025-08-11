import React, { useState } from 'react';
import {
  ShoppingBag, Filter, X, CheckCircle, Clock, Search, Plus, Play, Trash2, Edit
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
};

type Order = {
  id: string;
  customer: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: {
    product: Product;
    quantity: number;
  }[];
  total: string;
};

const OrderManagement = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTestOrders, setShowTestOrders] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedOrderIds(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const products: Product[] = [
    { id: 1, name: 'Bolsa Non-Woven JAZZIN', price: 'Consultar', category: 'bolsas-mochilas', image: '/bolsa-jazzin.png', description: 'Bolsa Non-Woven JAZZIN' },
    { id: 2, name: 'BOLSA-PROSUM1', price: 'Consultar', category: 'bolsas-mochilas', image: '/bolsa-prosum1.png', description: 'Bolsa PROSUM1' },
    { id: 3, name: 'Mochila Sublimación Lizcom', price: 'Consultar', category: 'bolsas-mochilas', image: '/mochila-lizcom.png', description: 'Mochila para sublimación Lizcom' },
    { id: 4, name: 'Polo Tecnic Plus - 100% Poliéster', price: 'Consultar', category: 'ropa-textiles', image: '/polo-tecnic-plus.png', description: 'Polo Tecnic Plus 100% poliéster' },
    { id: 5, name: 'Pullovers 150 gr. 100% Algodón', price: 'Consultar', category: 'ropa-textiles', image: '/pullovers-algodon.png', description: 'Pullovers 150 gr de algodón' },
    { id: 6, name: 'Neceser-KRESTON1', price: 'Consultar', category: 'accesorios-personales', image: '/neceser-kreston1.png', description: 'Neceser KRESTON1' }
  ];

  const generateTestOrders = (): Order[] => {
    const statuses: Order['status'][] = ['pending', 'completed', 'cancelled'];
    const customers = ['María González', 'Carlos Pérez', 'Ana Rodríguez', 'Luis Sánchez', 'Laura Martínez'];

    return Array.from({ length: 5 }, (_, i) => {
      const itemsCount = Math.floor(Math.random() * 3) + 1;
      const items = Array.from({ length: itemsCount }, () => {
        const product = products[Math.floor(Math.random() * products.length)];
        return { product, quantity: Math.floor(Math.random() * 2) + 1 };
      });

      const subtotal = items.reduce((sum, item) => {
        const price = Math.floor(Math.random() * 40) + 10;
        return sum + (price * item.quantity);
      }, 0);

      return {
        id: `ORD-${1000 + i}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        date: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)).toLocaleDateString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        items,
        total: `$${subtotal.toFixed(2)}`
      };
    });
  };

  const handleAddTestOrders = () => {
    setOrders(generateTestOrders());
    setShowTestOrders(true);
  };

  const handleRemoveTestOrders = () => {
    setOrders([]);
    setShowTestOrders(false);
  };

  const handleChangeStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    setOrderToDelete(null);
  };

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.items.some(item =>
          item.product.name.toLowerCase().includes(q) ||
          item.product.description.toLowerCase().includes(q)
        )
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-primary text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5" size={18} />
          <input
            type="text"
            className="w-full bg-primary-dark text-black rounded pl-10 py-2 border border-gray-700"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'completed', 'cancelled'] as const).map(status => {
          const colorMap: Record<'all' | Order['status'], string> = {
            all: 'blue',
            pending: 'yellow',
            completed: 'green',
            cancelled: 'red'
          };
          const color = colorMap[status];
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                filter === status
                  ? `bg-${color}-500 ${status === 'pending' ? 'text-black' : 'text-white'}`
                  : 'bg-primary-darker text-gray-300'
              }`}
            >
              {status === 'all' ? 'Todos' : status === 'pending' ? 'Pendientes' : status === 'completed' ? 'Completados' : 'Cancelados'}
            </button>
          );
        })}
      </div>

      <div className="mb-6">
        {!showTestOrders ? (
          <button
            onClick={handleAddTestOrders}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Play size={16} /> Generar pedidos demo
          </button>
        ) : (
          <button
            onClick={handleRemoveTestOrders}
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <X size={16} /> Eliminar pedidos demo
          </button>
        )}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid gap-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-primary-dark p-4 rounded-xl border border-gray-700 shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{order.id}</h3>
                  <p className="text-gray-400">Cliente: {order.customer}</p>
                  <p className="text-gray-500 text-sm">Fecha: {order.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'completed' ? 'bg-green-500 text-white' :
                  order.status === 'pending' ? 'bg-yellow-500 text-black' :
                  'bg-red-500 text-white'
                }`}>
                  {order.status === 'completed' ? 'Completado' : order.status === 'pending' ? 'Pendiente' : 'Cancelado'}
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-primary-darker p-2 rounded-lg">
                    <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-400">{item.product.description}</p>
                    </div>
                    <p className="text-sm text-gray-300">Cant: {item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-right">
                <p className="text-gray-300">Total: <span className="text-blue-400 font-bold">{order.total}</span></p>
              </div>

              <div className="mt-4 flex justify-between items-center border-t border-gray-700 pt-3">
                <div className="flex gap-2">
                  {(['pending', 'completed', 'cancelled'] as Order['status'][]).map(s => (
                    <button
                      key={s}
                      onClick={() => handleChangeStatus(order.id, s)}
                      className={`text-sm px-3 py-1 rounded ${
                        order.status === s ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    onClick={() => console.log(`Modificar pedido ${order.id}`)}
                  >
                    <Edit size={16} /> Modificar
                  </button>
                  <button
                    onClick={() => setOrderToDelete(order)}
                    className="text-red-500 hover:text-red-400 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  {expandedOrderIds.has(order.id) ? 'Ocultar detalles del cliente' : 'Ver detalles del cliente'}
                </button>
                {expandedOrderIds.has(order.id) && (
                  <div className="mt-3 bg-primary-darker border border-gray-700 rounded-lg p-3 text-sm text-gray-300 space-y-1">
                    <p><strong>Email:</strong> david1733rodriguez@gmail.com</p>
                    <p><strong>Teléfono:</strong> +53 5 0065755</p>
                    <p><strong>Dirección:</strong> eewee</p>
                    <p><strong>Provincia:</strong> La Habana</p>
                    <p><strong>Municipio:</strong> Plaza de la Revolución</p>
                    <p><strong>Talla:</strong> M</p>
                    <p><strong>Cantidad:</strong> 1</p>
                    <p><strong>Pago:</strong> Transfermovil</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-primary-dark rounded-xl shadow-lg overflow-hidden border border-gray-700 text-center py-16 px-4">
          <div className="mx-auto bg-primary-darker rounded-full w-24 h-24 flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {filter === 'all' ? 'No hay pedidos registrados' : 
             filter === 'pending' ? 'No hay pedidos pendientes' :
             filter === 'completed' ? 'No hay pedidos completados' : 'No hay pedidos cancelados'}
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            {filter === 'all' ? 'Aún no se han realizado pedidos en tu tienda. Cuando los clientes realicen pedidos, aparecerán aquí.' :
             filter === 'pending' ? 'No hay pedidos pendientes con los criterios actuales.' :
             filter === 'completed' ? 'No hay pedidos completados con los criterios actuales.' : 'No hay pedidos cancelados con los criterios actuales.'}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleAddTestOrders}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2"
            >
              <Play size={16} /> Generar pedidos demo
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2">
              Ver tutorial
            </button>
          </div>
        </div>
      )}

      {orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-primary-dark p-6 rounded-xl border border-gray-700 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-4">¿Eliminar pedido?</h3>
            <p className="text-gray-300 mb-6">
              Esta acción no se puede deshacer. ¿Seguro que deseas eliminar el pedido <span className="text-red-400 font-bold">{orderToDelete.id}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDeleteOrder(orderToDelete.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
              <button
                onClick={() => setOrderToDelete(null)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
