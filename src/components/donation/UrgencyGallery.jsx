import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PropTypes from 'prop-types';

export const UrgencyGallery = ({ galleryImages }) => (
    <div className="w-full max-w-7xl bg-white shadow rounded-xl p-8 mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">📸 The Urgent Need</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
            These are real classrooms. Your gift helps replace broken chairs, desks, and restore dignity to learning.
        </p>

        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-lg"
        >
            {galleryImages.map((src, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={src}
                        alt={`Urgency ${index + 1}`}
                        className="w-full h-[800px] object-cover rounded-lg shadow-md transition duration-500 brightness-125"
                    />
                </SwiperSlide>
            ))}
        </Swiper>

        <p className="text-sm text-gray-600 text-center mt-4 italic">
            “This is what children face daily. Let’s change that together.”
        </p>
    </div>
);


UrgencyGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ).isRequired
};
