import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button } from 'antd';
import { fetchArticles } from '../services/api';

const { Meta } = Card;

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1); // Default period is 1 day

  useEffect(() => {
    const getArticles = async () => {
      const fetchedArticles = await fetchArticles(period);
      setArticles(fetchedArticles);
    };
    getArticles();
  }, [period]); // Fetch articles whenever period changes

  const handlePeriodChange = async (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <>
      <h1 className='times' style={{textAlign:'center'}}>New York time </h1>
      <div style={{ marginBottom: '16px' }}>
        <Button type={period === 1 ? 'primary' : 'default'} onClick={() => handlePeriodChange(1)}>1 Day</Button>
        <Button type={period === 7 ? 'primary' : 'default'} onClick={() => handlePeriodChange(7)}>7 Days</Button>
        <Button type={period === 30 ? 'primary' : 'default'} onClick={() => handlePeriodChange(30)}>30 Days</Button>
      </div>
      <Row gutter={[16, 16]}>
        {articles.map(article => (
          <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/article/${article.id}`}>
              <Card
                hoverable
                cover={<img alt={article.title} src={article.media[0]?.['media-metadata'][2]?.url || 'https://via.placeholder.com/150'} />}
              >
                <Meta title={article.title} description={article.byline} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ArticlesList;
