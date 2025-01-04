import React from 'react';
import Image from 'next/image';

export const Select = ({
  value,
  onChange,
  options,
  name,
  id,
  extraClasses,
  default_value,
  icon
}) => {
  return (
    <div className="selector">
      {
        icon && (
          <Image
            src={icon}
            alt=""
            className="selectField-icon"
            layout="responsive"
            width={20}
            height={20}
          />
        )
      }

      <select
        name={name}
        id={id}
        className={`select-input ${extraClasses}`}
        value={value}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => option.name === e.target.value
          );

          /*
            If selectedOption is null, it means the default value is selected. Return an object with the default value and null id.
          */
          if (!selectedOption) {
            onChange({
              name: default_value,
              id: null,
            });
          } else onChange(selectedOption);
        }}
      >
        {default_value && (
          <option value={default_value}>{default_value}</option>
        )}
        {options.map((option) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <option value={option.name}>{option.name}</option>
          );
        })}
      </select>
      <div class="custom-arrow"></div>
    </div>
  );
};
