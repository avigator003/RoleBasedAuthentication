import React,{useState} from 'react'

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


import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


  
function Login(props) {
    const[state,setState]=useState({
                  userName:'',
                  password:''
        })
        const history=useHistory()
     

        const handleChange = (e) => {
            e.persist();
            const { name, value } = e.target;
            setState((st) => ({ ...st, [name]: value }));
          };
          

          const handleLogin = (e) => {
            e.preventDefault();
            axios.post(`http://localhost:8080/api/login/`,state)
            .then(response=>{
             if(response.data)
             {
             localStorage.setItem("user",JSON.stringify(response.data))
             history.push('/users')
             }
             else
             alert("Wrong credentails")
            })
            .catch(error=>console.log(error))
       
          };
        
          
    return (
        <CRow>
        <CCol xs="12" md="12" sm="12">
            <CCard>
                <CCardHeader>
                    Login
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

                
                    </CForm>
                </CCardBody>
                <CCardFooter >
          
             <CButton type="submit" size="md" color="primary" onClick={(e)=>handleLogin(e)} style={{margin:50}}>
                 <CIcon name="cil-pencil" /> Login
                 </CButton>
 
                    </CCardFooter>

        
            </CCard>
        </CCol>


    </CRow>

    )
}

export default Login
