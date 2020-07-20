import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import "./Privacy.scss";
import { Logo } from "../../components/atoms";

export class PrivacyPage extends Component {
  render() {
    return (
      <div className="container privacy">
        <header>
          <nav>
            <h1>
              <Logo style={{ fontSize: "1.3em" }} />
            </h1>

            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </nav>
        </header>
        <div className="main">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-9">
                  <div className="card">
                    <div className="header">
                      <h2 className="title">Privacy Policy</h2>
                    </div>

                    <hr />

                    <div className="content">
                      <div id="ppBody">
                        <p>
                          This privacy policy has been compiled to better serve
                          those who are concerned with how their 'Personally
                          Identifiable Information' (PII) is being used online.
                          PII, as described in US privacy law and information
                          security, is information that can be used on its own
                          or with other information to identify, contact, or
                          locate a single person, or to identify an individual
                          in context. Please read our privacy policy carefully
                          to get a clear understanding of how we collect, use,
                          protect or otherwise handle your Personally
                          Identifiable Information in accordance with our
                          website.
                        </p>

                        <h4>
                          What personal information do we collect from the
                          people that visit our website or app?
                        </h4>
                        <p>
                          When registering on our app, as appropriate, you may
                          be asked to enter your name, email address, phone
                          number, location, picture, or other details to help
                          you with your experience.
                        </p>

                        <h4>When do we collect information?</h4>
                        <p>
                          We collect information from you when you or enter
                          information on our site/app.
                        </p>
                        <ul>
                          <li>Registration</li>
                          <li>Create Post</li>
                          <li>Profile Update</li>
                          <li>Message</li>
                        </ul>

                        <h4>How do we use your information? </h4>
                        <p>
                          We may use the information we collect from you when
                          you register in the following ways:
                        </p>
                        <ul>
                          <li>
                            To authenticate your messages/posts/profile update
                          </li>
                        </ul>

                        <h4>How do we protect your information?</h4>
                        <p>
                          We do not use vulnerability scanning and/or scanning
                          to PCI standards.
                        </p>
                        <p>
                          We only provide articles and information. We never ask
                          for credit card numbers.
                        </p>
                        <p>We use regular Malware Scanning.</p>
                        <p>
                          Your personal information is contained behind secured
                          networks and is only accessible by a limited number of
                          persons who have special access rights to such
                          systems, and are required to keep the information
                          confidential. In addition, all sensitive/credit
                          information you supply is encrypted via Secure Socket
                          Layer (SSL) technology.
                        </p>
                        <p>
                          We implement a variety of security measures when a
                          user enters, submits, or accesses their information to
                          maintain the safety of your personal information.
                        </p>
                        <p>
                          All transactions are processed through a gateway
                          provider and are not stored or processed on our
                          servers.
                        </p>

                        <h4>Do we use 'cookies'?</h4>
                        <p>We do not use cookies for tracking purposes</p>
                        <p>
                          You can choose to have your computer warn you each
                          time a cookie is being sent, or you can choose to turn
                          off all cookies. You do this through your browser
                          settings. Since browser is a little different, look at
                          your browser's Help Menu to learn the correct way to
                          modify your cookies.
                        </p>

                        <p>
                          If you turn cookies off, Some of the features that
                          make your site experience more efficient may not
                          function properly.that make your site experience more
                          efficient and may not function properly.
                        </p>

                        <h4>Third-party disclosure</h4>
                        <p>
                          We do not sell, trade, or otherwise transfer to
                          outside parties your Personally Identifiable
                          Information.
                        </p>

                        <h4>Third-party links</h4>
                        <p>
                          We do not include or offer third-party products or
                          services on our website.
                        </p>

                        <p>Users can visit our site anonymously.</p>

                        <p>
                          Once this privacy policy is created, we will add a
                          link to it on our home page or as a minimum, on the
                          first significant page after entering our website.
                        </p>

                        <p>
                          Our Privacy Policy link includes the word 'Privacy'
                          and can easily be found on the page specified above.
                        </p>

                        <p>
                          You will be notified of any Privacy Policy changes:
                        </p>
                        <ul>
                          <li>On our Privacy Policy Page</li>
                        </ul>

                        <p>You can change your personal information:</p>
                        <ul>
                          <li>By calling us</li>
                          <li>By logging in to your account</li>
                        </ul>

                        <h4>How does our site handle Do Not Track signals?</h4>
                        <p>
                          We honor Do Not Track signals and Do Not Track, plant
                          cookies, or use advertising when a Do Not Track (DNT)
                          browser mechanism is in place.
                        </p>

                        <h4>
                          Does our site allow third-party behavioral tracking?
                        </h4>
                        <p>
                          It's also important to note that we do not allow
                          third-party behavioral tracking
                        </p>

                        <p>
                          We do not specifically market to children under the
                          age of 13 years old.
                        </p>
                        <p>
                          In order to be in line with Fair Information Practices
                          we will take the following responsive action, should a
                          data breach occur: We will notify you via email -
                          Within 1 business day
                        </p>

                        <h4>We collect your email address in order to:</h4>
                        <ul>
                          <li>Send information</li>
                          <li>
                            Respond to inquiries and/or other requests or
                            questions
                          </li>
                        </ul>

                        <h4>Contacting Us</h4>
                        <p>
                          If there are any questions regarding this privacy
                          policy, you may contact us using the information
                          below.
                        </p>
                        <p>
                          <br />
                          Plot 255, Kugbo, Abuja Federal Capital Territory
                          500272
                          <br />
                          Nigeria
                          <br />
                          elisha.c.king@gmail.com
                        </p>
                        <p>Last Edited on 2020-04-21</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
