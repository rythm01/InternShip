import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BankForm from "../../components/common/Forms/BankForm";
import CreditcardForm from "../../components/common/Forms/CreditcardForm";
import LoanAccountForm from "../../components/common/Forms/LoanAccountForm";
import MerchantAccountForm from "../../components/common/Forms/MerchantAccountForm";
import MiscForm from "../../components/common/Forms/MiscForm";
import PasswordStotageForm from "../../components/common/Forms/PasswordStotageForm";
import Recipe from "../../components/common/Forms/Recipe";

const PasswordTypeForms = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const formType = searchParams.get("form");
  return (
    <div>
      {formType === "6" && <BankForm id={id} isEdit={id && true} />}
      {formType === "3" && <CreditcardForm />}
      {formType === "1" && <LoanAccountForm />}
      {formType === "7" && <MerchantAccountForm />}
      {formType === "5" && <MiscForm />}
      {formType === "2" && <PasswordStotageForm />}
      {formType === "4" && <Recipe />}
    </div>
  );
};

export default PasswordTypeForms;
