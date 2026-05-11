import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
      <div className="card h-100 placeholder-glow border-0 shadow-sm" style={{ backgroundColor: 'var(--bs-card-bg)', overflow: 'hidden' }}>
        <div className="placeholder w-100" style={{ height: "220px", borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}></div>
        <div className="card-body">
          <h5 className="card-title">
            <span className="placeholder col-10 rounded"></span>
            <span className="placeholder col-7 rounded mt-1"></span>
          </h5>
          <p className="card-text mt-3">
            <span className="placeholder col-12 rounded"></span>
            <span className="placeholder col-12 rounded mt-1"></span>
            <span className="placeholder col-8 rounded mt-1"></span>
          </p>
          <div className="d-flex justify-content-between align-items-center mt-4">
             <span className="placeholder col-4 rounded" style={{ height: "30px"}}></span>
             <span className="placeholder col-3 rounded" style={{ height: "15px"}}></span>
          </div>
        </div>
      </div>
    </div>
  );
};
