import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Formik } from 'formik';
import * as yup from 'yup';
import { FormContact, Error, InputForm, LabelForm, ButtonForm } from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().required(),
});

const initialValues = {
  name: '',
  number: '',
};

const nameInputId = shortid.generate();
const numberInputId = shortid.generate();

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormContact autoComplete="off">
        <LabelForm htmlFor={nameInputId}>
          Name
        </LabelForm>
        <InputForm
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Error name="name" component="div" />

        <LabelForm htmlFor={numberInputId}>
          <span>Number</span>
        </LabelForm>
        <InputForm
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Error name="number" component="div" />

        <ButtonForm type="submit">Add contact</ButtonForm>
      </FormContact>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;