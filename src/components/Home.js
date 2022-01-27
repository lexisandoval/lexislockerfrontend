import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import MailchimpSubscribe from "react-mailchimp-subscribe";

import SubscriptionForm from './SubscriptionForm'
import home1 from '../images/home1.png'
import emailsm from '../images/email_sm.png'
import githubsm from '../images/github_sm.png'
import linkedinsm from '../images/linkedin_sm.png'
import locker from '../images/locker.png'
import shopCat from '../images/shopCat.png'
import viewAll from '../images/viewAll.png'

function Home() {

  const postUrl = 'https://gmail.us20.list-manage.com/subscribe/post?u=e2f41a50e6254e49520769eaa&id=58cce5d2eb';
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  return (
    <Container className="homeCont headerSpacing smallspacebeneath">
      <h4 className="thin spaceabove">Oh hey, welcome to the <span><img src={locker} alt="lockerImg" /></span></h4>
      {isMobile ?
        <>
          <Link className="blackLink nounderline spacehorizontal smallspacebeneath mx-auto" to="/categories">
            <img src={shopCat} alt="shop by category" />
          </Link>
          <Link className="spaceabove blackLink nounderline spacehorizontal mx-auto" to="/clothing">
            <img src={viewAll} alt="view all clothing" />
          </Link>
          <div>
            <img className="spaceabove spacebeneath homeImg" src={home1} alt="largehomeImg1" />
          </div>
          <div className="subscribe spacebeneath spaceabove">
            <MailchimpSubscribe
              url={postUrl}
              render={({ subscribe, status, message }) => (
                <SubscriptionForm
                  status={status}
                  message={message}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
            <Row id="links" className="smallspaceabove spacebeneath mx-auto" style={{ maxWidth: '85%' }}>
              <Col>
                <a className="blackLink" href="mailto:alejandra.sandoval@cognizant.com" rel="noreferrer" target="_blank"><img src={emailsm} alt="Email" /></a>
              </Col>
              <Col>
                <a className="blackLink" href="https://github.com/lexisandoval" rel="noreferrer" target="_blank"><img src={githubsm} alt="Github" /></a>
              </Col>
              <Col>
                <a className="blackLink" href="https://www.linkedin.com/in/alejandramsandoval/" rel="noreferrer" target="_blank"><img src={linkedinsm} alt="LinkedIn" /></a>
              </Col>
            </Row>
          </div>
        </> :
        <>
          <Link className="blackLink nounderline spacehorizontal" to="/categories">
            <img src={shopCat} alt="shop by category" />
          </Link>
          <Link className="blackLink nounderline spacehorizontal" to="/clothing">
            <img src={viewAll} alt="view all clothing" />
          </Link>
          <div>
            <img className="spaceabove homeImg" src={home1} alt="largehomeImg1" />
          </div>
          <div className="subscribe smallspaceabove">
            <Row id="sub">
              <Col className="my-auto mx-auto">
                <Row id="links">
                  <Col>
                    <a className="blackLink" href="mailto:alejandrasandoval@cognizant.com" rel="noreferrer" target="_blank"><img src={emailsm} alt="Email" /></a>
                  </Col>
                  <Col>
                    <a className="blackLink" href="https://github.com/lexisandoval" rel="noreferrer" target="_blank"><img src={githubsm} alt="Github" /></a>
                  </Col>
                  <Col>
                    <a className="blackLink" href="https://www.linkedin.com/in/alejandramsandoval/" rel="noreferrer" target="_blank"><img src={linkedinsm} alt="LinkedIn" /></a>
                  </Col>
                </Row>
              </Col>
              <Col className="borderLeft paddinghorizontal">
                <MailchimpSubscribe
                  url={postUrl}
                  render={({ subscribe, status, message }) => (
                    <SubscriptionForm
                      status={status}
                      message={message}
                      onValidated={formData => subscribe(formData)}
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
        </>
      }
    </Container>
  )
}

export default Home