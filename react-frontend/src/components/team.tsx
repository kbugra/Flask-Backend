import React from 'react';

interface Teacher {
  id: number;
  name: string;
  profession: string;
  image: string;
}

// Replace with your actual data
const teachers: Teacher[] = [
    { id: 1, name: 'John Doe', profession: 'Profession 1', image: '/static/img/team-1.jpg' },
    { id: 2, name: 'Jane Smith', profession: 'Profession 2', image: '/static/img/team-2.jpg' },
    { id: 3, name: 'Alice Johanson', profession: 'Profession 3', image: '/static/img/team-3.jpg' },
  ];

const Teachers: React.FC = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: '600px'}}>
          <h1 className="mb-3">Popular Teachers</h1>
          <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit
            eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div className="row g-4">
          {teachers.map((teacher) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={teacher.id}>
              <div className="team-item position-relative">
                <img className="img-fluid rounded-circle w-75" src={teacher.image} alt=""/>
                <div className="team-text">
                  <h3>{teacher.name}</h3>
                  <p>{teacher.profession}</p>
                  <div className="d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-square btn-primary  mx-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-square btn-primary  mx-1" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;