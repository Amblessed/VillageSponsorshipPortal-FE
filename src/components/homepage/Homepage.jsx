import React, {useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {ManifestoCard, manifestoStatements} from "../mission-manifesto/ManifestoCard";
import WhyIBuild from "../mission-manifesto/WhyIBuild";

const missionStatements = {
    en: "We believe every child deserves love, learning, and a future filled with hope. Through education and community support, we nurture dignity, purpose, and joy.",
    de: "Wir glauben, dass jedes Kind Liebe, Bildung und eine hoffnungsvolle Zukunft verdient. Durch Bildung und gemeinschaftliche Unterstützung fördern wir Würde, Sinn und Freude.",
    ig: "Anyị kwenyere na nwa ọ bụla kwesịrị ịhụnanya, mmụta, na ọdịnihu jupụtara na olileanya. Site n’akwụkwọ na nkwado obodo, anyị na-akwalite nsọpụrụ, ebumnuche, na ọṅụ."
};

const portalTexts = {
    en: {
        heading: "Welcome to our school and sponsorship portal",
        paragraph: `Here, every child is seen, valued, and given the chance to flourish. We believe education is more than lessons—it is love in action, dignity restored, and hope awakened. Through the partnership of sponsors and our community, children are gaining the tools to learn, dream, and build brighter futures. Join us in this work of transformation, where every gift becomes a story of possibility.`,
        button: "Sponsor a Child",
    },
    de: {
        heading: "Willkommen in unserem Schul- und Patenschaftsportal",
        paragraph: `Hier wird jedes Kind gesehen, geschätzt und erhält die Chance zu gedeihen. Wir glauben, dass Bildung mehr ist als Unterricht – sie ist gelebte Liebe, wiederhergestellte Würde und geweckte Hoffnung. Durch die Partnerschaft von Paten und unserer Gemeinschaft erhalten Kinder Werkzeuge zum Lernen, Träumen und zum Aufbau einer besseren Zukunft. Machen Sie mit bei dieser Arbeit der Veränderung, bei der jede Gabe zur Geschichte der Möglichkeiten wird.`,
        button: "Ein Kind unterstützen",
    },
    ig: {
        heading: "Nnọọ na ụlọ akwụkwọ anyị na ebe nkwado ụmụaka",
        paragraph: `N'ebe a, a na-ahụ nwa ọ bụla, a na-asọpụrụ ha, a na-enye ha ohere ịbawanye. Anyị kwenyere na agụmakwụkwọ karịrị mmụta—ọ bụ ịhụnanya n'ọrụ, nsọpụrụ e weghachiri, na olileanya e mụbara. Site n'ịkekọrịta n'etiti ndị nkwado na obodo anyị, ụmụaka na-enweta ngwaọrụ iji mụta, nrọ, ma wuo ọdịnihu ka mma. Bịa sonyere anyị n'ọrụ mgbanwe a, ebe onyinye ọ bụla ghọtara dị ka akụkọ nke ohere.`,
        button: "Nkwado Nwa",
    },
};

const HomePage = () => {
    const [language, setLanguage] = useState('en');

    return (
        <div className="min-h-screen flex flex-col">
            {/* Mission Header */}
            <header className="text-center py-8 bg-gradient-to-r from-blue-100 via-blue-50 to-teal-100">
                <h1 className="text-3xl font-bold text-gray-800">St. Damian Nursery and Primary School, Amandugba</h1>
                <p
                    key={language + "-mission"}
                    className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto whitespace-pre-line transition-opacity duration-700 opacity-100"
                >
                    {missionStatements[language]}
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                    <button onClick={() => setLanguage('en')}
                            className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇬🇧 English
                    </button>
                    <button onClick={() => setLanguage('de')}
                            className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇩🇪 Deutsch
                    </button>
                    <button onClick={() => setLanguage('ig')}
                            className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇳🇬 Igbo
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-teal-50 via-white to-green-100 py-12 px-4 text-center">
                <div className="max-w-xl mx-auto overflow-hidden rounded shadow-lg">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        interval={4000}
                        transitionTime={700}
                    >
                        {["children", "children_2", "children_3", "children_4"].map((img, index) => (
                            <div key={index}>
                                <img
                                    src={`/images/${img}.jpg`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-80 sm:h-96 md:h-[26rem] object-cover rounded"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                    {portalTexts[language].heading}
                </h2>
                <p className="text-gray-700 mt-2 max-w-xl mx-auto">
                    {portalTexts[language].paragraph}
                </p>
                <a
                    href="/sponsor"
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


            {/* Why I Build Section with Parallax */}
            <WhyIBuild language={language}/>

            {/* Quick Links */}
            <section
                className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <a href="/about" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">About Us</h3>
                    <p className="text-gray-600 mt-2">Learn about our school’s mission and values</p>
                </a>
                <a href="/pupils" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Meet Our Pupils</h3>
                    <p className="text-gray-600 mt-2">See the children waiting for sponsorship</p>
                </a>
                <a href="/contact" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Contact Us</h3>
                    <p className="text-gray-600 mt-2">Reach out or visit our school</p>
                </a>
                <a href="/register" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Register Child</h3>
                    <p className="text-gray-600 mt-2">Submit a child’s profile for sponsorship</p>
                </a>
                <a href="/admin" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-gray-800">Admin Dashboard</h3>
                    <p className="text-gray-600 mt-2">Admin Dashboard for maintenance</p>
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
