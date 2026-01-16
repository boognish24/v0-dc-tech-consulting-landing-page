import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface PlaybookDeliveryEmailProps {
  siteUrl?: string
  downloadUrl: string
  firstName?: string
  chatUrl?: string
}

export function PlaybookDeliveryEmail({
  siteUrl = process.env.SITE_URL || "https://dctechconsulting.net",
  downloadUrl,
  firstName,
  chatUrl = process.env.CHAT_URL || "mailto:don@dctechconsulting.net",
}: PlaybookDeliveryEmailProps) {
  const greeting = firstName ? `${firstName},` : "Hello,"

  return (
    <Html>
      <Head />
      <Preview>Your Information Technology Inventory Playbook</Preview>

      <Body style={body}>
        <Container style={wrapper}>
          {/* Header with logo */}
          <Section style={header}>
            <Img
              src={`${siteUrl}/images/dc-tech-logo.png`}
              width="600"
              alt="DC Tech Consulting"
              style={logo}
            />
          </Section>

          {/* Main content area */}
          <Section style={content}>
            <Heading style={h1}>Your Information Technology Inventory Playbook</Heading>

            <Text style={bodyText}>{greeting}</Text>

            <Text style={bodyText}>
              Here's your copy of the IT Inventory Playbook.
            </Text>

            <Section style={buttonSection}>
              <Button style={primaryBtn} href={downloadUrl}>
                Download the Playbook
              </Button>
            </Section>

            <Text style={bodyText}>
              This playbook contains the 6-step process which will assist you in precisely
              documenting your assets, their locations, costs, and vital contractual details.
            </Text>

            <Text style={bodyText}>
              Establishing this baseline will simplify decision-making, reduce errors and
              overspending, and give you clarity over your technology investments.
            </Text>

            <Text style={bodyText}>
              For assistance in data gathering and summarization, I offer a complimentary
              Data Gathering, Analysis, and Recommendations Report, available upon request.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={signoff}>Best,</Text>
            <Text style={signature}>
              <strong>Don Chester</strong>
              <br />
              DC Tech Consulting •{" "}
              <Link href={chatUrl} style={footerLink}>
                {chatUrl.replace("mailto:", "")}
              </Link>
            </Text>
            <Text style={copy}>
              © {new Date().getFullYear()} DC Technology Consulting, LLC.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/* ============================================
   STYLES - Email-safe, tested patterns
   ============================================ */

const body = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  margin: "0",
  padding: "0",
}

const wrapper = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  width: "600px",
  maxWidth: "600px",
}

const header = {
  backgroundColor: "#1A2D44",
  padding: "0",
  textAlign: "center" as const,
}

const logo = {
  display: "block",
  width: "100%",
  maxWidth: "600px",
  height: "auto",
}

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 40px",
}

const h1 = {
  color: "#1A2D44",
  fontFamily: "Arial, sans-serif",
  fontSize: "26px",
  fontWeight: 700 as const,
  lineHeight: "32px",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
}

const bodyText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px 0",
  textAlign: "left" as const,
}

const buttonSection = {
  textAlign: "center" as const,
  padding: "16px 0 24px 0",
}

const primaryBtn = {
  backgroundColor: "#42C5C9",
  borderRadius: "6px",
  color: "#ffffff",
  display: "inline-block",
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  fontWeight: 600 as const,
  padding: "14px 32px",
  textDecoration: "none",
  textAlign: "center" as const,
}

const footer = {
  backgroundColor: "#ffffff",
  padding: "24px 40px",
  textAlign: "left" as const,
}

const signoff = {
  color: "#333333",
  fontSize: "16px",
  margin: "0 0 4px 0",
}

const signature = {
  color: "#1A2D44",
  fontSize: "16px",
  lineHeight: "22px",
  margin: "0 0 16px 0",
}

const footerLink = {
  color: "#42C5C9",
  textDecoration: "none",
}

const copy = {
  color: "#999999",
  fontSize: "12px",
  margin: "0",
}

export default PlaybookDeliveryEmail
