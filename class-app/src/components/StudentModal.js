import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  DatePicker,
  Radio,
  Space,
  Select,
  message,
} from "antd";
import classList from "../lookups/classList.json";
import axios from "axios";
import dayjs from "dayjs";

const StudentModal = (props) => {
  const [loading, setLoading] = useState(false);

  const { studentModal, setStudentModal, selectedStudent } = props;
  const [studentForm] = Form.useForm();
  const url = "http://localhost:3001";

  const handleCancel = () => {
    setStudentModal("close");
  };
  const setEditStudentModal = (_id) => {
    axios.get(url + "/student/" + _id).then((response) => {
      let { studentName, dob, gender, class: Class } = response.data;
      studentForm.setFieldsValue({
        studentName,
        dob: dayjs(dob),
        gender,
        class: Class,
      });
    });
  };
  const onFinish = (values) => {
    console.log(values);
    const student = { ...values };
    student.dob = dayjs(values.dob).valueOf();
    if (studentModal == "EditStudent") {
      axios
        .patch(url + "/student/" + selectedStudent, student)
        .then(() => {
          setStudentModal("close");
          message.success("Student updated Successfully");
        })
        .catch(() => {
          setStudentModal("close");
          message.error("Error creating Student");
        });
    } else {
      axios
        .post(url + "/student", student)
        .then(() => {
          setStudentModal("close");
          message.success("Student added Successfully");
        })
        .catch(() => {
          setStudentModal("close");
          message.error("Error creating Student");
        });
    }
  };

  useEffect(() => {
    if (studentModal == "EditStudent") {
      setEditStudentModal(selectedStudent);
    }
  }, [selectedStudent]);
  return (
    <>
      <Modal
        open={studentModal != "close"}
        title={studentModal == "AddStudent" ? "Add Student" : "Edit Student"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          form={studentForm}
          onFinish={onFinish}
        >
          <Form.Item name="studentName" label="Name" required>
            <Input />
          </Form.Item>

          <Form.Item name="dob" label="DOB" required>
            <DatePicker />
          </Form.Item>

          <Form.Item name="gender" label="Gender" required>
            <Radio.Group>
              <Space direction="horizontal">
                <Radio
                  value="male"
                  style={{
                    "--icon-size": "18px",
                    "--font-size": "14px",
                    "--gap": "6px",
                  }}
                >
                  Male
                </Radio>
                <Radio
                  value="female"
                  style={{
                    "--icon-size": "18px",
                    "--font-size": "14px",
                    "--gap": "6px",
                  }}
                >
                  Female
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="class" label="Class" required>
            <Select style={{ width: "100%" }} options={classList}></Select>
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              color="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default StudentModal;
