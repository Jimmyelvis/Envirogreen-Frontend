/*
  A reuseable selectlist component that can be used across the application
*/

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Image from 'next/image';


export const SelectListGroup = ({ 
  name, 
  value, 
  error, 
  info, 
  onChange, 
  options,
  icon,
  iconPosition,
  classes,
  default_value,
}) => {

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  // console.log('====================================');
  // console.log("selectOptions", selectOptions);
  // console.log('====================================');

  const iconClasses = classnames(
    'inputField-icon',
    {
      'inputField-icon-right': iconPosition === 'right',
    },
    
  )

  // console.log('====================================');
  // console.log("selectOptions", selectOptions);
  // console.log('====================================');

  return (
    <div className={`form-group selector ${classes ?  classes : ""}`}>
         {icon &&
          <Image
            src={icon}
            alt=""
            className={iconClasses}
            layout="responsive"
            width={20}
            height={20}
          />
        }
      <select
        className={classnames("form-control form-control-lg select-input", {
          "is-invalid": error,
          "field-group-with-icon": icon
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
         {default_value && (
          <option value={default_value}>{default_value}</option>
        )}
        {selectOptions}
      </select>
      <div class="custom-arrow"></div>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};


