import React from 'react';
import {message} from 'antd';
import {GetUserInfo} from "../apicalls/users";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SetUser, ReloadUser} from "../redux/usersSlice";
import {ShowLoading, HideLoading} from "../redux/loadersSlice";

export default function ProtectedRoute(props){
    const {user} = useSelector(state=> state.users)
    const dispatch = useDispatch();
    // const [userData, setUserData] = React.useState(null)

    const navigate = useNavigate()
    const getData = async () => {
        try{
            dispatch(ShowLoading());
            const response = await GetUserInfo();
            dispatch(HideLoading());
            if(response.success){
                // setUserData(response.data);
                dispatch(SetUser(response.data));
            }else{
                message.error(response.message);
                navigate('/login');
            }
            dispatch(ReloadUser(false));
        }catch(error){
            dispatch(HideLoading());
            navigate('/login');
            console.log('ProtectedRoute.js error')
            message.error(error.message);
        }
    };

    React.useEffect(() => {
        if(localStorage.getItem("token")){
            if(!user){
                getData();
            }
        }else{
            navigate("/login");
        }

    }, []);
    // return <div>{props.children}</div>
    return user && (<div>{props.children}</div>)
}