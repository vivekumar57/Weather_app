import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { FaGithub } from "react-icons/fa";
import '../App.css';
import { FaWind } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { CiCloudOn } from "react-icons/ci";

import axios from 'axios';


const Card = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    const d = new Date();
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const formattedDate = `${day} ${month}`;
    const date = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);


    const [city, setCity] = useState('');
    const [temp, setTemp] = useState('')
    const [name, setName] = useState('');
    const [feelLike, setFeelLike] = useState('');
    const [wind, setWind] = useState('');
    const [humidity, setHumidity] = useState('');
    const [clouds, setClouds] = useState('');
    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState('');
    const [desc, setDesc] = useState('');
    const [other, setOther] = useState('');
    const [country, setCountry] = useState('');
    const [loader, setLoader] = useState(false);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=60cc857031bbb3f0bc76c880a6b84870`
    const weatherConditionUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`



    async function handleSubmit() {
        setLoader(true);
        try {
            const response = await axios.get(apiUrl);
            setName(response.data.name);
            setTemp(Math.round(response.data.main.temp - 273.15));
            setFeelLike(Math.round(response.data.main.feels_like - 273.15))
            setHumidity(response.data.main.humidity);
            setClouds(response.data.clouds.all);
            setWind(response.data.wind.speed);
            setDesc(response.data.weather[0].main);
            setIcon(response.data.weather[0].icon);
            setOther(response.data.weather[0].description);
            setCountry(response.data.sys.country);
            setShow(true);
            setCity('');
            setTimeout(() => {
                setLoader(false);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='glass-effect p-5 rounded-lg flex flex-col'>
            <div className='flex justify-between items-center'>
                <img src={Logo} alt='' className='h-5 w-15' />
                <p className='text-sm text-gray-700 italic'>{todayDate} {formattedTime} GMT</p>
                <a href='https://github.com/vivekumar57/weather_app'><FaGithub size={28} /></a>
            </div>
            <div className='flex items-center mt-10 gap-3'>
                <input
                    type='text'
                    placeholder='Enter the location'
                    className={`w-10/12 p-2 rounded-lg focus:outline-none md:w-10/12`}
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                />
                <button className='bg-blue-800 p-2 rounded-lg w-1/4 md:w-1/4 font-semibold mt-3 md:mt-0' onClick={handleSubmit}>
                    Search
                </button>
            </div>
            {
                show && (
                    <>
                        {
                            loader ?
                                <div className='flex justify-center items-center mt-10'>
                                    <span class="loader"></span>
                                </div> :
                                <>
                                    <div className='flex items-center justify-center mt-10 flex-col'>
                                        <div>

                                            <h2 className='font-medium text-gray-700 text-lg'>CURRENT WEATHER</h2>
                                        </div>
                                        <div className='flex items-center justify-center gap-32 mt-8'>
                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-black text-xl'>{name}, {country}</h2>
                                                <p className='text-sm text-gray-700'>Today, {formattedDate}</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-black text-xl flex items-center justify-center'>{temp} <TbTemperatureCelsius size={20} /></h2>
                                                <p className='text-sm text-gray-700'>{desc}</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <img src={weatherConditionUrl} alt='' />
                                                <p className='text-sm text-gray-700 capitalize'>{other}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center mt-10 flex-col'>
                                        <div>

                                            <h2 className='font-medium text-gray-700 text-lg'>AIR CONDITION</h2>
                                        </div>
                                        <div className='flex items-center gap-32 mt-8'>
                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-gray-700 text-lg flex justify-center items-center gap-1'><CiTempHigh size={20} />Real Feel</h2>
                                                <p className='text-base text-black flex justify-center items-center font-semibold'>{feelLike} <TbTemperatureCelsius size={20} /></p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-gray-700 text-lg flex items-center justify-center gap-1'><FaWind size={20} /> Wind</h2>
                                                <p className='text-base text-black font-semibold'>{wind} m/s</p>
                                            </div>

                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-gray-700 text-lg flex items-center justify-center gap-1'><CiCloudOn size={25} /> Clouds</h2>
                                                <p className='text-base text-black font-semibold'>{clouds}%</p>
                                            </div>
                                            <div className='flex flex-col items-center'>
                                                <h2 className='font-medium text-gray-700 text-lg flex items-center justify-center gap-1'><WiHumidity size={25} /> Humidity</h2>
                                                <p className='text-base text-black font-semibold'>{humidity}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }

                    </>
                )
            }

        </div>
    );
}

export default Card;
