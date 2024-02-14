import React from 'react'
import './scholarships.css'
import GoToTop from './GoToTop'
import { useNavigate } from 'react-router-dom'
import Menu from './Menu'
import axios from 'axios'
import { useState, useEffect } from 'react'

import API from '../Data/api.json'

// const json = [
//     {
//     "id":"1",
//     "amount":"8000",
//     "course_type":"Postgraduate",
//     "deadline":"2023-12-17"
// },
// {
//     "id":"2",
//     "amount":"8000",
//     "course_type":"Postgraduate",
//     "deadline":"2023-12-17"
// },
// {
//     "id":"3",
//     "amount":"8000",
//     "course_type":"Postgraduate",
//     "deadline":"2023-12-17"
// }
// ]

const Scholarships = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [image, setImage] = useState('')
    const [studyArea, setStudyArea] = useState('')
    const [courseType, setCourseType] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [tandC, setTandC] = useState('')


    const [scholarshipData, setScholarshipData] = useState([])
    // const [scholarshipsList, setScholarshipsList] = useState([])

    const scholarshipUrl = API[4].url

    const handleSubmit = () => {
        console.log(localStorage.getItem('token'))
        console.log("blah blah submitted!!!!!!")
        axios.get(scholarshipUrl

        )
            .then((res) => {
                // alert('successful')
                console.log(res.data)

                setScholarshipData(
                    res.data
                )

                console.log("--->", res.data[0]);

                setName(res.data.name)
                setAmount(res.data.amount)
                setImage(res.data.img)
                setStudyArea(res.data.studyArea)
                setCourseType(res.data.courseType)
                setDescription(res.data.description)
                setDeadline(res.data.deadline)
                setTandC(res.data.tandC)

            }).catch((err) => {
                console.log(err.response)
                alert(err.response.data.error.message)
            })
    }



    // const scholarshipInfo = (i) => {
    //     navigate('/scholarship',{state:scholarshipData[i]});
    //     console.log('helloooo', scholarshipData)
    // }


    useEffect(() => {
        handleSubmit()
    }, [])




    return (
        <>
            <Menu />
            <section className="scholarships_page">
                <div className="scholarship_landing">
                    <div className="scholarship_landing_left_container">
                        <p className="scholarship_landing_title">Find The Best Scholarship Information With Us</p>
                        <p className="scholarship_landing_subtitle">
                            Get the latest scholarship information from the university and the government.
                        </p>
                    </div>
                    <div className="scholarship_landing_right_container">
                        <img src="images/scholarship_landing.png" alt="scholarship" />
                    </div>

                </div>

                <div className="scholarship_list">


                    {
                        scholarshipData && scholarshipData.map((scholar, i) =>

                            <div className="scholarship_card" key={scholar.id}>
                                <div className="scholarship_card_left_container">
                                    <img src={image ? image : "images/scholarship_icon.png"} alt="scholar" className="scholarship_card_icon" />
                                </div>

                                <div className="scholarship_card_right_container">
                                    <p className="scholarship_title">
                                        {name ? name : 'Sports Quota'}
                                    </p>

                                    <p className="scholarship_subtitle">
                                        {description ? description : "blah blah"}
                                    </p>

                                    <p className="scholarship_type">
                                        {studyArea ? studyArea : 'Table Tennis'}
                                    </p>


                                </div>

                                <div className="scholarship_card_right_container2">
                                    <div className="scholarship_percentage">
                                        <p>{amount ? amount : '10%'}</p>
                                    </div>
                                    {/* <Link to={"/scholarship"}> */}
                                    <button className="scholarship_info" onClick={() => { navigate('/scholarship', { state: scholarshipData[i] }) }}>
                                        More Info
                                    </button>
                                    {/* </Link>s */}
                                </div>
                            </div>
                        )}

                </div>
            </section>

            <GoToTop />
        </>
    )
}

export default Scholarships