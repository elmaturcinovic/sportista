import {React, useRef} from 'react';
import axios from "axios";
import {Form} from "react-bootstrap";
import '../../stylesheet_auth.css';


function ResetPassword(props){

    const emailRef = useRef();

    function resetujMail() {
        var email = emailRef.current.value;
        console.log(email)
        axios.post('http://127.0.0.1:8000/sportista/password_reset_forgot/', {
            email: email,
        }).then((response)=>{
            }, (error) => {
                console.log(error);
            }
        );

        props.onChange(true);
    }

    return(
        <div className='reset-pass'>           
            <form className='forma'>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>E-mail pomoću kojeg ste registrovani</Form.Label>
                    <Form.Control type="email" ref={emailRef}/>
                </Form.Group>
                <button type="submit" className="reset-button submit-form" onClick={()=>resetujMail()}> 
                        Resetuj lozinku
                </button>
            </form>
        </div>
        
    );
}

export default ResetPassword;


