function EmployeeRow({employee, checked, onChange}) {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onChange(employee.id)}
                />
            </td>
            <td>
                {employee.id}
            </td>
            <td>
                {employee.name}
            </td>
            <td>
                {employee.profession}
            </td>
            <td>
                {employee.contractType}
            </td>

            <td className="text-end">
                <button className="btn btn-primary btn-sm me-2 user-select-none">
                    Edytuj
                </button>

                <button className="btn btn-danger btn-sm user-select-none">
                    Usuń
                </button>
            </td>
        </tr>
    );
}

export default EmployeeRow;