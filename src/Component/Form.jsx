import { useState,useEffect } from "react"; //PS_FPL_1
import { getAdmission, getCourses, getFacility,postCandidateInfo,getEditCandidateInfo,updateCandidateInfo } from "../API/Service";
import { useParams,useNavigate,Link } from "react-router-dom";//PS_FPL_2
import moment from "moment/moment";






export default function Form(){
   
    //for storing the input values
    //PS_FPL_1
    const[inputValues,setInputValues]=useState({
        "firstName":"",
        "lastName":"",
        "dateOfBirth":"",
        "courseId":"",
        "admissionModeId":"",
        "issuesFaced":"",
        "facId":[]
    })

    //for showing error values
    //PS_OC_5
    const [inputValuesError,setInputValuesError]=useState({
        "firstNameError":"",
        "lastNameError":"",
        "dateOfBirthError":"",
        "courseIdError":"",
        "admissionModeIdError":"",
        "facIdError":"",
    }) 

    

    let params=useParams();
    let navigate=useNavigate();

    //dropdown binding statevariable //PS_FPL_13
    const [coursesData,setCoursesData]=useState([])
    //radiobutton binding statevariable //PS_FPL_25
    const [admissionData,setAdmissionData]=useState([])
    //checkbox binding statevariable //PS_FPL_37
    const [facilityData,setFacilityData]=useState([]);

    useEffect(()=>{  //PS_FPL_3
        populateData();

        if(params.id!==undefined){ //PS_FPL_40
            editDataInfo();
        }

    },[])
    console.log();

    //for getting the values to be edited 
    //PS_FPL_41
    let editDataInfo=async()=>{
        let updateValues=await getEditCandidateInfo(params.id); //PS_FPL_50
        console.log(updateValues,'................edit values');
        setInputValues(updateValues.data.recordset[0])

    }
    
    //binding data function
    //PS_FPL_3
    let populateData=async()=>{
        const courses= await getCourses(); //PS_FPL_12
        setCoursesData(courses.data.recordset);//PS_FPL_14
        const admission=await getAdmission();//PS_FPL_24
        setAdmissionData(admission.data.recordset); //PS_FPL_26
        const facility= await getFacility(); //PS_FPL_36
        setFacilityData(facility.data.recordset) //PS_FPL_38
    }

    //onChange event to store inputboxes
    //PS_OC_2
    let onChangeInput=(e)=>{
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }


    //onChange event to store check box 
    //PS_OC_3
    let onChangeFacility=(e)=>{
        debugger
        let facilityInput=inputValues.facId;
        if(e.target.checked){
            facilityInput.push(parseInt(e.target.id));
            setInputValues({...inputValues,[e.target.name]:facilityInput})
        }
        else{
            let index=facilityInput.findIndex((facilityId)=>facilityId===e.target.id);
            facilityInput.splice(index,1);
            setInputValues({...inputValues,[e.target.name]:facilityInput})
        }
        
       
    }

    //validating form
    //PS_OC_5
    let validateForm=()=>{
        // debugger
         let result=0;
         if(inputValues.firstName===""){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"firstNameError":"Enter FirstName"}))
         }
         console.log(inputValuesError,'..........error')
         if(inputValues.lastName===""){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"lastNameError":"Enter lastName"}))
         }
         console.log(inputValuesError,'..........error')
         if(inputValues.dateOfBirth===""){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"dateOfBirthError":"Enter DOB"}))
         }
         console.log(inputValuesError,'..........error')
         if(inputValues.courseId===""){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"courseIdError":"Select any course"}))
         }
         if(inputValues.admissionModeId===""){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"admissionModeIdError":"Select the admissionMode"}))
         }
         if(inputValues.facId.length===0){
            result++
            setInputValuesError((inputValuesError)=>({...inputValuesError,"facIdError":"Select any facilities"}))
         }
         if(result>0){
            return false;
         }
         return true;
    }


    //submitting data
    //PS_OC_4 
    let submitForm= async ()=>{
        // console.log(inputValues);
          if(validateForm()){
               if(params.id!==undefined){
                   //PS_OC_16
                   let response= await updateCandidateInfo(inputValues,params.id) //PS_OC_25
                   console.log(response)
                   navigate('/Grid')
               }
               else{
                //PS_OC_6
                 let response= await postCandidateInfo(inputValues); //PS_OC_15
                //  console.log(response);
                 navigate('/Grid');
               }
          }
        //  console.log("..........stored values",inputValues);
    }
    
    
    //binding dropdown //PS_FPL_15
    let coursesDropdown=()=>{
        return coursesData.map((values)=>{
               return <option value={values.courseId}>{values.courses}</option>
        })
    }

    //binding radiobutton //PS_FPL_27
    let admissionButton=()=>{
        return admissionData.map((values)=>{
            {/* //PS_FPL_51 //PS_OC_1 */}
                return <> <input type='radio' name="admissionModeId" checked={inputValues.admissionModeId===values.admissionModeId?true:false} className={values.admissionMode} value={values.admissionModeId} onChange={(e)=>{onChangeInput(e);setInputValuesError({...inputValuesError,"admissionModeIdError":""})}}></input>
                <label className="radio-label">{values.admissionMode}</label> </> 
        })
    }

    //binding checkbox //PS_FPL_39
    let facilityButton=()=>{
        return facilityData.map((values)=>{
            // console.log("values",values);
            {/* //PS_FPL_51 //PS_OC_3*/}
            return <div className="check"><input type="checkbox" checked={inputValues.facId.includes(values.facId)?true:false} className="checkbox" id={values.facId} onChange={(e)=>{onChangeFacility(e);setInputValuesError({...inputValuesError,"facIdError":""})}}></input>
            <label className="checkbox-label">{values.facilities}</label></div>
        })
    }
    {/* //PS_FPL_53 */}
    return(
        <div className="parent">
            <h2 className="head">UNIVERSITY CANDIDATE FORM</h2>
            <div className="sub-parent">
                <div className="child">
                    <label className="label">First Name<span>*</span></label>
                    {/* //PS_FPL_51 //PS_OC_1*/}
                    <input type="text" className="box" placeholder="Enter first name" name="firstName" value={inputValues.firstName} onChange={(e)=>{onChangeInput(e);setInputValuesError({...inputValuesError,"firstNameError":""})}}></input>
                    <span className="error">{inputValuesError.firstNameError}</span>
                </div>
                <div className="child">
                    <label className="label">Last Name<span>*</span></label>
                    {/* //PS_FPL_51 //PS_OC_1 */}
                    <input type="text" className="box" placeholder="Enter last name" name="lastName" value={inputValues.lastName} onChange={(e)=>{onChangeInput(e);setInputValuesError({...inputValuesError,"lastNameError":""})}}></input>
                    <span className="error">{inputValuesError.lastNameError}</span>
                </div>
            </div>
            <div className="sub-parent">
                <div className="child">
                    <label className="label">Date of Birth<span>*</span></label>
                    {/* //PS_FPL_51 //PS_OC_1 */}
                    <input type="date" className="box" placeholder="Choose your Date of Birth" name="dateOfBirth" value={moment(inputValues.dateOfBirth).format('YYYY-MM-DD')} onChange={(e)=>{onChangeInput(e);setInputValuesError({...inputValuesError,"dateOfBirthError":""})}}></input>
                    <span className="error">{inputValuesError.dateOfBirthError}</span>
                </div>
                <div className="child">
                    <label className="label">Course<span>*</span></label>
                    {/* //PS_FPL_51 //PS_OC_1 */}
                    <select className="drop-box" name="courseId" value={inputValues.courseId} onChange={(e)=>{onChangeInput(e);setInputValuesError({...inputValuesError,"courseIdError":""})}}>
                        <option id="">Select the course of study</option>
                        {/* //PS_FPL_15 */}
                        {coursesDropdown()}
                    </select>
                    <span className="error">{inputValuesError.courseIdError}</span>
                </div>
            </div>
            <div className="sub-parent">
                <div className="child">
                    <label className="label">Admission Mode<span>*</span></label>
                    {/* //PS_FPL_27 */}
                       {admissionButton()}
                       <div>
                       <span className="error">{inputValuesError.admissionModeIdError}</span>
                       </div>
                </div>
                <div className="child">
                    <label className="label">Facilities Needed</label>
                    {/* //PS_FPL_39 */}
                    {facilityButton()}
                    <span className="error">{inputValuesError.facIdError}</span>
                </div>
            </div>
            <div className="sub-parent-textarea">
                <label className="label">Any Issues</label>
                {/* //PS_FPL_51 //PS_OC_1 */}
                <textarea className="textarea-box" name="issuesFaced" value={inputValues.issuesFaced} onChange={(e)=>onChangeInput(e)} placeholder="Enter short description about your issues will reach you shortly" rows="4"></textarea>
            </div>
            <div>
            <button className="btn1" onClick={()=>submitForm()}>{params.id?'Update':'Submit'}</button>{/* //PS_FPL_52 //PS_OC_4*/}
           <Link to='/Grid'><button className="btn2">Cancel</button></Link> 
            </div>
        </div>
    )
}