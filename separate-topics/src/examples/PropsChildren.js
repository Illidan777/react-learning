import {Container, Row, Col,} from 'react-bootstrap';

const PropsChildren = (props) => {
    return (
        <Container className="m-5" fluid>
            <Row>
                <Col>
                    {props.left}
                </Col>
                <Col>
                    {props.right}
                </Col>
            </Row>
        </Container>
    )
}

export default PropsChildren;