import React from "react";
import { twoFactorImg, twoFactorPasswordImg } from "./assets/images";
import Payment from "./pages/Subscriptions/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SendEmail from "./pages/SendEmail";
import FAQ from "./pages/FAQ/Index";
import HowItWorks from "./pages/HowItWorks/Index";
import Products from "./pages/Products/Index";
import ContactUs from "./pages/ContactUs/ContactUs";
import Shared from "./pages/Shared";
import PDF from "./pages/pdf";
import Permission from "./pages/Permissions/Permission";
import AddPermission from "./pages/Permissions/AddPermission";
import Invitation from "./pages/invitation";
const CreateProfile = React.lazy(() => import("./pages/CreateProfile"));
const Home = React.lazy(() => import("./pages/Layout/pages/Home"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const Login = React.lazy(() => import("./pages/Login"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const Signup = React.lazy(() => import("./pages/Signup"));
const VerifyCode = React.lazy(() => import("./pages/VerifyCode"));
const Layout = React.lazy(() => import("./pages/Layout"));
const MyBuddies = React.lazy(() => import("./pages/Layout/pages/MyBuddies"));
const Passwords = React.lazy(() => import("./pages/Layout/pages/Passwords"));
const LoanAccountPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/LoanAccountPassword"));
const NonBankerPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/NonBankerPassword"));
const CreditCardPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/CreditCardPassword"));
const MiscPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/MiscPassword"));
const BankAccountPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/BankAccountPassword"));
const CryptoPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/CryptoPassword"));
const MerchantAccountPassword = React.lazy(() => import("./pages/Layout/pages/Passwords/MerchantAccountPassword"));
const Recipes = React.lazy(() => import("./pages/Layout/pages/Passwords/Recipes"));
const Documents = React.lazy(() => import("./pages/Layout/pages/Documents"));
const About = React.lazy(() => import("./pages/Layout/pages/About"));
const Subscriptions = React.lazy(() => import("./pages/Subscriptions"));
const Landing = React.lazy(() => import("./pages/Landing"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./pages/Terms&Conditions"));
const Notifications = React.lazy(() => import("./pages/Notifications"));
const TransactionsPaymentHistory = React.lazy(() =>
  import("./pages/TransactionsPaymentHistory")
);
const Transactions = React.lazy(() => import("./pages/Transactions"));
const EditProfile = React.lazy(() => import("./pages/EditProfile/EditProfile"));
const PasswordTypeForms = React.lazy(() => import("./pages/PasswordTypeForms"));
const PaymentMethod = React.lazy(() => import("./pages/PaymentMethod"));
const Folder = React.lazy(() => import("./pages/Folder"));
const SendFeedback = React.lazy(() => import("./pages/SendFeedback"));
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_TEST_KEY}`);

const routes = [
  {
    path: "/",
    exact: true,
    element: <Landing />
  },
  {
    path: "/welcome",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "addpermission",
    element: <AddPermission />
  },
  {
    path: "/home",
    element: <Layout />,
    routes: [
      {
        index: true,
        element: <Home />,
        isProtected: true,
      },
      {
        path: "my-buddies",
        element: <MyBuddies />,
        isProtected: true,
      },
      {
        path: "passwords",
        element: <Passwords />,
        isProtected: true,
      },
      {
        path: "passwords/loanaccountpassword",
        element: <LoanAccountPassword />,
        isProtected: true,
      },
      {
        path: "passwords/permission",
        element: <Permission />
      },
      {
        path: "passwords/nonbankerpassword",
        element: <NonBankerPassword />,
        isProtected: true,
      },
      {
        path: "passwords/creditcardpassword",
        element: <CreditCardPassword />,
        isProtected: true,
      },
      {
        path: "passwords/miscpassword",
        element: <MiscPassword />,
        isProtected: true,
      },
      {
        path: "passwords/bankaccountpassword",
        element: <BankAccountPassword />,
        isProtected: true,
      },
      {
        path: "passwords/cryptopassword",
        element: <CryptoPassword />,
        isProtected: true,
      },
      {
        path: "passwords/merchantaccount",
        element: <MerchantAccountPassword />,
        isProtected: true,
      },
      {
        path: "passwords/recipes",
        element: <Recipes />,
        isProtected: true,
      },
      {
        path: "about",
        element: <About />,
        isProtected: true,
      },
      {
        path: "documents",
        element: <Documents />,
        isProtected: true,
      },
      {
        path: "shared",
        element: <Shared />,
        isProtected: true,
      },
      {
        path: "documents/folder/:id",
        element: <Folder />,
        isProtected: true,
      },
      {
        path: "documents/file/:id",
        element: <PDF />,
        isProtected: true,
      },
      {
        path: "invitation",
        element: <Invitation />,
        isProtected: true,
      },
      {
        path: "notifications",
        element: <Notifications />,
        isProtected: true,
      },
      {
        path: "transactions/payment-history",
        element: <TransactionsPaymentHistory />,
        isProtected: true,
      },
      {
        path: "transactions",
        element: <Transactions />,
        isProtected: true,
      },
      {
        path: "transactions/addPaymentMethod",
        element: <PaymentMethod />,
        isProtected: true,
      },
      {
        path: "send/feedback",
        element: <SendFeedback />,
        isProtected: true,
      },
      {
        path: "password-type-form",
        element: <PasswordTypeForms />,
        isProtected: true,
      },
      {
        path: "create-profile",
        element: <CreateProfile />,
        isProtected: true,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
        isProtected: true,
      },
    ],
  },
  {
    path: "/2fa",
    element: (
      <VerifyCode
        twofactor={true}
        title="Two-Factor Authentication"
        imageSrc={twoFactorImg}
      />
    ),
  },
  {
    path: "/send-email",
    element: <SendEmail />,
  },
  {
    path: "/verify-forgot-password",
    element: (
      <VerifyCode
        twofactor={false}
        title="Forgot Password"
        imageSrc={twoFactorPasswordImg}
      />
    ),
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-&-conditions",
    element: <TermsConditions />
  },
  {
    path: "/subscriptions",
    routes: [
      {
        index: true,
        element: <Subscriptions />,
      },
      {
        path: "payment",
        element: (
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />
  },
  {
    path: "/products",
    element: <Products />
  },
];


export default routes;