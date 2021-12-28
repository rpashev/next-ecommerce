import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

const Newsletter = (props) => {
  return (
    <Container>
      <div className="d-md-flex justify-content-between align-items-center py-4">
        <h4 className="mb-3 mb-md-0">Sign Up For Our Newsletter</h4>
        <InputGroup>
          <FormControl
            id="inlineFormInputGroupUsername"
            placeholder="Enter your email..."
          />
          <Button variant="success" size="lg">
            Subscribe
          </Button>
        </InputGroup>
      </div>
    </Container>
  );
};

export default Newsletter;
