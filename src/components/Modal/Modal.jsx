import React, {useEffect} from 'react';
import './Modal.css';
import {MODAL_FORMAT as modalFormat} from "../../utils/columns";

export const Modal =  ({active, setActive, idx, data}) => {
console.log(idx)
    const closeHandler = () => {
        setActive(false);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }

useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
}, [active])

    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={closeHandler}
        >
            <div
                className={active ? 'modal-content active' : 'modal-content'}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className='modal-header'>Данные о пользователе</h2>
                    <div className='info-items'>
                        {modalFormat.map((item) => {

                            return (
                                <div className='info-item' key={`modal${item.title}`}>
                                    {idx.toString() && (
                                        <>
                                            <h3>{item.title}</h3>
                                            <p>{data[idx][`${item.field}`]}</p>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    );
};
