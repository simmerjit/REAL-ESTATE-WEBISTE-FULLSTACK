import React, { useState } from "react";
import styles from "../styles/SellRentForm.module.css";

const SellRentForm = () => {
  const [mode, setMode] = useState("sell");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    imageUrl: "",
    description: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`https://real-estate-webiste-fullstack.onrender.com/${mode}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(`POSTing to: https://real-estate-webiste-fullstack.onrender.com/${mode}/upload`);

    const data = await response.json();
    console.log("✅ Property posted:", data);
    alert("Property successfully posted!");

    // Reset form after submit
    setFormData({
      title: "",
      price: "",
      address: "",
      imageUrl: "",
      description: "",
      lat: "",
      lng: "",
    });
  } catch (error) {
    console.error("❌ Error posting property:", error);
    alert("Failed to post property");
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{mode === "sell" ? "Sell a Property" : "Rent a Property"}</h2>
        <button onClick={() => setMode(mode === "sell" ? "rent" : "sell")}>
          Switch to {mode === "sell" ? "Rent" : "Sell"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Property Description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className={styles.row}>
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={formData.lat}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={formData.lng}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Post Property
        </button>
      </form>
    </div>
  );
};

export default SellRentForm;
