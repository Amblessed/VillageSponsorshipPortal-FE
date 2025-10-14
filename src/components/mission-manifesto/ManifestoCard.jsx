import PropTypes from "prop-types";

export const manifestoStatements = {
    en: {
        beliefTitle: "🌾 Our Belief",
        designTitle: "🛠️ Our Design",
        promiseTitle: "🌟 Our Promise",
        belief: `We believe every child carries divine worth and untapped potential. Education is not just a system—it is a sacred invitation to grow, to be seen, and to be loved.`,
        design: `Our portal is designed with dignity in mind. Every dropdown, every field, every fallback message is crafted to honor real-life complexity and sponsor clarity.`,
        promise: `We promise to keep every story visible, every gift transparent, and every child surrounded by love and opportunity. This is our covenant of care.`,
    },
    de: {
        beliefTitle: "🌾 Unser Glaube",
        designTitle: "🛠️ Unser Design",
        promiseTitle: "🌟 Unser Versprechen",
        belief: `Wir glauben, dass jedes Kind göttlichen Wert und ungenutztes Potenzial in sich trägt. Bildung ist nicht nur ein System – sie ist eine heilige Einladung zu wachsen, gesehen zu werden und geliebt zu sein.`,
        design: `Unser Portal ist mit Würde gestaltet. Jeder Auswahlbereich, jedes Feld, jede Rückfallnachricht ist darauf ausgerichtet, die Komplexität des echten Lebens und die Klarheit für Sponsoren zu ehren.`,
        promise: `Wir versprechen, jede Geschichte sichtbar zu halten, jede Gabe transparent zu machen und jedes Kind mit Liebe und Möglichkeiten zu umgeben. Dies ist unser Versprechen der Fürsorge.`,
    },
    ig: {
        beliefTitle: "🌾 Okwukwe Anyị",
        designTitle: "🛠️ Nhazi Anyị",
        promiseTitle: "🌟 Nkwa Anyị",
        belief: `Anyị kwenyere na nwa ọ bụla nwere oke Chineke na ikike a na-apụghị ịtụ anya. Agụmakwụkwọ abụghị naanị usoro—ọ bụ oku nsọ iji too, ka a hụ ya, ka a hụ n'anya.`,
        design: `E mere portal anyị ka ọ na-asọpụrụ mmadụ. Dropdown ọ bụla, ubi ọ bụla, ozi ndabere ọ bụla—e mere ha ka ha kwanyere mgbagwoju anya nke ndụ na nghọta nke ndị nkwado.`,
        promise: `Anyị na-ekwe nkwa na akụkọ ọ bụla ga-adị n'anya, onyinye ọ bụla ga-adị n'ụzọ doro anya, na nwa ọ bụla ga-ejikọtara na ịhụnanya na ohere. Nke a bụ nkwa anyị nke nlekọta.`,
    },
};


export const ManifestoCard = ({ title, text, bgColor }) => (
    <div className={`${bgColor} p-6 rounded shadow`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">{text}</p>
    </div>
);


ManifestoCard.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    bgColor: PropTypes.string
};
