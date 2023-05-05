import {useState, useEffect} from "react";
import Axios from "axios";
import '../App.css';

export default function Main () {

    const [formData, setFormData] = useState({
          id: "",
          name: "",
          industry: "",
    });  
    const {id, name, industry } = formData;
    const [editID, setEditID] = useState()
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    //const [listOfClaims, setListOfCliams] = useState([]);
    //const [name, setName] = useState("")
    //const [industry, setIndustry] = useState("")

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    //Update 
    const updateClaim = (editIDNotState) => {
      if (id && name && industry) {
        Axios.post(`http://localhost:3000/claims/update/${editIDNotState}`, formData)
              .then(
                  setRefresh(refresh + 1)
              )
              .catch(err => console.log(err))

      }
    };
  
    //Create to Frontend also known as submit
    const createClaims = (e) => {
      e.preventDefault();
      if (name && industry) {
          Axios.post("http://localhost:3000/claims/add", formData)
              .then(res => {
                  setData([...data, res.data]);
                  setFormData({id: "", name: "", industry: "" });
                  setRefresh(refresh + 1)
              })
              .catch(err => console.log(err))

          }
     };

     //Update to frontend -> Get a specific user
     const handleClaims = (editID) => {
      Axios.get(`http://localhost:3000/claims/${editID}`)
          .then(res => {
              setFormData({id: res.data._id, name: res.data.name, industry: res.data.industry})
              alert("EDITING USER!")

          })
          .catch(err => console.log(err))
      };

      //Delete to frontend
      const removeClaims = (deleteID) => {
        Axios.delete("http://localhost:3000/claims/"+deleteID)
        .then(res => {
          alert("USER DELETED!")
          console.log('DELETD RECORD::::', res)
          setRefresh(refresh + 1)

        })
        .catch(err => console.log(err))
      };

      

      useEffect(() =>{ //Enpoint for Axios get request
        Axios.get("http://localhost:3000/claims/")
        .then((response)=> {
          alert("Getting list of claims")
          setData(response.data)
        }) 
      }, [refresh]);
  
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-8 offset-md-2 mt-2">
            <h1> Actors</h1>
            <form onSubmit={createClaims}>
                
                <div className="form-group">
                    <label htmlFor="id">Id</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        placeholder="Enter id"
                        name="id"
                        value={id}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <textarea
                        className="form-control"
                        id="body"
                        rows="3"
                        placeholder="Enter Industry"
                        name="industry"
                        value={industry}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <button type="button" className="btn btn-primary" 
                  onClick={() => {
                    updateClaim(id)
                  }}>
                    Update
                </button>
            </form>

            <hr />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Industry</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.industry}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => {
                                    handleClaims(item._id)
                                    setEditID(item._id)
                                }}>
                                    Edit
                                </button>{" "}
                                <button className="btn btn-danger" onClick={() => removeClaims(item._id)}>
                                    Delete
                                </button>
                                              </td>
                                          </tr>))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div >
    );
                
}