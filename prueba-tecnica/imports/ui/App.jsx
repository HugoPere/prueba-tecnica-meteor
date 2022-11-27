import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patient } from './Patient';
import { TasksCollection } from '/imports/api/TasksCollection';
import "/imports/api/TasksCollection";
import { PatientRegister } from './PatientRegister';
import { PatientCollection } from '../api/PatientCollection';

export const App = () => {

  const patients = useTracker(()  => PatientCollection.find({}, { sort: {createdAt: -1}}).fetch());

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const deleteTask = ({ _id }) => PatientCollection.remove(_id);

  return (
    <div>
      <h1>Prueba Tecnica Hugo Perez</h1>

      <PatientRegister></PatientRegister>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido paterno</th>
            <th scope="col">Appellido materno</th>
            <th scope="col">Rut</th>
            <th scope="col">Region</th>
            <th scope="col">Comuna</th>
            <th scope="col">Rut</th>
          </tr>
        </thead>
        <tbody>
            { patients.map(patient => <Patient key={ patients._id } patient={ patient } onDeleteClick={deleteTask}/>) }
        </tbody>
      </table>
    </div>
  );
};