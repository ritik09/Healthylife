import React,{Component} from 'react';
import NavBar from '../navbar/navbar';
import { Route,Switch } from 'react-router-dom';
import HOME from '../home/home';
import SIGN from '../signUp/sign';
import LOG from '../logIn/log';
import VALIDATE from '../otp/validate';
import HOSPITAL from '../hospitals/hospital';
import VALIDATE_HOSPITAL from '../hospitals/hospital_validation/hospital_validation';
import LOG_HOSPITAL from '../hospitals/hospital_login/hospital_login';
import DOCTOR_SIGNUP from '../doctor_authentication/doctor_signup';
import HOSPITAL_PROFILE from '../hospitals/hospital_profile/hospital_profile';

class Buildcontrols extends Component{
    render(){
        return(
            <div>
<NavBar/>
<Switch> 
                    <Route path="/sign" component={SIGN} />
                    <Route path="/login" component={LOG} />
                    <Route path="/hospital" component={HOSPITAL} />
                    <Route path="/validate" component={VALIDATE} />
                    <Route path="/validate_hospital" component={VALIDATE_HOSPITAL} />
                    <Route path="/login_hospital" component={LOG_HOSPITAL} />
                    <Route path="/doctor_signup" component={DOCTOR_SIGNUP} />
                    <Route path="/hospital_profile" component={HOSPITAL_PROFILE} />
                    <Route path="/" component={HOME} />
                </Switch>
</div>
        );
    }
}

export default Buildcontrols;