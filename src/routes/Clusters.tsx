import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Cluster } from "@/consts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ClusterCard from "@/components/ClusterCard";
import ClusterCompareDialog from "@/components/ClusterCompareDialog/ClusterCompareDialog";

const TOTAL_ITEMS = 27;
const ITEMS_PER_PAGE = 9;

const generateFakeData = (startIndex: number, count: number): Cluster[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    name: `Cluster ${startIndex + i + 1}`,
    version: "v1.2.0",
    network: "net",
    environment: "production",
  }));
};

const ClustersPagePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default function ClustersPage() {
  const [loading, setLoading] = useState(true);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      setClusters(generateFakeData(startIndex, ITEMS_PER_PAGE));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page]);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">{`${TOTAL_ITEMS} Clusters found`}</h1>
        <ClusterCompareDialog clusters={clusters} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))
          : clusters.map((cluster) => (
              <ClusterCard key={cluster.id} cluster={cluster} />
            ))}
      </div>

      <ClustersPagePagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
