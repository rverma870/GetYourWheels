import React from 'react';
import { MdEmail, MdCall } from "react-icons/md";

function ContactUs() {
  return (
    <div className="bg-white p-4">
      <div className="find-us mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Our Location on Maps</h2>
              </div>
            </div>
            <div className="col-md-12">
              <div id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235526.9092428485!2d75.7237600342887!3d22.724228432387644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1644403548111!5m2!1sen!2sin"
                  title='our location'
                  width="1120"
                  height="400"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="send-message">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>Send us a Message</h2>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contact-form">
                <form id="contact" action="">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 my-2">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Full Name"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 my-2">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="E-Mail Address"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 my-2">
                      <fieldset>
                        <input
                          name="subject"
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 my-2">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          className="form-control"
                          id="message"
                          placeholder="Your Message"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12 my-2">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="filled-button btn btn-primary"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-4 ps-4">
              <div>
                <h3>
                  CALL US <MdCall />
                </h3>
                <p className="fs-2 mb-0">1800 200 3000</p>
                <p className="text-muted ms-1">(Mon to Sat 9:30 Am to 6 PM)</p>
              </div>
              <div>
                <h3>
                  EMAIL <MdEmail size={"1.9rem"} />
                </h3>
                <p className="fs-6 mb-0">support@mywheels.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
