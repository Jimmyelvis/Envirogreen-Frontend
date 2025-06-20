import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/ui/Layout';
import Phone_icon from '../components/assets/img/Icon awesome-phone-alt-ftr.svg';
import Email_icon from '../components/assets/img/Icon material-email-ftr.svg';
import Location_icon from '../components/assets/img/Icon material-send-ftr.svg';
import Facebook_icon from '@/components/assets/img/facebook-icon.svg';
import Twitter_icon from '@/components/assets/img/twitter-icon.svg';
import Youtube_icon from '@/components/assets/img/youtube-icon.svg';
import Dad_kids from '@/components/assets/img/photos/dad-kids.jpg';
import Keys_table from '@/components/assets/img/photos/keys-table.jpg';
import Header_imgs from '@/components/assets/img/photos/header-imgs.png';
import { Button } from '@/components/ui/buttons';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';
import { TextAreaFieldGroup } from '@/components/ui/form/TextAreaFieldGroup';
import { Panel } from '@/components/ui/Panel';
import { submitContact, resetSubmitStatus } from '@/reduxstore/slices/contactSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const { submitStatus, error } = useSelector((state) => state.contact);
  const errorMessage = error?.message || error;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Reset form when submission is successful
  useEffect(() => {
    if (submitStatus === 'succeeded') {
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      // Reset the submission status after a delay
      const timer = setTimeout(() => {
        dispatch(resetSubmitStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitContact(formData));
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <Layout>
      <div className="contact">
        <Panel className="contact__container">
          <motion.div
            className="contact__form-section"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            <h2 className=" heading-2 contact__form-section__title">
              Let's Talk
            </h2>
            <p className="contact__form-section__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="name-email-group">
                <div className="form-group">
                  <TextFieldGroup
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <TextAreaFieldGroup
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                classes={`btn-primary btn-primary-grad btn-submit ${submitStatus === 'loading' ? 'loading' : ''}`}
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'Sending...' : 'Submit'}
              </Button>
              {/* {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )} */}
            </form>
          </motion.div>

          <motion.div
            className="contact__info-section"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            <div className="header-imgs">
              <Image
                src={Header_imgs}
                alt="Header Images"
                width={800}
                height={400}
                layout="responsive"
                className="header-imgs__image"
              />
            </div>
            
            <div className="image-stack">
              <Image
                src={Dad_kids}
                alt="Contact"
                width={400}
                height={300}
                layout="responsive"
                className="image-stack__image dad-kids"
              />
              <Image
                src={Keys_table}
                alt="Contact"
                width={400}
                height={300}
                layout="responsive"
                className="image-stack__image keys-table"
              />
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <Image
                  src={Phone_icon}
                  alt="Phone"
                  width={24}
                  height={24}
                />
                <span>777-777-7777</span>
              </div>
              <div className="contact-item">
                <Image
                  src={Email_icon}
                  alt="Email"
                  width={24}
                  height={24}
                />
                <span>info@envirogreen.com</span>
              </div>
              <div className="contact-item">
                <Image
                  src={Location_icon}
                  alt="Location"
                  width={24}
                  height={24}
                />
                <span>1779 Sunnyvale Drive, Herford, CT</span>
              </div>
            </div>

            <div className="social-links">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <Image
                  src={Facebook_icon}
                  alt="Facebook"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
              >
                <Image
                  src={Youtube_icon}
                  alt="YouTube"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              >
                <Image
                  src={Twitter_icon}
                  alt="Twitter"
                  width={40}
                  height={40}
                />
              </Link>
            </div>
          </motion.div>
        </Panel>
      </div>
    </Layout>
  );
};

export default Contact;
