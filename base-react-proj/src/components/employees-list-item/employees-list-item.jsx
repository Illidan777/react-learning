import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {name, salary, onDelete, onToggleProp, increase, like} = props;

    let classNames = "list-group-item d-flex justify-content-between"
    if (increase) {
        classNames += " increase"
    }
    if (like) {
        classNames += " like"
    }
    return (
        <li className={classNames}>
            <span data-toggle="like" onClick={onToggleProp} className="list-group-item-label"
                  style={{fontSize: '20px'}}
            >
                {name}
            </span>
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button data-toggle="increase" type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleProp}
                >
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;