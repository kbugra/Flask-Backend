import React, { FormEvent, useState } from 'react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Send a POST request to the Flask backend
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    });
    if (response.ok) {
      alert('Message sent successfully');
    } else {
      alert('Failed to send message');
    }
  };

  return (
    <div className="container-fluid bg-white p-0">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{maxWidth: '600px'}}>
          <h1 className="mb-3">Get In Touch</h1>
          <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit
            eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
        </div>
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-4 text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '75px', height: '75px'}}>
              <i className="fa fa-map-marker-alt fa-2x text-primary"></i>
            </div>
            <h6>123 Street, New York, USA</h6>
          </div>
          <div className="col-md-6 col-lg-4 text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '75px', height: '75px'}}>
              <i className="fa fa-envelope-open fa-2x text-primary"></i>
            </div>
            <h6>info@example.com</h6>
          </div>
          <div className="col-md-6 col-lg-4 text-center">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '75px', height: '75px'}}>
              <i className="fa fa-phone-alt fa-2x text-primary"></i>
            </div>
            <h6>+012 345 6789</h6>
          </div>
        </div>
        <div className="bg-light rounded">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="h-100 d-flex flex-column justify-content-center p-5">
                <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="name" name="name" placeholder="Your Name" onChange={handleChange} />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="email" className="form-control border-0" id="email" name="email" placeholder="Your Email" onChange={handleChange} />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="subject" name="subject" placeholder="Subject" onChange={handleChange} />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control border-0" placeholder="Leave a message here" id="message" name="message" style={{height: '100px'}} onChange={handleChange}></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6" style={{minHeight: '400px'}}>
              <div className="position-relative h-100">
                <iframe className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                frameBorder="0" style={{minHeight: '400px', border:0}} allowFullScreen={true} aria-hidden="false"
                tabIndex={0}></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;