import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Header } from './components/Header.tsx';
import { Board } from './components/Board.tsx';
import { GameStats } from './components/GameStats.tsx';
import { ClientCard } from './components/ClientCard.tsx';
import { Client, BoardStage, BOARD_STAGES } from './types';
import { mockClients } from './data/mockData';

function App() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [dailyWins, setDailyWins] = useState(3);
  const [streak, setStreak] = useState(7);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const client = clients.find(c => c.id === event.active.id);
    setActiveClient(client || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveClient(null);
      return;
    }

    const clientId = active.id as string;
    const newStage = over.id as BoardStage;

    setClients(prev =>
      prev.map(client =>
        client.id === clientId
          ? { ...client, stage: newStage }
          : client
      )
    );

    setActiveClient(null);
  };

  const getClientsByStage = (stage: BoardStage) => {
    return clients.filter(client => client.stage === stage);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Header />
        <div className="container mx-auto px-4 py-6">
          <GameStats dailyWins={dailyWins} streak={streak} />
          <Board stages={BOARD_STAGES} getClientsByStage={getClientsByStage} />
        </div>

        <DragOverlay>
          {activeClient ? (
            <div className="transform rotate-6 opacity-90">
              <ClientCard client={activeClient} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
