import React, {useState} from 'react';
import {Select, SelectProps} from 'antd';

export interface Props extends Omit<SelectProps, 'onClick'> {
  onChange?: (e, option) => void;
}

export const SelectComponent = ({onChange, ...otherProps}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnChange = (e, option) => {
    onChange?.(e, option);
    setIsOpen(false);
  };

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      onChange={handleOnChange}
      {...otherProps}
    />
  );
};
