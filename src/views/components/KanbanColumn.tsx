import React from 'react';
import PedidoCard from './PedidoCard';
import type { Pedido, PedidoStatus } from '../../models/Pedido';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps {
  status: PedidoStatus;
  label: string;
  emoji: string;
  pedidos: Pedido[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, label, emoji, pedidos }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`kanban-column${isOver ? ' is-over' : ''}`}
    >
      <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span>{emoji}</span> {label}
      </h2>
      <div className="flex flex-col gap-3">
        {pedidos.length === 0 && <div className="text-gray-400 text-center">Nenhum pedido</div>}
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
