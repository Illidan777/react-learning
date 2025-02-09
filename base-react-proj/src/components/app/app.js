import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeeList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import './app.css';
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: "John C.",
                    salary: 800,
                    increase: false,
                    like: true,
                    id: 1
                },
                {
                    name: "Sten Lii",
                    salary: 3000,
                    increase: true,
                    like: false,
                    id: 2
                },
                {
                    name: "Lavanda Grey",
                    salary: 5000,
                    increase: false,
                    like: false,
                    id: 3
                }
            ],
            term: '',
            filter: 'all'
        };
    }

    deleteItem = (id) => {
        console.log(id);
        this.setState(({data}) => {
            return {
                data: data.filter((item) => item.id !== id)
            }
        })
    }

    addItem = (item) => {
        this.setState(({data}) => {
            return {
                data: [...data, item]
            }
        })
    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex((item) => item.id === id);
        //
        //     const old = data[index]
        //     const newObj = {...old, like: !old.like}
        //     const newArr = [...data.slice(0, index), newObj, ...data.slice(index + 1)];
        //     return {
        //         data: newArr
        //     }
        //
        // })
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    getEmployeeCount = () => {
        return this.state.data.length
    }

    getEmployeeForIncreaseCount = () => {
        return this.state.data.filter((item) => item.increase).length
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case "like": {
                return items.filter((item) => item.like)
            }
            case "moreThen1000": {
                return items.filter((item) => item.salary > 1000)
            }
            default: {
                return items
            }
        }

    }

    onFilterSelect = (filter) => {
        this.setState(({filter}))
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    employeeCount={this.getEmployeeCount()}
                    forIncreaseCount={this.getEmployeeForIncreaseCount()}
                />

                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                    <EmployeeList
                        data={visibleData}
                        onDelete={this.deleteItem}
                        onToggleProp={this.onToggleProp}
                    />
                    <EmployeesAddForm onAdd={this.addItem}/>
                </div>
            </div>
        );
    }
}

export default App;