import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch,
    CDropdownDivider
} from '@coreui/react'
import 'antd/dist/antd.css';
import CIcon from '@coreui/icons-react'
import { useHistory, useParams } from 'react-router';
import axios from 'axios';



const UserForm = (props) => {
    const history = useHistory()
     

    const [state, setState] = useState({
        userName: "",
        password: "",
        mobile: "",
        roles: 'ROLE_USER'
    });

    const [editing,setEditing]=useState(false)


    const { id } = useParams()
    //Set User Editing Details
    useEffect(() => {
        if (id)
            setEditing(true)
        else
            setEditing(false)


        getCurrentUser()  


    }, [])


    const getCurrentUser=()=>{
        axios.get(`http://localhost:8080/api/getuserbyid/`+id)
        .then(response=>{
            console.log("us",response)
            setState(response.data)
        })
        .catch(error=>console.log(error))
      
    }


    const handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        setState((st) => ({ ...st, [e.target.name]: e.target.value }));
    };



    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/update/`+id,state)
        .then(response=>{
            if(response.data)
            {
              alert("Successfully Updated")
              getCurrentUser()
              history.push("/users")
            }

        })
        .catch(error=>console.log(error))
      
    };
    
    const handleCreate = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/create",state)
        .then(response=>{
            if(response.data)
            {
              alert("Successfully Saved")
              setState({
                userName: "",
                password: "",
                mobile: "",
                roles: 'ROLE_USER'
              })
            }

        })
        .catch(error=>alert('Unsuccessfull'))
    };


    return (
        <>
            <CRow>
                <CCol xs="12" md="12" sm="12">
                    <CCard>
                        <CCardHeader>
                            User Form
            </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="username-input">Username</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput placeholder="Username" name="userName" value={state['userName']} onChange={(e) => handleChange(e)} />
                                    </CCol>
                                </CFormGroup>

                        

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="select">Password</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput placeholder="Password" type="password" name="password" value={state['password']} onChange={(e) => handleChange(e)} />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="select">Phone Number</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput placeholder="Phone Number" type="number" name="mobile" value={state['mobile']} onChange={(e) => handleChange(e)} />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="select">ROLE</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                           
                                    <CSelect id="select" name="roles"
                                        value={state['roles']}
                                        onChange={(e) => handleChange(e)}>

                                        <option value="0" disabled selected>Please select</option>
                                        <option value="ROLE_ADMIN">ADMIN</option>
                                        <option value="ROLE_USER">USER</option>
                                
                                
                                    </CSelect>
                                    </CCol>
                                </CFormGroup>

                            </CForm>
                        </CCardBody>
                        <CCardFooter >
                         {
                             !editing?
                         
                            <CButton type="submit" size="md" color="success" onClick={(e) => handleCreate(e)}><CIcon name="cil-pencil" /> Create User</CButton>:
         
                            <CButton type="submit" size="md" color="success" onClick={(e) => handleUpdate(e)}><CIcon name="cil-pencil" /> Update User</CButton>
         }
                     <CButton type="submit" size="md" color="warning" onClick={()=>history.push("/users")} style={{margin:50}}>
                         <CIcon name="cil-pencil" /> Go Back
                         </CButton>
         
                            </CCardFooter>

                
                    </CCard>
                </CCol>


            </CRow>
        </>
    )
}


export default UserForm