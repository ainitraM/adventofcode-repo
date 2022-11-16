import React from 'react';
import axios from 'axios';

interface ModalType {
  isOpen: boolean;
  toggle: () => void;
}

export default function Form (props: ModalType) {
  const [formStatus, setFormStatus] = React.useState('Send');
  const [form, setForm] = React.useState({});

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

  const onSubmit = async () => {
    console.log(form);
    try {
      setFormStatus('Submitting...');
      await axios.post('https://sheet.best/api/sheets/7b203d8b-41bf-4e81-a469-fb714033d1f9',
        form);
    } catch (err) {
      setFormStatus('Something went wrong. Retry.');
    } finally {
      setFormStatus('Done')
      setTimeout(() => setFormStatus('Send'), 10000);
    }
  }
  return (
    <div className="form-modal">
      <span className="close" onClick={props.toggle}>&times;</span>
      <legend className="form-header">Register</legend>
      <div className="modal-content">
        <form id="userForm" onSubmit={onSubmit}>
          <label className="input-label">Full Name</label>
          <input className="input" name="Full-Name" onChange={(e)=>handleForm('Full-Name', e.target.value)}/>
          <label className="input-label">AoC Nickname</label>
          <input className="input" name="Nickname" onChange={(e)=>handleForm('Nickname', e.target.value)}/>
          <label className="input-label">Email</label>
          <input className="input" name="Email" onChange={(e)=>handleForm('Email', e.target.value)}/>
          <label className="input-label">Coding language</label>
          <input className="input" name="Language" onChange={(e)=>handleForm('Language', e.target.value)}/>
          <button className="submit-button" type="submit" >
            { formStatus }
          </button>
        </form>
      </div>
    </div>
  )
}