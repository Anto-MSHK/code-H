import { Avatar, Button, Card, DatePicker, Tag } from "antd";
import React, { FC, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { AvatarMain } from "./../AvatarMain/AvatarMain";
import { Moment } from "moment";
import ru_RU from "antd/es/date-picker/locale/ru_RU";

interface TaskI {
  title: string;
  body: string;
  creator: string;
  performers?: string[];
  date?: { from: string; to: string };
}
type RangeValue = [Moment | null, Moment | null] | null;
const { RangePicker } = DatePicker;
export const Task: FC<TaskI> = ({ title, body, creator, performers, date }) => {
  const [dates, setDates] = useState<RangeValue>(null);
  const [hackValue, setHackValue] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);

  const disabledDate = (current: Moment) => {
    return true;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
  };
  var usersTags: any;
  if (performers)
    usersTags = performers.map((perf) => {
      return <Tag color="#2db7f5">{perf}</Tag>;
    });
  else usersTags = <Tag color="blue">Пока никто.</Tag>;
  return (
    <div style={{ margin: "10px " }}>
      <Tag color="blue" style={{ padding: "2px 3px", margin: "2px 0 -2px 0 " }}>
        <AvatarMain user={creator} />
      </Tag>
      <Card
        size="small"
        title={<h1>{title}</h1>}
        extra={
          <Button type="primary" shape="circle">
            ···
          </Button>
        }
        style={{ minWidth: "300px" }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>{body}</h2>

        <div style={{ margin: "10px 0 0 0" }}>
          <h4>Сроки: </h4>
          <RangePicker
            locale={ru_RU}
            value={hackValue || value}
            disabledDate={disabledDate}
            onCalendarChange={(val) => setDates(val)}
            onChange={(val) => setValue(val)}
            onOpenChange={onOpenChange}
          />
        </div>
        <div style={{ margin: "10px 0 0 0" }}>
          <h4>Работают: </h4>
          {usersTags}
        </div>
      </Card>
    </div>
  );
};
