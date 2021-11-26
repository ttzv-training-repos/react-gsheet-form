import './AtalForm.css'

import { css } from '@emotion/core'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useMemo, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { NotificationManager } from 'react-notifications'
import ClipLoader from 'react-spinners/ClipLoader'

import FormDropzone from '../components/FormDropzone'
import FormErrors from '../components/FormErrors'
import SimpleSelector from '../components/SimpleSelector'
import { issueCategories } from '../constants/appConstants'
import { maxTextAreaLength, proxyURL } from '../constants/config'
import investments from '../constants/investments'
import atalFormSchema from '../schemas/atalFormSchema'

const override = css`
  display: block;
`

const AtalForm = function () {
  const [isFormVisible, setFormVisible] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const formRef = useRef()
  const formData = useMemo(() => new FormData())

  const initialValues = {
    city: '',
    project: '',
    address: '',
    projectNo: '',
    fullname: '',
    phone: '',
    email: '',
    issueCategory: [],
    issueDesc: '',
    customerDate: '',
    files: [],
    confirmTerms: false,
  }

  const textAreaCounter = () => {
    const currentLength = formRef.current?.values.issueDesc.length || 0
    if (currentLength === maxTextAreaLength) {
      return (
        <small className="form-text text-mute">
          {currentLength}/{maxTextAreaLength}
        </small>
      )
    }
    return (
      <small className="form-text text-muted">
        {currentLength}/{maxTextAreaLength}
      </small>
    )
  }

  const handleSubmit = values => {
    setLoading(true)
    const { files, ...rest } = values
    //populate formdata with fields
    for (let value in rest) {
      formData.append(value, values[value])
    }

    //populate files
    files.forEach(file => formData.append('files', file))

    axios
      .post(proxyURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setLoading(false)
        NotificationManager.success('Zgłoszenie wysłane', 'Wysłano', 4000)
        setFormVisible(false)
        formRef.current.resetForm()
      })
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
          <div className={className2}>
            <p>Dziękujemy za wysłanie zgłoszenia.</p>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            isInitialValid={false}
            innerRef={formRef}
            validationSchema={atalFormSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setValues,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
              dirty,
              setFieldValue,
            }) => {
              const formError = field => {
                return touched[field] && errors[field] ? errors[field] : ''
              }
              return (
                <Form onSubmit={handleSubmit} className={className}>
                  <SimpleSelector
                    options={Object.keys(investments)}
                    name="city"
                    label="Miasto:"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={<FormErrors errors={formError('city')} />}
                  />

                  <SimpleSelector
                    options={investments[values.city]}
                    disabled={values.city === ''}
                    name="project"
                    label="Inwestycja:"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={<FormErrors errors={formError('project')} />}
                  />

                  <Form.Group controlId="address">
                    <Form.Label>Adres:</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('address')} />
                  </Form.Group>

                  <Form.Group controlId="projectno">
                    <Form.Label>Numer budowlany:</Form.Label>
                    <Form.Control
                      type="text"
                      name="projectno"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('projectno')} />
                  </Form.Group>

                  <Form.Group controlId="fullname">
                    <Form.Label>Imię i nazwisko:</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('fullname')} />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Label>Kontakt telefoniczny:</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('phone')} />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Adres email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('email')} />
                  </Form.Group>

                  <div>
                    <div className="mb-2">Kategoria problemu</div>
                    {issueCategories.map((option, index) => (
                      <Form.Group
                        controlId={`check${index}`}
                        key={`check-${index}`}
                      >
                        <Form.Check
                          className="d-flex justify-content-start"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label={option}
                          name="issueCategory"
                          value={option}
                        />
                      </Form.Group>
                    ))}
                    <FormErrors errors={formError('issueCategory')} />
                  </div>
                  <Form.Group controlId="issueDesc">
                    <Form.Label>Opis usterki</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="issueDesc"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={`${maxTextAreaLength}`}
                    />
                    <div className="d-flex align-items-center justify-content-between">
                      <FormErrors errors={formError('issueDesc')} />
                      {textAreaCounter()}
                    </div>
                  </Form.Group>

                  <Form.Group controlId="customerDate">
                    <Form.Label>Data odbioru lokalu</Form.Label>
                    <Form.Control
                      type="date"
                      name="customerDate"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrors errors={formError('customerDate')} />
                  </Form.Group>

                  <Form.Group controlId="files">
                    <Form.Label>Załącz pliki</Form.Label>
                    <small> (max 10 MB / 3 pliki) </small>
                    <FormDropzone name="files" setFieldValue={setFieldValue} />
                  </Form.Group>

                  <Card className="mb-1">
                    <Card.Body>
                      <Card.Title>Informacje</Card.Title>
                      <Card.Text className="card-info">
                        Deweloper informuje, że:
                        <br />
                        <br />
                        - Przed dokonaniem naprawy gwarancyjnej lokator będzie
                        zobligowany udostępnić lokal Inwestorowi/Wykonawcy (w
                        godzinach: 8:00 - 16:00 od poniedziałku do piątku) celem
                        przeprowadzenia wizji lokalnej mającej na celu
                        stwierdzenia zasadności zgłoszenia, określenia
                        technologii i zakwalifikowania do prac gwarancyjnych. W
                        przypadku uniemożliwienia Inwestorowi/Wykonawcy dostępu
                        do lokalu zachodzą okoliczności zwolnienia z
                        odpowiedzialności z tytułu usunięcia wady/ usterki,
                        której dotyczyło zgłoszenie.
                        <br />
                        <br />
                        - W przypadku gdy Lokator usunie wadę/usterkę we własnym
                        zakresie, bez jej odpowiedniego, zgłoszenia Zarządcy i
                        Inwestorowi w żadnym wypadku Inwestor nie będzie
                        odpowiedzialny za pokrycie kosztów usunięcia takiej
                        wady.
                        <br />
                        <br />
                        - W przypadku stwierdzenia nieuzasadnionego wezwania do
                        usunięcia usterki, której przyczyna nie będzie leżała po
                        stronie dewelopera (np. przez nieprzestrzeganie
                        instrukcji użytkowania), deweloper zastrzega sobie prawo
                        (na żądanie firmy wezwanej do usunięcia usterki) do
                        obciążenia właściciela mieszkania kosztami
                        nieuzasadnionego wezwania.
                        <br />
                        <br />- Wszelkie uszkodzenia zgłaszać od razu, a nie jak
                        doprowadzą do dalszej degradacji elementu budynku,
                        instalacji, mieszkania. W przeciwnym wypadku następuje
                        utrata rękojmi.
                      </Card.Text>
                      <Card.Footer>
                        <Form.Group controlId="confirmTerms">
                          <Form.Check
                            label="Potwierdzam zapoznanie się z informacją dotyczącą zgłoszenia. *"
                            name="confirmTerms"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={true}
                          />
                          <FormErrors errors={formError('confirmTerms')} />
                        </Form.Group>
                      </Card.Footer>
                    </Card.Body>
                  </Card>

                  <div className="d-flex align-items-center justify-content-between">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={
                        !(isValid && dirty && !isLoading) || isSubmitting
                      }
                    >
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
