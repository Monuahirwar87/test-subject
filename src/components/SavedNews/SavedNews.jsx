import React, { useState, useEffect } from 'react';
import { NewsItems } from '../NewsItems/NewsItems';
import { useToast } from '../../Context/ToastProvider';

export const SavedNews = () => {
  const [savedNews, setSavedNews] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = JSON.parse(localStorage.getItem('saved_news')) || [];
      setSavedNews(saved);
    };

    // Initial load
    handleStorageChange();

    // Listen to storage changes from other tabs if needed, though mostly we just rely on component re-mount
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up a custom interval or event if we want real-time update in the same tab,
    // but typically just remounting the component when navigating to /saved is enough.
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClearAll = () => {
    if(window.confirm("Are you sure you want to clear all your saved articles?")) {
      localStorage.setItem('saved_news', '[]');
      setSavedNews([]);
      addToast('All saved articles cleared!', 'danger');
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className="container mt-4">
        <div className="mt-4 row">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 style={{fontSize: "2rem", margin: 0}}>Saved Articles</h1>
            {savedNews.length > 0 && (
              <button onClick={handleClearAll} className="btn btn-outline-danger btn-sm">
                Clear All
              </button>
            )}
          </div>
          {savedNews.length === 0 ? (
            <div className="text-center w-100">
                <p className="mt-5 text-muted fs-5">You haven't saved any articles yet. 
                <br/><span className="fs-6">Click the "Save" button on any news article to read it later.</span></p>
            </div>
          ) : (
            savedNews.map((elem, index) => (
              <NewsItems data={elem} key={`${elem.url}-${index}`} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
