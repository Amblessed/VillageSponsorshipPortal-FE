const AboutPageIG = () => {
  return (
    <div className="bg-white min-h-screen px-6 py-12 text-center">
      <div className="mt-6 space-x-4">
        <a href="/about" className="text-blue-800 hover:underline">English</a>
        <a href="/about/de" className="text-blue-800 hover:underline">Deutsch</a>
        <a href="/about/ig" className="text-blue-800 hover:underline">Igbo</a>
        <a href="/" className="text-blue-800 hover:underline">Home</a>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Banyere Ụlọ Akwụkwọ Anyị</h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
        N’obi obodo anyị, olileanya nwere ebe obibi. Ụlọ akwụkwọ anyị abụghị naanị klas—ọ bụ ebe dị nsọ ebe ụmụaka na-amụta ịdị nsọ, ebumnuche, na ohere nke ọdịnihu ka mma.
      </p>

      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🌱 Akụkọ Anyị</h2>
          <p className="text-gray-700">
            Ihe malitere n’okpuru osisi mangoro—otu onye nkuzi na ụmụaka ole na ole nwere mmasị—agbasawo bụrụ ebe mmụta na-eto eto. Ndị ezinụlọ obodo na ndị na-akwado si mba dị iche iche sonyere iji wuo klas, zụlite ndị nkuzi, ma mepụta ebe nchekwa ebe ụmụaka nwere ike ịrọ nrọ gafee ịlanarị.
          </p>
          <p className="text-gray-700 mt-2">
            Akwụkwọ ọ bụla emeghe, ihe ọmụmụ ọ bụla e kụziri, na ọchị ọ bụla e kesara bụ akụkụ nke akụkọ olileanya na-agbasa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🎓 Ebumnuche Anyị</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Agụmakwụkwọ Dị Mma</strong> – Ịkụziri igụ, mgbakọ na mwepụ, na nkà dị mkpa.</li>
            <li><strong>Mmụta Omume</strong> – Ịkụziri obi ike, nsọpụrụ, na ebere.</li>
            <li><strong>Nlekọta N’ebe Obi Dị</strong> – Ịg surrounded ụmụaka na ịhụnanya na ịdị nsọ.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Agụmakwụkwọ ebe a karịrị ihe ọmụma—ọ bụ mkpụrụ olileanya, akụrụ n’ime ndụ ụmụaka, nke ga-agbanwe obodo dum.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🤝 Ọgbọ Nlekọta</h2>
          <p className="text-gray-700">
            N’azụ nwa akwụkwọ ọ bụla, e nwere obodo nke ndị nne na nna, ndị nkuzi, na ndị na-akwado. Ọtụtụ ezinụlọ na-eche ihe isi ike, ma ike ha na-ezute nkwado si mba dị iche iche.
          </p>
          <p className="text-gray-700 mt-2">
            Site n’ịkwado, ụmụaka na-enweta agụmakwụkwọ na nkwenye na mmadụ nwere olileanya n’ebe ha nọ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🙏 Akwụkwọ Nsọ Na-akọwa Anyị</h2>
          <p className="text-gray-700 italic">
            “Gwa okwu maka ndị na-apụghị ikwu maka onwe ha… chebe ikike nke ndị ogbenye na ndị chọrọ enyemaka.” — Ilu 31:8–9
          </p>
          <p className="text-gray-700 mt-2">
            Akwụkwọ nsọ a bụ ntọala ọrụ anyị. Anyị kwenyere na agụmakwụkwọ bụ oku nsọ—omume nke ịhụnanya na nkwado. Akụkọ nwaanyị ọ bụla kwesịrị ka a nụ ya, ka a gọtara ya, ka a welie ya elu.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ Olee Esi Enyere</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Na-emepụta klas nchekwa ebe ụmụaka nwere ike ịmụ n’enweghị egwu.</li>
            <li>Na-enye ndị nkuzi akụrụngwa iji kụziere na mmụọ elu.</li>
            <li>Na-enye nri, nlekọta, na mmụa n’obi nke na-akpali ndụ ụmụaka.</li>
            <li>Na-agbaji okirikiri ogbenye site n’imepe ụzọ maka ohere.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Onyinye ọ bụla na-agbanwe akụkọ. Ịkwado nwa akwụkwọ na-enwuputa ụzọ.
          </p>
        </section>
      </div>

      <div className="mt-12 space-x-4 text-center">
        <a href="/sponsor" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Kwado Nwa Akwụkwọ
        </a>
        <a href="/donate" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Nye Onyinye
        </a>
        <a href="/learn-more" className="inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Mụta Ọzọ
        </a>
      </div>
    </div>
  );
};

export default AboutPageIG;
