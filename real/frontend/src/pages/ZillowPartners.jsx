import React from 'react';
import '../styles/ZillowPartners.css';

const industries = [
  {
    title: "I'm an agent or broker",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Agent-2x-1be0e4.png'
  },
  {
    title: "I'm a property manager",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Property-manager-2x-865bcd.png'
  },
  {
    title: "I'm a landlord",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Landlord-2x-14539b.png'
  },
  {
    title: "I'm a lender or loan officer",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Lender-2x-2c744a.png'
  },
  {
    title: "I'm a builder",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Builder-2x-d8b9c6.png'
  },
  {
    title: "I am a brand or local advertiser",
    img: 'https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Brand-advertiser-2x-ba73a6.png'
  }
];

const ZillowPartners = () => {
  return (
<div className="zillow-partners animate__animated animate__fadeIn">
  <h1 className="animate__animated animate__fadeInDown">Partner with Zillow to Grow Your Business</h1>
  <p className="animate__animated animate__fadeIn animate__delay-1s">
    Reach millions of buyers, sellers and renters across the U.S. on the leading real estate website.
  </p>

  <h2 className="animate__animated animate__fadeInUp animate__delay-2s">
    Select your industry to get started
  </h2>

  <div className="industry-grid">
    {industries.map((item, index) => (
      <div className="industry-card animate__animated animate__zoomIn animate__delay-1s" key={index}>
        <img src={item.img} alt={item.title} />
        <p>{item.title}</p>
        <button>Get started</button>
      </div>
    ))}
  </div>

  <div className="partners-logos animate__animated animate__fadeInUp animate__delay-2s">
    <img
      src="https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/Zillow_Sites2x-cd3144-c697dc-fbb28e-1440x77.png"
      alt="Zillow partner sites"
    />
  </div>

  <div className="audience-section animate__animated animate__fadeIn">
    <h2 className="animate__animated animate__fadeInUp animate__delay-1s">Zillow Group Audience</h2>
    <div className="audience-grid">
      <div className="audience-box animate__animated animate__fadeInLeft">
        <img
          src="https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/42-1ae07b-392e2d.png"
          alt="Buy or sell"
        />
        <p><strong>41%</strong> to buy or sell</p>
        <p>Zillow's audience includes serious buyers and sellers who are actively searching for their next home.</p>
      </div>

      <div className="audience-box animate__animated animate__zoomIn animate__delay-1s">
        <img
          src="https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/32M-de7e86-72e8ff.png"
          alt="Reach"
        />
        <p><strong>194 million</strong></p>
        <p>Monthly users across our network of leading real estate sites.</p>
      </div>

      <div className="audience-box animate__animated animate__fadeInRight animate__delay-2s">
        <img
          src="https://blog-media.dev.zg-core.com/bedrock/app/uploads/sites/11/2023/01/42-1ae07b-392e2d.png"
          alt="Rental network"
        />
        <p><strong>Most viewed rental network</strong></p>
        <p>Zillow powers the most visited rental network in the U.S.</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default ZillowPartners;
