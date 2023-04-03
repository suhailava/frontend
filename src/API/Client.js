import axios from 'axios';
//PS_PL_6 / //PS_DL_5 //PS_FPL_5 //PS_FPL_17 //PS_FPL_29 //PS_FPL_43 //PS_OC_8 //PS_OC_18 
export default async function Client(header,body={}){
    let config={
        ...header,
        data:body
    }
    // console.log(config,".....client")
    //PS_PL_11 //PS_DL_10 //PS_FPL_10 //PS_FPL_22 //PS_FPL_34 //PS_FPL_48 //PS_OC_13 //PS_OC_23  
    let response=axios(config);
    return response;
}