import Skeleton from 'react-loading-skeleton'; // Correct import
import 'react-loading-skeleton/dist/skeleton.css'; // Make sure to import CSS for styles

const SkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper">
      <Skeleton height={250} width={300} /> {/* Example skeleton for image */}
      <Skeleton count={3} /> {/* Example skeleton for text */}
    </div>
  );
};

export default SkeletonLoader;
