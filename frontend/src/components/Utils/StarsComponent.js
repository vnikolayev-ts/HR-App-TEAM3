import React from 'react';

const StarsComponent = ({ value }) => {
  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (i <= value) {
        stars.push(
          <span 
            className="star_full" 
            key={i} 
            style={{ color: 'gold', fontSize: 45, textShadow: '2px 2px 2px rgba(0,0,0,0.4)' }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'red'}
            onMouseOut={(e) => e.target.style.backgroundColor = ''}
          >
            ★
          </span>
        );
      } else {
        stars.push(
          <span 
            className="star_empty" 
            key={i} 
            style={{ color: 'silver', fontSize: 45 }}
          >
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="stars">
      {renderStars(value)}
    </div>
  );
};

export default StarsComponent;

