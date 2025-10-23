import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePerson } from '../store/slices/peopleSlice';
import PeopleModal from '../components/PeopleModal';
import { Button } from '../components/common';
import { 
  UserGroupIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const PeoplePage = () => {
  const dispatch = useDispatch();
  const { people } = useSelector(state => state.people);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  const handleAddPerson = () => {
    setEditingPerson(null);
    setIsModalOpen(true);
  };

  const handleEditPerson = (person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const handleDeletePerson = (personId) => {
    if (window.confirm('Are you sure you want to delete this person? This will also remove them from all expenses.')) {
      dispatch(deletePerson(personId));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary dark:text-dark-text-primary">
              People
            </h1>
        <p className="text-sm sm:text-base text-text-secondary dark:text-dark-text-secondary mt-2">
          Manage group members and contributors
        </p>
          </div>
          <Button onClick={handleAddPerson} variant="primary" size="lg" className="w-full sm:w-auto">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Add Person
          </Button>
        </div>
      </div>

      {/* People List */}
      {people.length === 0 ? (
        <div className="card p-8 text-center">
          <UserGroupIcon className="w-16 h-16 text-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
            No people added yet
          </h3>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            Start by adding group members to track expenses together.
          </p>
          <Button onClick={handleAddPerson} variant="primary">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Your First Person
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-6">
          {people.map(person => (
            <div
              key={person.id}
              className="card p-6 hover:shadow-lg transition-shadow flex-1 md:flex-1 lg:flex-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                      {person.name}
                    </h3>
                    {person.email && (
                      <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                        {person.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary mb-4">
                Added: {new Date(person.createdAt).toLocaleDateString()}
              </div>

              <div className="flex flex-row space-x-2">
                <Button
                  onClick={() => handleEditPerson(person)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeletePerson(person.id)}
                  variant="danger"
                  size="sm"
                  className="flex-1"
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* People Modal */}
      {isModalOpen && (
        <PeopleModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPerson(null);
          }}
          person={editingPerson}
        />
      )}
    </div>
  );
};

export default PeoplePage;
