import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/buttons';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { loginUser, registerUser, resetStatus } from '@/reduxstore/slices/userSlice';
import { closeModal } from '@/reduxstore/slices/uiSlice';

export const AuthForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { error, status, user } = useSelector((state) => state.user);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      dispatch(registerUser(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation, 
        }
      ));
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setFormData({ name: '', email: '', password: '' });
      dispatch(closeModal());
      dispatch(resetStatus());
    }
  }, [status, user, dispatch]);

  return (
    <Panel className="auth-modal">
      <h2 className="heading-2 auth-heading">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <TextFieldGroup
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
          />
        )}
        <TextFieldGroup
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
        />
        <TextFieldGroup
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          type="password"
        />
        <TextFieldGroup
          name="password_confirmation"
          placeholder="Confirm your password"
          value={formData.password_confirmation}
          onChange={handleChange}
          label="Confirm Password"
          type="password"
        />
        <Button
          classes="btn-primary btn-primary-grad"
          type="submit"
          disabled={status === 'loading'}
        >
          {isLogin ? 'Login' : 'Register'}
        </Button>
      </form>
      <div>
        <span
          onClick={handleToggle}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : 'Already have an account? Login here'}
        </span>
      </div>
    </Panel>
  );
};
