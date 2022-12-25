import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Popconfirm,
  message,
  Form,
  Input,
  InputNumber,
  Search,
  Row,
  Col,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
const ResultTable = ({ selectedStudent }) => {
  const url = "http://localhost:3001";

  const fetchResult = (studentId) => {
    axios.get(url + "/result/" + studentId).then((value) => {
      const resultList = value.data.map((value) => {
        const result = {
          key: value._id,
          subject: value.subject,
          marks: value.marks,
        };
        return result;
      });
      setDataSource(resultList);
    });
  };

  const [dataSource, setDataSource] = useState([]);
  const handleDelete = async (key) => {
    console.log(key);
    await axios
      .delete(url + "/result/" + key)
      .then(() => fetchResult(selectedStudent));
  };
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Marks",
      dataIndex: "marks",
    },
  ];

  useEffect(() => {
    if (selectedStudent) fetchResult(selectedStudent);
  }, [dataSource, selectedStudent]);
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={8} offset={8}>
        <Space.Compact block>
          <Table
            style={{ width: "100%" }}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Space.Compact>
      </Col>
    </Row>
  );
};
export default ResultTable;
