import React from "react";
import PropTypes from 'prop-types';

const missionstatements = {
    en: "We believe every child deserves love, learning, and a future filled with hope. Through education and community support, we nurture dignity, purpose, and joy.",
    de: "Wir glauben, dass jedes Kind Liebe, Bildung und eine hoffnungsvolle Zukunft verdient. Durch Bildung und gemeinschaftliche Unterstützung fördern wir Würde, Sinn und Freude.",
    ig: "Anyị kwenyere na nwa ọ bụla kwesịrị ịhụnanya, mmụta, na ọdịnihu jupụtara na olileanya. Site n’akwụkwọ na nkwado obodo, anyị na-akwalite nsọpụrụ, ebumnuche, na ọṅụ."
};

export const MissionHeader = ({ language, setLanguage }) => {
    return (
        <header className="text-center py-8 bg-gradient-to-r from-blue-100 via-blue-50 to-teal-100">
            <h1 className="text-3xl font-bold text-gray-800">St. Damian Nursery and Primary School, Amandugba</h1>
            <p
                key={language + "-mission"}
                className="text-lg text-gray-700 mt-2 max-w-3xl mx-auto whitespace-pre-line transition-opacity duration-700 opacity-100"
            >
                {missionstatements[language]}
            </p>
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={() => setLanguage('en')}
                    className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100 flex items-center space-x-2"
                >
                    <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f1ec-1f1e7.png" alt="UK Flag" className="w-5 h-5" />
                    <span>English</span>
                </button>
                <button
                    onClick={() => setLanguage('de')}
                    className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100 flex items-center space-x-2"
                >
                    <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f1e9-1f1ea.png" alt="German Flag" className="w-5 h-5" />
                    <span>Deutsch</span>
                </button>
                <button
                    onClick={() => setLanguage('ig')}
                    className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100 flex items-center space-x-2"
                >
                    <img src="https://twemoji.maxcdn.com/v/latest/72x72/1f1f3-1f1ec.png" alt="Nigerian Flag" className="w-5 h-5" />
                    <span>Igbo</span>
                </button>
            </div>
        </header>
    );
};

MissionHeader.propTypes = {
    language: PropTypes.oneOf(['en', 'de', 'ig']).isRequired,
    setLanguage: PropTypes.func.isRequired
};