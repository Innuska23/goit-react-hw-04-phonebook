import React, { useState, useEffect } from "react";
import shortid from 'shortid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from './ContactList/ContactList';
import { Container } from "./App.styled";

import { DEFAULT_CONTACTS } from "./Constants";

const defaultContacts = JSON.parse(localStorage.getItem('contacts')) ?? DEFAULT_CONTACTS;

function App() {
  const [contacts, setContacts] = useState(defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const getFilteredContacts = () => {
    if (!filter) return contacts;
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  };

  const formSubmitHandler = (data) => {
    const { name } = data;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = { id: shortid.generate(), ...data };

    return setContacts([...contacts, contact])
  };
  
  const handlerChangeFilter = e => setFilter(e.target.value);

  const handleRemoveContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} handlerChangeFilter={handlerChangeFilter} />
      <ContactList contacts={getFilteredContacts()}
        onDelete={handleRemoveContact} />
    </Container>
  );
}

export default App;