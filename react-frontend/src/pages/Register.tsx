import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, User, Mail, Lock } from 'lucide-react';
import { registerUser } from '@/services/authService';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const user = { first_name: firstName, last_name: lastName, email, password };
      const response = await registerUser(user);
      
      if (response.success) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setErrorMessage(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center text-primary">
                <Building size={24} />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
            <p className="text-center text-muted-foreground mb-8">
              Sign up for your rental management system
            </p>
            
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    id="first-name"
                    type="text"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    id="last-name"
                    type="text"
                    className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Mail size={16} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="pl-10 w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock size={16} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      className="pl-10 w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock size={16} />
                    </div>
                    <input
                      id="confirm-password"
                      type="password"
                      className="pl-10 w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-colors flex items-center justify-center"
                >
                  {isLoading ? 'Registering...' : 'Sign up'}
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
