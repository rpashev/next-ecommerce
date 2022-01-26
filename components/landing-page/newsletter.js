const Newsletter = (props) => {
  return (
    <section className="bg-secondary text-light py-5 px-1 px-md-5">
      <div className="container">
        <div className="d-md-flex justify-content-between align-items-center">
          <h3 className="mb-3 mb-md-0 text-center">Sign Up For Our Newsletter</h3>
          <div className="input-group news-input">
            <input type="text" className="form-control shadow-none" placeholder="Enter Email" />
            <button className="btn btn-warning btn-lg text-light shadow-none" type="button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
