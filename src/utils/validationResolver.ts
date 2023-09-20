import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  user: Yup.string()
    .required('Type your username'),    
  password: Yup.string().required('Type your password'),
});

const resolver = yupResolver(validationSchema);

export default resolver;
