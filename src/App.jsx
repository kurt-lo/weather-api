import React, { useState } from 'react';
import Header from './components/Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import clouds from './assets/clouds.jpg'

const App = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${search}&key=f993031a28854d0193594908232906`)
      setWeatherData(response.data)
      console.log(response.data)
    } catch (error) {
      setSearch('');
      console.error(`Error fetching weather ${error}`)
      toast.error('Location not found. Please try again.');
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />
      <section className='mt-[2rem] container mx-auto'>
        <div className=''>
          <img 
          src={clouds} 
          alt="clouds" 
          className='h-[250px] w-[1000px] rounded-[100px] mx-auto'
          />
        </div>
        <div className='mt-[2rem] flex justify-end gap-[1rem] mr-[20rem]'>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className='border-2 border-solid border-gray-500 p-[.5rem] rounded-lg font-[500] text-gray-500'
          />
          <button
            type="button"
            onClick={handleSubmit}
            className='py-[.5rem] px-[2rem] bg-blue-300 text-gray-700 rounded-lg font-[700] hover:text-black hover:bg-gray-200'
          >
            Submit
          </button>
        </div>
        <div>
          {weatherData && (
            <div>
              <p>{weatherData.location.name}</p>
              <p>{weatherData.location.country}</p>
              <p>{formatDate(weatherData.location.localtime)}</p>
              <p>{weatherData.current.temp_c}</p>
              <p>{weatherData.current.temp_f}</p>
              <p>{weatherData.current.condition.text}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default App;
