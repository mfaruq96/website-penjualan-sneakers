import React from "react";

export const LoadingAuth = () => {
  return (
    <div className="loading-auth">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
