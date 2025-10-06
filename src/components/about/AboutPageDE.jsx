const AboutPageDE = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-12 text-center">
      <div className="mt-6 space-x-4">
        <a href="/about" className="text-blue-800 hover:underline">English</a>
        <a href="/about/de" className="text-blue-800 hover:underline">Deutsch</a>
        <a href="/about/ig" className="text-blue-800 hover:underline">Igbo</a>
        <a href="/" className="text-blue-800 hover:underline">Home</a>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Über Unsere Schule</h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
        Im Herzen unseres Dorfes hat die Hoffnung ein Zuhause. Unsere Schule ist mehr als nur ein Ort des Lernens – sie ist ein Zufluchtsort, an dem Kinder Würde, Sinn und die Möglichkeit einer besseren Zukunft entdecken.
      </p>

      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🌱 Unsere Geschichte</h2>
          <p className="text-gray-700">
            Was unter dem Schatten eines Mangobaums begann – mit einem Lehrer und einer kleinen Gruppe neugieriger Kinder – ist zu einem lebendigen Lernzentrum herangewachsen. Lokale Familien und internationale Unterstützer haben gemeinsam Klassenzimmer gebaut, Lehrer ausgebildet und einen sicheren Ort geschaffen, an dem Kinder über das bloße Überleben hinaus träumen können.
          </p>
          <p className="text-gray-700 mt-2">
            Jedes aufgeschlagene Buch, jede gelehrte Lektion und jedes geteilte Lächeln ist Teil dieser fortlaufenden Geschichte der Hoffnung.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🎓 Unsere Mission</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Qualitätsbildung</strong> – Lesen, Mathematik und wichtige Fähigkeiten lehren.</li>
            <li><strong>Wertevermittlung</strong> – Mut, Respekt und Freundlichkeit fördern.</li>
            <li><strong>Mitfühlende Fürsorge</strong> – Jedes Kind mit Liebe und Würde umgeben.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Bildung ist hier mehr als Wissen – sie ist ein Hoffnungssamen, gepflanzt in junge Leben und bestimmt, ganze Gemeinschaften zu verändern.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🤝 Ein Kreis der Fürsorge</h2>
          <p className="text-gray-700">
            Hinter jedem Schüler steht eine Gemeinschaft aus Eltern, Lehrern und Sponsoren. Viele Familien stehen vor großen Herausforderungen, doch ihre Stärke wird durch Unterstützung über Kontinente hinweg ergänzt.
          </p>
          <p className="text-gray-700 mt-2">
            Durch Patenschaften erhalten Kinder nicht nur Bildung, sondern auch die Gewissheit, dass jemand an sie glaubt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🙏 Unser Leitvers</h2>
          <p className="text-gray-700 italic">
            „Öffne deinen Mund für den Stummen, für das Recht aller Unglücklichen.“ — Sprüche 31:8–9
          </p>
          <p className="text-gray-700 mt-2">
            Dieser Vers ist unser Anker. Wir glauben, dass Bildung eine heilige Berufung ist – ein Akt der Fürsprache und Liebe.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ Wie Sie helfen können</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Sichere Klassenzimmer schaffen, in denen Kinder ohne Angst lernen können.</li>
            <li>Lehrer ausstatten, um mit Exzellenz zu inspirieren und zu führen.</li>
            <li>Mahlzeiten, Fürsorge und Ermutigung bieten, die junge Leben stärken.</li>
            <li>Armutskreisläufe durch Bildung und Chancen durchbrechen.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Jede Spende verändert eine Geschichte. Jede Patenschaft erhellt einen Weg.
          </p>
        </section>
      </div>

      <div className="mt-12 space-x-4 text-center">
        <a href="/sponsor" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Kind sponsoren
        </a>
        <a href="/donate" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Geschenk geben
        </a>
        <a href="/learn-more" className="inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Mehr erfahren
        </a>
      </div>
    </div>
  );
};

export default AboutPageDE;
