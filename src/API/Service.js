import Client from "./Client";

export async function getCourses(){ //PS_FPL_4
    const config={
        "url":"http://localhost:4000/candidates",
        "header":{
            "content-type":'application.json'
        },
        "method":"GET" 
    }
    //PS_FPL_11
    let response= await Client(config);
    return response;
}

export async function getAdmission(){//PS_FPL_16
    const config={
        "url":"http://localhost:4000/candidates",
        "header":{
            "content-type":'application.json'
        },
        "method":"GET" 
    }
    //PS_FPL_23
    let response= await Client(config);
    return response;
}

export async function getFacility(){ //PS_FPL_28
    const config={
        "url":"http://localhost:4000/candidates",
        "header":{
            "content-type":'application.json'
        },
        "method":"GET" 
    }
    //PS_FPL_35
    let response= await Client(config);
    return response;
}

export async function postCandidateInfo(data){ //PS_OC_7
    const config={
        "url":"http://localhost:4000/candidates/postCandidateInfo",
        "header":{
            "content-type":'application.json'
        },
        "method":"POST" 
    }
    //PS_OC_14
    let response= await Client(config,data);
    return response;
}

export async function getCandidateInfo(data,load){//PS_PL_5
    const config={
        "url":"http://localhost:4000/candidates/getCandidateInfo?name="+data,
        "header":{
            "content-type":'application.json'
        },
        "method":"POST" 
    }
    //PS_PL_12
    let response= await Client(config,load);
    return response;
}

export async function deleteCandidateInfo(data){ //PS_DL_4
    const config={
        "url":"http://localhost:4000/candidates/deleteCandidateInfo/"+data,
        "header":{
            "content-type":'application.json'
        },
        "method":"PUT" 
    }
    //PS_DL_11
    let response= await Client(config);
    return response;
}

export async function getEditCandidateInfo(data){ //PS_FPL_42
    const config={
        "url":"http://localhost:4000/candidates/getEditCandidateInfo/"+data,
        "header":{
            "content-type":'application.json'
        },
        "method":"GET" 
    }
    //PS_FPL_49
    let response= await Client(config);
    return response;
}

export async function updateCandidateInfo(data,id){ //PS_OC_17
    const config={
        "url":"http://localhost:4000/candidates/updateCandidateInfo/"+id,
        "header":{
            "content-type":'application.json'
        },
        "method":"PUT" 
    }
    //PS_OC_24
    let response= await Client(config,data);
    return response;
}
