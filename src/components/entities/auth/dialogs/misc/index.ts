export { LoginExtraContent } from './login-extra-content';
export { RegistrationExtraContent } from './registration-extra-content';

export interface IExtraContentProps {
  isWrongCredentials?: boolean;
  onClick: () => void;
}
