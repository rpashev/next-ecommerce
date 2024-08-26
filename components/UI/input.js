const Input = (props) => {
  const {
    label,
    type,
    placeholder,
    errorText,
    error,
    id,
    updateInputState,
    name,
    onBlurHandler,
  } = props;

  const changeHandler = (event) => {
    // TODO: refactor once all forms use useInput
    updateInputState(event.target.value.trim(), id);
  };

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control shadow-none ${error ? "is-invalid" : ""}`}
        id={id}
        placeholder={placeholder}
        onChange={updateInputState}
        name={name}
        onBlur={onBlurHandler || null}
      />
      <label htmlFor={id} className="px-4">
        {label}
      </label>
      {error && errorText && (
        <div className="invalid-feedback px-1">{errorText}</div>
      )}
    </div>
  );
};

export default Input;
