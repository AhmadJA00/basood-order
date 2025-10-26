import React from "react";
import { Form, Switch } from "antd";
import type { Rule } from "antd/es/form";
import type { InputName } from "../gloabal.type";
import type { SwitchChangeEventHandler } from "antd/es/switch";
import { useLocation } from "react-router";

interface InputProps<T extends object> {
  rules?: Rule[];
  name: InputName<T>;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: SwitchChangeEventHandler;
  label: string;
  disabled?: boolean;
  className?: string;
  checkedChildren?: string | React.ReactNode | React.ReactElement;
  unCheckedChildren?: string | React.ReactNode | React.ReactElement;
}

const CSwitch = <T extends object>({
  name,
  checked,
  defaultChecked,
  label,
  rules,
  disabled,
  onChange,
  className,
  checkedChildren,
  unCheckedChildren,
}: InputProps<T>) => {
  const { pathname } = useLocation();
  const isShow = pathname.includes("show");
  return (
    <Form.Item<T>
      name={name as any}
      rules={rules}
      label={
        <span className="font-medium !text-xs md:text-base !text-primary">
          {label}
        </span>
      }
      className={` ${className}`}
    >
      <Switch
        onChange={onChange}
        disabled={isShow || disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    </Form.Item>
  );
};

export default CSwitch;
