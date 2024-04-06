'use client'
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'electronics', 'jewelery', 'men clothing', 'women clothing'];

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);


  function handleCategoryChange(category) {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
      setFilteredProducts(filtered);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Home Page</h1>
        <div className="all-card-wrapper">
          <div className={styles.filter}>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className={styles.cardwrapper}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.card}>
                <div className={styles.img}>
                  <Image
                    className={styles.image}
                    src={product.image}
                    alt={product.title}
                    width={356}
                    height={262}
                  />
                </div>
                <div className="text">
                  <div className={styles.onetext}>
                    <h2>{product.category}</h2>
                  </div>
                  <div className={styles.twotext}>
                    <h3>{product.title}</h3>
                  </div>
                  <div className={styles.sana}>
                    <h3>{product.date}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
