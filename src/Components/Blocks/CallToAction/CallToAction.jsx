import React, {useState} from 'react';
import IButton from "../../UI/IButton/IButton";
import cl from './CallToAction.module.css';
import logo from '../../../Assets/Pictures/bg-logo.svg'
import Modal from "../../UI/Modal/Modal";
import Form from "../../UI/Form/Form";
const CallToAction = () => {
    const [modal, setModal] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const openModal = () => {
        setModal(true)
    }
    return (
        <>
            {modal &&
                <Modal close={closeModal}>
                    <Form/>
                </Modal>
            }
            <div className={cl.block}>
                <img className={cl.bg} src={logo} alt={'logo'}/>
                <div className={cl.content}>
                    <div className={cl.text}>
                        <h3>
                            Необходима консультация?
                        </h3>
                        <span>
                            Оставьте свои контакты, и мы Вам перезвоним.
                        </span>
                    </div>
                    <IButton onClick={openModal} className={cl.button}>
                        Заказать звонок
                    </IButton>
                </div>
            </div>
        </>
    );
};

export default CallToAction;