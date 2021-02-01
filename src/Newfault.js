import React, { Component } from 'react';
import axios from 'axios'; 
import {app} from './Fire';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export class Newfault extends Component {

  constructor(props){
    super(props);
    this.state = {
      project:'',
      address:'',
      projectno:'',
      fullname:'',
      phone:'',
      email:'',
      issues:[],
      issueDesc:'',
      customerDate:'',
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
    const url = `${scriptUrl}?callback=ctrlq&project=${this.state.project}&address=${this.state.address}&projectno=${this.state.projectno}&fullname=${this.state.fullname}&phone=${this.state.phone}&email=${this.state.email}&issues=${this.state.issues}&issueDesc=${this.state.issueDesc}&customerDate=${this.state.customerDate}&file=${fileurl}`;
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
  checkboxHandler = (e) => {
    let value = e.target.value;
    let issues = this.state.issues;
    if(issues.includes(value)){
      issues.splice(issues.indexOf(value), 1);
    } else {
      issues.push(value);
    }
    console.log(this.state.issues);
  }

  render() {
      return (
        <div className="container w-50">
          <div className="p-5">
            <Form onSubmit={this.onFormSubmit}>
              <Form.Group>
                <Form.Label>Inwestycja: *</Form.Label>
                <Form.Control as="select" size="md" name="project" onChange={this.handleChange.bind(this)}>
                  <option></option>
                  <option>Nowy Targówek etap I</option>
                  <option>Nowy Targówek etap II</option>
                  <option>Nowy Targówek etap III</option>
                  <option>Nowe Bemowo</option>
                  <option>Wilanów etap I</option>
                  <option>Wilanów etap II</option>
                  <option>Wilanów etap III</option>
                  <option>Marina I</option>
                  <option>Marina II</option>
                  <option>Marina III</option>
                  <option>Marina IV</option>
                  <option>Nowy Targówek etap IV</option>
                  <option>Nowy Targówek Lokale Inwestycyjne</option>
                  <option>Osiedle Warszawa</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Adres: *</Form.Label>
                <Form.Control type="text" name="address" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Numer budowlany: *</Form.Label>
                <Form.Control type="text" name="projectno" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Imię i nazwisko: *</Form.Label>
                <Form.Control type="text" name="fullname" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Kontakt telefoniczny: *</Form.Label>
                <Form.Control type="text" name="phone" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Adres Mail: *</Form.Label>
                <Form.Control type="email" name="email" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Kategoria problemu</Form.Label>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Wentylacja" name="issueCategory" value="Wentylacja"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Elektryka" name="issueCategory" value="Elektryka"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Hydraulika" name="issueCategory" value="Hydraulika"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Budowlana" name="issueCategory" value="Budowlana"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Stolarka okienna" name="issueCategory" value="Stolarka okienna"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Drzwi wejściowe" name="issueCategory" value="Drzwi wejściowe"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Rolety" name="issueCategory" value="Rolety"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Uwagi dotyczące wykończenia ATAL" name="issueCategory" value="Uwagi"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Części wspólne budynku" name="issueCategory" value="Części wspólne budynku"></Form.Check>
                <Form.Check className="d-flex justify-content-start" onChange={this.checkboxHandler} label="Inne:" name="issueCategory" value=""></Form.Check>
              </Form.Group>

              <Form.Group>
                <Form.Label>Opis usterki</Form.Label>
                <Form.Control as="textarea" rows={5} name="issueDesc" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Data odbioru lokalu</Form.Label>
                <Form.Control type="date" name="customerDate" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Dodaj plik</Form.Label>
                <Form.Control type="file" name="file" onChange={this.handleChange.bind(this)}></Form.Control>
              </Form.Group>

              <Card className="mb-1">
                <Card.Body>
                  <Card.Title>Informacje</Card.Title>
                  <Card.Text className="">
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
                    - Wszelkie uszkodzenia zgłaszać od razu, a nie jak doprowadzą do dalszej degradacji elementu budynku, instalacji, mieszkania. W przeciwnym wypadku następuje utrata rękojmi. Zapoznałem/łam się z warunkami dotyczącymi wysłania zgłoszenia.
                  </Card.Text>
                  <Form.Group>
                    <Form.Check label="Potwierdzam zapoznanie się z informacją dotyczącą zgłoszenia. *" name="confirmTerms" onChange={this.handleChange.bind(this)}></Form.Check>
                  </Form.Group>
                </Card.Body>
              </Card>

              <Button variant="primary" type="submit">
                Wyślij zgłoszenie
              </Button>
            </Form>
          </div>
        </div>

      )
  }
}
export default Newfault
