import { useEffect, useRef, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import * as storage from 'helpers/storage';
import * as storageKeys from 'data/storageKeys';
import Notiflix from 'notiflix';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsParsed = storage.load(storageKeys.CONTACTS);
    return contactsParsed ? contactsParsed : [];
  });
  const [filter, setFilter] = useState('');
  const prevContactsRef = useRef([]);

  useEffect(() => {
    contacts && storage.save(storageKeys.CONTACTS, contacts);
    prevContactsRef.current = contacts;
    if (prevContactsRef.current.length > contacts.length)
      Notiflix.Notify.failure('Contact deleted successfully');
  }, [contacts]);

  const handleFormSubmit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Notify.info(`${name} is already in contcts`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
    Notiflix.Notify.success('Contact added successfully');
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normilizedFilterValue = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilterValue)
    );
  };

  const onDeleteBtn = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilter={handleFilter} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteBtn={onDeleteBtn}
        />
      </div>
    </>
  );
};
