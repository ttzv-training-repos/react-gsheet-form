import React, { Component } from 'react';

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
    error:''

  };
  this.onFormSubmit = this.onFormSubmit.bind(this);
}
onFormSubmit(e){
  e.preventDefault();
  alert("test");
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbwNufQV-ndHHeFmduWB0fufFp73MhQr2bsn1F9IP1OVNc997feONoDiRQ/exec';
  const url = `${scriptUrl}?callback=ctrlq&name=${this.state.name}&email=${this.state.email}`;
  fetch(url, {mode: 'no-cors'}).then(
    () => { this.setState({ sent: true }); },
    () => { this.setState({ error: true }); }
  );
  console.log(this.state.error);
  console.log(this.state.sent);
}
  handleChange(e){
    e.preventDefault();
  
    
    this.setState({[e.target.name]:[e.target.value]});
  
  
    console.log(this.state.firstname);
  
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

      <input type="file" />
        </div>
        <button type="submit" className="btn btn-primary">Dodaj</button>
        
   </form>
   </div>
   </div>

      )
  }
}
export default Newfault
