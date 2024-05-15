// About.tsx

import React from 'react';

interface AboutProps {
  title: string;
  description: string[];
  founder: {
    name: string;
    role: string;
    image: string;
  };
  images: string[];
}

const About: React.FC<AboutProps> = ({ title, description, founder, images }) => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-4">{title}</h1>
            {description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
            <div className="row g-4 align-items-center">
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <img className="rounded-circle flex-shrink-0" src={founder.image} alt="" style={{width: '45px', height: '45px'}} />
                  <div className="ms-3">
                    <h6 className="text-primary mb-1">{founder.name}</h6>
                    <small>{founder.role}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 about-img wow fadeInUp" data-wow-delay="0.5s">
            <div className="row">
              {images.map((image, index) => (
                <div className={`col-${index === 0 ? '12 text-center' : '6 text-' + (index === 1 ? 'start' : 'end')}`} style={index > 0 ? {marginTop: '-150px'} : {}} key={index}>
                  <img className="img-fluid w-100 rounded-circle bg-light p-3" src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;