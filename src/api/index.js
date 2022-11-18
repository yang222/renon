import request from '../utils/request';

export const path = 'https://cocospy.io'


export const Login = (data) => {
    return request({
        url: "/auth/login",
        method: 'post',
        data
    });
};
;