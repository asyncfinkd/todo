export const SignInModuleFixture = [
  {
    id: 'email',
    label: 'ელ.ფოსტა',
    type: 'text',
  },
  {
    id: 'password',
    label: 'პაროლი',
    type: 'password',
  },
];

export interface TSignInModuleFixtures {
  id: string;
  label: string;
  type: string;
}
