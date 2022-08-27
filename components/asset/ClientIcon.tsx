import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Props {
    width?: string | number
    height?: string | number
}

const ClientIcon = ({width, height}: Props) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <svg
      width={!width ? "300" : width }
      height={height ? "300" : height }
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="transparent" d="M0 0h900v600H0z" />
      <path
        d="m612.595 391.501-305.33 105.324c-21.13 1.296-42.029-.994-60.701-10.267-11.902-5.913-22.626-14.839-28.39-26.664-5.757-11.832-5.813-26.771 1.717-37.394l.002-.002a27.756 27.756 0 0 1 2.871-3.448c20.239-20.571 20.924-53.36 1.675-74.841l-.008-.008-.207-.229-.002-.002-.215-.238a871.868 871.868 0 0 0-7.917-8.644c-6.179-6.684-12.372-13.385-17.979-20.437-8.004-10.067-14.741-20.766-18.401-32.958-7.418-24.719-.001-53.166 18.087-71.636 18.088-18.469 45.98-26.535 71.297-21.25h.001c11.243 2.345 21.691 7.017 31.874 12.557 5.091 2.769 10.107 5.751 15.122 8.762l2.062 1.24c4.324 2.601 8.655 5.205 13.022 7.686 20.227 11.489 44.215 20.892 66.977 14.545 19.401-5.412 33.876-21.178 46.304-36.603 1.048-1.3 2.094-2.607 3.14-3.915 11.423-14.275 22.969-28.705 38.961-36.832 8.673-4.403 19.15-6.2 28.764-4.857 9.609 1.343 18.278 5.806 23.484 13.84 6.55 10.104 6.105 22.54 5.514 35.414l-.03.66c-.578 12.533-1.173 25.444 5.22 36.176 3.72 6.243 9.227 10.763 15.232 14.658 3.004 1.947 6.15 3.75 9.271 5.532l.264.15c3.039 1.736 6.049 3.454 8.919 5.291 35.665 22.827 52.106 71.698 37.493 111.444-2.178 5.92-4.924 11.551-8.093 16.946z"
        fill="#fff"
        stroke={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
        strokeWidth="1.833"
      />
      <path
        d="M614.446 325.05 323.429 432.4c-20.252 1.672-40.349-.102-58.448-8.617-11.541-5.431-22.005-13.773-27.771-24.992l377.236-73.741zm0 0c2.926-5.234 5.441-10.685 7.407-16.4 13.211-38.431-3.56-84.987-38.242-106.162-2.792-1.704-5.717-3.293-8.671-4.898l-.255-.138c-3.033-1.647-6.093-3.315-9.019-5.126-5.85-3.62-11.242-7.855-14.95-13.789-6.37-10.195-6.061-22.625-5.762-34.665l.016-.645c.305-12.379.476-24.304-6.004-33.849-5.147-7.586-13.54-11.687-22.779-12.778-9.243-1.092-19.251.843-27.477 5.241-15.175 8.123-25.959 22.201-36.638 36.144-.978 1.277-1.955 2.552-2.935 3.822-11.62 15.064-25.211 30.519-43.757 36.119-21.76 6.568-45.011-1.987-64.671-12.609-4.245-2.293-8.457-4.706-12.662-7.115l-2.006-1.149c-4.877-2.79-9.753-5.55-14.697-8.105-9.889-5.11-20.009-9.38-30.843-11.401-24.395-4.554-50.987 3.752-67.961 21.836-16.975 18.085-23.51 45.524-15.892 69.083 3.758 11.619 10.439 21.748 18.328 31.248 5.526 6.655 11.606 12.96 17.674 19.252a823.307 823.307 0 0 1 7.994 8.367l.001.001.204.216.008.008c18.949 20.264 18.96 51.81-.084 72.006a26.632 26.632 0 0 0-2.679 3.36l-.001.002c-6.996 10.326-6.642 24.64-.883 35.865l377.236-73.741z"
        fill="#fff"
        stroke={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
        strokeWidth="1.914"
      />
      <path
        d="m301.743 179.265 308.235 8.918c19.295 5.967 37.164 15.054 50.691 29.612 8.627 9.285 15.179 20.852 16.335 33.326 1.147 12.476-3.83 25.792-14.096 32.71l-.002.002a26.552 26.552 0 0 1-3.709 2.101c-25.082 11.576-36.785 40.706-26.812 66.452l.005.011.107.273.002.003a830.785 830.785 0 0 0 4.27 10.685c3.264 8.054 6.533 16.122 9.161 24.308 3.752 11.687 6.156 23.501 5.314 35.605-1.71 24.538-17.904 47.41-40.255 57.789-22.35 10.378-49.943 8.178-70.742-5.063-9.239-5.878-16.987-13.567-24.211-21.947-3.612-4.19-7.086-8.544-10.549-12.926l-1.425-1.804c-2.985-3.782-5.976-7.57-9.041-11.26-14.197-17.092-32.482-33.622-55.011-35.635l-.089.996.089-.996c-19.201-1.715-37.483 7.507-53.789 17.093-1.374.808-2.748 1.622-4.123 2.436-15.025 8.902-30.185 17.883-47.184 19.745-9.209 1.005-19.149-.92-27.262-5.351-8.108-4.428-14.318-11.314-16.248-20.204-2.433-11.19 2.14-22.112 7.014-33.421l.257-.595c4.739-10.989 9.64-22.353 7.542-34.134-1.221-6.86-4.628-12.774-8.684-18.286-2.028-2.756-4.233-5.43-6.42-8.075l-.184-.223c-2.13-2.576-4.238-5.125-6.18-7.731-24.124-32.378-22.327-81.518 4.099-112.05 3.928-4.536 8.262-8.626 12.895-12.364z"
        fill="#fff"
        stroke={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
        strokeWidth="2"
      />
      <path
        d="M601.309 92.654H307.257c-11.046 0-20 8.954-20 20v388.939c0 11.045 8.954 20 20 20h294.052c11.046 0 20-8.955 20-20V112.654c0-11.046-8.954-20-20-20z"
        fill={ theme === "dark" && mounted ? "#FFA500" : "#2124b1"}
      />
      <path
        d="M572.713 114.751h-236.86c-11.046 0-20 8.954-20 20v219.963c0 11.045 8.954 20 20 20h236.86c11.046 0 20-8.955 20-20V134.751c0-11.046-8.954-20-20-20zM362.644 435.805h-37.695c-5.743 0-10.398 4.656-10.398 10.399 0 5.743 4.655 10.398 10.398 10.398h37.695c5.743 0 10.398-4.655 10.398-10.398 0-5.743-4.655-10.399-10.398-10.399zm219.669 0H393.84c-5.743 0-10.399 4.656-10.399 10.399 0 5.743 4.656 10.398 10.399 10.398h188.473c5.743 0 10.399-4.655 10.399-10.398 0-5.743-4.656-10.399-10.399-10.399zm.651-38.994H324.3c-5.384 0-9.748 4.365-9.748 9.749a9.748 9.748 0 0 0 9.748 9.748h258.664a9.748 9.748 0 0 0 9.748-9.748c0-5.384-4.364-9.749-9.748-9.749z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M519 297.45v9.275c0 5.12-4.128 9.275-9.214 9.275H399.214c-5.086 0-9.214-4.155-9.214-9.275v-9.424C390 269.235 421.863 251 454.5 251s64.5 18.244 64.5 46.301m-42.373-113.636c12.497 12.888 12.497 33.782 0 46.67-12.496 12.887-32.758 12.887-45.254 0-12.497-12.888-12.497-33.782 0-46.67 12.496-12.887 32.758-12.887 45.254 0z"
        fill={ theme === "dark" && mounted ? "#FFA500" : "#2124b1"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M169.15 98.601h3.385c.818 0 1.477.666 1.477 1.478v3.384c0 .819-.666 1.477-1.477 1.477h-3.385a1.482 1.482 0 0 1-1.477-1.477v-3.384a1.474 1.474 0 0 1 1.477-1.478zm11.735 0h3.384c.812 0 1.478.666 1.478 1.478v3.384c0 .819-.666 1.477-1.478 1.477h-3.384a1.482 1.482 0 0 1-1.477-1.477v-3.384c0-.812.665-1.478 1.477-1.478zm11.741 0h3.385c.811 0 1.477.666 1.477 1.478v3.384c0 .819-.666 1.477-1.477 1.477h-3.385a1.482 1.482 0 0 1-1.477-1.477v-3.384a1.474 1.474 0 0 1 1.477-1.478zm11.736 0h3.385c.811 0 1.477.666 1.477 1.478v3.384c0 .819-.666 1.477-1.477 1.477h-3.385a1.484 1.484 0 0 1-1.484-1.477v-3.384a1.494 1.494 0 0 1 1.484-1.478zm11.735 0h3.384c.819 0 1.484.666 1.484 1.478v3.384c0 .819-.665 1.477-1.484 1.477h-3.384a1.483 1.483 0 0 1-1.478-1.477v-3.384c0-.812.666-1.478 1.478-1.478zm-34.782 12.796h3.384c.812 0 1.478.666 1.478 1.478v3.391c0 .812-.666 1.477-1.478 1.477h-3.384a1.478 1.478 0 0 1-1.477-1.477v-3.384a1.476 1.476 0 0 1 1.477-1.485zm11.735 0h3.385c.811 0 1.477.666 1.477 1.478v3.391c0 .812-.666 1.477-1.477 1.477h-3.385a1.482 1.482 0 0 1-1.477-1.477v-3.384a1.476 1.476 0 0 1 1.477-1.485zm11.736 0h3.384c.818 0 1.484.666 1.484 1.478v3.391c0 .812-.666 1.477-1.484 1.477h-3.384a1.483 1.483 0 0 1-1.478-1.477v-3.384c0-.819.666-1.485 1.478-1.485zm-12.16-26.542h3.385c.811 0 1.477.666 1.477 1.478v3.384c0 .819-.666 1.477-1.477 1.477h-3.385a1.483 1.483 0 0 1-1.477-1.477v-3.384a1.474 1.474 0 0 1 1.477-1.478zm11.736 0h3.385c.811 0 1.477.666 1.477 1.478v3.384c0 .819-.666 1.477-1.477 1.477h-3.385a1.484 1.484 0 0 1-1.484-1.477v-3.384a1.494 1.494 0 0 1 1.484-1.478zm540.9 167.482h-2.832c-.685 0-1.237.557-1.237 1.236v2.833c0 .685.558 1.236 1.237 1.236h2.832a1.24 1.24 0 0 0 1.237-1.236v-2.833a1.234 1.234 0 0 0-1.237-1.236zm-9.822 0h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.833c0 .685.557 1.236 1.236 1.236h2.833a1.24 1.24 0 0 0 1.236-1.236v-2.833a1.24 1.24 0 0 0-1.236-1.236zm-9.827 0h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.833c0 .685.557 1.236 1.236 1.236h2.833a1.24 1.24 0 0 0 1.236-1.236v-2.833a1.233 1.233 0 0 0-1.236-1.236zm-9.82 0h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.833c0 .685.557 1.236 1.236 1.236h2.833c.685 0 1.242-.557 1.242-1.236v-2.833a1.25 1.25 0 0 0-1.242-1.236zm-9.822 0h-2.832c-.685 0-1.243.557-1.243 1.236v2.833c0 .685.558 1.236 1.243 1.236h2.832c.679 0 1.237-.557 1.237-1.236v-2.833c0-.679-.558-1.236-1.237-1.236zm29.112 10.71h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.839a1.24 1.24 0 0 0 1.236 1.236h2.833c.685 0 1.236-.557 1.236-1.236v-2.833a1.234 1.234 0 0 0-1.236-1.242zm-9.824 0h-2.832c-.679 0-1.237.557-1.237 1.236v2.839c0 .679.558 1.236 1.237 1.236h2.832a1.24 1.24 0 0 0 1.237-1.236v-2.833a1.235 1.235 0 0 0-1.237-1.242zm-9.821 0h-2.833c-.684 0-1.242.557-1.242 1.236v2.839c0 .679.558 1.236 1.242 1.236h2.833a1.24 1.24 0 0 0 1.236-1.236v-2.833c0-.685-.557-1.242-1.236-1.242zm10.175-22.214h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.833c0 .685.557 1.236 1.236 1.236h2.833a1.24 1.24 0 0 0 1.236-1.236v-2.833a1.233 1.233 0 0 0-1.236-1.236zm-9.82 0h-2.833a1.24 1.24 0 0 0-1.236 1.236v2.833c0 .685.557 1.236 1.236 1.236h2.833c.685 0 1.242-.557 1.242-1.236v-2.833a1.25 1.25 0 0 0-1.242-1.236zM651.975 90.318v4.364h4.559c1.903 0 3.466 1.497 3.466 3.318s-1.563 3.318-3.466 3.318h-4.559v4.364c0 1.821-1.563 3.318-3.466 3.318-1.902 0-3.466-1.497-3.466-3.318v-4.346h-4.577c-1.903 0-3.466-1.497-3.466-3.318s1.563-3.318 3.466-3.318h4.559v-4.382c0-1.821 1.563-3.318 3.484-3.318 1.903 0 3.466 1.497 3.466 3.318zm-37.489-31.643v6.15h6.541c2.73 0 4.973 2.109 4.973 4.675s-2.243 4.675-4.973 4.675h-6.541v6.15c0 2.566-2.243 4.675-4.972 4.675-2.73 0-4.973-2.109-4.973-4.675V74.2h-6.568c-2.73 0-4.973-2.11-4.973-4.676 0-2.566 2.243-4.675 4.973-4.675h6.541v-6.175c0-2.566 2.243-4.675 5-4.675 2.729 0 4.972 2.109 4.972 4.675z"
        fill={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
      />
      <path
        d="M665 150h-27m41-19h-41m24 38h-24"
        stroke={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
        strokeWidth="4.557"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M202.888 358h.218C204.397 375.834 218 376.108 218 376.108s-15 .286-15 20.892c0-20.606-15-20.892-15-20.892s13.597-.274 14.888-18.108zm488.008-169h.203C692.304 202.261 705 202.465 705 202.465s-14 .212-14 15.535c0-15.323-14-15.535-14-15.535s12.691-.204 13.896-13.465zM264.407 79h.181C265.664 92.26 277 92.465 277 92.465s-12.5.212-12.5 15.535c0-15.323-12.5-15.535-12.5-15.535s11.331-.204 12.407-13.465z"
        fill={ theme === "dark" && mounted ? "#E1E4E5" : "#2124b1"}
      />
      <rect x="244" y="521" width="418" height="14" rx="7" fill="url(#a)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M193.019 239.533c-21.893 0-39.644-17.751-39.644-39.644 0-21.894 17.751-39.645 39.644-39.645 21.894 0 39.645 17.751 39.645 39.645 0 21.893-17.751 39.644-39.645 39.644z"
        fill={ theme === "dark" && mounted ? "#FFA500" : "#2124b1"}
      />
      <path
        d="M206.236 193.881 189.721 210.7l-9.914-10.09"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="a"
          x1="461.913"
          y1="542.849"
          x2="461.898"
          y2="505.765"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#EEE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ClientIcon;
