import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './login-form';
import { Redirect } from 'react-router';
import { withRouter} from 'react-router-dom';
import {refreshAuthToken,enableTestMode} from '../actions/authActions';

export function LandingPage(props){
    const title = 'Demo Guitar App';
    if(props.currentUser){
        return <Redirect to='/create-lesson'/>;
    }
    
    if(props.location.pathname.includes('/test')){
        props.dispatch(enableTestMode());
        return <Redirect to='/'/>;
    }
    
    return(
        <div className="center-container">
            <LoginForm title={title}/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default withRouter(connect(mapStateToProps)(LandingPage));