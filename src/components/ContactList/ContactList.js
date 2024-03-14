import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/selectors';
import { deleteContact } from '../../redux/operations';
import classes from './ContactList.module.css';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  return (
    <ul className={classes.container}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(contact => (
          <li className={classes.item} key={contact.id}>
            {contact.name}: {contact.phone}
            <button
              className={classes.button}
              onClick={() => dispatch(deleteContact(contact.id))}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <div>Nothing found</div>
      )}
    </ul>
  );
};