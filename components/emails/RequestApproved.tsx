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

interface RequestApprovedEmailProps {
  referenceCode: string;
  documentType: string;
}

export const RequestApprovedEmail = ({
  referenceCode,
  documentType,
}: RequestApprovedEmailProps) => (
  <Html>
    <Head />
    <Preview>Your document request has been approved</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Document Request Approved</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            Good day, your request for <strong>{documentType}</strong> (Ref: <code style={code}>{referenceCode}</code>) has been approved.
          </Text>
          <Text style={text}>
            <strong>Approval Date:</strong> {new Date().toLocaleDateString()}
          </Text>
          <Text style={text}>
            Please visit the registrar's office personally to claim your document. Remember to bring a valid ID and provide your reference code.
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

export default RequestApprovedEmail;

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
