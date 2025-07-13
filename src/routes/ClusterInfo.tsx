import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SiGrafana, SiRedhatopenshift } from "react-icons/si";
import { ClusterLink } from "@/components/ClusterLink";
import type { Cluster } from "@/consts";

const grafanaUrl = import.meta.env.VITE_GRAFANA_URL;
const openshiftUrl = import.meta.env.VITE_OPENSHIFT_URL;

const STATIC_CLUSTER: Cluster = {
  id: 1,
  name: "Cluster",
  version: "v1.2.0",
  network: "net",
  environment: "production",
};

export const ClusterPanel = () => {
  const { id: clusterId } = useParams<{ id: string }>();
  const timestamp = new Date().toLocaleString();

  const clusterDetails = [
    { label: "Version", value: STATIC_CLUSTER.version },
    { label: "Network", value: STATIC_CLUSTER.network },
    { label: "Environment", value: STATIC_CLUSTER.environment },
  ];

  const linkItems = [
    {
      url: openshiftUrl,
      label: "Link to OpenShift",
      colorClass: "text-red-600",
      Icon: SiRedhatopenshift,
    },
    {
      url: grafanaUrl,
      label: "Link to Grafana",
      colorClass: "text-orange-500",
      Icon: SiGrafana,
    },
  ];

  return (
    <div className="w-1/4 p-6 space-y-6 border-r border-border bg-muted/30">
      <div className="flex items-center justify-between">
        <Link
          to="/clusters"
          className="gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {STATIC_CLUSTER.name} {clusterId}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Last updated: {timestamp}
        </p>
      </div>

      <Separator />

      <div className="space-y-2 pt-2">
        {clusterDetails.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-muted-foreground">{label}:</span>
            <Badge variant="outline">{value}</Badge>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex gap-6 pt-1">
        {linkItems.map((item, index) => (
          <ClusterLink
            key={index}
            url={item.url}
            label={item.label}
            colorClass={item.colorClass}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  );
};

const CustomWidget = ({ id }: { id: number }) => (
  <Card key={id} className="mb-4">
    <CardHeader>
      <CardTitle>Widget {id}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        This is dynamic content for widget {id}. You can replace this with
        charts, tables, logs, etc.
      </p>
    </CardContent>
  </Card>
);

export default function ClustersPage() {
  const widgets = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex border border-border bg-background shadow-sm h-full">
      <ClusterPanel />
      <div className="w-3/4 p-6 bg-gradient-to-br dark:from-primary/30 via-primary-dark/10 dark:to-primary-light/20 overflow-auto">
        <ScrollArea className="pr-4">
          {widgets.map((id) => (
            <CustomWidget id={id} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
