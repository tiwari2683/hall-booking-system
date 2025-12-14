import PropTypes from 'prop-types';

const LoadingSpinner = ({ fullPage = false, className = '' }) => {
  const containerClasses = fullPage 
    ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' 
    : 'flex items-center justify-center';
  
  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  fullPage: PropTypes.bool,
  className: PropTypes.string,
};

export default LoadingSpinner;
