import React, { Component } from "react"
import shortid from 'shortid';
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from './ContactList/ContactList';
import { Container } from "./App.styled";
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    debugger
    const { name } = data;
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = { id: shortid.generate(), ...data };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  handlerChangeFilter = e => this.setState({ filter: e.target.value });

  handleRemoveContact = contactId => {
    this.setState(state => ({
      ...state,
      contacts: state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    if (!this.state.filter) return this.state.contacts;

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount = () => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
    }
    localStorage.setItem('contacts', JSON.stringify(contacts))
  };


  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} handlerChangeFilter={this.handlerChangeFilter} />
        <ContactList contacts={this.getFilteredContacts()}
          onDelete={this.handleRemoveContact} />
      </Container>
    );
  }
};
