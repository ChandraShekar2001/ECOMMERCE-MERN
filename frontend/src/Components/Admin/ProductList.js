import React, { useState, useEffect } from "react";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import "./tables.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, deleteProduct } from "../../Actions/Product";
import UpdateProduct from "./UpdateProduct";
import { useAlert } from "react-alert";
const ProductList = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  const [pen, setPen] = useState(false);
  const [puser, setPuser] = useState();
  const onChangePenHandler = (i) => {
    setPen(true);
    setPuser(i);
  };

  
  const setPenHandlerToFalse = () => setPen(false);
  const { products, isDeleted } = useSelector((state) => state.product);

  useEffect(() => {
    if(isDeleted){
      alert.success("Deleted successfully!");
    }
    dispatch({type:"deleteProductRequestReset"})
  }, [isDeleted, alert, dispatch])
  return (
    <>
      {!pen ? (
        <div className="tableContainer">
          <div className="table-box">
            <h1>Product List</h1>
            <table>
              <tbody>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </tbody>
              <tbody>
                {products &&
                  products.map((i) => (
                    <tr>
                      <td>{i._id}</td>
                      <td>
                        {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                      </td>
                      <td>{i.Stock}</td>
                      <td>{i.price}</td>
                      <td>
                        <span className="tableIcons">
                          <BsPencilFill
                            style={{ fontSize: "1.8rem" }}
                            onClick={() => onChangePenHandler(i)}
                          />
                        </span>
                        <span className="tableIcons">
                          <BsTrash
                            style={{ fontSize: "1.8rem" }}
                            onClick={() => dispatch(deleteProduct(i._id))}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <UpdateProduct
          id={puser._id}
          name={puser.name}
          price={puser.price}
          description={puser.description}
          category={puser.category}
          Stock={puser.Stock}
          togglePen = {setPenHandlerToFalse}
        />
      )}
    </>
  );
};

export default ProductList;
