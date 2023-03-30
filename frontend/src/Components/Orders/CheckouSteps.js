import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import {FaShippingFast} from 'react-icons/fa'
import {FiCheckSquare} from 'react-icons/fi'
import { MdPayment } from "react-icons/md";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => { 
  const steps = [
    { 
      label: <Typography style={{color: "black", fontSize:"1.5rem"}}>Shipping Details</Typography>,
      icon: <FaShippingFast style={{fontSize:"2rem"}}/>,
    },
    {
      label: <Typography style={{color: "black", fontSize:"1.5rem"}}>Confirm Order</Typography>,
      icon: <FiCheckSquare style={{fontSize:"2rem"}} />,
    },
    {
      label: <Typography style={{color: "black", fontSize:"1.5rem"}}>Payment</Typography>,
      icon: <MdPayment style={{fontSize:"2rem"}}/>,
    },
  ];

  const stepStyles = {
      boxSizing: "border-box",
      color:"black",
      backgroundColor: "#f4f4f5"
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
                completed={activeStep >= index ? true : false}
                
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#008000" : "rgba(0, 0, 0, 0.649)",
                // fontSize:"2rem"
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
