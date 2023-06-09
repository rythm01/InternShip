import React from "react";
import {
  Back,
  Container,
  Page,
  Row,
  Title,
  Paragraph,
} from "../../components/common";

const Index = () => {
  return (
    <Page justifyContent="flex-start">
      <Container margin="69px" justifyContent="flex-start">
        <Title fontWeight="700" margin="46px auto 0">
          How it Works
        </Title>
        <ol className="main_div">
          <li>
            <Paragraph
              textAlign="start"
              color="#000"
              width="100%"
              display="block"
              margin="0 0 16px 0"
            >
              Store and Share Vault is designed to allow a Prime Account Holder
              to create a storage account and share the contents of the account
              with up to (4) Buddies.{" "}
            </Paragraph>
          </li>
          <li>
            <Paragraph
              textAlign="start"
              color="#000"
              width="100%"
              display="block"
              margin="0 0 16px 0"
            >
              The Prime Account Holder will determine what information each
              individual Buddy will have access to. The Prime Account Holder has
              the ability to grant immediate access or time released access of
              this information to their Buddies.
            </Paragraph>
          </li>
          <li>
            <Paragraph
              textAlign="start"
              color="#000"
              width="100%"
              display="block"
              margin="0 0 16px 0"
            >
              Store and Share Vault helps to protect your family and loved ones
              from additional challenges by providing them access to all of your
              personal confidential accounts, information and documents you
              choose to upload utilizing the Store and Share Vault. We provide
              automated forms in the App that will assist you in documenting,
              saving, and managing login information for bank accounts, merchant
              accounts, loans, credit cards, and more.
            </Paragraph>
          </li>
          {/* <li>
            <Paragraph textAlign='start' color="#000" width='100%' display="block" margin="0 0 16px 0">
              The Primary Account Holder will now create custom folders to store specific file and document types for easy management
            </Paragraph>
          </li>
          <li>

            <Paragraph textAlign='start' color="#000" width='100%' display="block" margin="0 0 16px 0">
              Once Buddies accept invitation, the Prime Account Holder can then choose specific files, documents and information to be shared with a specific buddy or all buddies.
            </Paragraph>
          </li>
          <li>


            <Paragraph textAlign='start' color="#000" width='100%' display="block" margin="0 0 16px 0">
              All that’s left to do is manage your files, documents, information and buddies and keep an eye on your time interval for account release.
            </Paragraph>
          </li>
          <li>
            <Paragraph textAlign='start' color="#000" width='100%' display="block" margin="0 0 16px 0">
              Enjoy Store and Share Vault.
            </Paragraph>
          </li> */}
        </ol>
        <Back />
      </Container>
    </Page>
  );
};

export default Index;
