export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('authUser'));
  
    if (user && user.token) {
      console.log('as');
      // for Node.js Express back-end
      return {
              Accept: 'application/json',
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${user.token}` };
    } else {
      return {};
    }
}