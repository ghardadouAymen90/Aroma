'use client';

export function ProductSkeleton() {
  return (
    <div className="card p-4 h-full flex flex-col animate-pulse">
      <div className="w-full aspect-square mb-4 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-2/3" />
      <div className="h-8 bg-gray-200 rounded mt-4" />
    </div>
  );
}

export function ProductsGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
