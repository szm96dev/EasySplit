import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { addPerson, updatePerson } from '../store/slices/peopleSlice';
import { personSchema } from '../schemas';
import { v4 as uuidv4 } from 'uuid';
import { Modal, FormInput } from './common';

const PeopleModal = ({ isOpen, onClose, person = null }) => {
  const dispatch = useDispatch();
  const isEditing = !!person;

  const initialValues = useMemo(() => ({
    name: person?.name || '',
    email: person?.email || ''
  }), [person]);

  // Use the imported validation schema
  const validationSchema = personSchema;

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const personData = {
      id: person?.id || uuidv4(),
      name: values.name.trim(),
      email: values.email.trim() || null,
      createdAt: person?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isEditing) {
      dispatch(updatePerson(personData));
    } else {
      dispatch(addPerson(personData));
    }

    setSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Person' : 'Add New Person'}
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <FormInput
              name="name"
              type="text"
              label="Name"
              placeholder="Enter person's name"
              required
            />

            <FormInput
              name="email"
              type="email"
              label="Email (optional)"
              placeholder="Enter email address"
            />

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1"
              >
                {isSubmitting ? 'Saving...' : (isEditing ? 'Update Person' : 'Add Person')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default React.memo(PeopleModal);
