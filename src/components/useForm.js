import React,{useState} from "react";
export const useForm = (options) => {
    const [data, setData] = useState(options?.initialValues || {});
  
    const handleChange = (
      key,
      sanitizeFn,
    ) => (e) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setData({
        ...data,
        [key]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (options?.onSubmit) {
        options.onSubmit();
      }
    };
  
    return {
      data,
      handleChange,
      handleSubmit,
    };
  };