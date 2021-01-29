import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import axios from 'axios'; 
import {app} from './Fire';

export class Newfault extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstname:'',
      email:'',
      lastname:'',
      phone:'',
      project:'',
      building:'',
      apartment:'',
      sort:'',
      tresc:'',
      sent: '',
      error:'',
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  async onFormSubmit(e){
    e.preventDefault();
    alert("test");
    
   // const db= app.firestore();
    const storage = app.storage();
    const storageRef=storage.ref();
    const fileref= storageRef.child(this.state.file.name);
    await fileref.put(this.state.file);
    //const uploadTask = storage.ref(`/images/`).put(this.state.file);
    //console.log("obrazek: "+uploadTask);
    const fileurl=await fileref.getDownloadURL();
    console.log("obrazek: "+fileurl);
    console.log(this.state.error);
    console.log(this.state.sent);
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwNufQV-ndHHeFmduWB0fufFp73MhQr2bsn1F9IP1OVNc997feONoDiRQ/exec';
    const url = `${scriptUrl}?callback=ctrlq&name=${this.state.firstname}&email=${this.state.email}&file=${fileurl}&lastname=${this.state.lastname}&phone=${this.state.phone}&building=${this.state.building}&apartment=${this.state.apartment}&sort=${this.state.sort}&tresc=${this.state.tresc}&project=${this.state.project}`;
    fetch(url, {mode: 'no-cors'}).then(
      () => { this.setState({ sent: true }); },
      () => { this.setState({ error: true }); }
    );
  }
  handleChange(e){
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    
    if (e.target.type === "file") {
      value = e.target.files[0];
      console.log(value);
    } 
    this.setState({[name]:value});
    
    console.log(this.state);
  
  }
  fileChangedHandler = (event) => {
    const file = event.target.files[0]
  }
  fileChangedHandler = event => {
    this.setState({ file: event.target.files[0] })
  }

  uploadHandler = () => {
    const formData = new FormData()
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    axios.post('my-domain.com/file-upload', formData)
  }

  debug = () => {
    console.log("Debug", this.state)
    const fd = new FormData();
    fd.append('image', this.state.file, this.state.file.name);
    axios.post("https://script.google.com/macros/s/AKfycbwNufQV-ndHHeFmduWB0fufFp73MhQr2bsn1F9IP1OVNc997feONoDiRQ/exec", fd)
    .then(r => console.log("file upload successful"));
  }
  render() {
      //wyśietlanie listy projektów
      return (
        <div className="container">
          <div className="row justify-content-md-center">
        <form  onSubmit={ this.onFormSubmit } className="form">
        <div className="form-group">
         <label htmlFor="title">Imię</label>
         <input type="textarea"  value={this.state.firstname}  name="firstname" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Wpisz imię" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Nazwisko</label>
         <input type="textarea"  value={this.state.lastname}  name="lastname" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Wpisz nazwisko" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Adres email</label>
         <input type="textarea"  value={this.state.email}  name="email" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Numer telefonu</label>
         <input type="textarea"  value={this.state.phone}  name="phone" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Inwestycja</label>
         <input type="textarea"  value={this.state.project}  name="project" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Numer budynku</label>
         <input type="textarea"  value={this.state.building}  name="building" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Numer lokalu</label>
         <input type="textarea"  value={this.state.apartment}  name="apartment" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Typ zgłoszenia</label>
         <input type="textarea"  value={this.state.sort}  name="sort" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
        <div className="form-group">
         <label htmlFor="title">Treść</label>
         <input type="textarea"  value={this.state.tresc}  name="tresc" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Enter title" />
        
        </div>
       
         <div className="form-group">

        <input type="file" name="file" onChange={this.fileChangedHandler} />
        </div>
        <button type="submit" className="btn btn-primary">Dodaj</button>
        <br></br>
        <br></br>
        
        <Button onClick={this.debug}>Test uploadu</Button>
        
   </form>
   </div>
   </div>

      )
  }
}
export default Newfault
