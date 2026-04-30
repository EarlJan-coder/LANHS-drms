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

interface RequestReceivedEmailProps {
  referenceCode: string;
  documentType: string;
  processingDays: number;
}

export const RequestReceivedEmail = ({
  referenceCode,
  documentType,
  processingDays,
}: RequestReceivedEmailProps) => (
  <Html>
    <Head />
    <Preview>Your document request has been received</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Document Request Received</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            Hello, your request for <strong>{documentType}</strong> has been successfully submitted.
          </Text>
          <Text style={text}>
            <strong>Reference Code:</strong> <code style={code}>{referenceCode}</code>
          </Text>
          <Text style={text}>
            <strong>Estimated Processing Time:</strong> {processingDays} working days.
          </Text>
          <Text style={text}>
            You can track the status of your request at our tracking page using your reference code.
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

export default RequestReceivedEmail;

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
