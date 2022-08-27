import {
  AddCircle,
  Clear,
  Edit,
  ImportExportSharp,
  LocalActivity,
  Receipt,
  ReceiptLong,
  Sort,
} from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { useSWRConfig } from "swr";

import CustomLoader from "../../components/asset/CustomLoader";
import ProductIcon from "../../components/asset/ProductIcon";
import ButtonComponent from "../../components/Button";
import CustomSnackbar from "../../components/CustomSnackbar";
import { initialProductData } from "../../components/Data/initialData";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/Modal";
import MuiSearchbar from "../../components/MuiSearchbar";
import {
  ControlledInput,
  VhContainer,
} from "../../components/styled-component/Global";
import {
  Card,
  Center,
  FlexContainer,
  List,
  Row,
  Top,
} from "../../components/styled-component/products/Global";
import useGetter from "../../hooks/useGetter";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../lib/axios/axiosClient";
import productsClass from "../../model/products";
import { sortData, sortMultipleData } from "../../utils/utils";
import { useAppDispatch } from "../redux/hooks";
import { updateProducts, updateProductSelected } from "../redux/productSlice";
import { RootState } from "../redux/store";

const products: NextPage = () => {
  const { data: session, status } = useSession();
  /**Get request with swr */
  const { data, isError, isLoading } = useGetter(
    `/api/user/product/products/?user_id=${session?.user?.id}`
  );
  const { mutate } = useSWRConfig();

  const router = useRouter();
  const { theme } = useTheme();

  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/login");
    },
  });

  /**states */
  const [products, setProducts] = useState<productsClass[]>([]);
  const [singleProduct, setSProduct] = useState<productsClass>({
    ...initialProductData,
  });
  const [dialogResponse, setDialogResponse] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<string[]>([]);
  const [inProps, setIProp] = useState<boolean>(false);
  const [sorted, setSorted] = useState<productsClass[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [informUser, setInformUser] = useState<{
    savealert: boolean;
    updatealert: boolean;
    deletealert: boolean;
    message: string;
  }>({
    savealert: false,
    updatealert: false,
    deletealert: false,
    message: "",
  });

  const selectedProducts = useSelector((state: RootState) => state.product);
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
    let value = event.target.checked;
    if (value === true) {
      // update context state
      dispatch(
        updateProductSelected({
          products: product,
        })
      );
    } else {
      dispatch(
        updateProducts({
          Id: product._id,
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

    /**
     * since sorted is a different arr, changes in the original wont affect it
     * so we need to update the sorted table to reflect the changes in the original
     */
    if (isSearching || openUpdateModal) {
      let fS: productsClass[] = products.filter((key) => key._id === nC._id);
      fS[0] = nC;
      setSorted(fS);
    }
  };

  const handleUpdate = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof productsClass
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
    setSProduct(cli);
  };

  const postNewProduct = async (): Promise<void> => {
    try {
      const { _id, ...newSinglePro } = singleProduct;
      const newProduct = await postRequest(
        `api/user/product/products/?user_id=${session?.user?.id}`,
        newSinglePro
      );
      if (newProduct.data)
        setInformUser({
          ...informUser,
          savealert: true,
          message: `New Product Added`,
        });
      mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const productData = await deleteRequest(`api/products/?product_id=${id}`);
      if (productData.data)
        setInformUser({
          ...informUser,
          deletealert: true,
          message: `product - ${id} - has been permanently deleted`,
        });
      mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateProduct = async (id: string): Promise<void> => {
    const { _id, owner, ...ProUpdate } = singleProduct; // REMOVE ID FIELD
    try {
      const UpdateProduct = await patchRequest(
        `api/products/?product_id=${id}`,
        ProUpdate
      );
      if (UpdateProduct.data)
        setInformUser({
          ...informUser,
          savealert: true,
          message: `Updated Product - ${id}`,
        });
      mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteFromselectedProducts = (id: string) => {
    dispatch(
      updateProducts({
        Id: id,
      })
    );
  };

  const renderSortedProducts = () => {
    return [
      sorted.map((cli, index) => {
        return (
          <Card as={motion.div} layout>
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
                <Typography>{cli.description}</Typography>
              </div>
              <Typography>{cli.rate}</Typography>
              <Typography>{cli.type}</Typography>
              <Typography>{cli.qty}</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <IconButton>
                  <Tooltip title="Select Product">
                    <Receipt style={{ color: "orange" }} />
                  </Tooltip>
                </IconButton>

                <IconButton
                  onClick={() => {
                    handleUpdateModal();
                    updateField(cli);
                  }}
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
    ];
  };

  /**Controlled Renders */
  const renderProducts = () => {
    return isLoading ? (
      <Center>
        <CustomLoader />
      </Center>
    ) : (
      [
        products.map((cli, index) => {
          return (
            <Card as={motion.div} layout>
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
                  <Typography>{cli.description}</Typography>
                </div>
                <Typography>{cli.rate}</Typography>
                <Typography>{cli.type}</Typography>
                <Typography>{cli.qty}</Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                >
                  <IconButton>
                    <Tooltip title="Select Product">
                      <Receipt style={{ color: "orange" }} />
                    </Tooltip>
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      handleUpdateModal();
                      updateField(cli);
                    }}
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

  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const searchbar = inputRef.current;
    searchbar?.addEventListener("focusin", () => setIsSearching(true));
    searchbar?.addEventListener("focusout", () => setIsSearching(false));
    return () => {
      searchbar?.removeEventListener("focusin", () => setIsSearching(true));
      searchbar?.removeEventListener("focusout", () => setIsSearching(false));
    };
  }, []);

  const topIcons: { icon: JSX.Element; tip: string; func?: () => void }[] = [
    {
      icon: (
        <Sort
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Sort Product Data",
    },
    {
      icon: (
        <ImportExportSharp
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Import Excel File",
    },
    {
      icon: (
        <AddCircle
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "New Product",
      func: handleOpenModal,
    },
    {
      icon: (
        <ReceiptLong
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Create Invoice for Products",
      func: handleOpenSFModal,
    },
    {
      icon: (
        <LocalActivity
          sx={{
            color: "#555",
            ":hover": {
              color: theme === "light" ? "#2124b1" : "#FFA500",
            },
          }}
        />
      ),
      tip: "Activity Log",
    },
  ];

  return (
    <Layout>
      <VhContainer>
        <Top>
          <Typography>Products</Typography>
          <div>
            <MuiSearchbar
              ref={inputRef}
              handleSearch={(e: ChangeEvent<HTMLInputElement>) => {
                setSorted(
                  sortMultipleData<productsClass>(
                    products,
                    ["description", "description", "type", "rate"],
                    e.target.value
                  )
                );
              }}
            />
            <span>
              {topIcons.map((key) => {
                return (
                  <Tooltip title={key.tip}>
                    <IconButton aria-label="" onClick={key.func}>
                      {key.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </span>
          </div>
        </Top>
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
              <ProductIcon />
              <Typography> No Products Yet</Typography>
            </div>
          </Center>
        ) : (
          <React.Fragment>
            <FlexContainer>
              <List>
                {sorted.length > 0 ? renderSortedProducts() : renderProducts()}
              </List>
            </FlexContainer>
          </React.Fragment>
        )}
      </VhContainer>
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
            <ControlledInput
              type={"text"}
              value={singleProduct.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "description")
              }
            />
            <ControlledInput
              type={"text"}
              value={singleProduct.rate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "rate")
              }
            />
            <ControlledInput
              type={"text"}
              value={singleProduct.type}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "type")
              }
            />
            <ControlledInput
              type={"number"}
              value={singleProduct.qty}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "qty")
              }
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
            {selectedProducts.product?.map((pr) => {
              return (
                <motion.div
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
                  layout
                  animate
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
                      color={theme === "dark" ? "orange" : "#2124B1"}
                      round="8px"
                      size="40px"
                    />
                    <Typography>{pr.description}</Typography>
                  </div>

                  <Tooltip
                    title="Delete"
                    onClick={() =>
                      deleteFromselectedProducts(pr._id?.toString()!)
                    }
                  >
                    <Clear />
                  </Tooltip>
                </motion.div>
              );
            })}
            <Typography>Note</Typography>
            <Divider />
            <Typography variant="subtitle2" color="#555">
              Invoice will be generated for this products You cannot edit the
              item description and rate You can only change the quantity of the
              items
            </Typography>
            <ButtonComponent
              innerText="Create Invoice"
              btnDisabled={selectedProducts.product.length > 0 ? false : true}
              onClick={() =>
                router.push("http://localhost:3000/invoice/create")
              }
            />
          </div>
        </div>
      </ModalComponent>

      <CustomSnackbar
        openAlert={informUser.savealert}
        closeAlert={() => setInformUser({ ...informUser, savealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />
      <CustomSnackbar
        openAlert={informUser.updatealert}
        closeAlert={() => setInformUser({ ...informUser, updatealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />

      <CustomSnackbar
        openAlert={informUser.deletealert}
        closeAlert={() => setInformUser({ ...informUser, deletealert: false })}
        outputText={informUser.message}
        verticalPosition="bottom"
        horizontalPosition="center"
      />
    </Layout>
  );
};

export default products;
