import React from "react";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, Activity, Clock } from "lucide-react";

function JobStatus({ status }: { status: string }) {
  return (
    <div className="flex items-center">
      {status === "success" && (
        <Badge
          variant="outline"
          className="bg-green-500/10 text-green-700 border-green-300"
        >
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Success
        </Badge>
      )}
      {status === "failed" && (
        <Badge
          variant="outline"
          className="bg-red-500/10 text-red-700 border-red-300"
        >
          <XCircle className="mr-1 h-3 w-3" />
          Failed
        </Badge>
      )}
      {status === "running" && (
        <Badge
          variant="outline"
          className="bg-blue-500/10 text-blue-700 border-blue-300 animate-pulse"
        >
          <Activity className="mr-1 h-3 w-3" />
          Running
        </Badge>
      )}
      {status === "pending" && (
        <Badge
          variant="outline"
          className="bg-yellow-500/10 text-yellow-700 border-yellow-300"
        >
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      )}
    </div>
  );
}

export default JobStatus;
