import { Header, Segment, Form, Container, Grid } from "semantic-ui-react";

const Main = () => {
  return (
    <Container>
      <Header>Uniswap</Header>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Column>
          <Form>
            <Segment>
              <Form.Input></Form.Input>
              <Form.Input></Form.Input>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>

      <footer></footer>
    </Container>
  );
};

export default Main;
