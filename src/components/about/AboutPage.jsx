import React from 'react';

const AboutPage = () => {
  return (
    
    <div className="bg-white min-h-screen px-6 py-12 text-center">
      <div className="mt-6 space-x-4">
        <a href="/about" className="text-blue-800 hover:underline">English</a>
        <a href="/about/de" className="text-blue-800 hover:underline">Deutsch</a>
        <a href="/about/ig" className="text-blue-800 hover:underline">Igbo</a>
        <a href="/" className="text-blue-800 hover:underline">Home</a>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our School</h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
        In the heart of our village, hope has a home. Our school is more than classrooms—it is a sanctuary where children discover dignity, purpose, and the possibility of a brighter future.
      </p>

      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🌱 Our Story</h2>
          <p className="text-gray-700">
            What began under the shade of a mango tree—with one teacher and a handful of eager children—has grown into a thriving center of learning. Local families and international supporters came together to build classrooms, train teachers, and create a safe place where children can dream beyond survival.
          </p>
          <p className="text-gray-700 mt-2">
            Every book opened, every lesson taught, and every smile shared is part of that unfolding story of hope.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🎓 Our Mission</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li><strong>Quality Education</strong> – Teaching reading, math, and critical skills.</li>
            <li><strong>Values Formation</strong> – Cultivating courage, respect, and kindness.</li>
            <li><strong>Compassionate Care</strong> – Surrounding each child with love and dignity.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Education here is more than knowledge—it is a seed of hope, planted in young lives and destined to change entire communities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🤝 A Circle of Care</h2>
          <p className="text-gray-700">
            Behind every student is a community of parents, teachers, and sponsors working together. Many families face significant challenges, but their resilience is met with support that spans continents.
          </p>
          <p className="text-gray-700 mt-2">
            Through sponsorship, children gain not just education but the assurance that someone believes in them. For donors, it is an invitation to witness transformation firsthand and take part in writing new stories of possibility.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🙏 Our Guiding Scripture</h2>
          <p className="text-gray-700 italic">
            “Speak up for those who cannot speak for themselves… defend the rights of the poor and needy.” — Proverbs 31:8–9
          </p>
          <p className="text-gray-700 mt-2">
            This verse anchors our work. We believe education is a sacred calling—an act of advocacy and love. Every child’s story deserves to be heard, honored, and uplifted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ How You Can Help</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Creates safe classrooms where children can learn without fear.</li>
            <li>Equips teachers to inspire and guide with excellence.</li>
            <li>Offers meals, care, and encouragement that fuel young lives.</li>
            <li>Breaks cycles of poverty by opening doors to opportunity.</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Every gift changes a story. Every sponsorship lights a path. Together, we can raise a generation of leaders who will transform their families, communities, and beyond.
          </p>
        </section>
      </div>

      <div className="mt-12 space-x-4">
        <a href="/sponsor" className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Sponsor a Child
        </a>
        <a href="/donate" className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Give a Gift
        </a>
        <a href="/learn-more" className="inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
