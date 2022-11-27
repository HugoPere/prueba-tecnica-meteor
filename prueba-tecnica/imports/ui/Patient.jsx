import React from 'react';

export const Patient = ({ patient, onDeleteClick }) => {
  return (
    <React.Fragment>
    <tr>
            <td>{patient.nombres}</td>
            <td>{patient.apellidoP}</td>
            <td>{patient.apellidoM}</td>
            <td>{patient.rut}</td>
            <td>{patient.region}</td>
            <td>{patient.comuna}</td>
            <td>{patient.postal}</td>
            <td><button onClick={() => onDeleteClick(patient) }>&times;</button></td>
            </tr>
    </React.Fragment>
  );
};