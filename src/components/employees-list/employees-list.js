import EmployeesListItem from '../employees-list-item/employees-list-item';
import React, {Component} from "react";
import './employees-list.css';

// Передаём в параметры функции пропсы, которые мы передали в тег <EmployeesList> в App.js
const EmployeesList = ({data, onDelete, onToggleProp}) => {
    const elements = data.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <EmployeesListItem
                // Тут мы передали data, который вложили через data={this.state.data} в App.js
                key={id} {...itemProps}
                // Тут мы запускаем метод для удаления, который вложили в App.js (onDelete={this.deleteItem})
                onDeleted={() => onDelete(id)}
                // Тут запускаем методы, которые вложили так же в App.js
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            />
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;