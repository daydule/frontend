import { rest } from 'msw';
import { login } from './api/auth';

export const handlers = [rest.post('/mockLogin', login)];
