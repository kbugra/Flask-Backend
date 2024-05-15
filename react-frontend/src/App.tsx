import { useState, useEffect } from 'react'
import Navbar from './components/navbar' // Make sure the path is correct
import Footer from './components/footer'
import { Carousel } from 'react-responsive-carousel' // Import the Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the Carousel styles
import Facilities from './components/facilites'
import About from './components/about' // Import the About component
import CallToAction from './components/calltoaction' // Import the CallToAction component
import Team from './components/team' // Import the Team component
import TestimonialCarousel from './components/testimonial'; // Import the TestimonialCarousel component
import ClassesPage from './classpage'; // Import the ClassesPage component
import PageHeader from './components/pageheader';
import AppointmentForm from './components/appointment';
import ContactForm from './components/contact';
import TForms from './components/teacherformsubmit';
import Login from './components/login';
import Register from './components/register';
import AdminDashboard from './components/admin_dashboard';
import { AuthContext, User } from './components/AuthContext'; // Import the User type and AuthContext
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Order } from './components/admin_dashboard';
import Cart from './components/cart';
import Checkout from './components/checkout';
import { CartProvider } from './components/CartContext'; // Import CartProvider




import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Classes from './components/class';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('example');
  const [pageName, setPageName] = useState<string>('Home');
  const [orders, setOrders] = useState<Order[]>([]);


  const [facilities, setFacilities] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/facility') // replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setFacilities(data))
      .catch(error => console.error('Error:', error));
  }, []);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
  const authToken = localStorage.getItem('authToken');
  fetch('http://localhost:5000/api/users', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error:', error));
}, []);

useEffect(() => {
  const authToken = localStorage.getItem('authToken');
  fetch('http://localhost:5000/api/orders', {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
    .then(data => setOrders(data))
    .catch(error => console.error('Error:', error));
}, []);

  const aboutProps = {
    title: 'About Us',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque est velit, eget tincidunt tortor viverra id. Fusce nisi dui, ultrices vel gravida id, rhoncus ac metus. Curabitur vitae est ornare, varius diam at, porta eros. Proin lobortis, diam quis pretium finibus, purus nisl scelerisque purus, nec ultrices odio urna in augue.', 'Our facilities are top-notch and we have a dedicated team of educators.'],
    founder: {
      name: 'John Doe',
      role: 'Founder',
      image: '/static/img/user.jpg', // replace with actual image path
    },
    images: ['/static/img/about-1.jpg', '/static/img/about-2.jpg', '/static/img/about-3.jpg'], // replace with actual image paths
  };

  const callToActionProps = {
    title: 'Join Us Today',
    description: 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.',
    buttonText: 'Apply Now',
    buttonLink: '/apply',
    image: '/static/img/call-to-action.jpg', // replace with actual image path
  };


  return (
    <Router>
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="app-root" style={{ backgroundColor: 'white', height: '100vh' }}>
        <Navbar />
        <CartProvider> {/* Wrap your Routes with CartProvider */}
          <Routes>
            <Route path="/" element={
              <div style={{ backgroundColor: 'white' }}>
                <Carousel>
                  <div>
                    <img src="/static/img/carousel-1.jpg" alt="" />
                    <p className="legend">The Best Kindergarten School For Your Child</p>
                  </div>
                  <div>
                    <img src="/static/img/carousel-2.jpg" alt="" />
                    <p className="legend">Make A Brighter Future For Your Child</p>
                  </div>
                </Carousel>
                <Facilities facilities={facilities} />
                <Classes />
                <CallToAction {...callToActionProps} />
                <Team />
                <TestimonialCarousel />
              </div>
            } />

            <Route path="/index" element={
              <div style={{ backgroundColor: 'white' }}>
                <Carousel>
                  <div>
                    <img src="/static/img/carousel-1.jpg" alt="" />
                    <p className="legend">The Best Kindergarten School For Your Child</p>
                  </div>
                  <div>
                    <img src="/static/img/carousel-2.jpg" alt="" />
                    <p className="legend">Make A Brighter Future For Your Child</p>
                  </div>
                </Carousel>

                <Facilities facilities={facilities} />
                <Classes />
                <CallToAction {...callToActionProps} />
                <Team />
                <TestimonialCarousel />
              </div>
            } />

            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/about" element={
              <>
                <PageHeader pageName="About" />
                <About {...aboutProps} />
                <Team />
                <TestimonialCarousel />
              </>
            } />
            <Route path="/facility" element={
              <>
                <PageHeader pageName="Facilities" />
                <Facilities facilities={facilities} />
              </>
            } />
            <Route path="/team" element={
              <>
                <PageHeader pageName="Team" />
                <Team />
              </>
            } />

            <Route path="/testimonial" element={
              <>
                <PageHeader pageName="Testimonial" />
                <TestimonialCarousel />
              </>
            } />
            <Route path="/contact" element={
              <>
                <PageHeader pageName="Contact" />
                <ContactForm />
              </>
            } />
            <Route path="/appointment" element={
              <>
                <PageHeader pageName="Appointment" />
                <AppointmentForm />
              </>
            } />
            <Route path="/teacherformsubmit" element={
              <>
                <PageHeader pageName="Teacher Form Submit" />
                <TForms />

              </>
            } />
            <Route path="/login" element={
              <>
                <PageHeader pageName="Login" />
                <Login />
              </>
            } />
            <Route path="/register" element={
              <>
                <PageHeader pageName="Register" />
                <Register />
              </>
            } />
            <Route path="/dashboard/:username" element={
              <>
                <PageHeader pageName={user ? user.username : 'Dashboard'} />
                <Dashboard />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <PageHeader pageName={user ? user.username : 'Dashboard'} />
                <Dashboard />
              </>
            } />
            <Route path="/admin_dashboard" element={
              <>
                <PageHeader pageName="Admin Dashboard" />
                <AdminDashboard users={users} orders={orders} />
              </>
            } />
            <Route path="/cart" element={
              <>
                <PageHeader pageName="Cart" />
                <Cart />
              </>
            } />
            <Route path="/checkout" element={
              <>
                <PageHeader pageName="Checkout" />
                <Checkout />
              </>
            } />
          </Routes>
        </CartProvider> {/* Close CartProvider */}
        <Footer />
        </div>
      </AuthContext.Provider>
    </Router>
  )
}

export default App