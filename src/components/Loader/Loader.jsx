const Loader = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-premium p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-8 w-36" />
              </div>
              <div className="skeleton w-10 h-10 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + list skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card-premium p-6">
          <div className="skeleton h-5 w-40 mb-4" />
          <div className="skeleton h-64 w-full rounded-xl" />
        </div>
        <div className="card-premium p-6 lg:col-span-2">
          <div className="skeleton h-5 w-40 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-surface-800/30 rounded-xl">
                <div className="skeleton h-5 w-24" />
                <div className="skeleton h-5 w-16" />
                <div className="flex-1" />
                <div className="skeleton h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
