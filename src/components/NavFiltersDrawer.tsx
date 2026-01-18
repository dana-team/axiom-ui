import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import type { Cluster } from "@/consts";
import { fetchFilteredClusters } from "@/ClusterService";

const FILTERABLE_FIELDS = [
  { 
    key: "OCPVersion", 
    label: "OCP Version",
    getValue: (cluster: Cluster) => cluster.kubernetesVersion
  },
  { 
    key: "network", 
    label: "Network",
    getValue: (cluster: Cluster) => 
      cluster.clusterDnsConfig?.searchDomains 
        ? cluster.clusterDnsConfig.searchDomains[0] 
        : ""
  },
] as const;

const getUniqueValues = (
  clusters: Cluster[],
  getValue: (cluster: Cluster) => string
): string[] => {
  const values = clusters
    .map(getValue)
    .filter((v) => v != null && v !== "");

  return Array.from(new Set(values)).sort() as string[];
};

const applyFilters = (
  clusters: Cluster[],
  filters: Record<string, string[]>,
  fieldGetters: Record<string, (cluster: Cluster) => string>
): Cluster[] => {
  return clusters.filter((cluster) => {
    return Object.entries(filters).every(([fieldKey, selectedValues]) => {
      if (selectedValues.length === 0) return true;
      
      const getValue = fieldGetters[fieldKey];
      const clusterValue = getValue(cluster);
      
      return selectedValues.includes(clusterValue);
    });
  });
};

export default function NavFiltersDrawer() {
  const { clusters, activeFilters, setFilteredClusters, setActiveFilters } = useStore();
  const [filters, setFilters] = useState<Record<string, string[]>>(activeFilters);

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  const fieldGetters = FILTERABLE_FIELDS.reduce(
    (acc, field) => {
      acc[field.key] = field.getValue;
      return acc;
    },
    {} as Record<string, (cluster: Cluster) => string>
  );

  const toggle = (fieldKey: string, value: string) => {
    const current = filters[fieldKey] ?? [];
    const exists = current.includes(value);
    const next = exists
      ? current.filter((v) => v !== value)
      : [...current, value];

    const updatedFilters = { ...filters, [fieldKey]: next };
    setFilters(updatedFilters);

    setActiveFilters(updatedFilters);

    const filtered = applyFilters(clusters, updatedFilters, fieldGetters);
    setFilteredClusters(filtered);
  };

  const reset = async () => {
    setFilters({});
    setActiveFilters({});
    setFilteredClusters(clusters);
    await fetchFilteredClusters();
  };

  return (
    <div className="space-y-2">
      <Accordion type="multiple" className="w-full">
        {FILTERABLE_FIELDS.map(({ key, label, getValue }) => {
          const uniqueValues = getUniqueValues(clusters, getValue);

          if (uniqueValues.length === 0) return null;

          return (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                {label}
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {uniqueValues.map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <Checkbox
                      checked={(filters[key] ?? []).includes(value)}
                      onCheckedChange={() => toggle(key, value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex justify-end pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={Object.values(filters).every((v) => v.length === 0)}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}
