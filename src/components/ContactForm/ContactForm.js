import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContact } from '../../redux/operations';
import classes from './ContactForm.module.css';
import { showError } from '../../utils/utils';

const initialState = {
  name: '',
  phone: '',
};
export const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const allContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const isAlreadyInContacts = allContacts.some(
      contact =>
        contact.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
    );

    if (isAlreadyInContacts) {
      showError(`${formData.name} is already in contacts`);
      return;
    }
    dispatch(addContact(formData));
    setFormData(initialState);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <input
        className={classes.input}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        className={classes.input}
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};