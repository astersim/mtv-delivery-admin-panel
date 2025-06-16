import React from 'react';
import type { Pedido } from '../../models/Pedido';
import { useDraggable } from '@dnd-kit/core';

interface PedidoCardProps {
  pedido: Pedido;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: pedido.id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`pedido-card${isDragging ? ' dragging' : ''}`}
    >
      <div className="font-semibold">{pedido.cliente}</div>
      <div className="text-xs text-gray-500 mb-1">{pedido.horario}</div>
      <div className="text-xs text-gray-700 mb-1">
        <span className="font-medium">{pedido.tipo}:</span> {pedido.endereco}
      </div>
      <ul className="text-sm mb-1">
        {pedido.itens.map((item, idx) => (
          <li key={idx}>{item.quantidade}x {item.nome}</li>
        ))}
      </ul>
      <div className="text-right font-bold text-green-600">R$ {pedido.total.toFixed(2)}</div>
    </div>
  );
};

export default PedidoCard;
