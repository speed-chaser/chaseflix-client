import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./user-list.scss";
import verifiedLogo from "../../img/patch-check-fill.svg";
import Col from "react-bootstrap/Col";

export const UserList = ({ user }) => {
  return (
    <Col className="justify-content-md-center centered-row">
      <ListGroup horizontal className="my-2">
        <ListGroup.Item className="text-light user-item d-flex align-items-center">
          <h3>
            {user.Username}
            {user.Verified && (
              <img
                src={verifiedLogo}
                className="verified-logo"
                alt="verified logo"
              />
            )}
          </h3>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <Form method="get" action={`/users/${user.Username}`}>
            <Button variant="primary" type="submit">
              View Page
            </Button>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};
