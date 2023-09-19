import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, SetStateAction } from 'react';
import { useState, useEffect, useCallback } from 'react';

library.add(faChevronLeft, faChevronRight);

type Carousel = {
  children: ReactNode[];
  interval?: number;
};

const Carousel = ({ children, interval = 5000 }: Carousel) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? children.length - 1 : prevSlide - 1
    );
  };

  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === children.length - 1 ? 0 : prevSlide + 1
    );
  }, [children]);

  const goToSlide = (newSlide: SetStateAction<number>) => {
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, handleNext]);

  return (
    <div className='flex overflow-hidden relative h-screen 4xl:h-10/12'>
      <button
        onClick={handlePrev}
        className='p-2 -translate-x-0 translate-y-[-50%] absolute top-1/2 left-5 z-10 text-2xl rounded hover:bg-blue-gray-300 hover:bg-opacity-50 focus:bg-blue-gray-400'
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={handleNext}>
        <FontAwesomeIcon
          icon={faChevronRight}
          className='p-2 absolute -translate-x-0 translate-y-[-50%] top-1/2 right-5 z-10 text-2xl rounded hover:bg-blue-gray-300 hover:bg-opacity-50 focus:bg-blue-gray-400'
        />
      </button>

      <div className='flex flex-col h-full items-center'>
        {children.map((child, index) => (
          <div
            className={`${index === currentSlide ? 'block' : 'hidden'}`}
            key={index}
          >
            {child}
            <div className='absolute flex flex-row z-20 bottom-0 left-0 w-full justify-center'>
              {children.map((_child, index) => (
                <span
                  style={{
                    color: index === currentSlide ? '#fff' : '#aab2c0',
                  }}
                  key={index}
                  onClick={() => goToSlide(index)}
                  className='mx-1 rounded-full cursor-pointer text-[1rem] sm:text-[2rem]'
                >
                  &bull;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
