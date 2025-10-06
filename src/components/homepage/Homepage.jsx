import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const missionStatements = {
  en: "We believe every child deserves love, learning, and a future filled with hope. Through education and community support, we nurture dignity, purpose, and joy.",
  de: "Wir glauben, dass jedes Kind Liebe, Bildung und eine hoffnungsvolle Zukunft verdient. Durch Bildung und gemeinschaftliche Unterstützung fördern wir Würde, Sinn und Freude.",
  ig: "Anyị kwenyere na nwa ọ bụla kwesịrị ịhụnanya, mmụta, na ọdịnihu jupụtara na olileanya. Site n’akwụkwọ na nkwado obodo, anyị na-akwalite nsọpụrụ, ebumnuche, na ọṅụ."
};

const manifestoStatements = {
en: {
    belief: `We believe every child carries a promise.
Not a promise measured in wealth or circumstance,
but in the quiet dignity of a life opened by learning,
in the strength to dream, to grow, to belong.`,
    design: `We build with integrity.
  Our systems are transparent,
  our foundation strong enough to carry trust.
  We design with care,
  so that giving is not only possible,
  but deeply human.`,
    promise: `We believe generosity is transformative.
Every act of giving carries weight.
Every gift is a seed,
and every seed holds the shape of a future.`
  },
  de: {
    belief: `Wir glauben, dass jedes Kind ein Versprechen in sich trägt.
Nicht eines, das in Reichtum oder Umständen gemessen wird,
sondern in der stillen Würde eines Lebens, das durch Bildung geöffnet wird,
in der Kraft zu träumen, zu wachsen, dazuzugehören.`,
    design: `Wir bauen mit Integrität.
Unsere Systeme sind transparent,
unsere Grundlage stark genug, um Vertrauen zu tragen.
Wir gestalten mit Sorgfalt,
damit Geben nicht nur möglich, sondern zutiefst menschlich ist.`,
    promise: `Wir glauben, dass Großzügigkeit transformierend ist.
Jede Handlung des Gebens hat Gewicht.
Jede Gabe ist ein Samen,
und jeder Samen trägt die Form einer Zukunft.`
  },
  ig: {
    belief: `Anyị kwenyere na nwa ọ bụla nwere nkwa.
Nkwa a na-atụghị n’ihe onwunwe ma ọ bụ ọnọdụ,
kamakwa n’nsọpụrụ dị jụụ nke ndụ mepere emepe site n’ịmụ,
n’ike ịrọ nrọ, ịzụlite, na ịbụ akụkụ.`,
    design: `Anyị na-ewu na ntụkwasị obi.
Usoro anyị doro anya,
ntọala anyị siri ike iji kwado ntụkwasị obi.
Anyị na-emepụta na nlekọta,
ka inye bụrụ ihe o kwere mee, ma bụrụkwa nke mmadụ.`,
    promise: `Anyị kwenyere na inye nwere ike ịgbanwe ndụ.
Omume ọ bụla nke inye nwere ibu.
Onyinye ọ bụla bụ mkpụrụ,
na mkpụrụ ọ bụla nwere ọdịdị nke ọdịnihu.`
  }
};


const whyIBuildStatements = {
  en: "In many African communities, stories go untold—not because they lack meaning, but because they’re never recorded. Without reliable data, children remain invisible to systems meant to protect them, and policymakers struggle to serve those most in need. I became a Backend Engineer to change that.\n\nThrough this portal, I’m building systems that honor every child’s story—capturing their name, village, and dreams with dignity. My goal is simple: to ensure no child is forgotten, and every sponsor can give with confidence, knowing their support is transparent, ethical, and life-changing.",
  de: "In vielen afrikanischen Gemeinschaften bleiben Geschichten ungehört – nicht weil sie bedeutungslos sind, sondern weil sie nie dokumentiert wurden. Ohne verlässliche Daten bleiben Kinder für Systeme unsichtbar, die sie eigentlich schützen sollten, und Entscheidungsträger kämpfen darum, den Bedürftigsten zu helfen. Ich bin Backend-Entwickler geworden, um das zu ändern.\n\nDurch dieses Portal baue ich Systeme, die jede Kindergeschichte würdigen – mit Namen, Herkunft und Träumen. Mein Ziel ist einfach: Kein Kind soll vergessen werden, und jeder Sponsor soll mit Vertrauen geben können – in dem Wissen, dass seine Unterstützung transparent, ethisch und lebensverändernd ist.",
  ig: "N’ọtụtụ obodo Afrịka, akụkọ ụmụaka anaghị ekwupụta – ọ bụghị n’ihi na ha enweghị isi, kama n’ihi na a naghị ede ha. Enweghị data ziri ezi, ụmụaka na-anọgide na-apụghị ịhụ anya n’ime usoro e kere iji chebe ha, ndị na-eme iwu na-agbalị ike inyere ndị kacha mkpa aka. M wee bịa bụrụ Backend Engineer iji gbanwee nke a.\n\nSite na portal a, m na-ewu usoro ndị na-asọpụrụ akụkọ nwa ọ bụla – na-edekọ aha ha, obodo ha, na nrọ ha n’ụzọ dị nsọ. Ebumnuche m dị mfe: ka e cheta nwa ọ bụla, ka onye na-akwado nwee ntụkwasị obi, na nkwado ha bụrụ nke doro anya, ezi omume, na nke na-agbanwe ndụ."
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
          <button onClick={() => setLanguage('en')} className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇬🇧 English</button>
          <button onClick={() => setLanguage('de')} className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇩🇪 Deutsch</button>
          <button onClick={() => setLanguage('ig')} className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-blue-100">🇳🇬 Igbo</button>
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
          Welcome to our school and sponsorship portal
        </h2>
        <p className="text-gray-700 mt-2 max-w-xl mx-auto">
          Here, every child is seen, valued, and given the chance to flourish. We believe education is more than lessons—it is love in action,
           dignity restored, and hope awakened. Through the partnership of sponsors and our community, children are gaining the tools to learn,
            dream, and build brighter futures. Join us in this work of transformation, where every gift becomes a story of possibility.
        </p>
        <a
          href="/sponsor"
          className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
        >
          Sponsor a Child
        </a>
      </section>

      {/* Our Belief Manifesto Section - Side by Side */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-blue-50 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🌾 Our Belief</h2>
            <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
              {manifestoStatements[language].belief}
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🛠️ Our Design</h2>
            <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
              {manifestoStatements[language].design}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🌟 Our Promise</h2>
            <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
              {manifestoStatements[language].promise}
            </p>
          </div>
        </div>
      </section>



      {/* Why I Build Section with Parallax */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/scroll_motif.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto bg-white/80 p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌍 Why I Build</h2>
          <p
            key={language + "-whyIBuild"}
            className="text-gray-700 text-lg leading-relaxed whitespace-pre-line transition-opacity duration-700 opacity-100"
          >
            {whyIBuildStatements[language]}
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50 py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
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
      <footer className="bg-gradient-to-r from-blue-100 via-green-100 to-teal-100 py-6 text-center text-gray-700 mt-auto">
        <p>&copy; {new Date().getFullYear()} St. Damian Nursery and Primary School, Amandugba. All rights reserved.</p>
        <p className="mt-2">Built with love and purpose by our community</p>
      </footer>
    </div>
  );
};

export default HomePage;
