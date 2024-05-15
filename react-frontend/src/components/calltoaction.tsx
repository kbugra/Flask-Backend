// CallToAction.tsx

import React from 'react';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ title, description, buttonText, buttonLink, image }) => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="bg-light rounded">
          <div className="row g-0">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s" style={{minHeight: '400px'}}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100 rounded" src={image} style={{objectFit: 'cover'}} alt="" />
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="h-100 d-flex flex-column justify-content-center p-5">
                <h1 className="mb-4">{title}</h1>
                <p className="mb-4">{description}</p>
                <a className="btn btn-primary py-3 px-5" href={buttonLink}>{buttonText}<i className="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;