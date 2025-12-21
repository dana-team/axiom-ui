import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Cluster, ClusterResources } from "@/consts";
import { capitalize } from "@/utils";

interface ClusterCardProps {
  cluster: Cluster;
}

const ClusterCard = ({ cluster }: ClusterCardProps) => {
  return (
    <Link to={`/clusters/${cluster.clusterID}`} className="block">
      <Card className="transition hover:ring-2">
        <CardHeader>
          <div className="flex items-center justify-between h-12">
            <CardTitle className="text-2xl">{cluster.name}</CardTitle>
            <div className="flex gap-2 text-muted-foreground">
              <Badge variant="outline">{cluster.kubernetesVersion}</Badge>
              {cluster.clusterDnsConfig.searchDomains ? (
                <Badge variant="outline">
                  {cluster.clusterDnsConfig.searchDomains[0]}
                </Badge>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Badge
            variant="outline"
            className="flex gap-2 flex-row justify-around w-full"
          >
            {Object.entries(cluster.clusterResources as ClusterResources)
            .filter(([, value]) => value !== "0")
            .map(([key, value]) => (
              <div key={key} className="flex flex-col h-24 justify-center gap-1">
                <p className="text-lg font-bold">{capitalize(key)}:</p>
                <p className="text-md">{value}</p>
              </div>
            ))}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );};

export default ClusterCard;
