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
  Column,
  Row,
} from "@react-email/components"

export function GuideDownloadEmail({
  siteUrl = process.env.SITE_URL || "https://dctechconsulting.net",
  downloadUrl,
  chatUrl = process.env.CHAT_URL || "mailto:don@dctechconsulting.net",
}: { siteUrl?: string; downloadUrl: string; chatUrl?: string }) {
  return (
    <Html>
      <Head />
      <Preview>Your DC Tech 6 Steps Guide is ready</Preview>
      <Body style={body}>
        {/* Header Banner */}
        <Section style={header}>
          <Container style={headerContainer}>
            <Img
              src={`${siteUrl}/images/dc-tech-logo.png`}
              width="600"
              alt="DC Tech Consulting"
              style={logo}
            />
          </Container>
        </Section>

        {/* Main Card */}
        <Container style={card}>
          <Section style={inner}>
            <Heading style={h1}>Your 6 Steps Guide is Ready</Heading>
            <Text style={subhead}>Gain clarity and control over your technology costs.</Text>

            <Section style={imageWrap}>
              <Img
                src={`${siteUrl}/images/titlepage.png`}
                alt="6 Steps Guide Cover"
                width="420"
                height="560"
                style={guideImage}
              />
            </Section>

            <Section style={ctaSection}>
              <Row>
                <Column style={buttonColumn}>
                  <Button style={primaryBtn} href={downloadUrl}>Download the Guide</Button>
                </Column>
                <Column style={buttonColumn}>
                  <Button style={secondaryBtn} href={chatUrl}>Let's Chat</Button>
                </Column>
              </Row>
            </Section>
          </Section>
        </Container>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>Best regards,</Text>
          <Text style={signature}>
            <strong>Don Chester</strong><br />
            DC Tech Consulting • <Link href={chatUrl} style={footerLink}>{chatUrl.replace("mailto:", "")}</Link>
          </Text>
          <Text style={copy}>© {new Date().getFullYear()} DC Technology Consulting, LLC.</Text>
        </Section>
      </Body>
    </Html>
  )
}

/* Styles */
const body = {
  backgroundColor: "#f4f4f4",
  fontFamily: "'Open Sans', Arial, sans-serif",
  margin: "0",
  padding: "20px 0",
}

const header = { backgroundColor: "#ffffff", padding: "0" }
const headerContainer = { maxWidth: "600px", margin: "0 auto", textAlign: "center" as const }
const logo = { display: "block", margin: "0 auto", width: "100%", maxWidth: "600px", height: "auto" }

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  margin: "32px auto",
  maxWidth: "600px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
}

const inner = { maxWidth: "540px", margin: "0 auto", padding: "20px 28px" }
const h1 = { color: "#1A2D44", fontFamily: "Montserrat, Arial, sans-serif", fontSize: "36px", fontWeight: 700, margin: "0 0 6px", lineHeight: "40px", textAlign: "center" as const }
const subhead = { color: "#707070", fontSize: "16px", lineHeight: "22px", margin: "0 0 16px", textAlign: "center" as const }
const imageWrap = { margin: "20px 0", textAlign: "center" as const }
const guideImage = { display: "block", margin: "0 auto", borderRadius: "14px", boxShadow: "0 8px 24px rgba(26,45,68,0.15)" }

const ctaSection = { margin: "24px 0 0", textAlign: "center" as const }
const buttonColumn = { width: "50%", textAlign: "center" as const, padding: "0 6px" }
const primaryBtn = { backgroundColor: "#42C5C9", color: "#ffffff", borderRadius: "8px", padding: "14px 28px", textDecoration: "none", display: "inline-block", fontWeight: 700, fontFamily: "'Open Sans', Arial, sans-serif" }
const secondaryBtn = { backgroundColor: "#1A2D44", color: "#ffffff", borderRadius: "8px", padding: "14px 24px", textDecoration: "none", display: "inline-block", fontWeight: 700, fontFamily: "'Open Sans', Arial, sans-serif" }

const footer = { padding: "28px 20px", backgroundColor: "#f5f5f5", textAlign: "center" as const, maxWidth: "600px", margin: "0 auto" }
const footerText = { color: "#999999", fontSize: "14px", margin: "0 0 8px" }
const signature = { color: "#1A2D44", fontSize: "14px", lineHeight: "20px", margin: "0 0 12px" }
const footerLink = { color: "#42C5C9", textDecoration: "none" }
const copy = { color: "#999999", fontSize: "12px", margin: "0" }

export default GuideDownloadEmail
