import React, { useEffect} from "react";
import "./tables.css";
import { BsTrash, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
// import { deleteReview } from "../../Actions/Product";

const ProductReview = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const {isDeleted, error} = useSelector((state) => state.product)

  // const [id, setId] = useState("")
  // const onChangeHandler = (id) => setId(id)

  // const onSubmitHandler = (revId) => dispatch(deleteReview(id, revId))

  useEffect(() => {
    if(isDeleted){
      alert.success("Review deleted successfully!")
    }
    if(error){
      alert.error(error)
    }
    dispatch({type:"deleteReviewReset"})
  }, [dispatch, alert, isDeleted, error])
  

  return (
    <>
      <div className="reviewContainer">
        <div className="searchBox">
          <input
            className="searchInput"
            type="search"
            placeholder="Type to search by Product ID . . . "
          />

          <BsSearch className="iconLink" />
        </div>
        <div className="table-box">
          <table>
            <tbody>
              <tr>
                <th>Review ID</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>21352151</td>
                <td>Nuka</td>
                <td>Nice Product</td>
                <td>4</td>
                <td>
                  <span className="tableIcons">
                    <BsTrash style={{ fontSize: "1.8rem" }} />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
