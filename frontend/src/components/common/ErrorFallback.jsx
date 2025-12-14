import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const errorMessage = error?.message || 'Something went wrong';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <h2 className="mt-3 text-lg font-medium text-gray-900">Oops! Something went wrong</h2>
        <p className="mt-2 text-sm text-gray-500">{errorMessage}</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func.isRequired,
};
