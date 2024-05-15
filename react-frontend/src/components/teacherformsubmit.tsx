import React, { useState } from 'react';

interface TFormProps {
    // Define the props for the component here
}

const TForms: React.FC<TFormProps> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/app/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, experience })
        });

        if (response.ok) {
            alert('Application submitted successfully');
        } else {
            alert('Failed to submit application');
        }
    };
    return (
        <div className="container-fluid bg-white p-0">    <div className="container">
            <div className="bg-light rounded">
                <div className="row g-0">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s" style={{ minHeight: 400 }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute w-100 h-100 rounded"
                                src="/static/img/call-to-action.jpg" // Assuming image resides in static folder
                                alt="Call to Action"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div className="h-100 d-flex flex-column justify-content-center p-5">
                            <h1 className="mb-4">Become A Teacher</h1>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}> {/* Assuming your apply route */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="name" name="name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control" id="email" name="email" required />
                            </div>
                            <textarea className="form-control" id="experience" name="experience" rows={3} required />
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default TForms;
