import * as Yup from 'yup'

const atalFormSchema = Yup.object().shape({
  address: Yup.string(),
  city: Yup.string(),
  confirmTerms: Yup.string(),
  customerDate: Yup.string(),
  email: Yup.string(),
  files: Yup.string(),
  fullname: Yup.string(),
  issueCategory: Yup.string(),
  issues: Yup.string(),
  phone: Yup.string(),
  project: Yup.string(),
  projectno: Yup.string()
})
export default atalFormSchema
