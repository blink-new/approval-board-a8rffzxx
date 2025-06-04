import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ClientCard } from './ClientCard';
import { Client, BoardStage } from '../types';

interface BoardProps {
  stages: { id: BoardStage; title: string }[];
  getClientsByStage: (stage: BoardStage) => Client[];
}

export function Board({ stages, getClientsByStage }: BoardProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto">
      {stages.map(stage => (
        <BoardColumn
          key={stage.id}
          id={stage.id}
          title={stage.title}
          clients={getClientsByStage(stage.id)}
        />
      ))}
    </div>
  );
}

interface BoardColumnProps {
  id: BoardStage;
  title: string;
  clients: Client[];
}

function BoardColumn({ id, title, clients }: BoardColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef} className="flex-shrink-0 w-64 bg-secondary rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div>
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}
