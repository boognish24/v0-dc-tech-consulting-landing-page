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

interface PlaybookFollowup2EmailProps {
  siteUrl?: string
  firstName?: string
  chatUrl?: string
  scheduleUrl?: string
  unsubscribeUrl: string
}

export function PlaybookFollowup2Email({
  siteUrl = process.env.SITE_URL || "https://dctechconsulting.net",
  firstName,
  chatUrl = process.env.CHAT_URL || "mailto:don@dctechconsulting.net",
  scheduleUrl = "https://dctechconsulting.net/#contact",
  unsubscribeUrl,
}: PlaybookFollowup2EmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi,"

  return (
    <Html>
      <Head />
      <Preview>Ready to make your next IT project easier?</Preview>

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
            <Heading style={h1}>Ready to Make Your Next IT Project Easier?</Heading>

            <Text style={bodyText}>{greeting}</Text>

            <Text style={bodyText}>
              Having realized how clarity and control stem from having a complete
              inventory of IT and telecom assets, the next step is simple—gather
              your data for actionable reports.
            </Text>

            <Text style={bodyText}>
              For a clear, accurate, actionable report presentation, let's begin
              gathering your data. I'll handle the heavy lifting to ease your
              decision-making.
            </Text>

            <Section style={buttonSection}>
              <Button style={primaryBtn} href={scheduleUrl}>
                Schedule Your Complimentary Assessment
              </Button>
            </Section>

            <Text style={bodyText}>
              Or simply reply to this email to get started.
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
            <Text style={unsubscribeText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link>
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
  fontSize: "24px",
  fontWeight: 700 as const,
  lineHeight: "30px",
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
  margin: "0 0 8px 0",
}

const unsubscribeText = {
  margin: "0",
}

const unsubscribeLink = {
  color: "#999999",
  fontSize: "12px",
  textDecoration: "underline",
}

export default PlaybookFollowup2Email
