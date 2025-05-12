import React from 'react';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, Activity, Clock, Pause } from 'lucide-react';

function JobStatusBadge({ status }: { status: string }) {
  return (
    <div className="flex items-center w-full">
      {status === 'success' && (
        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-300">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Success
        </Badge>
      )}
      {status === 'failed' && (
        <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-300">
          <XCircle className="mr-1 h-3 w-3" />
          Failed
        </Badge>
      )}
      {/* enabled, disabled, paused */}

      {status === 'enabled' && (
        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-300">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Enabled
        </Badge>
      )}

      {status === 'disabled' && (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-700 border-gray-300">
          <XCircle className="mr-1 h-3 w-3" />
          Disabled
        </Badge>
      )}

      {status === 'paused' && (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-300">
          <Pause className="mr-1 h-3 w-3" />
          Paused
        </Badge>
      )}

      {/* not used right now */}
      {status === 'running' && (
        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-300 animate-pulse">
          <Activity className="mr-1 h-3 w-3" />
          Running
        </Badge>
      )}
      {status === 'pending' && (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-300">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      )}
      {status === 'canceled' && (
        <Badge variant="outline" className="bg-gray-500/10 text-gray-700 border-gray-300">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      )}
    </div>
  );
}

export default JobStatusBadge;
