/*
  A reuseable Text field group component that can be used across the application
*/
import className from "classnames";
import Image from 'next/image';


export const TextFieldGroup = ({
  name,
  children,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  icon,
  iconClassname,
  iconClickFunction,
  iconPosition,
  classes,
  min_number,
  max_number,
  ...rest
}) => {

  const formClasses = className(
    'form-control',
    // classes
  )

  const iconClasses = className(
    'inputField-icon',
    {
      'inputField-icon-right': iconPosition === 'right',
    },
  )

  if (icon) {
    return (
    <div className={`field-group-with-icon ${classes ? classes : ""}`}>
      <Image
        src={icon}
        alt=""
        className={iconClasses}
        onClick={iconClickFunction}
        layout="responsive"
        width={20}
        height={20}
      />

      <input
        type={type}
        className={formClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        // min={min_number}
        // max={max_number}
      />

      {children}
    </div>
    );
  } 
  
  else {
    return (
      <div className={`field-group ${classes  ? classes : ""}`}>
        <input
          type={type}
          className={formClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
      />
      </div>
    );
  }
  
  
};



TextFieldGroup.defaultProps = {
  type: 'text',
  iconPosition: 'left'
};



