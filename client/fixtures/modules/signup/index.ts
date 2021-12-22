export const SignUpModuleFixture = [
  {
    id: 'name',
    label: 'სახელი',
    type: 'text',
    required: {
      message: 'შეიყვანეთ სახელი',
    },
  },
  {
    id: 'lastName',
    label: 'გვარი',
    type: 'text',
    required: {
      message: 'შეიყვანეთ გვარი',
    },
  },
  {
    id: 'email',
    label: 'ელ.ფოსტა',
    type: 'text',
    required: {
      message: 'შეიყვანეთ სწორი ელ.ფოსტა',
    },
  },
  {
    id: 'password',
    label: 'პაროლი',
    type: 'password',
    required: {
      message: 'შეიყვანეთ პაროლი',
    },
  },
]

export interface TSignInModuleFixturesO {
  message: string
}

export interface TSignInModuleFixtures {
  id: string
  label: string
  type: string
  required: TSignInModuleFixturesO
}
