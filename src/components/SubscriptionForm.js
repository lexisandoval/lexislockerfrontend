import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

const SubscriptionForm = ({ status, message, onValidated }) => {

  const [email, setEmail] = useState('');

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status])

  const clearFields = () => {
    setEmail('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email
      });
  }

  return (
    <form className="spaceabove" onSubmit={(e) => handleSubmit(e)}>
      <h4 className="thin spacebeneath">
        {status === "success" ?
          "" :
          "Sign up for our newsletter"
        }
      </h4>

      {status === "sending" && (
        <div className="thin spacebeneath">Sending...</div>
      )}

      {status === "error" && (
        <div className="thin spacebeneath" dangerouslySetInnerHTML={{ __html: message }} />
      )}

      {status === "success" && (
        <>
          <br /><br />
          <h4 className="thin spacebeneath" dangerouslySetInnerHTML={{ __html: message }} />
          <br /><br />
        </>
      )}

      {status !== "success" ?
        <div>
          <input placeholder="Email" name="email" className="paddinghorizontal spacebeneath thin medium" value={email} onChange={emailChangeHandler} type="text"></input><br />
        </div> :
        null
      }

      {status === 'success' ?
        <></> :
        <Button className="addButton spacebeneath" value="Subscribe" type="submit" formvalues={[email]}>Subscribe</Button>
      }
    </form>
  )
}

export default SubscriptionForm