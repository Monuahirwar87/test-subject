import { useState, useEffect } from 'react';
import { useToast } from '../../Context/ToastProvider';

export const NewsItems = ({ data, index }) => {
    const [isSaved, setIsSaved] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        const savedArticles = JSON.parse(localStorage.getItem('saved_news')) || [];
        const exists = savedArticles.some(article => article.url === data.url);
        setIsSaved(exists);
    }, [data.url]);

    const toggleSave = () => {
        const savedArticles = JSON.parse(localStorage.getItem('saved_news')) || [];
        if (isSaved) {
            const newSaved = savedArticles.filter(article => article.url !== data.url);
            localStorage.setItem('saved_news', JSON.stringify(newSaved));
            setIsSaved(false);
            addToast('Removed from saved articles', 'secondary');
        } else {
            savedArticles.push(data);
            localStorage.setItem('saved_news', JSON.stringify(savedArticles));
            setIsSaved(true);
            addToast('Saved to your articles!', 'success');
        }
    };

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: data.title,
            text: data.description,
            url: data.url,
          });
        } catch (error) {
          console.log('Error sharing', error);
        }
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(data.url);
        addToast('Link copied to clipboard!', 'info');
      }
    };
    const date = new Date(data.publishedAt);
  
    // 12-hour format for time
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

  
    return (
      <>
        {(data.image || data.urlToImage) && ( // Conditional rendering using &&
          <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={data.url}>
            <div className="card">
              <img src={data.image || data.urlToImage} className="card-img-top" height={"220rem"} alt="News Image" />
              <div className="card-body mb-2">
                <h5 className="card-title" style={{ color: "#57594fff", fontWeight: "700" }}>
                  {data.title}
                </h5>
                <p className="card-text" style={{ color: 'gray', fontWeight: '600' }}>
                  {data.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <a href={data.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm">
                      Read More
                    </a>
                    <button 
                      onClick={toggleSave} 
                      className={`btn btn-sm ms-2 d-inline-flex align-items-center ${isSaved ? 'btn-warning text-dark border-warning' : 'btn-outline-secondary'}`} 
                      title={isSaved ? "Remove from saved" : "Save for later"}
                      style={{ gap: "4px", transition: "all 0.2s ease-in-out", fontWeight: "500" }}
                    >
                      {isSaved ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
                          </svg>
                          Saved
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.545a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                          </svg>
                          Save
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleShare}
                      className="btn btn-sm btn-outline-secondary ms-2 d-inline-flex align-items-center"
                      title="Share Article"
                      style={{ gap: "4px", fontWeight: "500" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                      </svg>
                      Share
                    </button>
                  </div>
                  <div className="d-flex flex-column text-end mt-2 mt-md-0">
                    <span style={{ fontSize: ".8rem", fontWeight: "600", color: "gray" }}>
                      {date.toLocaleTimeString('en-US', timeOptions)}
                    </span> {/* 12-hour format */}
                    <span style={{ fontSize: ".8rem", fontWeight: "600", color: "gray" }}>
                      {date.toLocaleDateString('en-US', dateOptions)}
                    </span> {/* Formatted date */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  