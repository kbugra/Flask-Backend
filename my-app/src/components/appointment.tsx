import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormState {
  guardianName: string;
  guardianEmail: string;
  childName: string;
  childAge: string;
  message: string;
}

function AppointmentForm() {
  const [formState, setFormState] = useState<FormState>({
    guardianName: '',
    guardianEmail: '',
    childName: '',
    childAge: '',
    message: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Validate form before submitting
    if (!formState.guardianName || !formState.guardianEmail || !formState.childName || !formState.childAge) {
      alert('Please fill out all fields');
      return;
    }
    // Send a POST request to the Flask backend
    const response = await fetch('/appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Failed to create appointment');
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="bg-light rounded">
          <div className="row g-0">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="h-100 d-flex flex-column justify-content-center p-5">
                <h1 className="mb-4">Make Appointment</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="gname" name="guardianName" placeholder="Guardian Name" value={formState.guardianName} onChange={handleChange} />
                        <label htmlFor="gname">Guardian Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="email" className="form-control border-0" id="gmail" name="guardianEmail" placeholder="Guardian Email" value={formState.guardianEmail} onChange={handleChange} />
                        <label htmlFor="gmail">Guardian Email</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="cname" name="childName" placeholder="Child Name" value={formState.childName} onChange={handleChange} />
                        <label htmlFor="cname">Child Name</label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input type="number" className="form-control border-0" id="cage" name="childAge" placeholder="Child Age" value={formState.childAge} onChange={handleChange} />
                        <label htmlFor="cage">Child Age</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control border-0" placeholder="Leave a message here" id="message" name="message" style={{ height: '100px' }} value={formState.message} onChange={handleChange} />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: '400px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute w-100 h-100 rounded" src="static/img/appointment.jpg" style={{ objectFit: 'cover' }} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;