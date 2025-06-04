import React from 'react';

interface GameStatsProps {
  dailyWins: number;
  streak: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ dailyWins, streak }) => {
  return (
    <div className="game-stats">
      <h3>Daily Wins: {dailyWins}</h3>
      <h3>Approval Streak: {streak}</h3>
    </div>
  );
};
