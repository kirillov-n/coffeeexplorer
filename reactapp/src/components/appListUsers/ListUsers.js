import React from "react";
import {Table} from "reactstrap";
import ModalUser from "../appModalUser/ModalUser";
import AppRemoveUser from "../appRemoveUser/RemoveUser";

const ListUsers = (props) => {
    const {users} = props
    return (
        <Table dark>
            <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Никнейм</th>
                <th>Пол</th>
                <th>Дата рождения</th>
                <th>Занятость</th>
                <th>Бизнес аккаунт</th>
                <th>Дата регистрации</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {!users || users.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Пока ничего нет</b>
                    </td>
                </tr>
            ) : users.map(user => (
                    <tr key={user.userID}>
                        <td>{user.userID}</td>
                        <td>{user.email}</td>
                        <td>{user.nickname}</td>
                        <td>{user.sex}</td>
                        <td>{user.birthdate}</td>
                        <td>{user.occupation}</td>
                        <td>{user.is_business + ''}</td>
                        <td>{user.date_joined.split('T')[0]} {user.date_joined.split('T')[1].split('.')[0]}</td>
                        <td>
                            <ModalUser
                                create={false}
                                user={user}
                                resetState={props.resetState}
                                newUser={props.newUser}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveUser
                                pk={user.userID}
                                resetState={props.resetState}
                            />
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    )
}

export default ListUsers