import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Table,Popconfirm,message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentModal from './StudentModal';
import dayjs from "dayjs";
const StudentTable = () => {
  const url="http://localhost:3001"
  const fetchStudents= ()=>{
      axios.get(url+"/students")
            .then((value)=>{
                const studentList=value.data.map((value,index)=>{
                    const student={
                        key:value._id,
                        Name:value.studentName,
                        DOB:dayjs(value.dob).format("DD-MM-YYYY"),
                        // DOB:"21-10-1997",
                        Gender:value.gender,
                        Class:value.class
                    }
                   return student
                })
                setDataSource(studentList)
            
            })
       
  }

  const [dataSource, setDataSource] = useState([]);
  const [studentModal,setStudentModal]=useState("close");
  const [selectedStudent,setSelectedStudent]=useState("");
  const handleDelete = async (key) => {
    console.log(key)
    await axios.delete(url+"/student/"+key)
            .then(()=>fetchStudents)
    // setDataSource(newData);

  };
  const cancelDelete=()=>{

  }
  const handleEdit=(key)=>{
    setStudentModal("EditStudent")
    setSelectedStudent(key)
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      width: '30%',
      editable: true,
    },
    {
      title: 'DOB',
      dataIndex: 'DOB',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
    },
    {
        title: 'Class',
        dataIndex: 'Class',
      },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '5%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
            <Space>
            <EditOutlined style={{color:"#FFC300"}} onClick={()=>handleEdit(record.key)} />
            <Popconfirm
                title="Delete Student"
                description="Are you sure you want to delete this Student?"
                onConfirm={()=>handleDelete(record.key)}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No"
            >
            <DeleteOutlined style={{color:"#FF0000"}} />
            </Popconfirm>
            </Space>
        ) : null,
    },
  ];
  const handleAdd = () => {
    setStudentModal("AddStudent")
  };

  useEffect(()=>{
    fetchStudents();
  },[dataSource])
  return (
    <div>
      <Button
        onClick={(handleAdd)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add Student
      </Button>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <StudentModal studentModal={studentModal} setStudentModal={setStudentModal} selectedStudent={selectedStudent} />
    </div>
  );
};
export default StudentTable;