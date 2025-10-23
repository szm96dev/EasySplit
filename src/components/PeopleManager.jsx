import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson, updatePerson, deletePerson } from '../store/slices/peopleSlice';
import { personSchema } from '../schemas';
import { v4 as uuidv4 } from 'uuid';

const PeopleManager = () => {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.people);
  const [editingId, setEditingId] = useState(null);

  const initialValues = {
    name: '',
    email: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      if (editingId) {
        dispatch(updatePerson({
          id: editingId,
          updates: values,
        }));
        setEditingId(null);
      } else {
        dispatch(addPerson(values));
      }

      // Save to localStorage
      const updatedPeople = editingId
        ? people.map(p => p.id === editingId ? { ...p, ...values } : p)
        : [...people, { id: uuidv4(), ...values, createdAt: new Date().toISOString() }];
      
      // Redux Persist automatically handles localStorage

      resetForm();
    } catch (error) {
      console.error('Error managing person:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (person) => {
    setEditingId(person.id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (personId) => {
    if (window.confirm('Are you sure you want to delete this person? This will also remove their expense history.')) {
      dispatch(deletePerson(personId));
      
      // Save to localStorage
      const updatedPeople = people.filter(p => p.id !== personId);
      // Redux Persist automatically handles localStorage
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-4">
        Manage People
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={personSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="input"
                placeholder="Enter person's name"
              />
              <ErrorMessage name="name" component="div" className="text-status-error dark:text-dark-status-error text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1">
                Email (optional)
              </label>
              <Field
                type="email"
                name="email"
                className="input"
                placeholder="Enter email address"
              />
              <ErrorMessage name="email" component="div" className="text-status-error dark:text-dark-status-error text-sm mt-1" />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {editingId ? 'Update' : 'Add'} Person
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      <div className="space-y-3">
        <h3 className="font-medium text-text-primary dark:text-dark-text-primary">
          Group Members ({people.length})
        </h3>
        
        {people.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-secondary dark:text-dark-text-secondary">
              No people added yet. Add your first group member above!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {people.map(person => (
              <div
                key={person.id}
                className="flex items-center justify-between p-3 bg-bg-secondary dark:bg-dark-bg-secondary rounded-lg"
              >
                <div>
                  <div className="font-medium text-text-primary dark:text-dark-text-primary">
                    {person.name}
                  </div>
                  {person.email && (
                    <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                      {person.email}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(person)}
                    className="px-3 py-1 bg-brand-primary hover:bg-interactive-primary-hover text-white text-sm rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="px-3 py-1 bg-status-error hover:bg-status-error/80 text-white text-sm rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeopleManager;
