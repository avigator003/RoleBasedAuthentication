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
  const [usersData, setUsersData] = useState()
  const [blocking, setBlocking] = useState(true)
  const [field, setField] = useState([])
  const [loading, setLoading] = useState(true)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])


  //get Users List
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    if (user?.roles == "ROLE_ADMIN")
      setField(['userName', 'mobile', 'status', 'Delete User', 'Edit Details',])
    else
      setField(['userName', 'mobile', 'status'])

    axios.get('http://localhost:8080/api/getusers')
      .then(res => {
        setUsersData(res.data)
        setLoading(false)

      })

  }, [blocking])



  // Create User
  const handleCreateUser = () => {
    history.push('/user/create')
  }

  // Edit User
  const handleEditUser = (id) => {
    history.push({
      pathname: `/user/update/${id}`,
    });
  }


  //Block User
  const handleDeleteUser = (id) => {
    axios.post(`http://localhost:8080/api/delete/` + id)
      .then(response => {
        setBlocking(!blocking)
      })
      .catch(error => console.log(error))
  }

  const handleLogout = () => {
    localStorage.setItem("user", null)

    history.push('/login')
  }


  return (
    <>
      {!loading &&
        <CRow>
          <CCol xl={12}>
            <CCard>
              <CCardHeader size={50} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <p>Users List</p>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>            
                
                <CButton variant="outline" color="primary"
                    size="sm" block onClick={() => handleCreateUser()}>Create User</CButton>

                  <CButton variant="outline" color="danger"
                  size="sm" block onClick={() => handleLogout()}>Logout</CButton>
                </div>


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
                  scopedSlots={{
                    'status':
                      (item) => (
                        <td>
                          {
                            !item.isActive ?
                              <CBadge color={getBadge("Blocked")}>
                                Blocked
                            </CBadge> :
                              <CBadge color={getBadge("Active")}>
                                Active
                   </CBadge>
                          }
                        </td>
                      ),
                    "Create User": (item) => (
                      <td>
                        <CButton variant="outline" color="primary"
                          size="sm" block onClick={() => handleCreateUser()}>Create</CButton>
                      </td>
                    ),

                    "Delete User": (item) => (
                      <td>
                        <CButton variant="outline" color="success"
                          size="sm" block onClick={() => handleDeleteUser(item.userId)}>Delete</CButton> :


                      </td>
                    ),

                    "Edit Details": (item) => (
                      <td>
                        <CButton variant="outline" color="warning"
                          size="sm" block onClick={() => handleEditUser(item.userId)}>Edit</CButton>
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
      }
    </>
  )
}

export default Users
