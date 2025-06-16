import React from 'react';
import { usePedidoStore } from '../../store/pedidoStore';
import type { PedidoStatus } from '../../models/Pedido';
import KanbanColumn from './KanbanColumn';
import { useNotification } from '../../hooks/useNotification';
import {
  DndContext,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';


const statusList: { status: PedidoStatus; label: string; emoji: string }[] = [
  { status: 'Recebido', label: 'Recebido', emoji: '🕓' },
  { status: 'Em preparo', label: 'Em preparo', emoji: '🍳' },
  { status: 'Pronto para entrega', label: 'Pronto para entrega', emoji: '🚚' },
];
const bottomStatusList: { status: PedidoStatus; label: string; emoji: string }[] = [
  { status: 'Finalizado', label: 'Finalizado', emoji: '✅' },
  { status: 'Cancelado', label: 'Cancelado', emoji: '❌' },
];

const KanbanBoard: React.FC = () => {
  const pedidos = usePedidoStore((s) => s.pedidos);
  const moverPedido = usePedidoStore((s) => s.moverPedido);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const { showNotification } = useNotification();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const pedidoId = active.id as string;
    const novoStatus = over.id as PedidoStatus;
    const pedido = pedidos.find((p) => p.id === pedidoId);
    if (pedido && pedido.status !== novoStatus) {
      moverPedido(pedidoId, novoStatus);
      showNotification(`Pedido ${pedido.cliente} movido para ${novoStatus}`, 'success');
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const activePedido = pedidos.find((p) => p.id === activeId);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="kanban-board-row">
        {statusList.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            emoji={col.emoji}
            pedidos={pedidos.filter((p) => p.status === col.status)}
          />
        ))}
      </div>
      <div className="kanban-board-row mt-8">
        {bottomStatusList.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            emoji={col.emoji}
            pedidos={pedidos.filter((p) => p.status === col.status)}
          />
        ))}
      </div>
      <DragOverlay>
        {activePedido ? (
          <div className="pedido-card dnd-kit-drag-overlay">
            <div className="font-semibold">{activePedido.cliente}</div>
            <div className="text-xs text-gray-500 mb-1">{activePedido.horario}</div>
            <div className="text-xs text-gray-700 mb-1">
              <span className="font-medium">{activePedido.tipo}:</span> {activePedido.endereco}
            </div>
            <ul className="text-sm mb-1">
              {activePedido.itens.map((item, idx) => (
                <li key={idx}>{item.quantidade}x {item.nome}</li>
              ))}
            </ul>
            <div className="text-right font-bold text-green-600">R$ {activePedido.total.toFixed(2)}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
