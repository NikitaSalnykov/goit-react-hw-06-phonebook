import PropTypes from 'prop-types';
import { Button, Form, Input } from './ContactForm.styled';
import Notiflix from 'notiflix';
import { useState } from 'react';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;

      default:
        break;
    }
  };

  const onSubmitClick = e => {
    e.preventDefault();

    if (!name.trim() && !number.trim()) {
      Notiflix.Notify.failure('Empty input!');
      return;
    }

    onSubmit({ name, number });
  };

  return (
    <Form onSubmit={onSubmitClick}>
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
        <label htmlFor="tel">Number</label>
        <Input
          id="tel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
        <Button type="submit">Add contact</Button>
      </div>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
