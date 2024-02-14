import React from 'react'
import Menu from './Menu'

import "./home.css"
import { Link } from 'react-router-dom'
import GoToTop from './GoToTop'

const Home = () => {
    return (

        <>
            <Menu />
            <section className="home_page">
                <div className="landing_img">
                    <div className="black_lay_over">

                        <div className="landing_content">
                            <h1>All University Services, One Click Away.</h1>
                        </div>
                    </div>
                </div>

                <div className="cards_section">
                    <div className="cards_title_and_img">
                        <div className="cards_title">
                            <h1>Be active at no cost</h1>
                            <div className="card_sub_text">
                                From academic clubs to sports, music, and volunteer opportunities, there's something for everyone. Joining clubs or student organizations fosters social connections and personal growth. These activities enhance the college experience and enrich personal development.
                            </div>
                        </div>
                        <div className="cards_img">
                            <img src="images/group-art.jpg" alt="" />
                        </div>
                    </div>

                    <div className="cards">
                        <div className="outer_card_layer card1">
                            <Link to={"/study-rooms"}>
                                <div className="info_button">
                                    <p>Study Room Service</p>
                                    <img src="/svg/arrow.svg" alt="" />
                                </div>
                            </Link>
                        </div>

                        <div className="outer_card_layer card2">
                            <Link to={"/events"}>
                                <div className="info_button">
                                    <p>Events & Activities</p>
                                    <img src="/svg/arrow.svg" alt="" />
                                </div>
                            </Link>
                        </div>

                        <div className="outer_card_layer card3">
                            <Link to={"/scholarships"}>
                                <div className="info_button">
                                    <p>Scholarships</p>
                                    <img src="/svg/arrow.svg" alt="" />
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>

            </section>


            <GoToTop />
        </>
    )
}

export default Home