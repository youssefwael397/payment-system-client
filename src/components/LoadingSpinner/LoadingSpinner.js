import React from "react";

function LoadingSpinner() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle mx-auto text-center">
      <div className="spinner-border text-center mx-auto" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
