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
import HOSPITAL_EDIT_PROFILE from '../hospitals/hospital_edit_profile/hospital_edit_profile'; 
import HOSPITAL_PROFILE_USER from '../hospitals/hospital_profile_user/hospital_profile_user';
import DOCTOR_PROFILE_USER from '../doctor_authentication/doctor_profile_user/doctor_profile_user';
import DOCTOR from '../doctor_authentication/doctors/doctor';
import SHOW_USER_APPOINTMENT from '../appointments/show_appointment_user/show_appointment_user';
import SHOW_HOSPITAL_APPOINTMENT from '../appointments/show_appointment_hospital/show_appointment_hospital';

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
                    <Route path="/hospital_edit_profile" component={HOSPITAL_EDIT_PROFILE} />
                    <Route path="/hospital_profile_user" component={HOSPITAL_PROFILE_USER} />
                    <Route path="/doctor_profile_user" component={DOCTOR_PROFILE_USER} />
                    <Route path="/doctor" component={DOCTOR} />
                    <Route path="/show_user_appointment" component={SHOW_USER_APPOINTMENT} />
                    <Route path="/show_hospital_appointment" component={SHOW_hospital_APPOINTMENT} />
                    <Route path="/" component={HOME} />
                </Switch>
</div>
        );
    }
}

export default Buildcontrols;