import { DataArray, GifBoxSharp, Person, Receipt } from '@mui/icons-material';
import { ChartData } from 'chart.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import CustomLoader from '../../components/asset/CustomLoader';
import Dashboard from '../../components/Dashboard';
import { Invoice } from '../../components/Data/types';
import Layout from '../../components/Layout';
import { Container } from '../../components/styled-component/Global';
import useGetter from '../../hooks/useGetter';
import clients from '../../model/clients';
import products from '../../model/products';
import { NextPageWithLayout } from './_app';

interface Analytics {
  id: number;
  itemNumber: number;
  quater: string;
  icon: JSX.Element;
  describeData: string;
}

interface salesNo {
  icon: JSX.Element;
  mainText: string;
  btmText: string;
  sales: number;
  percentGD: string;
}

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    data: invoicesFromApi,
    isError
  } = useGetter(`/api/user/invoice/invoices/?user_id=${session?.user?.id}`);

  const { data: productsFromApi } = useGetter(
    `/api/user/product/products/?user_id=${session?.user?.id}`
  );

  const { data: clientsFromApi } = useGetter(
    `/api/user/client/clients/?user_id=${session?.user?.id}`
  );

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [clients, setClients] = useState<clients[]>([]);
  const [salesana, setSalesAna] = useState<salesNo[]>([
    {
      sales: 0,
      mainText: "",
      btmText: "",
      icon: <></>,
      percentGD: "+25%",
    },
  ]);

  const salesAnaData: salesNo[] = [
    {
      sales: invoices.reduce((acc, item) => acc + Number(item.total || 0), 0),
      btmText: "total sales - Invoice",
      mainText: "Invoice Sales",
      icon: <Receipt />,
      percentGD: "+25%",
    },
    {
      sales: products.reduce((acc, item) => acc + Number(item.rate || 0), 0),
      btmText: "total sales - Products",
      mainText: "Product Sales",
      icon: <GifBoxSharp />,
      percentGD: "+25%",
    },
    {
      sales: 0,
      btmText: "total sales - None",
      mainText: "No Sales",
      icon: <DataArray />,
      percentGD: "+25%",
    },
  ];

  const setter = () => {
    if (invoicesFromApi !== undefined) setInvoices(invoicesFromApi);
    if (isError) console.log(isError);
  };

  useEffect(() => {
    setSalesAna(salesAnaData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoicesFromApi, invoices, products, clients]);

  useEffect(() => {
    setter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoicesFromApi]);

  useEffect(() => {
    if (clientsFromApi !== undefined) setClients(clientsFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsFromApi]);

  useEffect(() => {
    if (productsFromApi !== undefined) setProducts(productsFromApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsFromApi]);

  useEffect(() => {
    setBarChartData({
      ...barchartdata,
      labels: invoices.map((dta) =>
        new Date(dta.invoiceDate).toLocaleDateString("default", {
          month: "short",
        })
      ),
      datasets: [
        {
          data: invoices.map((dta) => Number(dta.total)),
          backgroundColor: ["#2124b1", "orange"],
          barThickness: 30,
          order: 0,
          borderRadius: 4,
          borderColor: "none",
          categoryPercentage: 5,
          borderSkipped: "middle",
          type: "bar",
          normalized: true
        },
      ],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices]);

  useEffect(() => {
    setData({
      ...chartdata,
      labels: dataa.map((dta) => dta.quater),
      datasets: [
        {
          label: "Amount-gained",
          data: dataa.map((dta) => dta.itemNumber),
          backgroundColor: ["#2124b1", "#FFA500", "#eee"],
        },
      ],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices, products, clients]);

  const dataa: Analytics[] = [
    {
      id: 1,
      itemNumber: invoices.length,
      quater: "Total Invoice Number",
      describeData: "Total Invoice",
      icon: <Receipt />,
    },
    {
      id: 2,
      itemNumber: products.length,
      quater: "Total Product Number",
      describeData: "Total Product",
      icon: <GifBoxSharp />,
    },
    {
      id: 3,
      itemNumber: clients.length,
      quater: "Total Client Number",
      describeData: "Total Client",
      icon: <Person />,
    },
  ];

  const [chartdata, setData] = useState<
    ChartData<"doughnut", number[], string>
  >({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [""],
      },
    ],
  });

  const [barchartdata, setBarChartData] = useState<
    ChartData<"bar", number[], string>
  >({
    labels: [""],
    datasets: [
      {
        label: "Amount-gained",
        data: [],
        backgroundColor: ["#2124b1", "orange"],
        barThickness: 30,
        borderRadius: 4,
        borderColor: "none",
        categoryPercentage: 5,
      },
    ],
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status]);

  return (
    <>
      {status === "loading" ||
      status === "unauthenticated" ||
      !invoicesFromApi ||
      !products ||
      !clients ? (
        <CustomLoader text="Please wait..." />
      ) : (
        <Container>
          <Dashboard
            chartdata={chartdata}
            dataa={dataa}
            bardata={barchartdata}
            salesdata={salesana}
          />
        </Container>
      )}
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
};
