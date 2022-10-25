import React, {Component} from "react";
import './employees-list-item.css';

const EmployeesListItem = (props) => {
    // Тут получаем пропсы из EmployeesList, которые являются атрибутами тега
    const {name, salary, onDeleted, onToggleProp, increase, liked} = props;

    let classNames = `list-group-item d-flex justify-content-between`;

    if (increase) {
        classNames += ' increase';
    }

    if (liked) {
        classNames += ' like';
    }

    return (
        <li className={classNames}>
        <span
            className="list-group-item-label"
            onClick={onToggleProp}
            // Этот атрибут должен будет попасть вторым аргументом в onToggleProp
            data-toggle="liked"
        >
            {name}
        </span>
            <input type="text" className="list-group-item-input" defaultValue={`${salary}$`}/>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button"
                        className="btn-cookie btn-sm"
                        onClick={onToggleProp}
                        // И этот атрибут должен будет попасть вторым аргументом в onToggleProp
                        data-toggle="increase"
                >
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm"
                        onClick={onDeleted}
                >
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
}

export default EmployeesListItem;