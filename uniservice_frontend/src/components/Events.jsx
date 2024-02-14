import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "./event.css"
import GoToTop from './GoToTop'
import Menu from './Menu'
import { useNavigate } from 'react-router-dom'

import API from '../Data/api.json'

const Events = () => {
    const navigate = useNavigate();

    const eventsUrl = API[3].url;

    const [events, setEvents] = useState([])
    const [eventDay, setEventDay] = useState("")
    const [eventMonth, setEventMonth] = useState("")

    const handleSubmit = () => {
        // e.preventDefault()
        console.log("blah blah submitted!!!!!!")
        axios.get(eventsUrl, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                // alert('successful')
                console.log(res.data)

                setEvents(res.data)
                setEventDay(
                    // console.log(res.data[0].event_date.toString().slice(-2));
                    res.data[0].event_date.toString().slice(-2)
                )
                setEventMonth(

                    getMonthName(res.data[0].event_date.slice(4, 6))

                )

                // for (var i = 0; i < res.data.length; i++) {
                //     setName(res.data[i].name)
                //     setDescription(res.data[i].description)
                //     setImage(res.data[i].img)
                //     setLocation(res.data[i].location)
                //     setDate(res.data[i].date)
                //     setTime(res.data[i].time)

                // }

            }).catch((err) => {
                console.log(err.response)
                alert(err.response.data.error.message)
            })
    }

    function getMonthName(monthNumber) {
        const date = new Date(2023, monthNumber - 1, 1); // Month number is 0-based, so we subtract 1
        const monthName = date.toLocaleString('default', { month: 'long' });
        return monthName;
    }

    useEffect(() => {
        // e.preventDefault()
        handleSubmit()
    }, []);

    function handleRegister() {
        alert("You've successfully registered!")
        navigate('/home');
    }



    return (
        <>
            <Menu />
            <section className="event_page">
                <div className="event_landing">
                    <div className="event_landing_img">
                        <div className="image_black_layover">
                            <div className="left_angle">
                                <div className="left_angle_border">
                                    <div className="left_angle_text">
                                        <p>
                                            Join Us For An Unforgettable Event Experience!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event_list">
                    {
                        events && events.map((event) =>


                            <div className="event" key={event.id}>
                                <div className="event_img_layover">
                                    <p className='event_title'>{event.name}</p>
                                    <p className="event_discription">{event.description.substring(0, 150) + "."}</p>

                                    <div className="event_details">
                                        <div className="event_date">
                                            <p className='event_day'>{eventDay}</p>
                                            <p className='event_month'>{eventMonth}</p>
                                        </div>

                                        <div className="event_details_right_container">
                                            <div className="event_location">
                                                <img src="svg/location.svg" alt="" />
                                                <p>{event.location}</p>

                                            </div>
                                            <div className="event_timings">
                                                {/* <input type="text" className="user_name" placeholder='Student ID' />

                                        <input type="text" className="user_name" placeholder='Phone' /> */}

                                                <img src={"svg/event_time.svg"} alt="" />
                                                <p>{event.event_time}</p>
                                            </div>

                                            <button className="event_register" onClick={handleRegister}>
                                                Register
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    }


                </div>
                <GoToTop />
            </section>
        </>
    )
}

export default Events