import React, { useEffect, useState } from "react";
import { WhyIBuildStatements } from "./WhyIBuildStatements";

const WhyIBuild = ({ language }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const statement = WhyIBuildStatements[language];
    const getTitle = (lang) => {
        const titles = {
            en: "Why I Build",
            de: "Warum ich baue",
            ig: "Ihe mere m ji wuo"
        };
        return titles[lang] || titles.en; // Fallback to English if language not found
    };

    const title = getTitle(language);

    const speakText = () => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(statement);
        const getLanguageCode = (lang) => {
            const languageMap = {
                'de': 'de-DE',
                'ig': 'ig-NG',
                'en': 'en-US'
            };
            return languageMap[lang] || 'en-US';
        };
        utterance.lang = getLanguageCode(language);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    useEffect(() => {
        stopSpeaking(); // Stop narration when language changes
    }, [language]);

    return (
        <section className="bg-gray-50 py-16 px-6">
            <div
                key={language + "-why"}
                className="max-w-4xl mx-auto text-center transition-opacity duration-700 opacity-100"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">{title}</h2>
                <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed font-serif">
                    {statement}
                </p>
                {<button
                    onClick={isSpeaking ? stopSpeaking : speakText}
                    className="mt-6 inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                >
                    {isSpeaking
                        ? language === "en"
                            ? "Stop Narration"
                            : language === "de"
                                ? "Erzählung stoppen"
                                : "Kwụsị ikwu"
                        : language === "en"
                            ? "Play Narration"
                            : language === "de"
                                ? "Erzählung abspielen"
                                : "Gụọ okwu"}
                </button>}
            </div>
        </section>
    );
};

export default WhyIBuild;
