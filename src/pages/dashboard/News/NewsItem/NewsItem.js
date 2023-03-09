import React from 'react';
import styles from './NewsItem.module.css';

const NewsItem = ({article}) => (
  <div className={styles.NewsItem}>
        <div className="card">
          <div className="card-body">
            <div className="d-md-flex">
              <img src={article.urlToImage}/>
              <div>
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.url} target="_blank">Read More</a>

              </div>
            </div>
          </div>
        </div>
  </div>
);

NewsItem.propTypes = {};

NewsItem.defaultProps = {};

export default NewsItem;
