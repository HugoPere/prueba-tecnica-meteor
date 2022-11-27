import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { PatientCollection } from '../imports/api/PatientCollection';
import  "/imports/api/TasksCollection";
const insertTask = taskText => TasksCollection.insert({ text: taskText });
const insertCollection = patient => PatientCollection.insert({ nombres: patient.nombres, apellidoP: patient.apellidoP});
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});