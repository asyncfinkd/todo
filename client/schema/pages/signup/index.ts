import * as yup from 'yup'

export const SignUpSchema = yup
  .object()
  .shape({
    name: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    email: yup
      .string()
      .trim()
      .required('')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ''
      ),
    password: yup.string().required(),
  })
  .required()

export interface TSignUpProps {
  name: string
  lastName: string
  email: string
  password: string
}
