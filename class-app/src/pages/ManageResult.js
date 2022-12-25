import React, { useState } from "react";
import ResultTable from "../components/resultTable";
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
} from "antd";
import AddSubject from "../components/AddSubject";
const ManageResult = () => {
  const [selectedStudent, setSelectedStudent] = useState();
  return (
    <>
      <AddSubject
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      <ResultTable selectedStudent={selectedStudent} />
    </>
  );
};
export default ManageResult;
