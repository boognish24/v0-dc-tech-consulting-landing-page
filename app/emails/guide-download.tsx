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

export function GuideDownloadEmail({
  siteUrl = process.env.SITE_URL || "https://dctechconsulting.net",
  downloadUrl,
  chatUrl = process.env.CHAT_URL || "mailto:don@dctechconsulting.net",
}: { siteUrl?: string; downloadUrl: string; chatUrl?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your Information Technology Inventory Playbook</Preview>

      <Body style={body}>
        {/* Wrapper container for consistent 600px width */}
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

            <Text style={bodyText}>Here's your copy of the IT Inventory Playbook.</Text>

            <Section style={imageSection}>
              <Img
                src={`${siteUrl}/images/titlepage.png`}
                alt="IT Inventory Playbook Cover"
                width="320"
                style={guideImage}
              />
            </Section>

            <Section style={buttonSection}>
              <Button style={primaryBtn} href={downloadUrl}>
                Download the Playbook
              </Button>
            </Section>

            <Text style={bodyText}>
              This playbook contains a 6-step process to help you precisely document your assets, their locations, costs, and vital contractual details. Establishing this baseline will simplify decision-making, reduce errors, and prevent overspending.
            </Text>

            <Text style={bodyText}>
              For assistance with data gathering and summarization, I offer a complimentary Data Gathering, Analysis, and Recommendations Report, available upon request.
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

// Body background - white to blend seamlessly with content
const body = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  margin: "0",
  padding: "0",
}

// Master wrapper - everything inside this is 600px
const wrapper = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  width: "600px",
  maxWidth: "600px",
}

// Header section
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

// Main content
const content = {
  backgroundColor: "#ffffff",
  padding: "32px 40px",
  textAlign: "center" as const,
}

const h1 = {
  color: "#1A2D44",
  fontFamily: "Arial, sans-serif",
  fontSize: "26px",
  fontWeight: 700 as const,
  lineHeight: "32px",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
}

const bodyText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px 0",
  textAlign: "left" as const,
}

// Guide image
const imageSection = {
  textAlign: "center" as const,
  padding: "0 0 24px 0",
}

const guideImage = {
  display: "block",
  margin: "0 auto",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
}

// Buttons - stacked for reliability
const buttonSection = {
  textAlign: "center" as const,
  padding: "8px 0",
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

// Footer
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

export default GuideDownloadEmail
