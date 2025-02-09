import React, {Component} from "react";
import './App.css';
import styled from "styled-components";

import 'bootstrap/dist/css/bootstrap.min.css';
import PropsChildren from "./examples/PropsChildren";
import Ref from "./examples/Ref";
import Portal from "./examples/Portal";
import BootstrapTest from "./examples/BootstrapTest";
import UseStateHook from "./examples/hooks/UseStateHook";
import UseEffectHook from "./examples/hooks/UseEffectHook";
import UseCallbackHook from "./examples/hooks/UseCallbackHook";
import UseMemoHook from "./examples/hooks/UseMemoHook";
import UseRefHook from "./examples/hooks/UseRefHook";
import OtherHookExamples from "./examples/hooks/OtherHookExamples";
import CustomHook, {CusHookCounter, RndCounter} from "./examples/hooks/CustomHook";
import NewHooks from "./examples/hooks/NewHooks";
import MemoTest from "./examples/Memo";
import SingleFileReactContextExample from "./examples/context/SingleFileExample";
import DifFileReactContextExample from "./examples/context/DifFilesExample";
import UseReducerTest from "./examples/hooks/UseReducer";
import HighOrderComponentTest from "./examples/HighOrderComponent";


/**
 *
 * Styled components
 *
 */


/**
 *
 * Styled component with props
 *
 */
const EmpItem = styled.div`
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

    a {
        display: block;
        margin: 10px 0;
        color: ${props => props.active ? 'orange' : 'black'};
    }

    input {
        display: block;
        margin-top: 10px;
    }
`;

/**
 *
 * Replacement for `h2` header
 *
 */
const Header = styled.h2`
    font-size: 22px;
`

/**
 *
 * Replacement for `button` element
 *
 */
export const Button = styled.button`
    display: block;
    padding: 5px 15px;
    background-color: gold;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
`
/**
 *
 * Styled component inherits other styled component above
 *
 */
const BigButton = styled(Button)`
    margin: 0 auto;
    width: 245px;
    text-align: center;
`

/**
 *
 * Wrapper for centering content
 *
 */
const Wrapper = styled.div`
    width: 600px;
    margin: 80px auto 0 auto;
`

/**
 *
 * Wrapper for bordering
 *
 */
const BorderWrapper = styled.div`
    margin: 20px;
    padding: 20px;
    border: 2px black solid;
`

/**
 *
 * Class component example with using state and styled components
 *
 */
class WhoAmI extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            years: 27,
            text: 'Next year',
            position: ''
        }
        // this.nextYear = this.nextYear.bind(this); // not to lose this context
    }

    // the arrow function does not have its own context, so it refers to the parent
    nextYear = () => {
        console.log(this)
        console.log('+++');
        // this.setState({
        //     years: this.state.years + 1
        // })
        this.setState(state => (
            {
                years: state.years + 1
            }
        ))
    }

    commitInputChanges = (e, color) => {
        console.log(color);
        this.setState({
            position: e.target.value
        })
    }

    render() {
        const {name, surname, link} = this.props;
        const {position, years} = this.state;
        return (
            <EmpItem active>
                <Button onClick={this.nextYear}>{this.state.text}</Button>
                <Header>My name is {name}, surname - {surname},
                    age - {years},
                    position - {position}</Header>
                <a href={link}> My profile</a>

                <form>
                    <span>Enter position</span>
                    <input type="text" onChange={(e) =>
                        this.commitInputChanges(e, 'someColor')}/>
                </form>
            </EmpItem>
        )
    }
}

/**
 *
 * Function component example with using React children React cloning, Also look at component below
 *
 */
const DynamicGreating = (props) => {
    return (
        <div className={'mb-3 p-3 border-' + props.color}>
            {/*
            Just show children
            {props.children}
            */}
            {/*
            Add additional classes to each child elements passed in first param
            */}
            {
                React.Children.map(props.children, (child, i) => {
                    return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'});
                })
            }
        </div>
    )
}


/**
 *
 * Component composition
 * Specific component based on another component = composition (better than inheritance)
 *
 */
const HelloGretings = () => {
    return (
        <div style={{width: '100%', margin: '0 auto'}}>
            <DynamicGreating color={'primary'}>
                <h2>Inherit1</h2>
                <h2>Inherit2</h2>
                <h2>Inherit3</h2>
            </DynamicGreating>
        </div>
    )
}


/**
 *
 * Render properties example
 * Message and Counter are two independent components,
 * But we link them using render function property -'render()' in Counter component
 */
const Message = (props) => {
    return (
        <h2>There is test of render props - The counter is {props.counter}</h2>
    )
}

class RenderPropCounter extends React.Component {
    state = {
        counter: 0
    }

    changeCounter = () => {
        this.setState(({counter}) => ({
            counter: counter + 1
        }))
    }

    render() {
        return (
            <>
                <button
                    className={'btn btn-primary'}
                    onClick={this.changeCounter}
                >
                    Click me
                </button>
                {this.props.render(this.state.counter)}
            </>
        )
    }
}

function App() {
    return (

        <Wrapper>
            <BorderWrapper>
                <Header>Example of styled component inheritance</Header>
                <Button>Simple button</Button>
                <BigButton as="a">Inherited button</BigButton>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of bootstrap components</Header>
                <BootstrapTest/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of render properties</Header>
                <RenderPropCounter render={counter => (
                    <Message counter={counter}/>
                )}/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of component composition and React.Children/Clone usage</Header>
                <HelloGretings/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of using class components/state,props</Header>
                <WhoAmI name='John' surname='Smith' link='facebook.com'/>
                <WhoAmI name='Alex' surname='Shepard' link='inst.com'/>
            </BorderWrapper>


            <BorderWrapper>
                <Header>Example of using component-props</Header>
                <PropsChildren
                    left={
                        <DynamicGreating color={'primary'}>
                            <h2>Hello</h2>
                            <h2>world!</h2>
                        </DynamicGreating>
                    }
                    right={
                        <DynamicGreating color={'primary'}>
                            <h2>It is</h2>
                            <h2>TEST!</h2>
                        </DynamicGreating>
                    }
                />
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of using ref-s</Header>
                <Ref/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of using portals</Header>
                <Portal/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of useState hook</Header>
                <UseStateHook/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of useEffect hook</Header>
                <UseEffectHook/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of useCallback hook</Header>
                <UseCallbackHook/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of useMemo hook</Header>
                <UseMemoHook/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Example of useRef hook</Header>
                <UseRefHook/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Other hook examples</Header>
                <OtherHookExamples/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>Custom hook example</Header>
                <CustomHook/>
                <CusHookCounter counter={0}/>
                <RndCounter counter={0}/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>useTransition, useDefferedValue - examples</Header>
                <NewHooks/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>React.memo - examples</Header>
                <MemoTest/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>React.context - single file example</Header>
                <SingleFileReactContextExample/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>React.context - diff file example</Header>
                <DifFileReactContextExample/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>useReducer - examples</Header>
                <UseReducerTest/>
            </BorderWrapper>

            <BorderWrapper>
                <Header>High order component(HOC) - example</Header>
                <HighOrderComponentTest/>
            </BorderWrapper>

        </Wrapper>
    );
}

export default App;
