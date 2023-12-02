const isProduction = import.meta.env.PROD

export default isProduction
  ? 'https://research-hub-backend.onrender.com'
  : 'http://localhost:3000'
