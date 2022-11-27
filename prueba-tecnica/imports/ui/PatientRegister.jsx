import React, {useState} from 'react';
import {PatientCollection} from '/imports/api/PatientCollection';
import {validateRut} from 'rutlib';
export const PatientRegister  = () => {

    const [nombres, setNombres] = useState("");
    const [apellidoP, setApellidoP] = useState("");
    const [apellidoM, setApellidoM] = useState("");
    const [rut, setRut] = useState("");
    const [region, setRegion] = React.useState("");
    const [comuna, setComuna] = useState("");
    const [postal, setPostal] = useState("");
    
      /** "selected" here is state variable which will hold the
     * value of currently selected dropdown.
     */
    const [selected, setSelected] = React.useState("");
    
    /** Cambia los valores del dropdown de comunas
     */
    const changeSelectOptionHandler = (event) => {
      setRegion(event.target.value);
      setSelected(event.target.value);
    };
    
    /** Arrays con comunas (deberia ser algo de MongoDB mejor) */
    const regionI = [
      "Town 1",
      "Town 2",
      "Town 3",
    ];
    const regionII = [
      "Town 4",
      "Town 5",
      "Town 6",
    ];
    const regionIII = [
      "Town 7",
      "Town 8",
      "Town 9",
    ];
    const regionIV = [
      "Town 10",
      "Town 11",
      "Town 12",
    ];
    
    let type = null;
    
    let options = null;
    
    if (selected === "I") {
      type = regionI;
    } else if (selected === "II") {
      type = regionII;
    } else if (selected === "III") {
      type = regionIII;
    } else if (selected === "IV") {
    type = regionIV;
    }
    
    if (type) {
      options = type.map((el) => <option value={el}>{el}</option>);
    }
    else{
      options = (<option key="undefined"> Seleccione Region </option>)
    }

    //revisamos si el rut ya esta en uso
    const isRutUsed = async (rutBuscar)=>{
      //alert("entre a rutUsed");
      let queriedResult = await PatientCollection.find({rut : rutBuscar});

      if(!queriedResult){
        //existe
        console.log("Im true");
        return true;
      }
      else{
        //no existe
        console.log("im false");
        return false;
      }
    }
    const handleSubmit = e => {
      if(validateRut(rut.trim())){
        //isRutUsed(rut);
        e.preventDefault();

        if (!nombres){
          alert("Ingrese nombres");
          return
        };
        if (!apellidoM){
          alert("Ingrese apellido materno");
          return
        };
        if (!apellidoP){
          alert("Ingrese apellido paterno");
          return
        };
        if (!postal){
          alert("Ingrese codigo postal");
          return
        };
        if (comuna == "unselected"){
          alert("Ingrese comuna");
          return
        };

        PatientCollection.insert({
          nombres: nombres.trim(),
          apellidoP: apellidoP.trim(),
          apellidoM: apellidoM.trim(),
          rut: rut.trim(),
          region: region.trim(),
          comuna: comuna,
          postal: postal.trim(),
          createdAt: new Date()
        });

        setNombres("");
        setApellidoP("");
        setApellidoM("");
        setRut("");
        setRegion("");
        setComuna("");
        setPostal("");
      }
      else{
        alert("Rut erroneo");
        return
      }
    };

    
  
    return (
        <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Nombres:
          <input
            type="text"
            placeholder="Ingrese nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            class="form-control"
          />
        </label>
        <label>
          Apellido Paterno:
          <input
            type="text"
            placeholder="Ingrese apellido paterno"
            value={apellidoP}
            onChange={(e) => setApellidoP(e.target.value)}
            class="form-control"
          />
        </label>
        <label>
          Apellido Materno:
          <input
            type="text"
            placeholder="Ingrese apellido materno"
            value={apellidoM}
            onChange={(e) => setApellidoM(e.target.value)}
            class="form-control"
          />
        </label>
        <label>
          Rut:
          <input
            type="text"
            placeholder="Ingrese rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            class="form-control"
          />
        </label>
        <br></br>
        <label>
          Region:
          <select value={region} onChange={changeSelectOptionHandler}>
            <option selected value="INVALID">Seleccione región</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
          </select>
        </label>
        <label>
          Comuna:
          <select value={comuna} onChange={(e) => setComuna(e.target.value)}>
            <option vale="unselected">Seleccionar comuna despues de seleccionar region</option>
            {options}
          </select>
        </label>
        <br></br>
        <label>
          Postal:
          <input
            type="text"
            placeholder="Ingrese codigo postal"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            class="form-control"
          />
          {/* <input type="text" name="postal" /> */}
        </label>
        <br></br>
        <input type="submit" value="Submit" class="btn btn-primary"/>
        <br></br>
      </form>
    );
  };
  