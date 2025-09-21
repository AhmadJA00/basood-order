// import { Form, Radio } from "antd";
// import type { Rule } from "antd/es/form";
// import type { NamePath } from "antd/es/form/interface";
// import { useEffect } from "react";

// interface RadioProps<T extends object> {
//   rules?: Rule[];
//   name: NamePath; // or Extract<keyof T, string | number>
//   label: string;
//   disabled?: boolean;
//   className?: string;
//   options: { label: string; value: string }[];
//   form?: any;
// }

// const CRadio = <T extends object>({
//   name,
//   label,
//   rules,
//   disabled,
//   className,
//   options,
//   form,
// }: RadioProps<T>) => {
//   const fieldValue = form?.getFieldValue(name);

//   useEffect(() => {
//     if (fieldValue && form) {
//       // Force update the form field to ensure the radio group gets the value
//       setTimeout(() => {
//         form.setFieldValue(name, fieldValue);
//       }, 100);
//     }
//   }, [fieldValue, form, name]);

//   return (
//     <Form.Item name={name} rules={rules} className={className}>
//       <div className="flex items-center">
//         <span className="text-primary mr-2">{label}:</span>
//         <Radio.Group
//           disabled={disabled}
//           defaultValue={fieldValue}
//           className={`!rounded-lg !py-1 hover:!border-primary focus:!border-color-primary`}
//         >
//           {options.map((option) => (
//             <Radio
//               onChange={(e) => {
//                 form.setFieldsValue(name, e.target.value);
//               }}
//               key={option.value}
//               value={option.value}
//             >
//               {option.label}
//             </Radio>
//           ))}
//         </Radio.Group>
//       </div>
//     </Form.Item>
//   );
// };

// export default CRadio;
import React from "react";
import { Form, Radio } from "antd";
import type { Rule } from "antd/es/form";

interface RadioProps<T extends object> {
  rules?: Rule[];
  name: keyof T;
  value?: string | number;
  defaultValue?: string | number;
  label: string;
  disabled?: boolean;
  className?: string;
  options: { label: string; value: string | number | boolean }[];
}

const CRadio = <T extends object>({
  name,
  label,
  rules,
  disabled,
  className,
  options,
}: RadioProps<T>) => {
  return (
    <Form.Item<T>
      name={name}
      rules={rules}
      label={<span className="text-primary font-medium">{label}</span>}
      className={className}
    >
      <Radio.Group
        options={options}
        disabled={disabled}
        className={`!rounded-lg !py-1 hover:!border-primary focus:!border-color-primary`}
      />
    </Form.Item>
  );
};

export default CRadio;
