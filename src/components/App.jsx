import React, { useState, useEffect, useRef } from "react";
import shortid from 'shortid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from './ContactList/ContactList';
import { Container } from "./App.styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from "lodash";

import { DEFAULT_CONTACTS } from "./Constants";

const defaultContacts = JSON.parse(localStorage.getItem('contacts')) ?? DEFAULT_CONTACTS;

function App() {
  const [contacts, setContacts] = useState(defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const showToast = useRef(debounce(() => { toast.error("We cannot find this contact")},300)).current;

  const getFilteredContacts = () => {
    if (!filter) return contacts;

    const result = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    if (!result.length) {
    showToast();
    }
    return result;
  };

  const formSubmitHandler = (data) => {
    const { name } = data;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts`);
      return;
    }

    const contact = { id: shortid.generate(), ...data };

    return setContacts([...contacts, contact])
  };
  
  const handlerChangeFilter = e => setFilter(e.currentTarget.value);

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
        <ToastContainer />
    </Container>
  );
}

export default App;