import React from 'react';
// import { Skeleton } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="container-fluid text-center px-5" style={{ marginTop: "-40px", zIndex: 10, position: "relative" }} id="cards">
      <div className="row">
        {/* Skeleton for Food Card */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <Skeleton height={200} />
            <div className="card-body">
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>

        {/* Skeleton for Movies Card */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <Skeleton height={200} />
            <div className="card-body">
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>

        {/* Skeleton for Dress Card */}
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <Skeleton height={200} />
            <div className="card-body">
              <Skeleton width="80%" height={20} />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
