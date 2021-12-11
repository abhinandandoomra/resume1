import React from 'react'
import '../styles/Footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="footer__left">&copy; 2020 The Doctors.All Rights Reserved</div>
            <div className="footer__right">
                <div className="footer__rightlink">LEGAL ISSUES</div>
                <div className="footer__rightlink">CARRERS</div>
                <div className="footer__rightlink">REVIEWS</div>
                <div className="footer__rightlink">ABOUT</div>
                <div className="footer__rightlink">BLOG</div>
                <div className="footer__rightlink">UPDATES</div>
            </div>
        </div>
    )
}

export default Footer
