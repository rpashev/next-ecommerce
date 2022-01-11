const Input = (props) => {
  const { label, type, placeholder, errorText, error, id } = props;

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control shadow-none ${error ? "is-invalid" : ""}`}
        id={id}
        placeholder={placeholder}
      />
      <label htmlFor={id} className="px-4">
        {label}
      </label>
      <div className="invalid-feedback px-1">{errorText}</div>
    </div>
  );
};

export default Input;
