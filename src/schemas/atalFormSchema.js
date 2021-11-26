import * as Yup from 'yup'

const atalFormSchema = Yup.object().shape({
  city: Yup.string().required('Wybierz miasto'),
  project: Yup.string().required('Wybierz inwestycję'),
  address: Yup.string().required('Uzupełnij adres'),
  projectno: Yup.number()
    .required('Uzupełnij numer budowlany')
    .positive('Wpisz poprawny numer budowlany')
    .integer('Wpisz poprawny numer budowlany')
    .typeError('Wpisz poprawny numer budowlany'),
  fullname: Yup.string()
    .test('test-fullname', 'Podaj poprawne imię i nazwisko', value => {
      if (value) {
        return value.match(/\d/g) ? false : true
      }
      return true
    })
    .required('Uzupełnij imię i nazwisko'),
  phone: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,6}$/im,
      'Wprowadź poprawny numer telefonu'
    )
    .required('Uzupełnij telefon kontaktowy'),
  email: Yup.string()
    .email('Podaj poprawny adres email')
    .required('Uzupełnij email'),
  customerDate: Yup.string().required('Wybierz datę odbioru lokalu'),
  files: Yup.array(),
  issueCategory: Yup.array().min(1, 'Wybierz kategorię problemu'),
  issueDesc: Yup.string().max(1200).required('Uzupełnij opis usterki'),
  confirmTerms: Yup.bool().oneOf([true], 'Pole wymagane'),
})

export default atalFormSchema
