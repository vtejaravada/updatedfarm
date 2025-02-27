import React, { useState } from 'react'
import '../SignUp/SignUp.css'
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';

const auth = getAuth(app);

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [showLoader, setShowLoader] = useState(false)

    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
        conformPassword: ''
    })

    const signUp = () => {
        setShowLoader(true);
        createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
            .then((userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                setShowLoader(false);
                setFormFields({
                    email: '',
                    password: '',
                    conformPassword: ''
                })

                // ...
            })
            .catch((error) => {

                console.error("Error signing in with Google:", error);
                setShowLoader(false);

                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });
    }

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormFields(() => ({
            ...formFields,
            [name]: value,
        }))
        // console.log(formFields)
    }

    return (
        <section className="SignUp">

            <div className="breadcrumbWrapper mb-4">
                <div className="container-fluid">
                    <ul className="breadcrumb breadcrumb2 mb-0">
                        <li><Link to="/">Home</Link></li>
                        <li>SignUp</li>
                    </ul>
                </div>
            </div>

            <div className="loginWrapper">
                <div className="card shadow">
                    <Backdrop
                        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={showLoader}
                        className='formLoader'
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <h3>Sign Up</h3>

                    <form className='mt-4'>
                        <div className="form-group mb-4 w-100">
                            <TextField id="email" type="email" name='email' label="Email" className='w-100' onChange={onChangeField} value={formFields.email} />
                        </div>

                        <div className="form-group mb-4 w-100 ">

                            <div className="position-relative">

                                <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Password" className='w-100' onChange={onChangeField}
                                    value={formFields.password} />
                                <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                    }

                                </Button>

                            </div>

                        </div>

                        <div className="form-group mb-4 w-100 ">

                            <div className="position-relative">

                                <TextField id="conformPassword" type={showPassword1 === false ? 'password' : 'text'} name='conformPassword' label="Confirm Password" className='w-100' onChange={onChangeField} value={formFields.conformPassword} />
                                <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                    {
                                        showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />
                                    }

                                </Button>

                            </div>

                        </div>

                        <div className="form-group mt-5 mb-4 w-100">
                            <Button className='btn btn-g w-100' onClick={signUp}>Sign Up</Button>
                        </div>

                        <p className='text-center'>Aleary have an account
                            <b><Link to='/signIn'> Sign In </Link></b>
                        </p>



                    </form>

                </div>
            </div>

        </section>
    )
}

export default SignUp