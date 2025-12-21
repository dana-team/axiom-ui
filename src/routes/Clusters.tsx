import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useStore } from "@/store/useStore";

const ITEMS_PER_PAGE = 9;

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
  const { clusters, totalItems, loading, page, setPage, fetchClusters } =
    useStore();

  useEffect(() => {
    fetchClusters();
  }, []);

  const totalPages = Math.ceil(totalItems || 0 / ITEMS_PER_PAGE) || 1;
  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">{`${totalItems} Clusters found`}</h1>
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
              <ClusterCard key={cluster.clusterID} cluster={cluster} />
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
