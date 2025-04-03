import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to fetch');

      let data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* Carousel */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
            </div>
          </div>

          {["https://media.istockphoto.com/id/511484502/photo/double-cheese-and-bacon-cheeseburger.webp?a=1&b=1&s=612x612&w=0&k=20&c=Us0joN2d51ced9vo3zcDjJLID_p_INwtS2rTa-SLWZQ=",
            "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzdHJ5fGVufDB8fDB8fHww",
            "https://media.istockphoto.com/id/1451694385/photo/woman-in-the-kitchen-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=LO_WMjnXG8zfI3XLFNBwYPKhiUFZeP8nEpS8hIlkGLA="]
            .map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={img} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="carousel" />
              </div>
            ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories & Items */}
      <div className='container'>
        {foodCat.length > 0 ? foodCat.map((data, catIndex) => (
          <div key={catIndex} className='row mb-3'>
            <div className='fs-3 m-3'>{data.CategoryName}</div>
            <hr style={{ height: "4px", backgroundImage: "linear-gradient(to left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />

            {foodItems.length > 0 ? foodItems.filter(
              (item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
            ).map((filteredItem, itemIndex) => (
              <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
              </div>
            )) : <div>No Data Available</div>}
          </div>
        )) : <div>Loading...</div>}
      </div>

      <Footer />
    </div>
  );
}
