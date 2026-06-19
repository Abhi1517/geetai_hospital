function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold mb-2">{label}</label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        {...rest}
      />
    </div>
  );
}

export default FormInput;
