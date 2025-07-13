import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Cluster } from "@/consts";

interface ClusterCardProps {
  cluster: Cluster;
}

const ClusterCard = ({ cluster }: ClusterCardProps) => {
  return (
    <Link to={`/clusters/${cluster.id}`} className="block">
      <Card className="transition hover:ring-2">
        <CardHeader>
          <div className="flex items-center justify-between h-12">
            <CardTitle>{cluster.name}</CardTitle>
            <div className="flex gap-2 text-muted-foreground">
              <Badge variant="outline">{cluster.version}</Badge>
              <Badge variant="outline">{cluster.network}</Badge>
              <Badge variant="outline">{cluster.environment}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm h-24">More cluster details here...</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClusterCard;
