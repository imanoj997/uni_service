import React from 'react'
import './scholarship.css'
import GoToTop from './GoToTop'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import { useLocation, useNavigate } from 'react-router-dom'

const Scholarship = () => {
    var navigate = useNavigate();
    var data = useLocation()
    var item = data.state;
    console.log('---->>>>>>>>>>', item.name)
    var con = item.description.split('.');
    console.log(con);



    // console.log("helllo ",item.data.name);

    return (
        <>
            <Menu />

            <section className="scholarship_page">
                <div className="go_back">

                    <div className="go_back_circle"><Link to={"/scholarships"}><img src="svg/go_back.svg" alt="" /></Link></div>
                </div>

                <div className="scholarship_headings">
                    <p className="scholarship_info_title">
                        {item.name}
                    </p>
                    <p className="scholarship_info_subtitle">
                        {item.name}

                    </p>
                </div>


                <div className="scholarship_inner_container2">
                    <img src="images/scholarship.jpg" alt="" />
                    <div className="scholarship_data_container">
                        <div className="scholarship_key_points">
                            <img src="svg/check.svg" alt="" />
                            <p> {con[0]}</p>
                        </div>
                        <div className="scholarship_key_points">
                            <img src="svg/check.svg" alt="" />
                            <p>{con[1]}</p>
                        </div>
                        <div className="scholarship_key_points">
                            <img src="svg/check.svg" alt="" />
                            <p>{con[2]}</p>
                        </div>

                        <span onClick={() => {
                            alert("You've successfully claimed the scholarship!");
                            navigate('/home')
                        }}>
                            Claim Now!
                        </span>
                    </div>
                </div>

            </section>

            <GoToTop />
        </>
    )
}

export default Scholarship

// FFDEAD