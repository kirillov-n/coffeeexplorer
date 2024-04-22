import React, {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import UserForm from "../appUserForm/UserForm";

const ModalUser = (props) => {
    const [visible, setVisible] = useState(false)
    var button = <Button onClick={() => toggle()}>Редактировать</Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                Добавить пользователя
            </Button>
        )
    }
    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>{props.create ? "Добавить пользователя" : "Редактировать пользователя"}</ModalHeader>
                <ModalBody>
                    <UserForm
                        user={props.user ? props.user : []}
                        resetState={props.resetState}
                        toggle={toggle}
                        newUser={props.newUser}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default ModalUser;