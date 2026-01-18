import { useEffect, useState, type JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Cluster } from "@/consts";
import ClustersSelect from "@/components/ClusterCompareDialog/ClustersSelect";
import ComparisonDisplay from "@/components/ClusterCompareDialog/ComparisonDisplay";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Columns } from "lucide-react";
import { useStore } from "@/store/useStore";

const COMPARABLE_FIELDS = [
  { 
    key: "kubernetesVersion", 
    label: "Kubernetes Version",
    getValue: (c: Cluster) => c.kubernetesVersion
  },
  { 
    key: "network", 
    label: "Network", 
    getValue: (c: Cluster) => c.clusterDnsConfig?.searchDomains?.[0] || "N/A"
  },
  { 
    key: "routerLBAddress", 
    label: "Router LB Address", 
    getValue: (c: Cluster) => JSON.stringify(c.routerLBAddress || [])
  },
  { 
    key: "apiServerAddresses", 
    label: "API Server Addresses", 
    getValue: (c: Cluster) => JSON.stringify(c.apiServerAddresses || [])
  },
  { 
    key: "nodeCount", 
    label: "Node Count", 
    getValue: (c: Cluster) => String(c.nodeInfo?.length || 0)
  },
  { 
    key: "storageProvisioners", 
    label: "Storage Provisioners", 
    getValue: (c: Cluster) => JSON.stringify(
      c.storageProvisioners?.map(s => ({
        name: s.name,
      })) || []
    )
  },
  { 
    key: "identityProviders", 
    label: "Identity Providers", 
    getValue: (c: Cluster) => JSON.stringify(c.identityProviders || [])
  },
] as const;


interface ComparisonDifference {
  key: string;
  label: string;
  values: Record<string, any>;
}

interface ClusterCompareDialogProps {
  clusters?: Cluster[]; // Optional prop, will use store if not provided
}

const buildComparison = (
  selectedClusters: Cluster[],
  type: "diff" | "common"
): string => {
  if (selectedClusters.length < 2) return "{}";

  const comparisons: ComparisonDifference[] = [];

  COMPARABLE_FIELDS.forEach(({ key, label, getValue }) => {
    const values: Record<string, any> = {};

    selectedClusters.forEach((cluster) => {
      values[cluster.name || cluster.clusterID] = getValue(cluster);
    });

    // Get unique values
    const uniqueValues = new Set(Object.values(values));

    if (type === "diff") {
      // Include only if there are differences
      if (uniqueValues.size > 1) {
        comparisons.push({ key, label, values });
      }
    } else {
      // Include only if all values are the same
      if (uniqueValues.size === 1) {
        comparisons.push({ key, label, values });
      }
    }
  });

  return JSON.stringify(
    {
      type,
      comparedClusters: selectedClusters.map((c) => c.name || c.clusterID),
      results: comparisons,
    },
    null,
    2
  );
};

const ClusterCompareDialog = ({ clusters: propsClusterss }: ClusterCompareDialogProps) => {
  const { filteredClusters } = useStore();
  
  // Use filtered clusters from store, fallback to props
  const clusters = propsClusterss || filteredClusters;

  const [searchInput, setSearchInput] = useState("");
  const [selectedClusters, setSelectedClusters] = useState<Cluster[]>([]);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"select" | "result">("select");
  const [jsonResult, setJsonResult] = useState("");

  const handleAdd = (cluster: Cluster): void => {
    if (!selectedClusters.some((s) => s.clusterID === cluster.clusterID)) {
      setSelectedClusters((prev) => [...prev, cluster]);
    }
  };

  const handleRemove = (clusterToRemove: Cluster): void => {
    setSelectedClusters((prev) =>
      prev.filter((cluster) => cluster.clusterID !== clusterToRemove.clusterID)
    );
  };

  const handleAction = (type: "diff" | "common"): void => {
    const result = buildComparison(selectedClusters, type);
    setJsonResult(result);
    setView("result");
  };

  const handleBack = (): void => {
    setView("select");
  };

  const handleCloseDialog = (): void => {
    setView("select");
    setSearchInput("");
    setSelectedClusters([]);
    setJsonResult("");
  };

  const viewButtons: Record<typeof view, () => JSX.Element | null> = {
    select: () => (
      <div className="flex justify-end gap-2">
        <Button
          disabled={selectedClusters.length < 2}
          onClick={() => handleAction("diff")}
          className="bg-primary-dark/90 hover:bg-primary-dark/80 dark:bg-primary-lighter/70 dark:hover:bg-primary/60 
        text-white px-4 transition"
        >
          Find Differences
        </Button>
        <Button
          variant="secondary"
          disabled={selectedClusters.length < 2}
          onClick={() => handleAction("common")}
          className="bg-primary-dark/90 hover:bg-primary-dark/80 dark:bg-primary-lighter/70 dark:hover:bg-primary/60 
        text-white px-4 transition"
        >
          Find Commonalities
        </Button>
      </div>
    ),

    result: () => (
      <Button
        onClick={handleBack}
        className="bg-primary-dark/90 hover:bg-primary-dark/80 dark:bg-primary-lighter/70 dark:hover:bg-primary/60 
      text-white px-4 transition"
      >
        Back
      </Button>
    ),
  };

  useEffect(() => {
    handleCloseDialog();
  }, [open]);

  const isSelectView = view === "select";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="bg-primary-dark/90 hover:bg-primary-dark/80 dark:bg-primary-lighter/70 dark:hover:bg-primary/60 
        text-white transition rounded"
              onClick={() => setOpen(true)}
            >
              <Columns className="h-5 w-5" />
              <span className="sr-only">Compare Clusters</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-sm">
            Compare Clusters
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="min-w-2xl bg-card">
        <DialogHeader className="mb-2">
          <DialogTitle>
            {isSelectView
              ? "Select 2 or more Clusters to Compare"
              : "Comparison Result"}
          </DialogTitle>
        </DialogHeader>

        {isSelectView ? (
          <ClustersSelect
            clusters={clusters}
            selectedClusters={selectedClusters}
            onAdd={handleAdd}
            onRemove={handleRemove}
            search={searchInput}
            setSearch={setSearchInput}
          />
        ) : (
          <ComparisonDisplay value={jsonResult} />
        )}
        <div className="mt-4 gap-2 flex justify-between">
          <div className="flex justify-start gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {!isSelectView && viewButtons.result()}
          </div>

          {isSelectView && viewButtons.select()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClusterCompareDialog;
