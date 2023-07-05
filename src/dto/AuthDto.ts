import * as yup from 'yup';

export const authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export class AuthDto {
    email: string;
    password: string;
}