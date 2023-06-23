import React from "react";
import { useLocation } from "react-router-dom";
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
      {formType === "3" && <CreditcardForm id={id} isEdit={id && true} />}
      {formType === "1" && <LoanAccountForm id={id} isEdit={id && true} />}
      {formType === "7" && <MerchantAccountForm id={id} isEdit={id && true} />}
      {formType === "5" && <MiscForm id={id} isEdit={id && true} />}
      {formType === "2" && <PasswordStotageForm id={id} isEdit={id && true} />}
      {formType === "4" && <Recipe id={id} isEdit={id && true} />}
    </div>
  );
};

export default PasswordTypeForms;
