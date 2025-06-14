'use client';

import { useEffect, useState } from 'react';
import { 
  CollectionEventType, 
  type CollectionEvent,
  type CollectionUpdatedEvent,
  type CollectionDeletedEvent,
  type FiltersUpdatedEvent,
  type CacheClearedEvent
} from '@/lib/utils/collection-events';
import { useMultipleCollectionEvents } from '@/hooks/use-collection-events';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface UpdateLog {
  id: string;
  message: string;
  timestamp: Date;
}

/**
 * Component that monitors and displays collection updates
 * Demonstrates usage of collection events system
 */
export function CollectionUpdatesMonitor() {
  const [logs, setLogs] = useState<UpdateLog[]>([]);

  // Subscribe to multiple collection events
  useMultipleCollectionEvents({
    [CollectionEventType.COLLECTION_UPDATED]: (event) => {
      if (event.type === CollectionEventType.COLLECTION_UPDATED) {
        const message = `Collection "${event.subCategory}" in ${event.productType} was updated`;
        addLog(message);
        toast({
          title: "Collection Updated",
          description: message,
        });
      }
    },
    [CollectionEventType.COLLECTION_DELETED]: (event) => {
      if (event.type === CollectionEventType.COLLECTION_DELETED) {
        const message = `Collection "${event.subCategory}" in ${event.productType} was deleted`;
        addLog(message);
        toast({
          title: "Collection Deleted",
          description: message,
          variant: "destructive"
        });
      }
    },
    [CollectionEventType.FILTERS_UPDATED]: (event) => {
      if (event.type === CollectionEventType.FILTERS_UPDATED) {
        const message = `Filters for ${event.productType} were updated`;
        addLog(message);
      }
    },
    [CollectionEventType.CACHE_CLEARED]: (event) => {
      if (event.type === CollectionEventType.CACHE_CLEARED) {
        const message = event.productType 
          ? `Cache cleared for ${event.productType}`
          : "All collection caches cleared";
        addLog(message);
      }
    }
  });

  // Add a new log entry
  const addLog = (message: string) => {
    setLogs(prev => [
      {
        id: Math.random().toString(36).slice(2),
        message,
        timestamp: new Date()
      },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };

  // Clear logs
  const clearLogs = () => setLogs([]);

  return (
    <div className="space-y-4 p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Collection Updates Monitor</h2>
        <button
          onClick={clearLogs}
          className="px-2 py-1 text-sm rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Clear Logs
        </button>
      </div>

      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No collection updates yet...
          </p>
        ) : (
          logs.map(log => (
            <div
              key={log.id}
              className="flex items-start gap-2 text-sm p-2 rounded bg-slate-50 dark:bg-slate-800"
            >
              <Badge variant="outline" className="shrink-0">
                {log.timestamp.toLocaleTimeString()}
              </Badge>
              <span>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
