import React, { Component } from 'react';
import {app} from './Fire';
import './AtalForm.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { NotificationManager } from "react-notifications";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {FormErrors} from './FormErrors';
import SimpleSelector from './SimpleSelector';
//comment 
let city_investment = {
  Warszawa: ["Marina I",
  "Marina II",
  "Marina III",
  "Marina IV",
  "Nowy Targówek etap I",
  "Nowy Targówek etap II",
  "Nowy Targówek etap III",
  "Nowe Bemowo",
  "Nowa Grochowska I",
  "Nowa Grochowska II ",
  "Nowa Grochowska III ",
  "Nowa Grochowska Lokale Inwestycyjne",
  "Nowy Targówek etap IV",
  "Nowy Targówek Lokale Inwestycyjne",
  "Centro Ursus"  ,
  "Osiedle Warszawa I",
  "Osiedle Warszawa II",
  "Osiedle Warszawa III ",
  "Wilanów etap I",
  "Wilanów etap II",
  "Wilanów etap III"],
  Poznań: ["c2inv1", "c2inv2", "c2inv3","c2inv4", "c2inv5", "c2inv6"],
}

const override = css`
  display: block;
`;

export class AtalForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      city: '',
      project:'',
      address:'',
      projectno:'',
      fullname:'',
      phone:'',
      email:'',
      issues:[],
      issueDesc:'',
      customerDate:'',
      file: {file1: null, file2: null,file2: null},
      fileold: null,
      file1: "",
      file2: "",
      file3: "",
      fileurl: '',
      loading: false,
      formErrors: {email: '', phone: ''},
      emailValid: false,
      phoneValid: false,
      formValid: false,
      formShow: true,
    };
  }


  generateUrl(params) {
    let baseScriptURL = 'https://script.google.com/macros/s/AKfycbwNufQV-ndHHeFmduWB0fufFp73MhQr2bsn1F9IP1OVNc997feONoDiRQ/exec?callback=ctrlq&';
    let paramsString = params.map(p => `${p}=${this.state[p]}`).join("&");
    return `${baseScriptURL}${paramsString}`;
  }

async getUrl(item, i){
  const storage = app.storage();
  const storageRef=storage.ref();
  var number= Math.round(Math.random() * 1000000000);
  const fileref = storageRef.child(number.toString());
  if  (item.file1!=null){
    //var filename=item.file1.value.toString();
    var extension="file1."+item.file1.name.split('.').pop();
  await fileref.child(extension).put(item.file1);
  this.setState({file1: extension});
  }
  if  (item.file2!=null){
    var extension="file2."+item.file2.name.split('.').pop();
    await fileref.child(extension).put(item.file2);
    this.setState({file2: extension});
    }
  if  (item.file3!=null){
    var extension="file3."+item.file3.name.split('.').pop();
      await fileref.child(extension).put(item.file3);
      this.setState({file3: extension});
      }

  return await number;
}
  
  async firebaseUpload(pliki){
    let t=false;
    let filesurl=this.state.fileurl;
    var files=this.state.file
    return this.getUrl(files)
  }

  onFormSubmit = (e) => {
    this.setState({formValid: false}); // to tylko blokuje przycisk po jego kliknięciu :)
    this.setState({loading: true});
    e.preventDefault();
    this.firebaseUpload(this.state.file).then( fileurl => {
      this.setState({fileurl: fileurl});
      let url = this.generateUrl([
        "city",
        "project",
        "address",
        "projectno",
        "fullname",
        "phone",
        "email",
        "issues",
        "issueDesc",
        "customerDate",
        "fileurl",
        "file1",
        "file2",
        "file3"
      ]);
      fetch(url).then( () =>{
        this.setState({loading: false});
        NotificationManager.success('Zgłoszenie wysłane', 'Wysłano', 2000);
        this.setState({formShow: false});
      });
      });    
    }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.type === "file") {
      let tablefile =this.state.file;
      value = e.target.files[0];
      if (e.target.name==="file1"){
        tablefile.file1=value;
      }
      if (e.target.name==="file2"){
        tablefile.file2=value;
      }
      if (e.target.name==="file3"){
        tablefile.file3=value;
      }
      this.setState({[this.state.file]:tablefile});
     
    } else{
      this.setState({[name]:value},() => { this.validateField(name, value) });
    }
  
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' Niepoprawny adres';
        break;
      case 'phone':
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/im;
        phoneValid = value.match(regex)
        fieldValidationErrors.phone = phoneValid ? '': ' Niepoprawny numer';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    phoneValid: phoneValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.phoneValid});
  }
  
  checkboxHandler = (e) => {
    let value = e.target.value;
    let issues = this.state.issues;
    if(issues.includes(value)){
      issues.splice(issues.indexOf(value), 1);
    } else {
      issues.push(value);
    }
    this.setState({issues: issues});
  }

  render() {

    let className = '';
    let className2 = 'my-5 d-none';
    if (!this.state.formShow) {
      className += ' d-none';
      className2 = 'my-5 h-100 p-3';
    }
      return (
        <div className="main">
          <div className="container d-flex justify-content-center">     
            <div className="form-container my-5 ">
            <div className={className2}><p>Dziękujemy za wysłanie zgłoszenia.</p></div>
              <Form onSubmit={this.onFormSubmit} className={className}>
                <SimpleSelector options={Object.keys(city_investment)} 
                                name="city" 
                                label="Miasto: *" 
                                onChange={this.handleChange}
                                required={true} />
                                
                <SimpleSelector options={city_investment[this.state.city]} 
                                name="project" 
                                label="Inwestycja: *"
                                onChange={this.handleChange}
                                required={true} />

                <Form.Group controlId="address">
                  <Form.Label>Adres: *</Form.Label>
                  <Form.Control type="text" name="address" onChange={this.handleChange} required></Form.Control>
                </Form.Group>

                <Form.Group controlId="projectno">
                  <Form.Label>Numer budowlany: *</Form.Label>
                  <Form.Control type="text" name="projectno" onChange={this.handleChange} required></Form.Control>
                </Form.Group>
                
                <Form.Group controlId="fullname">
                  <Form.Label>Imię i nazwisko: *</Form.Label>
                  <Form.Control type="text" name="fullname" onChange={this.handleChange} required></Form.Control>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Kontakt telefoniczny: *</Form.Label>
                  <Form.Control type="text" name="phone" onChange={this.handleChange} required></Form.Control>
                  <Form.Text className="text-mute">
                  <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors.phone} />
                  </div>
                  </Form.Text>
                </Form.Group>
                
                
                <Form.Group controlId="email">
                  <Form.Label>Adres email: *</Form.Label>
                  <Form.Control type="email" name="email" onChange={this.handleChange} required></Form.Control>
                  <Form.Text className="text-mute">
                    <div className="panel panel-default">
                     <FormErrors formErrors={this.state.formErrors.email} />
                    </div>
                  </Form.Text>
                </Form.Group>
                
                <div>
                  <div className="mb-2">Kategoria problemu</div>
                  {["Wentylacja",
                   "Elektryka", 
                   "Hydraulika", 
                   "Budowlana", 
                   "Stolarka okienna", 
                   "Drzwi wejściowe", 
                   "Rolety", 
                   "Uwagi dotyczące wykończenia ATAL", 
                   "Części wspólne budynku"
                   ].map((option, index) => (
                    <Form.Group controlId={`check${index}`} key={`check-${index}`}>
                      <Form.Check 
                        className="d-flex justify-content-start" 
                        onChange={this.checkboxHandler} 
                        label={option}
                        name="issueCategory" 
                        value={option}
                      />
                    </Form.Group>
                  ))}
                </div>
                <Form.Group controlId="issueDesc">
                  <Form.Label>Opis usterki</Form.Label>
                  <Form.Control as="textarea" rows={5} name="issueDesc" onChange={this.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group controlId="customerDate">
                  <Form.Label>Data odbioru lokalu</Form.Label>
                  <Form.Control type="date" name="customerDate" onChange={this.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group controlId="file">
                  <Form.Label>Dodaj plik</Form.Label>
                  <Form.Control type="file" name="file1" onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>Dodaj plik 2</Form.Label>
                  <Form.Control type="file" name="file2" onChange={this.handleChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="file">
                  <Form.Label>Dodaj plik 3</Form.Label>
                  <Form.Control type="file" name="file3" onChange={this.handleChange}></Form.Control>
                </Form.Group>

                <Card className="mb-1">
                  <Card.Body>
                    <Card.Title>Informacje</Card.Title>
                    <Card.Text className="card-info">
                      Deweloper informuje, że : 
                      <br></br>  
                      <br></br>                                                                       
                      - Przed dokonaniem naprawy gwarancyjnej lokator będzie zobligowany udostępnić lokal Inwestorowi/Wykonawcy (w godzinach: 8:00 - 16:00 od poniedziałku do piątku) celem przeprowadzenia wizji lokalnej mającej na celu stwierdzenia zasadności zgłoszenia, określenia technologii i zakwalifikowania do prac gwarancyjnych. W przypadku uniemożliwienia Inwestorowi/Wykonawcy dostępu do lokalu zachodzą okoliczności zwolnienia z odpowiedzialności z tytułu usunięcia wady/ usterki, której dotyczyło zgłoszenie.      
                      <br></br> 
                      <br></br>                                                                         
                      - W przypadku gdy Lokator usunie wadę/usterkę we własnym zakresie, bez jej odpowiedniego, zgłoszenia Zarządcy i Inwestorowi w żadnym wypadku Inwestor nie będzie odpowiedzialny za pokrycie kosztów usunięcia takiej wady.     
                      <br></br> 
                      <br></br>                      
                      - W przypadku stwierdzenia nieuzasadnionego wezwania do usunięcia usterki, której przyczyna nie będzie leżała po stronie dewelopera (np. przez nieprzestrzeganie instrukcji użytkowania), deweloper zastrzega sobie prawo (na żądanie firmy wezwanej do usunięcia usterki) do obciążenia właściciela mieszkania kosztami nieuzasadnionego wezwania.                         
                      <br></br> 
                      <br></br>                                          
                      - Wszelkie uszkodzenia zgłaszać od razu, a nie jak doprowadzą do dalszej degradacji elementu budynku, instalacji, mieszkania. W przeciwnym wypadku następuje utrata rękojmi.
                    </Card.Text>
                    <Card.Footer>
                    <Form.Group controlId="confirmTerms">
                      <Form.Check label="Potwierdzam zapoznanie się z informacją dotyczącą zgłoszenia. *" name="confirmTerms" onChange={this.handleChange} required></Form.Check>
                    </Form.Group>
                    </Card.Footer>
                  </Card.Body>
                </Card>

                <div className="d-flex align-items-center justify-content-between">
                  <Button variant="primary" type="submit" disabled={!this.state.formValid}>
                    Wyślij zgłoszenie
                  </Button>
                  <ClipLoader loading={this.state.loading} css={override} size={30} />
                </div>
              </Form>
            </div>
          </div>
        </div>
      )
  }
}
export default AtalForm
