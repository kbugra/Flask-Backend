import React from 'react'; // Import the React module
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the Carousel styles
import TestimonialCarousel from './components/testimonial' // Import the TestimonialCarousel component
import PageHeader from './components/pageheader';
import Classes from './components/class'; // Import the Classes component

class ClassPage extends React.Component {
    render() {
        return (
            <>
                <PageHeader pageName="Classes" />
                {/* Add the main content of the page here */}
                <Classes />
                <TestimonialCarousel />
                {/* You can add props to the TestimonialCarousel component if needed */}
            </>
        );
    }
}

export default ClassPage;