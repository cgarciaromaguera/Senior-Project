import React from "react";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Default styling
import "slick-carousel/slick/slick-theme.css"; // Theme styling
import './Learn.css';
import logo from './logo2.png';
import { Link } from 'react-router-dom';

class Learn extends React.Component {
  // State can include learn-specific content, like articles or videos
  state = {
    articles: [
        {
            title: "Investing 101",
            summary: "An introduction to investing.",
            url: "https://www.nerdwallet.com/article/investing/investing-101"
        },
        {
            title: "How to Invest in Stocks",
            summary: "Your guide to investing in stocks.",
            url: "https://www.nerdwallet.com/article/investing/how-to-invest-in-stocks"
        },
        {
            title: "How to Buy and Sell Stocks",
            summary: "Learn how with this step-by-step guide.",
            url: "https://www.nerdwallet.com/article/investing/how-to-buy-stocks"
        }
    ],
    loading: false
  };

  // Assuming you'd fetch educational content instead of stocks
  async componentDidMount() {
    // Fetch your educational content here
    // Set the state with the fetched content
    try {
        // Example: Fetch articles or educational content from an API
        const response = await fetch('https://api.example.com/educational-content');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.setState({ articles: data, loading: false });
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        // You might want to handle the error state as well
        this.setState({ loading: false });
      }
  }

  render() {
    // Slider settings can be customized as needed
    const sliderSettings = {
      dots: true, // Shows dot indicators at the bottom of the slider
      infinite: true, // Infinite looping
      speed: 500, // Animation speed
      slidesToShow: 1, // Number of slides to show at once
      slidesToScroll: 1 // Number of slides to scroll at once
    };
  
    return (
      <div className='learn'>
        <div className='header'>
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/account" style={{ textDecoration: 'none' }}> 
          <h10 className="account">Account</h10>
          </Link>
        </div>
  
        <div className="navigationBar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className='home-header'>Home</h1>
          </Link>
          <Link to="/mock-trading" style={{ textDecoration: 'none' }}>
            <h1 className='mocktrade-header'>Your Stocks</h1>
          </Link>
          <Link to="/learn" style={{ color: 'black' }}>
            <h1 className='learn-header active'>Learn</h1>
          </Link>
        </div>
  
        <div className="learn-content-slider">
          {/* Slider component wrapping your slides */}
          <Slider {...sliderSettings}>
            {this.state.articles.map((article, index) => (
              <div key={index} className="slide">
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }  
}

export default Learn;
