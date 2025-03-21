/*
  A reuseable TextArea field group component that can be used across the application
*/

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows,
  extraClasses,
}) => {
  return (
    <div className={`form-group ${extraClasses ? extraClasses : ""}`}>
      <textarea
        className={classnames(`form-control form-control-lg`, {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

// defualt props
TextAreaFieldGroup.defaultProps = {
  type: "text",
  rows: "8"
};



