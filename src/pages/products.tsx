import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
  useContext,
} from "react";
import { NextPage } from "next";
import { Container, ControlledInput } from "../../components/styled-component/Global";
import Layout from "../../components/Layout";
import {
  Card,
  Center,
  FlexContainer,
  List,
  Row,
  Top,
} from "../../components/styled-component/products/Global";
import {
  Divider,
  IconButton,
  Typography,
  Checkbox,
  Tooltip,
} from "@mui/material";
import ButtonComponent from "../../components/Button";
import {
  Add,
  AddCircle,
  Clear,
  Edit,
  PrintDisabled,
  TryRounded,
} from "@mui/icons-material";
import useGetter from "../../hooks/useGetter";
import productsClass from "../../model/products";
import { ScaleLoader } from "react-spinners";
import Image from "next/image";
import AlertDialogSlide from "../../components/AlertDialog";
import { initialProductData } from "../../components/Data/initialData";
import {
  postRequest,
  deleteRequest,
  patchRequest,
} from "../../lib/axios/axiosClient";
import ModalComponent from "../../components/Modal";
import Avatar from "react-avatar";
import AsyncSelect from "react-select/async";
import useLocalStorage from "../../hooks/localStorage";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  ContextProvider,
  ProductSelectedContext,
} from "../../helper/context/sp/ContextProdvider";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/hooks";
import { updateProducts, updateProductSelected } from "./redux/productSlice";
import { RootState } from "./redux/store";

const products: NextPage = () => {
  /**Get request with swr */
  const { data, isError, isLoading } = useGetter("api/products");

  /**states */
  const [products, setProducts] = useState<productsClass[]>([]);
  const [singleProduct, setSProduct] = useState<productsClass>({
    ...initialProductData,
  });
  const [dialogResponse, setDialogResponse] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<string[]>([]);

  const SelectedProducts = useSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();

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
  const [openUpdateModal, setopenUpdateModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenSFModal = () => setOpenSFModal(true);
  const handleCloseSFModal = () => setOpenSFModal(false);

  const handleUpdateModal = () => setopenUpdateModal(true);
  const handleCloseUpdateModal = () => setopenUpdateModal(false);

  /**Dialog */
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleNoCloseDialog = () => {
    setDialogResponse(false);
    setOpenDialog(false);
  };

  const handleYesCloseDialog = () => {
    setDialogResponse(true);
    setOpenDialog(false);
  };

  const handleProductSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    product: productsClass
  ) => {
    const value = event.target.checked;
    if (value === true) {
      // update context state
      dispatch(
        updateProductSelected({
          products: product,
        })
      );
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof productsClass
  ) => {
    const value = e.target.value;
    const nC: productsClass = { ...singleProduct };
    if (name === "_id") throw new Error("_id fields are mutable fields");
    if (name === "description") nC[name] = value;
    if (name === "rate") nC[name] = value;
    if (name === "type") nC[name] = value;
    if (name === "qty") nC[name] = Number(value);
    setSProduct(nC);
  };

  const handleUpdate = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof productsClass,
  ) => {
    const value = e.target.value;
    let prod: Array<productsClass> = [...products];
    const valueUpdates = prod.filter((p, i) => {
      const obj: productsClass = { ...p };
      if (name !== "_id" && name !== undefined) {
        if (name !== "qty") obj[name] = value;
        if (name === "qty") obj[name] = Number(value);
      }
      console.log(obj);
      //return obj
    });
    prod = valueUpdates;
    //console.log(prod)
    //setProducts(prod)
  };

  const updateField = (cli: productsClass) => {
    setSProduct(cli)
  }

  const postNewProduct = async (): Promise<void> => {
    try {
      const newProduct = await postRequest("api/products", singleProduct);
      if (newProduct.data) alert("new Product Added");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    handleOpenDialog();
    if (dialogResponse === true) {
      try {
        const productData = await deleteRequest(
          `api/products/?product_id=${id}`
        );
        if (productData.data)
          alert(`product <${id}> has been removed from database`);
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };

  const updateProduct = async (id: string): Promise<void> => {
    const { _id, ...ProUpdate } = singleProduct; // REMOVE ID FIELD
    try {
      const UpdatedProduct = await patchRequest(
        `api/products/?product_id=${id}`,
        ProUpdate
      );
      if (UpdatedProduct.data) alert(`updated Product ${id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteFromSelectedProducts = (id: string) => {
    dispatch(
      updateProducts({
        Id: id,
      })
    );
  };

  /**Controlled Renders */
  const renderProducts = () => {
    return isLoading ? (
      <Center>
        <ScaleLoader color="blue" />
      </Center>
    ) : (
      [
        products.map((cli, index) => {
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
                  <Tooltip title="Select Product">
                    <Checkbox
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleProductSelect(e, cli)
                      }
                    />
                  </Tooltip>
                  <Typography color="#555">{cli.description}</Typography>
                </div>
                <Typography color="#555">{cli.rate}</Typography>
                <Typography color="#555">{cli.type}</Typography>
                <Typography color="#555">{cli.qty}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <Tooltip title="Select Product">
                  <ButtonComponent
                icon={<Add/>}
                customStyle={{borderRadius: '30px', boxShadow: "0", background: 'red'}}
                />
                  </Tooltip>

                  <IconButton
                    onClick={
                      () => {
                        handleUpdateModal(); 
                        updateField(cli);
                      }
                      //updateProduct(cli._id ? cli._id.toString() : "")
                    }
                  >
                    <Tooltip title="Update">
                      <Edit />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      handleDelete(cli._id ? cli._id.toString() : "")
                    }
                  >
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
        {data && products.length < 1 ? (
          <Center>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src="/485.svg" width={400} height={400} />
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
                <ButtonComponent
                  innerText="New Invoice"
                  icon={<AddCircle />}
                  onClick={handleOpenSFModal}
                />
                <ButtonComponent
                  innerText="New Product"
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
      <ModalComponent
        OpenModal={openModal}
        handleCloseModal={handleCloseModal}
        pd={"2rem"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>New Product</Typography>
          <Divider />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <ControlledInput
              placeholder="Product Description"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "description")
              }
            />
            <ControlledInput
              placeholder="Price / rate"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "rate")
              }
            />
            <ControlledInput
              placeholder="type ofproduct"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "type")
              }
            />
            <ControlledInput
              type="number"
              placeholder="quantity - (in-stock)"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "qty")
              }
            />
          </div>
          <ButtonComponent
            customStyle={{ background: "green" }}
            innerText="Save"
            onClick={postNewProduct}
          />
        </div>
      </ModalComponent>

      {/**Update Modal */}
      <ModalComponent
        OpenModal={openUpdateModal}
        handleCloseModal={handleCloseUpdateModal}
        pd={"2rem"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>Update Product</Typography>
          <Divider />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <ControlledInput type={"text"} 
            value={singleProduct.description}
            onChange={(e: ChangeEvent<HTMLInputElement> ) => handleChange(e, "description")}
            />
            <ControlledInput type={"text"}
            value={singleProduct.rate}
             onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "rate")}
             />
            <ControlledInput type={"text"} 
            value={singleProduct.type}
             onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "type")}
            />
            <ControlledInput type={"number"}
            value={singleProduct.qty}
             onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, "qty")}
            />
            <ButtonComponent
              customStyle={{ background: "green" }}
              onClick={() => updateProduct(singleProduct._id?.toString()!)}
              innerText="Update"
            />
          </div>
        </div>
      </ModalComponent>

      {/**create from selected products */}
      <ModalComponent
        OpenModal={openSFModal}
        handleCloseModal={handleCloseSFModal}
        pd={"2rem"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography>New Invoice For Product</Typography>
          <Divider />
          <div
            style={{
              padding: ".5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            {SelectedProducts.product?.map((pr) => {
              return (
                <div
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    display: "flex",
                    background: "whitesmoke",
                    //boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    justifyContent: "space-between",
                    padding: ".5rem",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      name={pr.description}
                      color="#2124B1"
                      round="8px"
                      size="40px"
                    />
                    <Typography>{pr.description}</Typography>
                  </div>

                  <Tooltip
                    title="Delete"
                    onClick={() =>
                      deleteFromSelectedProducts(pr._id?.toString()!)
                    }
                  >
                    <Clear />
                  </Tooltip>
                </div>
              );
            })}
            <Typography>Note</Typography>
            <Divider />
            <Typography variant="subtitle2" color="#555">
              Invoice will be generated for this products You cannot edit the
              item description and rate You can only change the quantity of the
              items
            </Typography>
            <Link
              href={{
                pathname: `http://localhost:3000/invoice/create`,
              }}
            >
              <ButtonComponent
                innerText="Create Invoice"
                btnDisabled={SelectedProducts.product.length > 0 ? false : true}
              />
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
