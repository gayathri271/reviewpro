import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className="skeleton-wrapper">
        <Skeleton height={250} width={300} />
        <Skeleton count={3} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;
