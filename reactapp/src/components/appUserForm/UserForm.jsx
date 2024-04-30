import React, {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL} from "../../index";

const UserForm = (props) => {
    const [user, setUser] = useState({})

    const onChange = (e) => {
        const newState = user
            newState[e.target.name] = e.target.value
        setUser(newState)
    }

    useEffect(() => {
        if (!props.newUser) {
            setUser(user => props.user)
        }
        // eslint-disable-next-line
    }, [props.user])

    // const defaultIfEmpty = value => {
    //     return value === "" ? "" : value;
    // }

    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const result = await axios.put(API_URL + user.userID + "/", user, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            email: user['email'],
            nickname: user['nickname'],
            sex: user['sex'],
            birthdate: user['birthdate'],
            occupation: user['occupation'],
            is_business: user['is_business'],
            password: user['password'],
        }
        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    return (
        <Form onSubmit={props.newUser ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    onChange={onChange}
                    // defaultValue={defaultIfEmpty(user.email)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="nickname">Никнейм:</Label>
                <Input
                    type="text"
                    name="nickname"
                    onChange={onChange}
                    // defaultValue={defaultIfEmpty(user.nickname)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="sex">Пол</Label>
                <div>
                    <Label for="man">Мужчина</Label>
                    <Input type="radio" name="sex" value="M" onChange={onChange} />
                </div>
                <div>
                    <Label for="woman">Женщина</Label>
                    <Input type="radio" name="sex" value="W" onChange={onChange} />
                </div>

            </FormGroup>
            <FormGroup>
                <Label for="birthdate">Дата рождения</Label>
                <Input
                    type="date"
                    name="birthdate"
                    onChange={onChange}
                    // defaultValue={defaultIfEmpty(user.birthdate)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="occupation">Занятость</Label>
                <div>
                    <Label for="RS">Учусь на удаленке</Label>
                    <Input type="radio" name="occupation" value="RS" onChange={onChange} />
                </div>
                <div>
                    <Label for="NRS">Учусь</Label>
                    <Input type="radio" name="occupation" value="NRS" onChange={onChange} />
                </div>
                <div>
                    <Label for="RW">Работаю на удаленке</Label>
                    <Input type="radio" name="occupation" value="RW" onChange={onChange} />
                </div>
                <div>
                    <Label for="NRW">Работаю</Label>
                    <Input type="radio" name="occupation" value="NRW" onChange={onChange} />
                </div>
                <div>
                    <Label for="OAR">Отдыхаю</Label>
                    <Input type="radio" name="occupation" value="OAR" onChange={onChange} />
                </div>
            </FormGroup>
            <FormGroup>
                <Label for="is_business">Бизнес аккаунт</Label>
                <Input
                    type="checkbox"
                    name="is_business"
                    value="true"
                    onChange={onChange}
                    // defaultValue={defaultIfEmpty('false')}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Пароль</Label>
                <Input
                    type="password"
                    name="password"
                    onChange={onChange}
                    // defaultValue={defaultIfEmpty(user.password)}
                />
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button>Отправить</Button> <Button onClick={props.toggle}>Отмена</Button>
            </div>
        </Form>
    )
}

export default UserForm;