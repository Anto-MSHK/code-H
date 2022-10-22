import React from 'react';
import './Settings.css'
import {Button, Card, Checkbox} from "antd";

export const Settings = () => {
    return (
        <Card className={'main_card'}>
            <Card title={'Основная информация'} className={'user_inform'}>
                <Button>Смена e-mail адреса</Button>
                <hr/>
                <Button>Смена пароля</Button>
                <hr/>
                <input value={'Имя пользователя...'}/>
                <hr/>
                <input value={'Ссылка на профиль...'}/>
                <hr/>
                <p>Получать уведомления: <Checkbox/></p>
            </Card>
            <Card title={'Пользовательский фон'} className={'user_background'}>
                <input type={'file'} style={{color: 'black'}}/>
                <hr/>
                <Button>Загрузить</Button>
            </Card>
        </Card>
    );
};