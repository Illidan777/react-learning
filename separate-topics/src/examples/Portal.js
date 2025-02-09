import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';
import '../App.css';

class Form extends Component {

    state = {
        advOpen: false,
    }

    componentDidMount() {
        setTimeout(this.handleCLick, 3000)
    }

    handleCLick = () => {
        console.log('CLick');
        this.setState(({advOpen}) => ({
            advOpen: !advOpen
        }))
    }

    render() {
        return (
            <Container>
                <form  className="w-50 border mt-5 p-3 m-auto"
                style={{'overflow': 'hidden', 
                        'position': 'relative'}}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input  type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button onClick={this.handleCLick}  className="btn btn-primary">Submit</button>
                    {
                        this.state.advOpen ?
                            <MyPortal>
                                <Msg/>
                            </MyPortal> : null
                    }
                </form>
            </Container>
        )
    }
}

const MyPortal = (props) => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    return ReactDOM.createPortal(props.children, node)
}

const Msg = () => {
    return (
        <div
            style={{
                'width': '500px',
                'height': '150px',
                'backgroundColor': 'red',
                'position': 'absolute',
                'right': '0',
                'bottom': '0'
            }}>
            Hello
        </div>
    )
}

function Portal() {
    return (
        <Form/>
    );
}

export default Portal;
