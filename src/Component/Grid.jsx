import { useState, useEffect } from "react";  //PS_PL_1
import { getCandidateInfo, deleteCandidateInfo, sorting } from "../API/Service";
import { Link, useNavigate } from "react-router-dom";//PS_ED_3
import moment from "moment/moment";
import ReactPaginate from "react-paginate";










export default function Grid() {

    //state variable to store DB data and populate to the grid
    const [gridValues, setGridValues] = useState([]);  //PS_PL_2
    const [search, setSearch] = useState("") //PS_SC_1

    const [page, setPage] = useState(0)
    const recordsPerPage = 2;
    const [totalRecords, setTotalRecords] = useState(0)
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const [sort, setSort] = useState({
        "id": "asc",
        "column": "Ca.candidateId"
    })

    let navigate = useNavigate()

    useEffect(() => { //PS_PL_3
        getData();
    }, [page, sort])


    const changePage = ({ selected }) => {
        setPage(selected);
    };

    //for getting the grid data from the DB
    let getData = async () => {  //PS_PL_4 //PS_SC_5,//PS_SC_6


        let pageNo = {
            "offset": page,
            "sort": sort
        }

        let response = await getCandidateInfo(search, pageNo);

        if (response.data.rowsAffected[0] !== 0) {
            setTotalRecords(response.data.recordset[0].records);
        }

        setGridValues(response.data.recordset)//PS_PL_13
    }

    //storing the data to be searched in the statevariable
    //PS_SC_3
    let searchData = async (e) => {
        setSearch(e.target.value)
    }

    //for deleting the data
    //PS_DL_2
    let deleteData = async (delId) => {
        let id = delId.target.id;
        if (window.confirm("Are you sure want to delete this record")) {
            let response = await deleteCandidateInfo(id); //PS_DL_3
            console.log(response, '......deleted')
        }
        getData(); //PS_DL_12//PS_DL_13

    }

    //for editing the data in the form
    //PS_ED_2
    let editData = (editId) => {
        let id = editId.target.id;
        navigate('/Form/' + id) //PS_ED_3
    }

    //for sorting  the data 
    let sortFunction = async (e) => {
        setSort({ ...sort, "id": e.target.id, "column": e.target.name })
    }

    //binding data to the Grid
    //PS_PL_14
    let gridData = () => {

        return gridValues.map((values) => {
            return <>
                <tr>
                    <td>{values.firstName + " " + values.lastName}</td>
                    <td>{moment(values.dateOfBirth).format('DD/MM/YYYY')}</td>
                    <td>{values.courses}</td>
                    <td>{values.admissionMode}</td>
                    <td>{(values.facId).toString()}</td>
                    {/* /* //PS_DL_1 //PS_ED_1 */}
                    <td><img id={values.candidateId} src="/editicon.png" alt="edit" className="img" onClick={(e) => editData(e)} ></img><img id={values.candidateId} src="/deleteicon.png" alt="delete" className="img" onClick={(e) => deleteData(e)}></img></td>
                </tr></>
        })
    }



    return (
        <div className="parent">
            <div className="grid-head">
                <h2 className="h2">CANDIDATE INFORMATION</h2>
                {/* //PS_SC_2 */}
                <input type="search" placeholder="Search" className="search" onChange={(e) => searchData(e)}></input>
                {/* //PS_SC_4 */}
                <button className="search-label" onClick={() => getData()}>Search</button>
                <Link to='/'><button className="btn3"><img src="/add-user.png" alt="add" className="add"></img>Add</button></Link>
                <button className="filter-btn"><img src="/filter.png" alt="filter" className="filter"></img></button>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="left">Username<img src="/arrow-up.png" className="sort" alt="up" id="desc" name="Ca.firstName" onClick={(e) => sortFunction(e)}></img><img src="/arrow-down.png" className="sort1" alt="up" id="asc" name="Ca.firstName" onClick={(e) => sortFunction(e)}></img></th>
                            <th className="left">Date of Birth<img src="/arrow-up.png" className="sort" alt="up" id="desc" name="Ca.dateOfBirth" onClick={(e) => sortFunction(e)}></img><img src="/arrow-down.png" className="sort1" alt="up" id="asc" name="Ca.dateOfBirth" onClick={(e) => sortFunction(e)}></img></th>
                            <th className="left">Course<img src="/arrow-up.png" className="sort" alt="up" id="desc" name="Co.courses" onClick={(e) => sortFunction(e)}></img><img src="/arrow-down.png" className="sort1" alt="up" id="asc" name="Co.courses" onClick={(e) => sortFunction(e)}></img></th>
                            <th className="left">Admission Mode<img src="/arrow-up.png" className="sort" alt="up" id="desc" name="Am.admissionMode" onClick={(e) => sortFunction(e)}></img><img src="/arrow-down.png" className="sort1" alt="up" id="asc" name="Am.admissionMode" onClick={(e) => sortFunction(e)}></img></th>
                            <th className="left">Facilities Needed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* //PS_PL_14 */}
                        {gridValues.length === 0 ? <td colSpan="15"><h2 className="alert">No Records Found</h2></td> : gridData()}
                    </tbody>



                </table>

            </div>
            <div>{gridValues.length === 0 ? <></> :
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={totalPages}
                    breakLabel={"..."}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={0}
                    onPageChange={changePage}
                    containerClassName={"navigationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"navigationDisabled"}
                    activeClassName={"navigationActive"}
                />}
            </div>

        </div>
    )
}