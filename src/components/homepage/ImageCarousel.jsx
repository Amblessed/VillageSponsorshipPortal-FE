import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";

const checkImageValidity = (imagePath) => {
    return new Promise((resolve) => {
        const testImg = new Image();
        testImg.src = `/images/${imagePath}`;
        testImg.onload = () => resolve(imagePath);
        testImg.onerror = () => resolve(null);
    });
};

const validateImages = async (imageList) => {
    const validationPromises = imageList.map(checkImageValidity);
    const results = await Promise.all(validationPromises);
    return results.filter(Boolean);
};

const ImageCarousel = ({ images }) => {
    const [validImages, setValidImages] = useState([]);

    useEffect(() => {
        const loadAndValidateImages = async () => {
            const validatedImages = await validateImages(images);
            setValidImages(validatedImages);
        };

        loadAndValidateImages();
    }, [images]);

    return (
        <div className="w-full max-w-[750px] mx-auto overflow-hidden rounded shadow-lg">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
                transitionTime={700}
            >
                {validImages.map((img, index) => (
                    <div
                        key={index}
                        className="w-full flex items-center justify-center bg-gray-100"
                        style={{ height: "800px" }}
                    >
                        <img
                            src={`/images/${img}`}
                            alt={`Slide ${index + 1}`}
                            className="w-auto h-full object-contain"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageCarousel;
