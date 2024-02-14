import React from 'react';
import NumberFormat from 'react-number-format';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
// ONLY FOR RHF
export const NumberInput = ({ control, label, name, placeholder, isRequired, decimalScale = 0, allowNegative = false, prefix = '$', suffix = '' }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired && 'This field is required.',
        pattern: {
          value: allowNegative ? /^-?\d*\.?\d+$/ : /^\d*\.?\d+$/,
          message: 'Invalid input. Please enter a valid number.'
        }
      }}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <NumberFormat
          name={name}
          customInput={TextField}
          placeholder={placeholder}
          onValueChange={(values) => {
            const { value } = values;
            onChange(value);
          }}
          label={label}
          onBlur={onBlur}
          value={value}
          decimalScale={decimalScale}
          allowNegative={allowNegative}
          prefix={prefix}
          suffix={suffix}
          variant="outlined"
          thousandSeparator={true}
          fullWidth
          size="small"
          margin="dense"

        />
      )}
    />
  );
};
