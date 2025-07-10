import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h2>404 - Page Not Found</h2>
      <Link className="link-btn" to="/login">Go to Login</Link>
    </>
  );
}
