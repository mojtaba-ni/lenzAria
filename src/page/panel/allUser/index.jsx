import { Table } from "antd";
import style from "../../styles/panel/allUser/style.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { strings } from "../../../shared/language";


const AllUser = () => {
 
 
  const [users, setUsers] = useState()
console.log({users});
  const geyAllUser = async () =>{
    
    const {data} = await axios.get("http://localhost:8000/api/getAllUsers")
    
    setUsers(data?.data)
   
  }

  useEffect(() => {
    geyAllUser()
  }, [])
  
    
      
      const columns = [
        {
          title: strings.panel.allUserPage.username,
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: strings.panel.allUserPage.phoneNumber,
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: strings.panel.allUserPage.createdAt,
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
      ];
  return (
    <div>
      <Table dataSource={users} columns={columns} className={style.table} />
    </div>
  );
};

export default AllUser
