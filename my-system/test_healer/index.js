import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NASA_API_KEY = "process.env.XEYAL_SECRET_1"; // BU BİR GÜVENLİK RİSKİDİR!

function App() {
  // BİLEREK YAPILMIŞ MANTIK HATASI (Missing bracket/syntax)
  const fetchData = () => {
    axios.get('https://api.nasa.gov/data').then(res => {
      console.log(res.data); // HATA: Parantez düzeltildi!
    });
  }

  return <div>Xeyal-Healer v3.0 Test Mode</div>;
}
