import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BankForm from "../../components/common/Forms/BankForm";
import CreditcardForm from "../../components/common/Forms/CreditcardForm";
import LoanAccountForm from "../../components/common/Forms/LoanAccountForm";
import MerchantAccountForm from "../../components/common/Forms/MerchantAccountForm";
import MiscForm from "../../components/common/Forms/MiscForm";
import PasswordStorageForm from "../../components/common/Forms/PasswordStorageForm";
import Recipe from "../../components/common/Forms/Recipe";

const PasswordTypeForms = () => {
  const location = useLocation();
  return (
    <div>
      {location.search === "?form=6" && <BankForm />}
      {location.search === "?form=3" && <CreditcardForm />}
      {location.search === "?form=1" && <LoanAccountForm />}
      {location.search === "?form=7" && <MerchantAccountForm />}
      {location.search === "?form=5" && <MiscForm />}
      {location.search === "?form=2" && <PasswordStorageForm />}
      {location.search === "?form=4" && <Recipe />}
    </div>
  );
};

export default PasswordTypeForms;
