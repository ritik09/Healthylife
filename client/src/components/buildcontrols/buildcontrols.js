import React,{Component} from 'react';
import NavBar from '../navbar/navbar';
import { Route,Switch } from 'react-router-dom';
import HOME from '../home/home';
import SIGN from '../signUp/sign';
import LOG from '../logIn/log';
import VALIDATE from '../otp/validate';
import HOSPITAL from '../hospitals/hospital';

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
                    <Route path="/" component={HOME} />
                </Switch>
</div>
        );
    }
}

export default Buildcontrols;