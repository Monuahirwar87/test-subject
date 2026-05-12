import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL; // Backend server URL
    const [newsData, setNewsData] = useState([]);
    const [headlines, setHeadlines] = useState("Top Headlines");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        setNewsData([]);
        try {
            const response = await fetch(`${serverUrl}/news?page=${currentPage}&max=${pageSize}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setNewsData((prevData) => [...prevData, ...data.articles]);
        } catch (error) {
            console.error("Error fetching the news:", error);
            setError("Failed to fetch news. Please try again later.");
            setNewsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const loadMoreNews = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <NewsContext.Provider value={{ newsData, setNewsData, setHeadlines, headlines, loadMoreNews, loading, error }}>
            {children}
        </NewsContext.Provider>
    );
};
