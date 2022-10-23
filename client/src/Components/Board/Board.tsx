import {Card, Input, Row} from "antd";
import React, {FC} from "react";
import {Task} from "../Task/Task";
import "./Board.css";

interface BoardI {
    title: string;
}

export const Board: FC<BoardI> = ({title}) => {
    return (
        <div>
            <h1 style={{fontSize: "30px", margin: " 0 0 10px 0"}}>{title}</h1>
            <Card className={"main-board"}>
                <Row gutter={[3, 16]} justify="start">
                    <Task
                        title="1"
                        body="adsdas"
                        creator={"Anton"}
                        performers={["Anton", "Никита", "Андрей"]}
                    />
                    <Task
                        title="1"
                        body="adsdas"
                        creator={"Anton"}
                        performers={["Anton", "Никита", "Андрей"]}
                    />
                    <Task
                        title="1"
                        body="adsdas"
                        creator={"Anton"}
                        performers={["Anton", "Никита", "Андрей"]}
                    />
                    <Task
                        title="1"
                        body="adsdas"
                        creator={"Anton"}
                        performers={["Anton", "Никита", "Андрей"]}
                    />
                    <Task
                        title="1"
                        body="adsdas"
                        creator={"Anton"}
                        performers={["Anton", "Никита", "Андрей"]}
                    />
                </Row>
                <Card title={'Чат (Общайтесь)'}>
                    <Input defaultValue={'Общайтесь...'} style={{width: '100%', height: '100%', color: 'black', fontSize: '50px', textAlign:'left'}}/>
                </Card>
            </Card>
        </div>
    );
};
