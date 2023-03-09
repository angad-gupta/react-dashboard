import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem/NewsItem';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=79450571692043539c613d261df462b2')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (
    <div  className="container mt-4">
      <h1>News Feed</h1>

      <div>
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-12 mt-4">
              <NewsItem article={article}/>
            </div>
            ))}
        </div>
    </div>
    </div>
  );
}

export default NewsFeed;