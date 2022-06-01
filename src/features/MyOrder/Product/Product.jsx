import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import PropTypes from "prop-types";
import React, { useState } from "react";

Product.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
  myOrder: PropTypes.object,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Product({ product, index, myOrder }) {
  return (
    <>
      <StyledTableRow>
        <StyledTableCell>{index + 1}</StyledTableCell>
        <StyledTableCell>
          <div className="myOrderDetail-table-image">
            <img src={product.productDetail.image} alt="" />
          </div>
        </StyledTableCell>
        <StyledTableCell>
          {product.productDetail.product.name}
          <p className="myOrderDetail-table-size">
            Size: {product.productDetail.size}
          </p>
          <p className="myOrderDetail-table-size">
            Màu: {product.productDetail.color.name}
          </p>
        </StyledTableCell>
        <StyledTableCell>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </StyledTableCell>
        <StyledTableCell>{product.quantity}</StyledTableCell>
        <StyledTableCell>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price * product.quantity)}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default Product;
