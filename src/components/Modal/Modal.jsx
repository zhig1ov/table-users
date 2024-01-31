import React from 'react';
import './Modal.css'
import {MODAL_FORMAT as modalFormat} from "../../utils/columns";

export const Modal = async ({active, setActive, idx, data}) => {
    console.log(data)
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? 'modal-content active' : 'modal-content'}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Данные о пользователе</h2>
                {modalFormat.map((item) => {
                    console.log(item)
                    console.log(item.field)
                    console.log(data[idx])
                    return (
                        <div>
                            <h3>{item.title}</h3>
                            <p>{data[idx]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
