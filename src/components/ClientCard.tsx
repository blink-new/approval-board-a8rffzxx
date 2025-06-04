import { useDraggable } from '@dnd-kit/core';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, AlertCircle, MessageSquare, Phone } from 'lucide-react';
import { Client } from '../types';
import { cn } from '../lib/utils';

interface ClientCardProps {
  client: Client;
  isOverlay?: boolean;
}

export function ClientCard({ client, isOverlay = false }: ClientCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: client.id,
    disabled: isOverlay,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'ready': return 'border-l-green-500';
      case 'needs-attention': return 'border-l-yellow-500';
      case 'stalled': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  const getStatusIcon = (status: Client['status']) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs-attention': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'stalled': return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const completedDocs = client.documents.filter(doc => doc.completed).length;
  const totalDocs = client.documents.length;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'p-4 cursor-grab active:cursor-grabbing card-hover',
        getStatusColor(client.status),
        'border-l-4',
        client.urgentTask && 'pulse-glow',
        isOverlay && 'shadow-2xl'
      )}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.vehicleRequest}</p>
          </div>
          {getStatusIcon(client.status)}
        </div>

        {/* Credit Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Credit Score</span>
          <Badge 
            variant={client.creditScore >= 650 ? 'default' : client.creditScore >= 580 ? 'secondary' : 'destructive'}
            className="font-mono"
          >
            {client.creditScore}
          </Badge>
        </div>

        {/* Income */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Income</span>
          <span className="text-sm font-medium">{client.income}</span>
        </div>

        {/* Approval Odds */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Approval Odds</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-2 w-2 rounded-full',
                  i <= client.approvalOdds ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>
        </div>

        {/* Documents Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Documents</span>
            <span className="text-sm font-medium">{completedDocs}/{totalDocs}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(completedDocs / totalDocs) * 100}%` }}
            />
          </div>
        </div>

        {/* Issues */}
        {client.issues.length > 0 && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Top Issues</span>
            <div className="flex flex-wrap gap-1">
              {client.issues.slice(0, 2).map((issue) => (
                <Badge key={issue} variant="outline" className="text-xs">
                  {issue}
                </Badge>
              ))}
              {client.issues.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{client.issues.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Urgent Task */}
        {client.urgentTask && (
          <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
              ⚠️ {client.urgentTask}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-2">
          <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-md hover:bg-blue-500/20 transition-colors">
            <MessageSquare className="h-3 w-3 text-blue-500" />
            <span className="text-xs text-blue-500 font-medium">Text</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-md hover:bg-green-500/20 transition-colors">
            <Phone className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500 font-medium">Call</span>
          </button>
        </div>
      </div>
    </Card>
  );
}