import React from 'react';

const Footer: React.FC = () => {
    return (
        
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s" style={{ paddingTop: '100px' }}>
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h3 className="text-white mb-4">Get In Touch</h3>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3 className="text-white mb-4">Quick Links</h3>
                        <a className="btn btn-link text-white-50" href="#">About Us</a>
                        <a className="btn btn-link text-white-50" href="#">Contact Us</a>
                        <a className="btn btn-link text-white-50" href="#">Our Facilities</a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3 className="text-white mb-4">Photo Gallery</h3>
                        <div className="row g-2 pt-2">
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-1.jpg" alt="Classes 1"/>
                            </div>
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-2.jpg" alt="Classes 2"/>
                            </div>
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-3.jpg" alt="Classes 3"/>
                            </div>
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-4.jpg" alt="Classes 4"/>
                            </div>
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-5.jpg" alt="Classes 5"/>
                            </div>
                            <div className="col-4">
                                <img className="img-fluid rounded bg-light p-1" src="/static/img/classes-6.jpg" alt="Classes 6"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h3 className="text-white mb-4">Newsletter</h3>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.
                            Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <div className="footer-menu">
                                <a href="/">Home</a>
                                <a href="">Cookies</a>
                                <a href="#">Help</a>
                                <a href="">FQAs</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;