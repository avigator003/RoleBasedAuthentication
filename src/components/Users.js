import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Unblock': return 'warning'
    case 'Blocked': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [usersData,setUsersData]=useState()
  const[blocking,setBlocking]=useState(true)
  const[field,setField]=useState([])

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])


//get Users List
useEffect(()=>{
//if(user.role=="admin")
//setField(['name','username','mobile','status','actions'])
//else
//setField(['name','username','mobile','status'])

console.log("hey")
axios.get('http://localhost:8080/api/getusers')
.then(res => {
  setUsersData(res.data)
  setField(['userName','mobile','status','Create User','Block User','Edit Details',])
})

},[blocking])



// Create User
const handleCreateUser=()=>{
    history.push('/user/create')
}

// Edit User
const handleEditUser=(id)=>{
  history.push({
    pathname: `/user/update/${id}`,
});
}


//Block User
const handleBlockUser=(id)=>{
 }

//Unblock User
const handleUnBlockUser=(id)=>{

}


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader size={50}>
            Users List
          </CCardHeader>
          <CCardBody>
          <CDataTable
           tableFilter
            items={usersData}
            fields={field}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
         //   onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    {
                      item.blocked?
                    <CBadge color={getBadge("Blocked")}>
                      Blocked
                    </CBadge>:
                     <CBadge color={getBadge("Active")}>
                     Active
                   </CBadge>
            }
                  </td>
                ),
                "Create User":(item)=>(
                  <td>
                  <CButton variant="outline" color="primary" 
                  size="sm" block onClick={()=>handleCreateUser()}>Create</CButton>
                </td>
                ),
           
                "Block User":(item)=>(
                  <td>
                    {item.blocked?
                       <CButton variant="outline" color="success" 
                       size="sm" block onClick={()=>handleUnBlockUser(item.id)}>Unblock</CButton>:
                    
                  <CButton variant="outline" color="danger" 
                  size="sm" block onClick={()=>handleBlockUser(item._id)}>Block</CButton>
                    }
                </td>
                ),
             
                "Edit Details":(item)=>(
                  <td>
                  <CButton variant="outline" color="warning" 
                  size="sm" block onClick={()=>handleEditUser(item.userId)}>Edit</CButton>
                </td>
                ),
               
             }}
          />
          <CPagination
            limit={5}
            activePage={page}
            onActivePageChange={pageChange}
            pages={40}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
