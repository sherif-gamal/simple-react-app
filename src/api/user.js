import axios from 'axios';

export default {
  user: {
    login: credentials => axios.post('/api/users/login', {...credentials}).then(res => res.data.user),
    logout: () => axios.post('/api/users/logout')
  }
}
