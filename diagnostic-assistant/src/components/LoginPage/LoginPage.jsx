import React, { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '11aab0000',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      if (formData.username && formData.password) {
        const userData = {
          username: formData.username,
          userId: '25020614',
          loginTime: new Date().toISOString()
        };
        onLogin(userData);
      } else {
        alert('Please enter valid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      {/* Background Pattern */}
      <div className={styles.backgroundPattern}></div>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Mahindra Intelligent Diagnostic Assistant</h1>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <span className={styles.logoText}>hida</span>
          </div>
        </div>

        {/* Authentication Card */}
        <div className={styles.authCard}>
          <h2 className={styles.authTitle}>Authentication</h2>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {/* Username Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={styles.inputField}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                  disabled={isLoading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className={styles.checkbox}
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>

            {/* License Status */}
            <div className={styles.licenseStatus}>
              <span className={styles.licenseText}>Licence Ok</span>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <span>Mahindra Intelligent Diagnostic Assistant</span>
        <span>Application Status:</span>
      </footer>
    </div>
  );
};

export default LoginPage;