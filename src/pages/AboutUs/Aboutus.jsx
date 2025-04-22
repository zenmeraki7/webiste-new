import React from 'react';
import Header from '../../components/Header';
import { FaRobot, FaAccessibleIcon, FaLightbulb, FaWifi } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './About.css';

// Import images
import vision from '../../assets/images/vision.jpg';
import working from '../../assets/images/working.jpg';
import wfh from '../../assets/images/wfh.jpg';
import meeting from '../../assets/images/meeting.jpg';
import handshake from '../../assets/images/handshake.jpg';
import Footer from '../../components/Footer';

function AboutUs() {
    const navigate = useNavigate();
    const handleAbout = () => {
        navigate("/contact");
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-pattern"></div>
                <motion.div
                    className="container text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        In a World of Possibilities, <br /> We Create Limitless Opportunities
                    </h1>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p className="hero-subtitle">
                                Welcome to <span className="accent-text">Zen Meraki</span>, where passion meets purpose, and innovation ignites success.
                                We are more than a team – we are dreamers, doers, and creators, forging the path to
                                extraordinary growth. With every project, we craft stories of transformation, turning
                                visions into vibrant realities.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Vision Card - Now overlapping with hero section */}
            <div className="container">
                <motion.div
                    className="vision-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2 className="section-title">
                                OUR VISION
                                <div className="title-underline"></div>
                            </h2>
                            <p className="vision-text">
                                To create a world where businesses are not limited by
                                convention but inspired by possibility.
                            </p>
                        </div>
                        {/* <div className="col-md-6">
              <img 
                src={meeting} 
                alt="Team meeting" 
                className="img-fluid rounded vision-image" 
              />
            </div> */}
                    </div>
                </motion.div>
            </div>

            {/* Images section with enhanced layout */}
            <section className="story-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="row align-items-center g-4">
                            <div className="col-lg-6">
                                <h2 className="section-title with-line">
                                    Our Story
                                    <div className="title-underline left"></div>
                                </h2>
                                <p className="story-text">
                                    A small team with big dreams, fueled by relentless drive and an unshakable belief in the power of innovation. From humble beginnings, we've grown into a force that empowers businesses to break boundaries and achieve the impossible.
                                </p>

                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values section */}
            <section className="values-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title centered">
                            Our Core Values
                            <div className="title-underline center"></div>
                        </h2>
                        <p className="section-subtitle">
                            These principles guide everything we do, from how we design solutions to how we interact with our clients.
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {/* Value Card 1 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="value-card">
                                <div className="value-icon">
                                    <FaRobot size={28} />
                                </div>
                                <h5 className="value-title">
                                    Passion
                                </h5>
                                <p className="value-description">
                                    The fire that drives us to go above and beyond, weaving creativity into every solution
                                </p>
                            </div>
                        </div>

                        {/* Value Card 2 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="value-card">
                                <div className="value-icon">
                                    <FaAccessibleIcon size={28} />
                                </div>
                                <h5 className="value-title">
                                    Dedication
                                </h5>
                                <p className="value-description">
                                    The backbone of our success, ensuring no detail is too small and no challenge too great.
                                </p>
                            </div>
                        </div>

                        {/* Value Card 3 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="value-card">
                                <div className="value-icon">
                                    <FaLightbulb size={28} />
                                </div>
                                <h5 className="value-title">
                                    Professionalism
                                </h5>
                                <p className="value-description">
                                    The promise we make to uphold excellence, integrity, and quality at every turn.
                                </p>
                            </div>
                        </div>

                        {/* Value Card 4 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="value-card">
                                <div className="value-icon">
                                    <FaWifi size={28} />
                                </div>
                                <h5 className="value-title">
                                    Collaboration
                                </h5>
                                <p className="value-description">
                                    We believe that the best results are born from the synergy of diverse teams working together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Exist section */}
            <section className="why-section">
                <div className="background-circle"></div>

                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <motion.div
                                className="why-content"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.7 }}
                            >
                                <h2 className="section-title with-line">
                                    Why We Exist
                                    <div className="title-underline left"></div>
                                </h2>
                                <p className="why-text">
                                    Because we believe in the power of stories. Your business has one, and we are here to help you tell it – boldly, beautifully, and brilliantly.
                                </p>
                                <p className="why-text">
                                    We exist to push the boundaries of what's possible and to reimagine success with you. Every business deserves a chance to shine in its unique way, and our purpose is to illuminate that path.
                                </p>
                            </motion.div>
                        </div>

                        <div className="col-lg-6">
                            <motion.div
                                className="approach-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                <h3 className="approach-title">
                                    Our Approach
                                </h3>
                                <ul className="approach-list">
                                    <motion.li
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        <strong>Listen</strong>: We begin by understanding your unique challenges and aspirations.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                    >
                                        <strong>Design</strong>: We craft solutions that align with your vision and exceed expectations.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.3, delay: 0.5 }}
                                    >
                                        <strong>Develop</strong>: We bring ideas to life with precision, passion, and technical excellence.
                                    </motion.li>
                                    <motion.li
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.3, delay: 0.6 }}
                                    >
                                        <strong>Deliver</strong>: We ensure flawless implementation and support every step of the way.
                                    </motion.li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="service-pattern"></div>

                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-5"
                    >
                        <h2 className="section-title light centered">
                            WHAT WE DO
                            <div className="title-underline center"></div>
                        </h2>
                        <p className="section-subtitle light">
                            We transform visions into reality through innovative solutions and strategic execution.
                        </p>
                    </motion.div>

                    <div className="services-container">
                        {/* Service Card 1 */}
                        <motion.div
                            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="service-card"
                        >
                            <div className="service-icon">
                                <span>✨</span>
                            </div>
                            <h4 className="service-title">
                                We Design Dreams
                            </h4>
                            <p className="service-description">
                                Crafting bespoke apps and digital solutions that elevate businesses to the next level.
                            </p>
                        </motion.div>

                        {/* Service Card 2 */}
                        <motion.div
                            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="service-card"
                        >
                            <div className="service-icon">
                                <span>🏆</span>
                            </div>
                            <h4 className="service-title">
                                We Build Legacies
                            </h4>
                            <p className="service-description">
                                Creating strategies that leave a mark, driving growth that stands the test of time.
                            </p>
                        </motion.div>

                        {/* Service Card 3 */}
                        <motion.div
                            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="service-card"
                        >
                            <div className="service-icon">
                                <span>🚀</span>
                            </div>
                            <h4 className="service-title">
                                We Empower Visionaries
                            </h4>
                            <p className="service-description">
                                Equipping businesses with tools, insights, and innovation to lead in a competitive world.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

           <Footer/>
        </>
    );
}

export default AboutUs;