import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RequestDeclinedEmailProps {
  referenceCode: string;
  documentType: string;
  remarks: string;
}

export const RequestDeclinedEmail = ({
  referenceCode,
  documentType,
  remarks,
}: RequestDeclinedEmailProps) => (
  <Html>
    <Head />
    <Preview>Your document request has been declined</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Document Request Declined</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            Hello, we regret to inform you that your request for <strong>{documentType}</strong> (Ref: <code style={code}>{referenceCode}</code>) has been declined.
          </Text>
          <Text style={text}>
            <strong>Reason/Remarks:</strong> {remarks}
          </Text>
          <Text style={text}>
            If you have any questions or would like to resubmit with the necessary corrections, please contact the registrar's office.
          </Text>
        </Section>
        <Section style={footer}>
          <Text style={footerText}>
            This is an automated message from the School Registrar Document Management System.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default RequestDeclinedEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: 'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const header = {
  backgroundColor: "#CC0000",
  padding: "32px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
};

const content = {
  padding: "32px",
  border: "1px solid #eeeeee",
};

const text = {
  color: "#111111",
  fontSize: "16px",
  lineHeight: "24px",
};

const code = {
  backgroundColor: "#f4f4f4",
  padding: "2px 4px",
  fontFamily: "monospace",
};

const footer = {
  padding: "32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#999999",
  fontSize: "12px",
};
