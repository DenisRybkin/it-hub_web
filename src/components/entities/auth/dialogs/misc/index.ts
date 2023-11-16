export { RegistrationExtraContent } from './registration-extra-content';
export { LoginExtraContent } from './login-extra-content';

export interface IExtraContentProps {
  isWrongCredentials?: boolean;
  onClick: () => void;
}
