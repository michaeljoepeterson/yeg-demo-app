import React from 'react';
import {connect} from 'react-redux';
import {googleSignIn,emailSignIn} from '../actions/authActions';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles/center.css';
import './styles/login.css';

export class LoginForm extends React.Component{
    //should change this to state
    //only working cus of rerender in overall state
    constructor(props){
        super(props)
        this.state = {
            email:'',
            pass:'',
            loading:false
        }
    }

    inputChanged = (event,key) => {
        event.persist();
        const value = event.target.value;
        this.setState({
            [key]:value
        });
    }
    
   tryLogin = (event) =>{
        event.persist();
        event.preventDefault();
        //console.log(this.state.email,this.state.pass);
        this.props.dispatch(emailSignIn(this.state.email,this.state.pass));
        
    }

    googleSignIn = async () => {
        try{
            await this.props.dispatch(googleSignIn());
        }
        catch(e){
            console.log('error with google sign in page: ',e);
        }
    }

    render(){
        this.displayLoading = this.props.loading ? true : false;
        return(
            <div className="login-container center-container">
                <form className="login-form" onSubmit={(e) => this.tryLogin(e)}>
                    <Typography variant='h4' className="form-title">{this.props.title}</Typography>
                    <div className="input-container login-container">
                        <CircularProgress className={this.displayLoading ? '' : 'hidden'} />
                        <div>
                            <Button onClick={(e) => this.googleSignIn()} className={this.displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="button">Login With Google</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    loading:state.auth.loading
});
export default connect(mapStateToProps)(LoginForm);