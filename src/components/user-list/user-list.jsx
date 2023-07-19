import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const UserList = ({ user }) => {
  return (
    <ListGroup horizontal className="my-2">
      <ListGroup.Item className="text-light">{user.username}</ListGroup.Item>
      <ListGroup.Item>
        <Form method="get" action={`/users/${user.username}`}>
          <Button variant="primary" type="submit">
            View Page
          </Button>
        </Form>
      </ListGroup.Item>
    </ListGroup>
  );
};
