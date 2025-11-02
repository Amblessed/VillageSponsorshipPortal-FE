import React, {useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {portalTexts} from "./portaltext/portalTexts";
import {MissionHeader} from "./missionHeader";
import ImageCarousel from "./ImageCarousel";


const HomePage = () => {
    const [language, setLanguage] = useState('en');
    const imageCount = 11; // Set a high enough number
    const images = Array.from({ length: imageCount }, (_, i) => `stdamian_${i + 1}.png`);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Mission Header */}
            <MissionHeader language={language} setLanguage={setLanguage} />

            <section className="bg-white py-12 px-4">
                <ImageCarousel images={images} />
            </section>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-teal-50 via-white to-green-100 py-12 px-4 text-center">

                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                    {portalTexts[language].heading}
                </h2>
                <p className="text-gray-700 mt-2 max-w-xl mx-auto">
                    {portalTexts[language].paragraph}
                </p>
                <a
                    href="/sponsor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
                >
                    {portalTexts[language].button}
                </a>
            </section>


            {/* Our Belief Manifesto Section - Side by Side */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <ManifestoCard
                        title={manifestoStatements[language].beliefTitle}
                        text={manifestoStatements[language].belief}
                        bgColor="bg-blue-50"
                    />
                    <ManifestoCard
                        title={manifestoStatements[language].designTitle}
                        text={manifestoStatements[language].design}
                        bgColor="bg-teal-50"
                    />
                    <ManifestoCard
                        title={manifestoStatements[language].promiseTitle}
                        text={manifestoStatements[language].promise}
                        bgColor="bg-green-50"
                    />
                </div>
            </section>


           {/*  Why I Build Section with Parallax
            <WhyIBuild language={language}/>*/}

            {/* Quick Links */}
            <section
                className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <a href="/about" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">About Us</h3>
                    <p className="text-gray-600 mt-2">Learn about our school’s mission and values</p>
                </a>
                <a href="/pupils" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Meet Our Pupils</h3>
                    <p className="text-gray-600 mt-2">Meet the children whose journeys you can help shape</p>
                </a>
                <a href="/register" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Register Pupil</h3>
                    <p className="text-gray-600 mt-2">Register a pupil to be seen, known, and supported with care</p>
                </a>
                <a href="/admin" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Admin Dashboard</h3>
                    <p className="text-gray-600 mt-2">Admin Dashboard for maintenance</p>
                </a>
                <a href="/creations" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Pupil Creations</h3>
                    <p className="text-gray-600 mt-2">Explore drawings, poems, and projects from our pupils</p>
                </a>
                <a href="/contact" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Contact Us</h3>
                    <p className="text-gray-600 mt-2">Reach out or visit our school</p>
                </a>
                <a href="/donate" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Donate to Us</h3>
                    <p className="text-gray-600 mt-2">See what areas you can donate</p>
                </a>
                <a href="/analytics" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Analytics</h3>
                    <p className="text-gray-600 mt-2">Track pupil demographics, village reach, and where your support creates lasting impact</p>
                </a>
            </section>

            {/* Footer */}
            <footer
                className="bg-gradient-to-r from-blue-100 via-green-100 to-teal-100 py-6 text-center text-gray-700 mt-auto">
                <p>&copy; {new Date().getFullYear()} St. Damian Nursery and Primary School, Amandugba. All rights
                    reserved.</p>
                <p className="mt-2">Built with love and purpose by our community</p>
            </footer>
        </div>
    );
};

export default HomePage;
