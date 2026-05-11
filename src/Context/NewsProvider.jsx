import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY; // Correct way to access environment variables in Vite
    const [newsData, setNewsData] = useState([]);
    const [apiURL, setApiURL] = useState(`https://gnews.io/api/v4/search?q=india&lang=en&max=10&page=1&apikey=${apiKey}`);
    const [headlines, setHeadlines] = useState("Top Headlines");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateApiUrl = (newUrl) => {
        setApiURL(newUrl);
    }

    const fetchNews = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetch
        setNewsData([]);
        try {
            const response = await fetch(apiURL);
            if (response.status === 429) {
                console.error("Too many requests, please wait before trying again.");
                return;
            }
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
    }, [apiURL]);

    const loadMoreNews = () => {
        setCurrentPage((prevPage) => {
            const newPage = prevPage + 1;
            const newUrl = `https://gnews.io/api/v4/search?q=india&lang=en&max=${pageSize}&page=${newPage}&apikey=${apiKey}`;
            updateApiUrl(newUrl);
            return newPage;
        });
    };

    return (
        <NewsContext.Provider value={{ newsData, updateApiUrl, setNewsData, setHeadlines, headlines, loadMoreNews, loading, error }}>
            {children}
        </NewsContext.Provider>
    );
};
