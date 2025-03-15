import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Panel } from '@/components/ui/Panel';
import { Button } from '@/components/ui/buttons';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import {
  loginUser,
  registerUser,
  resetStatus,
} from '@/reduxstore/slices/userSlice';
import { closeModal } from '@/reduxstore/slices/uiSlice';
import Image from 'next/image';
import LoginShape from '@/components/assets/img/login_shape.svg';
import Auth_Modal_logo from '@/components/assets/img/auth-modal-logo.svg';
import Lock_icon from '@/components/assets/img/lock-icon.svg';
import Auth_form_crl_logo from '@/components/assets/img/auth-form-crl-logo.svg';

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
      dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      );
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

      <Image
        src={Auth_form_crl_logo}
        alt="Logo"
        width={500}
        height={300}
        layout="responsive"
        className="auth-modal-crl-logo"
      />

      <div className="left ">
        <Image
          src={Auth_Modal_logo}
          alt="Auth Modal Logo"
          width={500}
          height={300}
          layout="responsive"
          className="auth-modal-logo"
        />

        <h2 className="heading-2 auth-heading">
          {isLogin ? 'Login to your Account' : 'Register'}
        </h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextFieldGroup
              name="name"
              placeholder="Enter your username"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              icon={Lock_icon}
            />
          )}

          <TextFieldGroup
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            icon={Lock_icon}
          />

          <TextFieldGroup
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            type="password"
            icon={Lock_icon}
          />

          {!isLogin && (
            <TextFieldGroup
              name="password_confirmation"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={handleChange}
              label="Confirm Password"
              type="password"
              icon={Lock_icon}
            />
          )}
          <Button
            classes="btn-primary btn-primary-grad auth-submit-btn"
            type="submit"
            disabled={status === 'loading'}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>

        <p className="auth-form-switch">
          {isLogin ? (
            <>
              Don't have an account?
              <span className="click-here" onClick={handleToggle}>
                {' '}
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span className="click-here" onClick={handleToggle}>
                {' '}
                Login here
              </span>
            </>
          )}
        </p>
      </div>

      <div className="right">
        <div className="right_img">
          <div className="login_shape">
            <div className="overlay"></div>
            <h2 className="heading-2 auth-form-tagline">
              Let's Bring You <br></br>
              Home
            </h2>

            <h2 className="heading-2 auth-form-tagline-mobile">
              Let's Bring You Home
            </h2>
          </div>

          <div className="mobile-wordmark">
            <p className='heading-3'>EnviroGreen</p>
            <p className='heading-4'>Reality</p>
          </div>
        </div>
      </div>
    </Panel>
  );
};
