import { Field } from "react-final-form";

export default function Input({
  name,
  title,
  component = "input",
  type = "text",
  placeholder,
  valid = (value) => (value ? undefined : "Fill the field"),
  subscription = { value: true },
}) {
  return (
    <Field component={component} type={type} name={name} validate={valid}>
      {({ input, meta }) => (
        <div className="p-1 grow relative">
          <label htmlFor={name}>{title}</label>
          <input
            {...input}
            id={name}
            subscription={subscription}
            className={
              "w-full px-2 py-1 rounded-md outline-none border-2 text-slate-600  dark:bg-slate-200 focus:bg-slate-100 dark:focus:bg-slate-100 " +
              (meta.error && meta.touched
                ? "border-red-500"
                : "border-slate-700 dark:border-slate-950")
            }
            placeholder={placeholder}
          />
          {meta.error && meta.touched && (
            <span className="absolute w-max right-4 top-8 text-red-500">
              {meta.error}
            </span>
          )}
        </div>
      )}
    </Field>
  );
}
