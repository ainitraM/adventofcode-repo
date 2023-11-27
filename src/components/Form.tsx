import React from 'react';
import { spreadsheetAPI, ModalType } from "../consts";

export default function Form (props: ModalType) {
  const [formStatus, setFormStatus] = React.useState('Send');
  const [form, setForm] = React.useState({});
  const [register, setRegister] = React.useState('Register');

  const escFunction = React.useCallback((event: { key: string; }) => {
    if (event.key === "Escape") {
      if (props.isOpen) props.toggle();
    }
  }, [props.isOpen]);

  const handleForm = (name: string, value: string) => {
    setForm({...form, [name]: value});
  }

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  async function appendSpreadsheet() {
    setFormStatus('Submitting...');
    fetch(spreadsheetAPI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.values(form))
      }).then(() => {
      setFormStatus('Done')
      setRegister('Thank you for signing up!');
      setTimeout(() => {
        if (props.isOpen) props.toggle();
      }, 2000);
    }).catch(() => {
      setFormStatus('Something went wrong. Retry and contact admins.');
    });
  }

  function onSubmit (e: { preventDefault: () => void; }) {
    e.preventDefault();
    appendSpreadsheet();
  }

  return (
    <div className="form-modal">
      <span className="close" onClick={props.toggle}>&times;</span>
      <legend className="form-header">{register}</legend>
      <div className="modal-content">
        <form id="userForm" onSubmit={onSubmit}>
          <label className="input-label">Full Name</label>
          <input required className="input" name="Full-Name" onChange={(e)=>handleForm('Full-Name', e.target.value)}/>
          <label className="input-label">AoC Nickname</label>
          <input required className="input" name="Nickname" onChange={(e)=>handleForm('Nickname', e.target.value)}/>
          <label className="input-label">Email</label>
          <input required className="input" name="Email" onChange={(e)=>handleForm('Email', e.target.value)}/>
          <label className="input-label">Coding language</label>
          <input required className="input" name="Language" onChange={(e)=>handleForm('Language', e.target.value)}/>
          <button className="submit-button" type="submit" >
            { formStatus }
          </button>
        </form>
      </div>
    </div>
  )
}