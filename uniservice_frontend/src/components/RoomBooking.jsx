import React, { useEffect, useState } from 'react'
import './roomBooking.css'
// import GoToTop from './GoToTop'
import axios from 'axios';

import API from '../Data/api.json'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import Menu from './Menu';

const RoomBooking = () => {


    const [roomAvailable, setRoomAvailable] = useState(true)
    const [roomsList, setRoomsList] = useState([]);

    const [date, setDate] = useState(new Date());
    var userDate = ""
    var userTime = ""

    const roomBookUrl = API[2].url

    const [clickedItem, setClickedItem] = useState(null);

    const handleCSS = (e) => {
        e.preventDefault();
        let selectedTag = e ? parseInt(e.target.id, 10) : null;
        setClickedItem(selectedTag);
        console.log(">> clickedItem", clickedItem);
    };

    const handleSubmit = () => {





        userDate = date.toLocaleTimeString().slice(0, 2)
        userTime = date.toLocaleDateString().slice(0, 2)

        console.log(userDate);
        console.log(userTime);

        console.log("blah blah submitted!!!!!!")
        axios.get(`${roomBookUrl}?date=2023-11-${userDate}&start_hour=${userTime}`, {
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                // alert('successful')

                // roomsList = (res.data)
                setRoomsList(res.data);
                setRoomAvailable(res.data.is_available)
                console.log("------> Api hit on click", res.data);


                // console.log("this is roomslist var",roomsList);

                // for (var i = 0; i < res.data.length; i++) {
                //     setRoomId(res.data[i].room_id)
                //     setRoomName(res.data[i].room_name)
                //     setRoomFloor(res.data[i].floor_level)
                //     setRoomDesc(res.data[i].description)
                //     setRoomCapacity(res.data[i].max_capacity)
                //     setRoomImage(res.data[i].image)
                //     setRoomAvailable(res.data[i].is_available)
                // }




            }).catch((err) => {
                console.log(err.response)
                alert(err.response.data.error.message)
            })
    }




    useEffect(() => {

        handleSubmit()
    }, []);

    return (
        <>
            <Menu />
            <section className="service_page">
                <div className="service_landing">
                    <div className="black_overlay">
                        <p>Remember, teamwork begins by building trust</p>
                    </div>
                </div>

                <div className="service_sort">

                    <DatePicker wrapperClassName="datePicker"
                        showTimeSelect
                        injectTimes={[
                            setHours(setMinutes(new Date(), 0), 10),
                            setHours(setMinutes(new Date(), 0), 12),
                            setHours(setMinutes(new Date(), 0), 14),
                            setHours(setMinutes(new Date(), 0), 16),
                            setHours(setMinutes(new Date(), 0), 18),
                            setHours(setMinutes(new Date(), 0), 20),
                            setHours(setMinutes(new Date(), 0), 22),
                        ]}

                        includeTimes={[
                            setHours(setMinutes(new Date(), 0), 8),
                            setHours(setMinutes(new Date(), 0), 9),
                            setHours(setMinutes(new Date(), 0), 10),
                            setHours(setMinutes(new Date(), 0), 11),
                            setHours(setMinutes(new Date(), 0), 12),
                            setHours(setMinutes(new Date(), 0), 13),
                            setHours(setMinutes(new Date(), 0), 14),
                            setHours(setMinutes(new Date(), 0), 15),
                            setHours(setMinutes(new Date(), 0), 16),
                            setHours(setMinutes(new Date(), 0), 17),
                            setHours(setMinutes(new Date(), 0), 18),
                            setHours(setMinutes(new Date(), 0), 19),
                            setHours(setMinutes(new Date(), 0), 20),
                            setHours(setMinutes(new Date(), 0), 21),
                            setHours(setMinutes(new Date(), 0), 22),


                        ]}

                        dateFormat=" yyyy-mm-d                        @ h aa "
                        selected={date}
                        includeDates={[new Date('2023-10-17'), new Date('2023-10-18'), new Date('2023-10-19'), new Date('2023-10-20'), new Date('2023-10-21'), new Date('2023-10-22')]}
                        onChange={date => setDate(date)} />




                    <button className="check_availability" onClick={handleSubmit}>
                        Check Availability
                    </button>
                </div>




                <div className="service_cards">
                    <div className="inner_service_cards">


                        {/* <div className="service_card">
                            <img src="images/study_room_1.jpg" alt="" />
                            <div className="room_data">
                                <p className="floor_num">Level: {roomFloor}</p>
                                <p className="room_num">Group Study {roomId}</p>
                                <p className="room_info">{roomDesc}</p>
                                <p className="room_size">Max Capacity: {roomCapacity} ppl</p>

                                <button className={roomAvailable ? "room_book room_available" : "room_book room_booked"}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div> */}

                        {
                            roomsList && roomsList.map((room, index) =>
                                <div className="service_card" key={room.room_id}>
                                    <img src="/images/study_room_1.jpg" alt="" />
                                    <div className="room_data">
                                        <p className="floor_num">Level: {room.floor_level}</p>
                                        <p className="room_num">Group Study {room.room_name}</p>
                                        <p className="room_info">{room.description}</p>
                                        <p className="room_size">Max Capacity: {room.max_capacity} ppl</p>

                                        <button

                                            onClick={handleCSS}
                                            id={index}
                                            className={index === clickedItem ? "room_book room_booked" : "room_book room_available"}>
                                            {roomAvailable ? "Booked" : "Book Now"}
                                        </button>
                                    </div>
                                </div>
                            )}



                        {/* {
                            roomsList && roomsList.map((data)=>
                            <div className="service_card">
                            <img src="images/study_room_1.jpg" alt="" />
                            <div className="room_data">
                                <p className="floor_num">Level: 2</p>
                                <p className="room_num">Group Study 2</p>
                                <p className="room_info">Students can book a study room for up to two hours a day. Bookings can be made up to two weeks in advance.Please comply with guidelines.</p>
                                <p className="room_size">Max Capacity: 8 ppl</p>

                                <button className="room_book room_available">
                                    Book Now
                                </button>
                            </div>
                        </div>
                            )
                        } */}


                        {/* <div className="service_card">
                            <img src="images/study_room_1.jpg" alt="" />
                            <div className="room_data">
                                <p className="floor_num">Level: 1</p>
                                <p className="room_num">Group Study 3</p>
                                <p className="room_info">Students can book a study room for up to two hours a day. Bookings can be made up to two weeks in advance.Please comply with guidelines.</p>
                                <p className="room_size">Max Capacity: 8 ppl</p>

                                <button className="room_book room_booked">
                                    Booked
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>

            </section>

            {/* <GoToTop /> */}
        </>
    )
}

export default RoomBooking