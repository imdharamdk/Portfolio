import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Location</h4>
            <p>Sahibzada Ajit Singh Nagar, Punjab, India</p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+918679215898" data-cursor="disable">
                +91-8679215898
              </a>
            </p>
            <h4>Email</h4>
            <p>
              <a href="mailto:imdharamdk@gmail.com" data-cursor="disable">
                imdharamdk@gmail.com
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://www.linkedin.com/in/imdharamdk"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:imdharamdk@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a href="tel:+918679215898" data-cursor="disable" className="contact-social">
              Call <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Dharmender Kumar Thakur</span>
            </h2>
            <p>
              B.Tech in Computer Science · Punjab Technical University (2018 – 2022)
            </p>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
