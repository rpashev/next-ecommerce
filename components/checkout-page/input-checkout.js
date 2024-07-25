import styles from "./input-checkout.module.scss";

const InputCheckout = (props) => {
  return (
    <div className="form-group row mb-3">
      <label
        htmlFor={props.id}
        className={`${props.isRequired ? styles.label : ""} col-sm-3 col-form-label fw-bold`}
      >
        {props.label}
      </label>
      <div className="col-sm-7">
        <input
          type={props.type}
          className="form-control shadow-none"
          id={props.id}
        />
      </div>
    </div>
  );
};

export default InputCheckout;
