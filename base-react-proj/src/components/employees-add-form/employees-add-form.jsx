// import './employees-add-form.css';
import './employee-add-form.scss'
import {Component} from "react";
import { v4 as uuidv4 } from 'uuid';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addEmployee = (e) => {
        e.preventDefault();

        const { onAdd } = this.props
        const { name, salary } = this.state
        if(name && salary && name.length > 0){
            const newEmployee = {
                name: name,
                salary: salary,
                increase: false,
                like: false,
                id: uuidv4()
            }
            onAdd(newEmployee);
        }
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                           className="form-control new-post-label"
                           name="name"
                           value={name}
                           placeholder="Как его зовут?" onChange={this.onValueChange}/>
                    <input type="number"
                           className="form-control new-post-label"
                           name="salary"
                           value={salary}
                           placeholder="З/П в $?" onChange={this.onValueChange}/>

                    <button onClick={this.addEmployee} type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;