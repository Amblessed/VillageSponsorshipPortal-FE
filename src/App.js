import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PupilForm from './components/pupil/PupilForm';
import ThankYou from './components/ThankYou';
import HomePage from './components/homepage/Homepage';
import AboutPage from './components/about/AboutPage';
import PupilsPage from './components/pupil/PupilsPage';
import ContactPage from './components/homepage/ContactPage';
import AdminDashboard from './components/homepage/AdminDashboard';
import PupilFullProfile from './components/pupil/PupilFullProfile';
import AboutPageDE from './components/about/AboutPageDE';
import AboutPageIG from './components/about/AboutPageIG';
import PupilViewPage from './components/pupil/PupilViewpage';
import PupilList from "./components/pupil/PupilList";
import DonatePage from "./components/donation/DonatePage";
import DonorsPage from "./components/donation/DonorsPage";
import DashboardContainer from './components/dashboard/DashboardContainer';


function App() {
  const [language, setLanguage] = useState('de'); // 'de', 'en', 'ig'

  const mission = {
    de: {
      verse: '„Erziehe den Knaben seinem Weg gemäß; er wird nicht davon weichen, wenn er alt wird.“ - Sprüche 22,6',
      paragraphs: [
        'Die Zukunft eines Kindes ist kein ferner Traum – sie ist ein Same, der auf Wasser wartet. Bildung ist mehr als Wissen. Sie ist Würde, wiederhergestellt. Selbstvertrauen, geweckt. Und der stille Mut, mit Stärke in das Morgen zu gehen.',
        'Doch in vielen Dörfern ist dieser Weg versperrt – nicht durch fehlendes Potenzial, sondern durch Armut. Nicht durch Unwillen, sondern durch Umstände.',
        'Unser Portal räumt diesen Weg frei. Es verbindet Sponsoren mit Kindern, deren Geschichten gehört und deren Zukunft gebaut werden soll. Jedes Profil wird mit Ehrfurcht gestaltet. Jede Spende mit Integrität verwaltet. Jede Begegnung von Mitgefühl geprägt.',
        'Dies ist nicht nur eine Plattform. Es ist ein Bund – eine Brücke zwischen Herzen, wo Großzügigkeit zu Vermächtnis wird und Liebe zu Handlung.',
        'Hier werden Geschichten geehrt. Privatsphäre geschützt. Und jede Gabe wird zum Werkzeug der Gerechtigkeit.',
        'Denn wenn du einen Knaben seinem Weg gemäß erziehst, dann bildest du nicht nur aus – du weckst Bestimmung.'
      ]
    },
    en: {
      verse: '“Train up a child in the way he should go, and when he is old he will not depart from it.” Proverbs 22:6',
      paragraphs: [
        'A child’s future is not a distant dream—it is a seed waiting for water. Education is more than knowledge. It is dignity restored, confidence awakened, and the quiet courage to walk into tomorrow with strength.',
        'Yet in too many villages, this path is blocked—not by lack of potential, but by poverty. Not by unwillingness, but by circumstance.',
        'Our portal exists to clear that path. We connect sponsors with children whose stories deserve to be heard and whose futures deserve to be built. Every profile is crafted with reverence. Every donation is stewarded with integrity. Every interaction is shaped by compassion.',
        'This is not just a platform. It is a covenant—a bridge between hearts, where generosity becomes legacy and love becomes action.',
        'Here, stories are honored. Privacy is protected. And every gift becomes a tool of justice.',
        'Because when you train up a child in the way they should go, you do more than educate—you awaken destiny.'
      ]
    },
    ig: {
      verse: '“Zụ nwa n’ụzọ kwesịrị ya, ọ gaghị agbanwe ya mgbe o tozuru etozu.” – Ilu 22:6',
      paragraphs: [
        'Ọdịnihu nwa abụghị nrọ dị anya – ọ bụ mkpụrụ na-achọ mmiri. Agụmakwụkwọ karịrị akwụkwọ na klas. Ọ bụ nsọpụrụ e weghachiri, ntụkwasị obi e kpaliri, na obi ike dị jụụ iji banye echi n’ike.',
        'Ma n’obodo ndị dị iche iche, ụzọ a mechiri – ọ bụghị n’ihi na nwa enweghị ike, kama n’ihi ụkọ ego. Ọ bụghị n’ihi na ezinụlọ achọghị, kama n’ihi ọnọdụ.',
        'Ụlọọrụ anyị na-eme ka ụzọ a mepee. Ọ na-ejikọ ndị na-akwado na ụmụaka nwere akụkọ kwesịrị ntị na ọdịnihu kwesịrị iwulite. A na-eme profaịlụ nke nwa n’ụzọ nsọ. A na-elekọta onyinye n’ụzọ ziri ezi. A na-eme ka mmekọrịta bụrụ nke ebere.',
        'Nke a abụghị naanị ikpo okwu. Ọ bụ nkwekọrịta – ọ bụ akwa mgba n’etiti obi, ebe ebere ghọtara ihe nketa, ebe ịhụnanya ghọtara omume.',
        'N’ebe a, a na-asọpụrụ akụkọ. A na-echebe nzuzo. A na-eme ka onyinye bụrụ ngwá ọrụ nke ikpe ziri ezi.',
        'N’ihi na mgbe ị zụchara nwa n’ụzọ kwesịrị ya, ị na-eme ihe karịrị nkuzi – ị na-akpali ebumnobi.'
      ]
    }
  };

  const MissionSection = () => (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Patenportal</h1>

      <div className="flex justify-center gap-4 mb-6">
        {['de', 'en', 'ig'].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 rounded ${
              language === lang
                ? 'bg-green-600 text-white'
                : 'bg-white border border-green-600 text-green-600'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <p className="text-lg font-semibold text-gray-700 mb-4">{mission[language].verse}</p>
        {mission[language].paragraphs.map((text, index) => (
          <p key={index} className="text-gray-600 mb-3">{text}</p>
        ))}
      </div>
      <PupilForm />
    </div>
  );

  return (
       <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/de" element={<AboutPageDE />} />
      <Route path="/about/ig" element={<AboutPageIG />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pupils" element={<PupilsPage />} />
      <Route path="/register" element={<PupilForm />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/pupils" element={<PupilList />} />
      <Route path="/pupil" element={<PupilViewPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/donors" element={<DonorsPage />} />
      <Route path="/analytics" element={<DashboardContainer />} />

      <Route path="/pupils/:id" element={<PupilFullProfile />} />
     {/*  <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} /> */}
      <Route path="/mission" element={<MissionSection />} />

    
    </Routes>
  );
}

export default App;
