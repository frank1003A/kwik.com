import {
  AddBox,
  Email,
  EmailOutlined,
  Facebook,
  FormatQuote,
  GiteSharp,
  GitHub,
  Instagram,
  LinkedIn,
  ListAlt,
  Person,
} from "@mui/icons-material";
import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import { resolveHref } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Anchor from "../../components/Anchor";
import CustomLoader from "../../components/asset/CustomLoader";
import ButtonComponent from "../../components/Button";
import useLocalStorage from "../../hooks/localStorage";
import useCurrentUser from "../../hooks/useCurrentUser";
import styles from "../../styles/LandingPage.module.css";
import leftSvg from  "../../public/leftsvg.png"

interface Props {
  icon: JSX.Element;
  className: string;
}

interface Nav {
  href: string;
  icon: JSX.Element;
  linkName: string;
}

const MuiIcons = ({ icon, className }: Props) => {
  return <span className={className}>{icon}</span>;
};

const scrollToTopBtn = () => {
  return <ButtonComponent />;
};

/**
 * This page is only visible to new users 
*/
const Landingpage = () => {
  const router = useRouter();
  const parent = useRef(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [scrolly, setScrollY] = useState<number>(0);

  const { status } = useCurrentUser();

  const [newUser, setNewUser] = useLocalStorage<{ newUser: boolean }>(
    "Kwik.com",
    {
      newUser: false,
    }
  );

  const getNewUser = useCallback(() => {
    const item = window.localStorage.getItem("Kwik.com");
    if (item === null) {
      setNewUser({ ...newUser, newUser: true });
    } else if (newUser && newUser.newUser === false) {
      return;
    } else if (newUser && newUser.newUser === true) {
      setNewUser({ ...newUser, newUser: false });
    }
  }, [newUser.newUser]);

  useEffect(() => {
    getNewUser();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** */
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    } else if (status === "unauthenticated" && newUser.newUser === false) {
      router.replace("/auth/login");
    } else if (
      status === "unauthenticated" &&
      newUser &&
      newUser.newUser === true
    ) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, newUser.newUser]);

  const sentence: Variants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
       // delay: 0.5,
        staggerChildren: 0.08,
        ease: [0.075, 0.82, 0.165, 1],
      },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const line1 = "General Purpose";
  const line2 = "Invoice and Receipt Generator";

  const navLinks: Nav[] = [
    { href: "#how-it-works", icon: <ListAlt />, linkName: "Features" },
    { href: "#testimonials", icon: <ListAlt />, linkName: "Testimonials" },
    { href: "#extras", icon: <ListAlt />, linkName: "Extras" },
    { href: "#implementation", icon: <ListAlt />, linkName: "Implementation" },
    { href: "#about", icon: <ListAlt />, linkName: "About" },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(scrollY);
    });
  }, []);

  return (
    <motion.div
      className={styles.main}
      style={{ background: status === "loading" ? "#eee" : "inherit" }}
      ref={parent}
    >
      {status === "loading" ||
      status === "authenticated" ||
      newUser.newUser === false ||
      (status === "unauthenticated" && !mounted) ? (
        <CustomLoader text="Please wait" />
      ) : (
        <>
          <Head>
            <title>Kwik.com | Invoice Creator</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/kwikifavicon.ico" />
          </Head>

          <motion.header
            className={styles.header}
            animate={{
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 2,
              easings: [0.075, 0.82, 0.165, 1],
            }}
          >
            <div style={{ display: "flex" }}>
              <div className={styles["menu-toggler"]}>
                <Anchor
                  open={modal}
                  navlinks={navLinks}
                  anchor="left"
                  bottomElement={
                    <>
                      <div className={styles["footer-logo"]}>
                        <h2 className={styles["h2"]}>
                          <span
                            className={styles["text-color-primary-gradient"]}
                          >
                            KWIK.COM
                          </span>
                        </h2>
                      </div>
                      <p className={styles["p"]}>
                        Efficiency and simplicity at its' finest.
                      </p>
                    </>
                  }
                />
              </div>
              <div className={styles.logo}>
                <h2 className={styles["h2"]}>
                  <span className={styles["text-color-primary-gradient"]}>
                    KWIK.COM
                  </span>
                </h2>
              </div>
            </div>

            <div className={styles["nav-menu-wrapper"]}>
              <Link href={"#how-it-works"}>
                <a
                  className={
                    router.pathname === "/#how-it-works"
                      ? styles["nav-link-active"]
                      : styles["nav-link"]
                  }
                >
                  Features
                </a>
              </Link>
              <Link href={"#testimonials"}>
                <a className={styles["nav-link"]}>Testimonials</a>
              </Link>
              <Link href={"#extras"}>
                <a className={styles["nav-link"]}>Extras</a>
              </Link>
              <Link href={"#implementation"}>
                <a className={styles["nav-link"]}>Implementation</a>
              </Link>

              <Link href={"#about"}>
                <a className={styles["nav-link"]}>About</a>
              </Link>

              <div className={styles["nav-menu-cta"]}>
                <ButtonComponent
                  className={styles["lpbtn"]}
                  innerText="Sign up"
                  onClick={() => router.push("/auth/register")}
                />
              </div>
            </div>
          </motion.header>

          <section className={styles["hero-header"]} id="about">
            <div className={styles["container"]}>
              <div className={styles["grid"]}>
                <motion.div
                  id={styles["left"]}
                  initial={{ x: 0 }}
                  whileInView={{
                    x: 30,
                    transition: {
                      type: "keyframes",
                      delay: 0.1,
                      duration: 2,
                      ease: [0.075, 0.82, 0.165, 1],
                    },
                  }}
                >
                  <div className={styles["subtitle"]}>Welcome to Kwik.com</div>
                  <motion.div
                    className={styles["display-heading-1"]}
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                  >
                    {line1.split("").map((char, index) => {
                      return (
                        <motion.span key={char + "_" + index} variants={letter}>
                          {char}
                        </motion.span>
                      );
                    })}
                    <span className={styles["text-color-primary-gradient"]}>
                      <br />
                      {line2.split("").map((char, index) => {
                        return (
                          <motion.span
                            key={char + "_" + index}
                            variants={letter}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  </motion.div>
                  <p className={styles["fulltext"]}>
                    Kwik at this point is a small portfolio project, but don't
                    let that fool you, kwik is ready to rumble in its' own
                    domain. You can generate PDF and printable documents,
                    designed to suite industry standards and easily
                    customizable.
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <ButtonComponent
                      className={styles["lpbtn"]}
                      innerText="Get Started"
                    />
                    <ButtonComponent
                      className={styles["lpbtn"]}
                      innerText="Documentation"
                      onClick={() => alert("Not Ready")}
                    />
                  </div>

                  <p className={styles["small-paragraph"]}>
                    No credit card needed. Cancel anytime.
                  </p>
                </motion.div>
                <AnimatePresence>
                  <motion.img
                    initial={{ y: 0 }}
                    loading="eager"
                    whileInView={{
                      y: 30,
                      transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8,
                      },
                    }}
                    src={leftSvg.src}
                    width={650}
                  />
                </AnimatePresence>
              </div>
            </div>
          </section>

          <div className={styles["how-it-works-section"]} id="how-it-works">
            <div className={styles["container"]}>
              <div className={styles["how-it-works-container"]}>
                <motion.div
                  id={styles["left"]}
                  className={styles["how-it-works-left"]}
                  initial={{ x: 0 }}
                  whileInView={{
                    x: 30,
                    transition: {
                      type: "spring",
                      bounce: 0.4,
                      duration: 0.8,
                    },
                  }}
                >
                  <div className={styles["subtitle"]}>Feature</div>
                  <h2 className={styles["h2"]}>
                    Kwik has a lot of features,{" "}
                    <span className={styles["text-color-primary-gradient"]}>
                      cool features
                    </span>
                    .
                  </h2>
                  <p className={styles["p"]}>
                    On the right is a list of the small amount of features that
                    kwik curently-not limited to-has.
                  </p>
                  <ButtonComponent
                    className={styles["lpbtn"]}
                    innerText="Get Started"
                  />
                </motion.div>
                <div id={styles["left"]} className="how-it-works-right">
                  <motion.div
                    id={styles["left"]}
                    className={styles["feature-item-box"]}
                    initial={{
                      y: "50%",
                      opacity: 0,
                    }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        ease: [0.455, 0.03, 0.515, 0.955],
                        duration: 0.75,
                      },
                    }}
                  >
                    <MuiIcons icon={<Email />} className="feature-item-icon" />
                    <h4 className={styles["h4"]}>Invoice Redistribution</h4>
                    <p className={styles["p"]}>
                      Kwik Invoices are saved to the cloud, hence they are
                      always ready for resends in any format or styling that you
                      choose.
                    </p>
                  </motion.div>
                  <motion.div
                    id={styles["left"]}
                    className={styles["feature-item-box"]}
                    initial={{
                      y: "50%",
                      opacity: 0,
                    }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        ease: [0.455, 0.03, 0.515, 0.955],
                        duration: 0.75,
                      },
                    }}
                  >
                    <MuiIcons icon={<Person />} className="feature-item-icon" />
                    <h4 className={styles["h4"]}>Client Management</h4>
                    <p className={styles["p"]}>
                      As a minimal addition to just creating and storing
                      invoices. Reoccuring client informations can be saved and
                      referenced, for new invoices.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{
                      y: "50%",
                      opacity: 0,
                    }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        ease: [0.455, 0.03, 0.515, 0.955],
                        duration: 0.75,
                      },
                    }}
                    id={
                      styles[
                        "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                      ]
                    }
                    className={styles["feature-item-box"]}
                  >
                    <MuiIcons icon={<AddBox />} className="feature-item-icon" />
                    <h4 className={styles["h4"]}>Product Mangament</h4>
                    <p className={styles["p"]}>
                      Products can also be saved and targeted for new invoice
                      generation. You can select more than one products and
                      generate an invoice or invoices.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["_2-testimonials-section"]} id="testimonials">
            <div className={styles["container"]}>
              <div className={styles["_2-testimonials-container"]}>
                <h2 className={styles["h2"]}>
                  Our customers love{" "}
                  <span className={styles["text-color-primary-gradient"]}>
                    Kwik.Com
                  </span>
                </h2>
                <motion.div
                  initial={{ x: -500 }}
                  whileInView={{
                    x: 5,
                    transition: {
                      type: "keyframes",
                      duration: 0.8,
                    },
                  }}
                  className={styles["_2-testimonials-grid"]}
                >
                  <motion.div
                    id={
                      styles[
                        "w-node-_6f1656bb-aceb-390a-ac27-0acfcfeb62d5-9a7fc9e8"
                      ]
                    }
                    className={styles["_2-testimonials-item"]}
                  >
                    <MuiIcons
                      className={styles["feature-item-icon"]}
                      icon={<FormatQuote />}
                    />
                    <div className={styles["_2-testimonials-quote"]}>
                      "Kwik is very powerful, but one of its biggest selling
                      point is the simplicity and ligthness. You are simply
                      creating invoices like you would, with paper, just much
                      faster."
                    </div>
                    <div className={styles["_2-testimonials-person"]}>
                      <MuiIcons
                        className={styles["feature-item-icon"]}
                        icon={<FormatQuote />}
                      />
                      <div
                        id="w-node-bb8ee3cd-98a1-6845-1f3c-a6717bf8a249-9a7fc9e8"
                        className={styles["_2-testimonials-person-details"]}
                      >
                        <div className={styles["_2-testimonials-person-name"]}>
                          Vanessa Lee
                        </div>
                        <div
                          className={styles["_2-testimonials-person-company"]}
                        >
                          Human Resources
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: -1000 }}
                    whileInView={{
                      x: 10,
                      transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8,
                      },
                    }}
                    id={
                      styles[
                        "w-node-_6f1656bb-aceb-390a-ac27-0acfcfeb62d5-9a7fc9e8"
                      ]
                    }
                    className={styles["_2-testimonials-item"]}
                  >
                    <MuiIcons
                      className={styles["feature-item-icon"]}
                      icon={<FormatQuote />}
                    />
                    <div className={styles["_2-testimonials-quote"]}>
                      "What's even more powerful about kwik is that, it is easy
                      to use, so you save resources because employees pick it up
                      really fast."
                    </div>
                    <div className={styles["_2-testimonials-person"]}>
                      <MuiIcons
                        className={styles["feature-item-icon"]}
                        icon={<FormatQuote />}
                      />
                      <div
                        id={
                          styles[
                            "w-node-_6f1656bb-aceb-390a-ac27-0acfcfeb62d5-9a7fc9e8"
                          ]
                        }
                        className={styles["_2-testimonials-person-details"]}
                      >
                        <div className={styles["_2-testimonials-person-name"]}>
                          Fred Micah
                        </div>
                        <div
                          className={styles["_2-testimonials-person-company"]}
                        >
                          Human Resources
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          <section className={styles["_3-grid-feature-section"]} id="extras">
            <div className={styles["container"]}>
              <div className={styles["_3-grid-feature-container"]}>
                <h2 className={styles["h2"]}>
                  Why do customers use{" "}
                  <span className={styles["text-color-primary-gradient"]}>
                    Kwik.Com?
                  </span>
                </h2>
              </div>
              <motion.div
                className={styles["_3-grid-feature-grid"]}
                initial={{
                  y: "200%",
                  opacity: 0,
                }}
                transition={{
                  ease: [0.455, 0.03, 0.515, 0.955],
                  duration: 0.85,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    ease: [0.455, 0.03, 0.515, 0.955],
                    duration: 0.63,
                  },
                }}
              >
                <div
                  id={
                    styles[
                      "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                    ]
                  }
                  className={styles["feature-item-box"]}
                >
                  <img
                    src=""
                    loading="lazy"
                    alt=""
                    className="feature-item-icon"
                  />
                  <h4 className={styles["h4"]}>Effieciency</h4>
                  <p className={styles["p"]}>
                    Kwik has been optimized to be fast in delivery due to its'
                    defined data model.
                  </p>
                </div>
                <div
                  id={
                    styles[
                      "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                    ]
                  }
                  className={styles["feature-item-box"]}
                >
                  <img
                    src=""
                    loading="lazy"
                    alt=""
                    className="feature-item-icon"
                  />
                  <h4 className={styles["h4"]}>User Friendly</h4>
                  <p className={styles["p"]}>
                    Kwik has a very intuitive and user friendly interface, which
                    means less resource spent learning. Simply start using.
                  </p>
                </div>
                <div
                  id={
                    styles[
                      "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                    ]
                  }
                  className={styles["feature-item-box"]}
                >
                  <img
                    src=""
                    loading="lazy"
                    alt=""
                    className="feature-item-icon"
                  />
                  <h4 className={styles["h4"]}>Minimal</h4>
                  <p className={styles["p"]}>
                    If you are looking for a compact invoice generator, Kwik is
                    the right choice for you and your buisness.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <div className={styles["big-ui-feature-section"]} id="implementation">
            <div className={styles["container"]}>
              <div className={styles["big-ui-feature-container"]}>
                <div className={styles["title-section"]}>
                  <div className={styles["subtitle"]}>Implemetation</div>
                  <h2 className={styles["h2"]}>
                    Kwik is a React Nextjs and{" "}
                    <span className={styles["text-color-primary-gradient"]}>
                      Typescript web Implementation
                    </span>
                    .
                  </h2>
                </div>
                <div className={styles["big-ui-feature-main"]}>
                  <motion.img
                    src="/hss.png"
                    width={750}
                    initial={{ x: 0 }}
                    whileInView={{
                      x: 30,
                      transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8,
                      },
                    }}
                  />
                  <div
                    id={
                      styles[
                        "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                      ]
                    }
                    className={styles["big-ui-feature-side"]}
                  >
                    <motion.div
                      initial={{
                        y: "200%",
                        opacity: 0,
                      }}
                      transition={{
                        ease: [0.455, 0.03, 0.515, 0.955],
                        duration: 0.85,
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          ease: [0.455, 0.03, 0.515, 0.955],
                          duration: 0.63,
                        },
                      }}
                      id={
                        styles[
                          "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                        ]
                      }
                      className={styles["big-feature-side-item"]}
                    >
                      <img
                        src="https://assets.website-files.com/62c067dd72561e44087fc9ea/62c4c82e0cfd8db3cd599f25_big-feature-icon.svg"
                        loading="lazy"
                        alt=""
                        className={styles["big-feature-side-item-icon"]}
                      />
                      <h4 className={styles["h4"]}>Frontend</h4>
                      <p className={styles["p"]}>
                        Kwik uses the MERN frontend stack
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{
                        y: "200%",
                        opacity: 0,
                      }}
                      transition={{
                        ease: [0.455, 0.03, 0.515, 0.955],
                        duration: 0.85,
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          ease: [0.455, 0.03, 0.515, 0.955],
                          duration: 0.63,
                        },
                      }}
                      id={
                        styles[
                          "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                        ]
                      }
                      className={styles["big-feature-side-item"]}
                    >
                      <img
                        src="https://assets.website-files.com/62c067dd72561e44087fc9ea/62c4c82e0cfd8db3cd599f25_big-feature-icon.svg"
                        loading="lazy"
                        alt=""
                        className={styles["big-feature-side-item-icon"]}
                      />
                      <h4 className={styles["h4"]}>Backend</h4>
                      <p className={styles["p"]}>
                        Kwik uses MongoDB NoSQL database to house its' data.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["footer-top"]}>
            <div className={styles["container"]}>
              <div className={styles["footer-top-wrapper"]}>
                <motion.div
                  className={styles["footer-top-left"]}
                  initial={{ x: 0 }}
                  whileInView={{
                    x: 30,
                    transition: {
                      type: "spring",
                      bounce: 0.4,
                      duration: 0.8,
                    },
                  }}
                >
                  <div className={styles["footer-logo"]}>
                    <h2 className={styles["h2"]}>
                      <span className={styles["text-color-primary-gradient"]}>
                        KWIK.COM
                      </span>
                    </h2>
                  </div>
                  <p className={styles["p"]}>
                    Efficiency and simplicity at its' finest.
                  </p>
                  <div className={styles["footer-social-links"]}>
                    <Link href="#">
                      <a
                        className={
                          styles["footer-social-link-button w-inline-block"]
                        }
                      >
                        <Facebook />
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className={
                          styles["footer-social-link-button w-inline-block"]
                        }
                      >
                        <Instagram />
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className={
                          styles["footer-social-link-button w-inline-block"]
                        }
                      >
                        <EmailOutlined />
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        href="#"
                        className={
                          styles["footer-social-link-button w-inline-block"]
                        }
                      >
                        <EmailOutlined />
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        className={
                          styles["footer-social-link-button w-inline-block"]
                        }
                      >
                        <GiteSharp />
                      </a>
                    </Link>
                  </div>
                </motion.div>
                <div className={styles["footer-top-links"]}>
                  <div
                    id={
                      styles[
                        "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                      ]
                    }
                    className={styles["footer-top-links-column"]}
                  >
                    <div className={styles["footer-top-links-title"]}>
                      Hilights
                    </div>
                    <Link href="#">
                      <a
                        id={
                          styles[
                            "w-node-_61cf71b8-e0d5-34a3-4c17-9ecad9f647a5-9a7fc9e8"
                          ]
                        }
                        aria-current="page"
                        className={styles["footer-top-link w--current"]}
                      >
                        Home
                      </a>
                    </Link>
                    <Link href="/features">
                      <a className={styles["footer-top-link"]}>Features</a>
                    </Link>
                    <Link href="/pricing">
                      <a className={styles["footer-top-link"]}>Comments</a>
                    </Link>
                    <Link href="/about">
                      <a className={styles["footer-top-link"]}>
                        Customer Satisafction
                      </a>
                    </Link>
                    <Link href="/blog">
                      <a className={styles["footer-top-link"]}>Blog</a>
                    </Link>
                  </div>

                  <div
                    id="w-node-e7ba1ad8-82c9-04e4-ca70-e1670d3cc182-19f04aa8"
                    className={styles["footer-top-links-column"]}
                  >
                    <div className={styles["footer-top-links-title"]}>
                      Extra
                    </div>
                    <Link href="/styleguide">
                      <a className={styles["footer-top-link"]}>Style Guide</a>
                    </Link>
                    <Link href="/licenses">
                      <a className={styles["footer-top-link"]}>Licenses</a>
                    </Link>
                    <Link href="/changelog">
                      <a className={styles["footer-top-link"]}>Changelog</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["footer-bottom"]}>
            <div className={styles["container"]}>
              <div className={styles["footer-bottom-container"]}>
                <div style={{ display: "flex", width: "fit-content" }}>
                  © Designed by
                  <div className={styles["textandicon"]}>
                    <GitHub />
                    <Link href="https://github.com/frank1003A">
                      <a target="_blank" rel="noreferrer" className="text-link">
                        Ezene Frank
                      </a>
                    </Link>
                  </div>
                </div>
                <div className={styles["textandicon"]}>
                  <LinkedIn />
                  <Link href="https://www.linkedin.com/in/frank-ezene-454679171/">
                    <a target="_blank" rel="noreferrer" className="text-link">
                      Protek
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Landingpage;

/****
 import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from '~/store'
import {  } from '../'

describe('< />', () => {
  const defaultProps = {}
  const wrapper = renderer.create(
    <Provider store={store}>
     < {...defaultProps} />
    </Provider>,
  )

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
 */
