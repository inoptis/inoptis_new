import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHelmet = ({ title, description, keywords, url, image }) => {
  return (
    <Helmet>
      {/* Заголовок страницы */}
      <title>{title}</title>
      {/* Основные метатеги */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />

      {/* Open Graph теги */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default SEOHelmet;
