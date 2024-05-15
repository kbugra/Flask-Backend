// Facilities.tsx

import React from 'react';

interface Facility {
  color: string;
  icon: string;
  name: string;
  description: string;
}

interface FacilitiesProps {
  facilities: Facility[];
}

const Facilities: React.FC<FacilitiesProps> = ({ facilities }) => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{maxWidth: '600px'}}>
          <h1 className="mb-3">School Facilities</h1>
          <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div className="row g-4">
          {facilities.map((facility, index) => (
            <div className="col-lg-3 col-sm-6" key={index}>
              <div className="facility-item">
                <div className={`facility-icon bg-${facility.color}`}>
                  <span className={`bg-${facility.color}`}></span>
                  <i className={`${facility.icon} fa-3x text-${facility.color}`}></i>
                  <span className={`bg-${facility.color}`}></span>
                </div>
                <div className={`facility-text bg-${facility.color}`}>
                  <h3 className={`text-${facility.color} mb-3`}>{facility.name}</h3>
                  <p className="mb-0">{facility.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Facilities;