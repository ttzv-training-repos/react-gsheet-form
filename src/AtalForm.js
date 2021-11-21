import React, { useRef, useState } from 'react'
import app from './constants/Fire'
import './AtalForm.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { NotificationManager } from 'react-notifications'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { FormErrors } from './components/FormErrors'
import SimpleSelector from './components/SimpleSelector'
import investments from './constants/investments'
import { baseSheetURL, maxTextAreaLength } from './constants/config'
import { issueCategories } from './constants/appConstants'
import { Formik } from 'formik'
import atalFormSchema from './schemas/atalFormSchema'

const override = css`
  display: block;
`

const AtalForm = function () {
  const [isFormVisible, setFormVisible] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const formRef = useRef()
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     city: '',
  //     project:'',
  //     address:'',
  //     projectno:'',
  //     fullname:'',
  //     phone:'',
  //     email:'',
  //     issues:[],
  //     issueDesc:'',
  //     customerDate:'',
  //     file: {file1: null, file2: null,file2: null},
  //     fileold: null,
  //     file1: "",
  //     file2: "",
  //     file3: "",
  //     fileurl: '',
  //     loading: false,
  //     formErrors: {email: '', phone: ''},
  //     emailValid: false,
  //     phoneValid: false,
  //     formValid: false,
  //     formShow: true,
  //   };
  // }

  const initialValues = {
    city: '',
    project: '',
    address: '',
    projectno: '',
    fullname: '',
    phone: '',
    email: '',
    issueCategory: [],
    issueDesc: '',
    customerDate: '',
    files: []
  }

  const generateUrl = (params) => {
    const paramsString = params.map((p) => `${p}=${this.state[p]}`).join('&')
    return `${baseSheetURL}${paramsString}`
  }

  const getUrl = async (item, i) => {
    const storage = app.storage()
    const storageRef = storage.ref()
    const number = Math.round(Math.random() * 1000000000)
    const fileref = storageRef.child(number.toString())
    let extension = ''
    if (item.file1 != null) {
      extension = `file1.${item.file1.name.split('.').pop()}`
      await fileref.child(extension).put(item.file1)
      this.setState({ file1: extension })
    }
    if (item.file2 != null) {
      extension = `file2.${item.file2.name.split('.').pop()}`
      await fileref.child(extension).put(item.file2)
      this.setState({ file2: extension })
    }
    if (item.file3 != null) {
      extension = `file3.${item.file3.name.split('.').pop()}`
      await fileref.child(extension).put(item.file3)
      this.setState({ file3: extension })
    }

    return number
  }

  const firebaseUpload = async (pliki) => {
    const t = false
    const filesurl = this.state.fileurl
    const files = this.state.file
    return this.getUrl(files)
  }

  const onFormSubmit = (e) => {
    this.setState({ formValid: false }) // to tylko blokuje przycisk po jego kliknięciu :)
    this.setState({ loading: true })
    e.preventDefault()
    this.firebaseUpload(this.state.file).then((fileurl) => {
      this.setState({ fileurl })
      const url = this.generateUrl([
        'city',
        'project',
        'address',
        'projectno',
        'fullname',
        'phone',
        'email',
        'issueCategory',
        'issueDesc',
        'customerDate',
        'fileurl',
        'file1',
        'file2',
        'file3'
      ])
      fetch(url, { mode: 'no-cors' }).then(() => {
        this.setState({ loading: false })
        NotificationManager.success('Zgłoszenie wysłane', 'Wysłano', 2000)
        this.setState({ formShow: false })
      })
    })
  }

  // handleChange = (e) => {
  //   const { name } = e.target
  //   let { value } = e.target
  //   if (e.target.type === 'file') {
  //     const tablefile = this.state.file
  //     value = e.target.files[0]
  //     if (value.size > maxFileSizeBytes) {
  //       alert('Maksymalny rozmiar pliku to 10MB')
  //       e.target.value = null
  //       console.log(e.target.files)
  //       return
  //     }
  //     if (e.target.name === 'file1') {
  //       tablefile.file1 = value
  //     }
  //     if (e.target.name === 'file2') {
  //       tablefile.file2 = value
  //     }
  //     if (e.target.name === 'file3') {
  //       tablefile.file3 = value
  //     }
  //     this.setState({ [this.state.file]: tablefile })
  //   } else {
  //     this.setState({ [name]: value }, () => { this.validateField(name, value) })
  //   }
  // }

  // const validateField = (fieldName, value) => {
  //   const fieldValidationErrors = this.state.formErrors
  //   let { emailValid } = this.state
  //   let { phoneValid } = this.state

  //   switch (fieldName) {
  //     case 'email':
  //       emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  //       fieldValidationErrors.email = emailValid ? '' : ' Niepoprawny adres'
  //       break
  //     case 'phone':
  //       const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/im
  //       phoneValid = value.match(regex)
  //       fieldValidationErrors.phone = phoneValid ? '' : ' Niepoprawny numer'
  //       break
  //     default:
  //       break
  //   }
  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     emailValid,
  //     phoneValid
  //   }, this.validateForm)
  // }

  // const validateForm = () => {
  //   this.setState({ formValid: this.state.emailValid && this.state.phoneValid })
  // }

  // const checkboxHandler = (e) => {
  //   const { value } = e.target
  //   const { issues } = this.state
  //   if (issues.includes(value)) {
  //     issues.splice(issues.indexOf(value), 1)
  //   } else {
  //     issues.push(value)
  //   }
  //   this.setState({ issues })
  // }

  const textAreaCounter = () => {
    const currentLength = formRef.current?.values?.issueDesc.length
    if (currentLength === maxTextAreaLength) {
      return (
        <small className="form-text text-mute">
          {currentLength}
          /
          {maxTextAreaLength}
        </small>
      )
    }

    return (
      <small className="form-text text-muted">
        {currentLength}
        /
        {maxTextAreaLength}
      </small>
    )
  }

  let className = ''
  let className2 = 'my-5 d-none'
  if (!isFormVisible) {
    className += ' d-none'
    className2 = 'my-5 h-100 p-3'
  }
  return (
    <div className="main">
      <div className="container d-flex justify-content-center">
        <div className="form-container my-5 ">
          <div className={className2}><p>Dziękujemy za wysłanie zgłoszenia.</p></div>
          <Formik
            initialValues = {initialValues}
            onSubmit = {values => console.log(values)}
            isInitialValid={false}
            innerRef={formRef}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setValues,
              values,
              touched,
              isValid,
              errors
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <SimpleSelector
                    options={Object.keys(investments)}
                    name="city"
                    label="Miasto: *"
                    onChange={handleChange}
                  />

                  <SimpleSelector
                    options={investments[values.city]}
                    disabled={values.city === ''}
                    name="project"
                    label="Inwestycja: *"
                    onChange={handleChange}
                  />

                  <Form.Group controlId="address">
                    <Form.Label>Adres: *</Form.Label>
                    <Form.Control type="text" name="address" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="projectno">
                    <Form.Label>Numer budowlany: *</Form.Label>
                    <Form.Control type="text" name="projectno" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="fullname">
                    <Form.Label>Imię i nazwisko: *</Form.Label>
                    <Form.Control type="text" name="fullname" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Kontakt telefoniczny: *</Form.Label>
                    <Form.Control type="text" name="phone" onChange={handleChange} />
                    <Form.Text className="text-mute">
                      <div className="panel panel-default">
                        <FormErrors formErrors="placeholder" />
                      </div>
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Adres email: *</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} />
                    <Form.Text className="text-mute">
                      <div className="panel panel-default">
                        <FormErrors formErrors="placeholder" />
                      </div>
                    </Form.Text>
                  </Form.Group>

                  <div>
                    <div className="mb-2">Kategoria problemu</div>
                    {issueCategories.map((option, index) => (
                      <Form.Group controlId={`check${index}`} key={`check-${index}`}>
                        <Form.Check
                          className="d-flex justify-content-start"
                          onChange={handleChange}
                          label={option}
                          name="issueCategory"
                          value={option}
                        />
                      </Form.Group>
                    ))}
                  </div>
                  <Form.Group controlId="issueDesc">
                    <Form.Label>Opis usterki</Form.Label>
                    <Form.Control as="textarea" rows={5} name="issueDesc" onChange={handleChange} maxLength={`${maxTextAreaLength}`} />
                    {textAreaCounter()}
                  </Form.Group>

                  <Form.Group controlId="customerDate">
                    <Form.Label>Data odbioru lokalu</Form.Label>
                    <Form.Control type="date" name="customerDate" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group controlId="file">
                    <Form.Label>Dodaj plik</Form.Label>
                    <Form.Control type="file" name="file1" onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="file">
                    <Form.Label>Dodaj plik 2</Form.Label>
                    <Form.Control type="file" name="file2" onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="file">
                    <Form.Label>Dodaj plik 3</Form.Label>
                    <Form.Control type="file" name="file3" onChange={handleChange} />
                  </Form.Group>

                  <Card className="mb-1">
                    <Card.Body>
                      <Card.Title>Informacje</Card.Title>
                      <Card.Text className="card-info">
                        Deweloper informuje, że :
                        <br />
                        <br />
                        - Przed dokonaniem naprawy gwarancyjnej lokator będzie zobligowany udostępnić lokal Inwestorowi/Wykonawcy (w godzinach: 8:00 - 16:00 od poniedziałku do piątku) celem przeprowadzenia wizji lokalnej mającej na celu stwierdzenia zasadności zgłoszenia, określenia technologii i zakwalifikowania do prac gwarancyjnych. W przypadku uniemożliwienia Inwestorowi/Wykonawcy dostępu do lokalu zachodzą okoliczności zwolnienia z odpowiedzialności z tytułu usunięcia wady/ usterki, której dotyczyło zgłoszenie.
                        <br />
                        <br />
                        - W przypadku gdy Lokator usunie wadę/usterkę we własnym zakresie, bez jej odpowiedniego, zgłoszenia Zarządcy i Inwestorowi w żadnym wypadku Inwestor nie będzie odpowiedzialny za pokrycie kosztów usunięcia takiej wady.
                        <br />
                        <br />
                        - W przypadku stwierdzenia nieuzasadnionego wezwania do usunięcia usterki, której przyczyna nie będzie leżała po stronie dewelopera (np. przez nieprzestrzeganie instrukcji użytkowania), deweloper zastrzega sobie prawo (na żądanie firmy wezwanej do usunięcia usterki) do obciążenia właściciela mieszkania kosztami nieuzasadnionego wezwania.
                        <br />
                        <br />
                        - Wszelkie uszkodzenia zgłaszać od razu, a nie jak doprowadzą do dalszej degradacji elementu budynku, instalacji, mieszkania. W przeciwnym wypadku następuje utrata rękojmi.
                      </Card.Text>
                      <Card.Footer>
                        <Form.Group controlId="confirmTerms">
                          <Form.Check label="Potwierdzam zapoznanie się z informacją dotyczącą zgłoszenia. *" name="confirmTerms" onChange={handleChange} />
                        </Form.Group>
                      </Card.Footer>
                    </Card.Body>
                  </Card>

                  <div className="d-flex align-items-center justify-content-between">
                    <Button variant="primary" type="submit">
                      Wyślij zgłoszenie
                    </Button>
                    <ClipLoader loading={isLoading} css={override} size={30} />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}
export default AtalForm
