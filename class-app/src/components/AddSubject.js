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
  Descriptions,
  Select,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddSubject = ({ selectedStudent, setSelectedStudent }) => {
  const [subjectForm] = Form.useForm();
  const [studentList, setStudentList] = useState();
  //   const [selectedStudent, setSelectedStudent] = useState();
  const url = "http://localhost:3001";

  const fetchStudents = () => {
    axios.get(url + "/students").then((value) => {
      const studentList = value.data.map((value, index) => {
        const student = {
          value: value._id,
          label: value.studentName,
        };
        return student;
      });
      setStudentList(studentList);
    });
  };
  const handleAdd = async (values) => {
    const result = { ...values };
    result.studentId = selectedStudent;
    console.log(result);
    await axios.post(url + "/result", result);
  };
  return (
    <>
      <Space.Compact>
        <Select
          showSearch
          placeholder="Search Student"
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={studentList}
          onFocus={fetchStudents}
          onChange={(value) => setSelectedStudent(value)}
        />
      </Space.Compact>
      <br />
      <br />
      <Space.Compact>
        <Form form={subjectForm} onFinish={handleAdd} layout="inline">
          <Form.Item name="subject" label="Subject" required>
            <Input />
          </Form.Item>
          <Form.Item name="marks" label="Marks" required>
            <InputNumber />
          </Form.Item>
          <Button
            // onClick={handleAdd}
            type="primary"
            htmlType="submit"
            style={{
              marginBottom: 16,
            }}
          >
            Add Result
          </Button>
        </Form>
      </Space.Compact>
    </>
  );
};
export default AddSubject;
