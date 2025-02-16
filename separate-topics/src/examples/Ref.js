import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import '../App.css';

class Form extends Component {
    // myRef = React.createRef();  --------- usage - this.myRef.current.focus()

    // componentDidMount() {
    //     this.myRef.current.focus();
    // }

    setInputRef = (elem) => {
        this.myRef = elem       // ---------- usage this.myRef.focus()
    }

    focusFirstTI = () => {
        if(this.myRef) {
            this.myRef.focus();
        }
    }

    render() {
        return (
            <Container>
                <form className="w-50 border mt-5 p-3 m-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        {/*Direct ref creation */}
                        {/*<input ref={this.myRef} type="email" className="form-control"*/}
                        {/*       id="exampleFormControlInput1" placeholder="name@example.com"/>*/}
                        {/*Function ref creation*/}
                        <input ref={this.setInputRef} type="email" className="form-control"
                               id="exampleFormControlInput1" placeholder="name@example.com"/>
                        {/*<TextInput ref={this.myRef}/> will occur error because function components dont have instances, only classes*/}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                        <textarea onClick={this.focusFirstTI} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </form>
            </Container>
        )
    }
}

const TextInput = () => {
    return (
        <input ref={this.myRef} type="email" className="form-control" id="exampleFormControlInput1"
               placeholder="name@example.com"/>
    )
}

function Ref() {
    return (
        <Form/>
    );
}

export default Ref;
