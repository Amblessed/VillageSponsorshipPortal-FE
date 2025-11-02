import React from 'react';

const ContactPage = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-6">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700">Contact Us</h1>
        <p className="mt-2 text-gray-600">
          We’d love to hear from you. Reach out or visit our school in person.
        </p>
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-green-600 mb-2">📍 Address</h2>
          <p>St. Damian Nursery and Primary School</p>
          <p>Amandugba, Imo State</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-green-600 mb-2">📞 Contact</h2>
          <p><strong>Phone:</strong> +234 814 465 3300</p>
          <p><strong>Email:</strong> st.damain.amandugba@gmail.org</p>
          <p><strong>Hours:</strong> Mon–Fri, 9:00–17:00</p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold text-green-600 mb-2">🗺️ Find Us on the Map</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title="St. Damian Nursery and Primary School Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31761.703849423084!2d7.048224872746207!3d5.682327340258606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425549cd53b0f3%3A0x1ea6acdc4470fcdf!2sSt%20Damian's%20Catholic%20Church%2C%20Amandugba!5e0!3m2!1sen!2sde!4v1759507128220!5m2!1sen!2sde"
            width="840"
            height="650"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded shadow"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
