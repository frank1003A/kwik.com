import {
  AddCircle,
  Check,
  CheckCircle,
  Clear,
  Edit,
  ImportExportSharp,
  LocalActivity,
  MarkChatRead,
  Receipt,
  ReceiptLong,
  Restore,
  ShareSharp,
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
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
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
  Form,
  UserBadge,
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
  patchRequest,
  postRequest,
} from "../../lib/axios/axiosClient";
import productsClass from "../../model/products";
import { sortMultipleData } from "../../utils/utils";
import { useAppDispatch } from "../redux/hooks";
import { createBind, updateProducts, updateProductSelected } from "../redux/productSlice";
import { RootState } from "../redux/store";
import { NextPageWithLayout } from "./_app";
import { NumericFormat } from 'react-number-format';
import CustomIconBtn from "../../components/CustomIconBtn";
import CustomForm from "../../components/asset/CustomForm";
import { NumberFormatValues, OnValueChange } from "react-number-format/types/types";

const Products: NextPageWithLayout = () => {
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
  const [sorted, setSorted] = useState<productsClass[]>([]);
  const [isSortingF, setSortingF] = useState(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
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
    e: ChangeEvent<HTMLInputElement> | string,
    name: keyof productsClass
  ) => {
    const nC: productsClass = { ...singleProduct };

    if (typeof e !== "string") {
      const value = e.target.value;

      if (
        name !== "_id" &&
        name !== "dateCreated" &&
        name !== "qty" &&
        typeof value === "string"
      ) {
        nC[name] = value;
      } else if (name === "qty") nC[name] = Number(value);
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
    } else if (typeof e === "string") {
      const value = e;
      if (
        name !== "_id" &&
        name !== "dateCreated" &&
        name !== "qty" &&
        typeof value === "string"
      ) {
        nC[name] = value;
      } else if (name === "qty") nC[name] = Number(value);
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
    }
  };

  const updateField = (cli: productsClass) => {
    setSProduct(cli);
  };

  const postNewProduct = async (): Promise<void> => {
    setOpenModal(false);
    try {
      const { _id, ...newSinglePro } = singleProduct;
      const newProduct = await postRequest(
        `api/user/product/products/?user_id=${session?.user?.id}`,
        newSinglePro
      );
      if (newProduct.data) {
        setInformUser({
          ...informUser,
          savealert: true,
          message: `New Product Added`,
        });
        mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const productData = await deleteRequest(
        `api/user/product/products/?product_id=${id}`
      );
      if (productData.data) {
        setInformUser({
          ...informUser,
          deletealert: true,
          message: `product - ${id} - has been permanently deleted`,
        });
        mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateProduct = async (id: string): Promise<void> => {
    setopenUpdateModal(false);
    const { _id, owner, ...ProUpdate } = singleProduct; // REMOVE ID FIELD
    try {
      const UpdateProduct = await patchRequest(
        `api/user/product/products/?product_id=${id}`,
        ProUpdate
      );
      if (UpdateProduct.data) {
        setInformUser({
          ...informUser,
          savealert: true,
          message: `Updated Product - ${id}`,
        });
        mutate(`/api/user/product/products/?user_id=${session?.user?.id}`);
      }
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
          <Card as={motion.div} key={cli._id?.toString()}>
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
              <NumericFormat
                thousandSeparator={true}
                displayType="text"
                prefix={"NGN"}
                value={cli.rate}
              />
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
    return [
      products.map((cli, index) => {
        return (
          <Card as={motion.div} key={cli._id?.toString()}>
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
              <Typography
                style={{
                  margin: "0",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  fontWeight: "400",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  letterSpacing: "0.00938em",
                }}
              >
                <NumericFormat
                  thousandSeparator={true}
                  displayType="text"
                  prefix={"NGN"}
                  value={cli.rate}
                />
              </Typography>
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
                <CustomIconBtn
                  handleClick={() => {
                    handleUpdateModal();
                    updateField(cli);
                  }}
                  toolTip="Update"
                  icon={<Edit />}
                  id="topicon"
                />

                <CustomIconBtn
                  handleClick={() =>
                    handleDelete(cli._id ? cli._id.toString() : "")
                  }
                  toolTip="Delete"
                  icon={<Clear />}
                  id="topicon"
                />
              </div>
            </Row>
          </Card>
        );
      }),
    ];
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

  const handleNewOldSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Number(e.target.value) === 1) {
      const sortedProducts = products
        .map((obj) => {
          return { ...obj, dateCreated: new Date(obj.dateCreated!) };
        })
        .sort((a: any, b: any) => b.dateCreated - a.dateCreated);
      setSorted(sortedProducts);
    } else if (Number(e.target.value) === 2) {
      const sortedProducts = products
        .map((obj) => {
          return { ...obj, dateCreated: new Date(obj.dateCreated!) };
        })
        .sort((a: any, b: any) => a.dateCreated - b.dateCreated);
      setSorted(sortedProducts);
    } else {
      setSorted([]);
    }
  };

  const renderFSort: React.ReactNode = [
    <select onChange={handleNewOldSort}>
      <option value={0} key={0}>Sort By</option>
      <option value={1} key={1}>Newest</option>
      <option value={2} key={2}>Oldest</option>
    </select>,
  ];

  const topIcons: { icon: JSX.Element; tip: string; func?: () => void }[] = [
    {
      icon: <Sort />,
      tip: "Sort Product Data",
      func: () => setSortingF(!isSortingF),
    },
    {
      icon: <Restore />,
      tip: "Reset",
      func() {
        setSorted([]);
      },
    },
    {
      icon: <ImportExportSharp />,
      tip: "Import Excel File",
    },
    {
      icon: <AddCircle />,
      tip: "New Product",
      func: handleOpenModal,
    },
    {
      icon: <ReceiptLong />,
      tip: "Create Invoice for Products",
      func: handleOpenSFModal,
    },
    {
      icon: <LocalActivity />,
      tip: "Activity Log",
    },
  ];

  return (
    <>
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
            <motion.div transition={{ type: "spring", bounce: 0.25 }}>
              {isSortingF && renderFSort}
            </motion.div>
            <span id="topicon">
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
        {Array.isArray(data) &&
        data.length < 1 &&
        status === "authenticated" ? (
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
              {router.pathname === '/products' && !data ? (
                <Center>
                  <CustomLoader text="Fetching Products" />
                </Center>
              ) : (
                <List>
                  {sorted.length > 0
                    ? renderSortedProducts()
                    : renderProducts()}
                </List>
              )}
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
            <Form>
              <CustomForm topLabel="Product Description">
                <ControlledInput
                  placeholder="Product Description"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "description")
                  }
                />
              </CustomForm>

              <CustomForm topLabel="Rate of Product" bottomText="Number">
                <ControlledInput
                  as={NumericFormat}
                  thousandSeparator={true}
                  prefix={"#"}
                  displayType="input"
                  placeholder="rate"
                  
                  onValueChange={(value: NumberFormatValues) => handleChange(value.value, "rate")}
                  renderText={(formattedValue: string) => formattedValue}
                />
              </CustomForm>

              <CustomForm topLabel="Category of Product">
                <ControlledInput
                  placeholder="type of product"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "type")
                  }
                />
              </CustomForm>

              <CustomForm topLabel="Quantity of Product available">
                <ControlledInput
                  type="number"
                  placeholder="quantity - (in-stock)"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "qty")
                  }
                />
              </CustomForm>
            </Form>
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
            <Form>
              <CustomForm topLabel="Product Description">
                <ControlledInput
                  type={"text"}
                  value={singleProduct.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "description")
                  }
                />
              </CustomForm>

              <CustomForm topLabel="Rate of Product" bottomText="Number">
                <ControlledInput
                  as={NumericFormat}
                  thousandSeparator={true}
                  prefix={"#"}
                  displayType="input"
                  value={singleProduct.rate}
                  placeholder="rate"
                  onValueChange={(value: NumberFormatValues) => handleChange(value.value, "rate")}
                  renderText={(formattedValue: string) => formattedValue}
                />
              </CustomForm>

              <CustomForm topLabel="Category of Product">
                <ControlledInput
                  type={"text"}
                  value={singleProduct.type}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "type")
                  }
                />
              </CustomForm>

              <CustomForm topLabel="Quantity of Product available">
                <ControlledInput
                  type={"number"}
                  value={singleProduct.qty}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, "qty")
                  }
                />
              </CustomForm>
            </Form>

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
        pd={"1rem"}
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
            <div
              style={{
                height: selectedProducts.product.length > 0 ? "25vh" : "",
                display: "flex",
                gap: ".5rem",
                overflow: "auto",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
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
                    animate
                  >
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
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
    </>
  );
};

export default Products;

Products.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
