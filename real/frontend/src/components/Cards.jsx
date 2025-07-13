import React from 'react';
import '../styles/Card.css'; // ✅ Correct path based on your folder structure



const Cards = () => {
  const cards = [
    {
      img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/5/2024/04/homepage-spot-agent-lg-1.webp',
      title: 'Buy a home',
      desc: 'Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.',
      button: 'Browse homes',
    },
    {
      img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/5/2024/04/homepage-spot-sell-lg-1.webp',
      title: 'Sell a home',
      desc: 'No matter what path you take to sell your home, we can help you navigate a successful sale.',
      button: 'See your options',
    },
    {
      img: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/5/2024/04/homepage-spot-rent-lg-1.webp',
      title: 'Rent a home',
      desc: 'We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.',
      button: 'Find rentals',
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.img} alt={card.title} className="card__img" />
          <h3 className="card__title">{card.title}</h3>
          <p className="card__desc">{card.desc}</p>
          <button className="card__btn">{card.button}</button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
