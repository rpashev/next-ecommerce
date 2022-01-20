import InputCheckout from "./input-checkout";
import styles from "./checkout-form.module.scss";

const CheckoutForm = (props) => {
  return (
    <form className={`${styles.form}`}>
      <h2 className="text-center mb-4">Shipping Information</h2>
      <InputCheckout
        label="First Name"
        id="first-name"
        type="text"
        isRequired
      />
      <InputCheckout label="Last Name" id="last-name" type="text" isRequired />
      <InputCheckout
        label="Address Line 1"
        id="address-line-1"
        type="text"
        isRequired
      />
      <InputCheckout
        label="Address Line 2 (optional)"
        id="address-line-2"
        type="text"
      />
      <InputCheckout
        label="Postal Code"
        id="postal-code"
        type="text"
        isRequired
      />
      <InputCheckout
        label="Municipality"
        id="municipality"
        type="text"
        isRequired
      />
      <div className="form-group row mb-3">
        <label
          htmlFor="country"
          className={`${styles.required} col-sm-3 col-form-label fw-bold`}
        >
          Country
        </label>
        <div className="col-sm-7">
          <select className="form-select shadow-none" id="country">
            <option defaultValue>Bulgaria</option>
            <option>Germany</option>
            <option>UK</option>
            <option>France</option>
          </select>
        </div>
      </div>
      <h5 className="mt-5 mb-3">Select delivery method:</h5>
      <div className="form-check">
        <input
          className="form-check-input shadow-none"
          type="radio"
          name="delivery"
          id="standard"
          value="standard"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="standard">
          Standart<span className="text-success h5 ps-1">FREE </span>
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input shadow-none"
          type="radio"
          name="delivery"
          id="express"
          value="express"
        />
        <label className="form-check-label" htmlFor="express">
          Express <span className="text-danger">$30</span>
        </label>
      </div>
      <InputCheckout label="Phone" id="phone" type="text" isRequired />
      <InputCheckout label="Email" id="email" type="email" isRequired />
      <div className="form-check form-check-inline mt-4 mb-2">
        <input
          className="form-check-input shadow-none"
          type="checkbox"
          id="save-info"
          value="save-info"
        />
        <label className="form-check-label" htmlFor="save-info">
          Save my details for future orders.
        </label>
      </div>
      <div className="form-check form-check-inline w-75">
        <input
          className="form-check-input shadow-none"
          type="checkbox"
          id="terms"
          value="terms"
        />
        <label
          className={`${styles.required} form-check-label fw-bold`}
          htmlFor="terms"
        >
          I have read and consent to My Shop processing my information in
          accordance with the privacy statement and cookie policy.
        </label>
      </div>

      <p className={`${styles.legend} my-3 fw-italic`}>
        <small>Required fields</small>
      </p>
      <button className={`btn btn-lg btn-warning d-block mt-4`}>
        TO BILLING
      </button>
    </form>
  );
};

export default CheckoutForm;
