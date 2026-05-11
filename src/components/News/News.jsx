import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NewsItems } from '../NewsItems/NewsItems';
import { NewsContext } from '../../Context/NewsProvider';
import { SkeletonCard } from '../NewsItems/SkeletonCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export const News = () => {
  const { type } = useParams(); // Get the category from the URL
  const { newsData, setNewsData, updateApiUrl, setHeadlines } = useContext(NewsContext);
  
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Correct way to access environment variables in Vite


  useEffect(() => {
    if (type) {
      setHeadlines(type); // Update the headline
      setNewsData([]); // Clear existing news data
      const url = `https://gnews.io/api/v4/search?q=${type}&lang=en&max=10&page=1&apikey=${apiKey}`;
      updateApiUrl(url); // Fetch the new category's news
      setPage(1); // Reset the page when the type changes
    }
  }, [type]); // Only depend on `type`

  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const url = `https://gnews.io/api/v4/search?q=${type}&lang=en&max=10&page=${page}&apikey=${apiKey}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          // Check for API limit issues (e.g., 426 error)
          if (response.status === 426) {
            console.error("API upgrade required or quota exceeded.");
            setHasMore(false); // Stop further fetch requests
            return; // Exit the function
          }
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Check if data and data.articles exist before accessing
        if (data.articles && data.articles.length > 0) {
          setNewsData(prevData => [...prevData, ...data.articles]);
        } else {
          setHasMore(false); // No more articles available
        }
      } catch (error) {
        console.error("Error fetching more data:", error);
        setHasMore(false); // Stop further fetch requests in case of an error
      }
    };
  
    if (page > 1) {
      fetchMoreData();
    }
  }, [page, type]);
  

  // Show loading state if no news data is available
  if (!newsData || newsData.length === 0) {
    return (
      <div className='d-flex justify-content-center'>
        <div className="container mt-4">
          <div className="mt-4 row">
            <h1 className='mb-4' style={{fontSize: "2rem",textAlign:"left"}}>Kite News - {type ? type.toUpperCase() : "Top Headlines"}</h1>
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex justify-content-center'>
      <InfiniteScroll
        dataLength={newsData.length} // Length of the items
        next={() => setPage(prevPage => prevPage + 1)} // Function to load more items
        hasMore={hasMore} // Check if there are more items to load
        loader={
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        } // Loader while fetching more items
        endMessage={<p className="text-center text-muted my-4">No more articles to load.</p>} // Message when there are no more items
      >
        <div className="container mt-4">
        <div className="mt-4 row">
        <h1 className='mb-4' style={{fontSize: "2rem",textAlign:"left"}}>Kite News - {type ? type.toUpperCase() : "Top Headlines"}</h1>
          {newsData.map((elem, index) => (
            <NewsItems data={elem} key={`${elem.url}-${index}`} />
          ))}
        </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};