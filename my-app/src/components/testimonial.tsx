import React, { useEffect, useState } from 'react';

interface Testimonial {
  id: number;
  message: string;
  name: string;
  profession: string;
  image: string;  // Add this if the testimonial object includes an image URL
}

const TestimonialCarousel: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonial')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);  // Log the data to the console
        setTestimonials(data.testimonials);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-item bg-light rounded p-5">
          <p className="fs-5">{testimonial.message}</p>
          <div className="d-flex align-items-center bg-white me-n5" style={{borderRadius: '50px 0 0 50px'}}>
            <img className="img-fluid flex-shrink-0 rounded-circle" src={testimonial.image} style={{width: '90px', height: '90px'}} />
            <div className="ps-3">
              <h3 className="mb-1">{testimonial.name}</h3>
              <span>{testimonial.profession}</span>
            </div>
            <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCarousel;