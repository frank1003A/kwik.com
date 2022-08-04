import React, { ChangeEvent, MouseEventHandler, useEffect, useState, useContext } from "react";
import { NextPage } from "next";
import { Container } from "../../components/styled-component/Global";
import Layout from "../../components/Layout";
import {
  Card,
  Center,
  FlexContainer,
  List,
  Row,
  Top,
} from "../../components/styled-component/products/Global";
import { Divider, IconButton, TextField, Typography, Checkbox, Tooltip } from "@mui/material";
import ButtonComponent from "../../components/Button";
import {
  Add,
  AddCircle,
  Clear,
  Edit,
} from "@mui/icons-material";
import useGetter from "../../hooks/useGetter";
import productsClass from "../../model/products";
import { ScaleLoader } from "react-spinners";
import Image from 'next/image'
import AlertDialogSlide from "../../components/AlertDialog";
import { initialProductData } from "../../components/Data/initialData";
import { postRequest, deleteRequest } from "../../lib/axios/axiosClient";
import ModalComponent from "../../components/Modal";
import Avatar from "react-avatar";
import AsyncSelect from "react-select/async";
import useLocalStorage from "../../hooks/localStorage";
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router";
import { ContextProvider, ProductSelectedContext } from "../../helper/context/sp/ContextProdvider";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/hooks";
import { updateProducts, updateProductSelected } from "./redux/productSlice";
import { RootState } from "./redux/store";

const products: NextPage = () => {
  /**Get request with swr */
  const { data, isError, isLoading } = useGetter("api/products");

  /**states */
  const [products, setProducts] = useState<productsClass[]>([]);
  const [singleProduct, setSProduct] = useState<productsClass>({...initialProductData})
  const [dialogResponse, setDialogResponse] = useState<boolean>(false)

  const SelectedProducts = useSelector((state: RootState) => state.product)
  const dispatch =  useAppDispatch()

  const setter = () => {
    if (data !== undefined) setProducts(data);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setter();
  }, [data]);

  /**Modals */
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openSFModal, setOpenSFModal] = useState<boolean>(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenSFModal = () => setOpenSFModal(true);
  const handleCloseSFModal = () => setOpenSFModal(false);

  /**Dialog */
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleNoCloseDialog = () => {
    setDialogResponse(false)
    setOpenDialog(false);
  };

  const handleYesCloseDialog = () => {
    setDialogResponse(true)
    setOpenDialog(false);
  };

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>, product: productsClass) => {
    const value = event.target.checked
    if (value === true) {
      // update context state
      dispatch(
        updateProductSelected({
          products: product
        })
      )
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: keyof productsClass) => {
    const value = e.target.value
    const nC: productsClass =  {...singleProduct}
    if (name === "_id") throw new Error("_id fields are mutable fields")
    if (name === "description") nC[name] = value 
    if (name === "rate") nC[name] = value
    if (name === "type") nC[name] = value
    if (name === "qty") nC[name] = Number(value)
    setSProduct(nC)
  }

  const postNewProduct = async ( ): Promise<void> => {
    try {
      const newProduct = await postRequest('api/products', singleProduct)
      if (newProduct.data) alert('new Product Added')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleDelete = async(id : string): Promise<void> => {
    handleOpenDialog()
    if (dialogResponse === true) {
      try {
        const productData = await deleteRequest(`api/products/?product_id=${id}`)
        if (productData.data) alert(`product <${id}> has been removed from database`)
    } catch (error: any) {
      console.log(error.message)
    }
    } else {
      return 
    }
  }

  const deleteFromSelectedProducts = (id: string) => {
    dispatch(
      updateProducts({
        Id: id
      })
    )
  }

  const renderProducts = () => {
    return isLoading ? (
      <Center>
        <ScaleLoader color="blue" />
      </Center>
    ) : (
      [
        products.map((cli) => {
          return (
            <Card>
              <Row>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <Checkbox 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxClick(e, cli)}
                  />
                  <Typography id={"clientname"}>{cli.description}</Typography>
                </div>
                <Typography id={"email"}>{cli.rate}</Typography>
                <Typography id={"email"}>{cli.type}</Typography>
                <Typography id={"email"}>{cli.qty}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <Tooltip title="Create Invoice for this product">
                  <ButtonComponent
                    icon={<Add />}
                    customStyle={{
                      borderRadius: "50%",
                        boxShadow: "0",
                        background: "red",
                    }}
                  />
                  </Tooltip>
                  
                  <IconButton>
                    <Tooltip title="Update">
                      <Edit />
                    </Tooltip>
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cli._id ? cli._id.toString() : "")}>
                  <Tooltip title="Delete">
                    <Clear />
                    </Tooltip>
                  </IconButton>
                </div>
              </Row>
            </Card>
          );
        }),
      ]
    );
  };

  return (
      <Layout>
      <Container>
        {
         data && products.length < 1 ? (
          <Center>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src="/485.svg" width={400} height={400}/>
              {/**<Typography> No Products Yet</Typography> */}
              <ButtonComponent
                innerText="Product"
                icon={<Add />}
                onClick={handleOpenModal}
              />
            </div>
          </Center>
        ) : (
          <React.Fragment>
            <Top>
              <Typography>Products</Typography>
              <div>
              <AsyncSelect />
              <ButtonComponent innerText="New Invoice" 
              icon={<AddCircle />} 
              onClick={handleOpenSFModal}
              />
              <ButtonComponent innerText="New Product"
              icon={<AddCircle />} 
              onClick={handleOpenModal}
              />
              </div>
            </Top>
            <FlexContainer>
              <List>{renderProducts()}</List>
            </FlexContainer>
          </React.Fragment>
        )}
      </Container>
      <ModalComponent OpenModal={openModal} handleCloseModal={handleCloseModal} pd={'2rem'}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>New Product</Typography>
          <Divider />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <TextField variant="standard" placeholder="Product Description" 
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'description')} />
            <TextField variant="standard" placeholder="Price / rate"
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'rate')}
             />
            <TextField variant="standard" placeholder="type ofproduct"
            onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'type')}
             />
             <TextField type="number" variant="standard" placeholder="quantity - (in-stock)"
             onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,'qty')}
             />
          </div>
          <ButtonComponent innerText="Save" onClick={postNewProduct} />
        </div>
      </ModalComponent>

      {/**create from selected products */}
      <ModalComponent OpenModal={openSFModal} handleCloseModal={handleCloseSFModal} pd={'2rem'}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>New Invoice</Typography>
          <Divider />
          <div
            style={{
              padding: ".5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: '100%'
            }}
          >
            {SelectedProducts.product?.map((pr)=> {
              return (
                <div
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  display: 'flex',
                  background: 'whitesmoke',
                  //boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  justifyContent: 'space-between',
                  padding: '.5rem',
                  alignItems: 'center',
                  gap: '.5rem'
              }}
                >
                  <div style={{display: 'flex', gap: '1rem'}}>
                    <Avatar
                  name={pr.description}
                  color="#2124B1"
                  round="8px"
                  size="40px"
                />
                  <Typography>
                    {pr.description}
                  </Typography>
                  </div>
                 
                  <Tooltip title="Delete" onClick={() => deleteFromSelectedProducts(pr._id?.toString()!)}>
                    <Clear />
                    </Tooltip>
                </div>
              )
            })}
            <Typography>Note</Typography>
            <Divider />
            <Typography variant="subtitle2" color="#555">
              Invoice will be generated for this products <br/>
              You cannot edit the item description and rate <br/>
              You can only change the quantity of the items
            </Typography>
            <Link href={{
              pathname: `http://localhost:3000/invoice/create`,
            }} >
              <ButtonComponent innerText="Create Invoice"/>
            </Link>
        </div>
        </div>
      </ModalComponent>
      <AlertDialogSlide 
      dialogTitle="Delete Product Data" 
      dialogText="Are you sure you want to delete this data?"
      openDialog={openDialog}
      handleNoCloseDialog={handleNoCloseDialog}
      handleYesCloseDialog={handleYesCloseDialog}
      />
    </Layout>
  );
};

export default products;
