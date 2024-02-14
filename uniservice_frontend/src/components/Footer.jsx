import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

const footer = () => {
    return (
        <>
            <section className="footer_page">
                <div className="footer_row1">

                    <div className="footer_col col1">
                        <Link to={"/"}>
                            <img src="images/logo.png" alt="" className="footer_logo" />
                        </Link>
                    </div>

                    <div className="footer_col col2">
                        <p className="link_heading">Quick links</p>
                        <div className="links">
                            <Link to={"/study-rooms"}>
                                <p className="quick_links">Room booking</p>
                            </Link>
                            <Link to={"/events"}>
                                <p className="quick_links">Events</p>
                            </Link>
                            <Link to={"/scholarships"}>
                                <p className="quick_links">Scholarships</p>
                            </Link>
                        </div>
                    </div>

                    <div className="footer_col col3">
                        <p className="link_heading">Get in touch</p>
                        <div className="links">
                            <p className="quick_links">Contact</p>
                            <Link to={"/accordion"}><p className="quick_links">Faq</p></Link>
                        </div>
                    </div>
                </div>

                <div className="footer_row2">
                    <hr />
                    <p>&copy; 2023 | Designed and Developed by <a href='/'>7BlindMice</a> </p>
                </div>

            </section>
        </>
    )
}

export default footer