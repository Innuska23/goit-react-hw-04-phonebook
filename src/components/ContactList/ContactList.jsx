import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, Button } from './ContactList.styled';

function ContactList({ contacts, onDelete }) {
    return (
        <List>
            {contacts?.map(({ id, name, number }, idx) => (
                <ListItem key={id}>
                    <span>{idx + 1}. {name}: {number} </span>
                    <Button onClick={() => onDelete(id)}>delete</Button>
                </ListItem>
            ))}
        </List>
    );
}

ContactList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
};

export default ContactList;