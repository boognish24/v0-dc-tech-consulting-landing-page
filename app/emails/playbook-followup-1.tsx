import {
  Body,
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

interface PlaybookFollowup1EmailProps {
  siteUrl?: string
  firstName?: string
  chatUrl?: string
  unsubscribeUrl: string
}

export function PlaybookFollowup1Email({
  siteUrl = process.env.SITE_URL || "https://dctechconsulting.net",
  firstName,
  chatUrl = process.env.CHAT_URL || "mailto:don@dctechconsulting.net",
  unsubscribeUrl,
}: PlaybookFollowup1EmailProps) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi,"

  return (
    <Html>
      <Head />
      <Preview>The #1 reason IT projects go over budget</Preview>

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
            <Heading style={h1}>The #1 Reason IT Projects Go Over Budget</Heading>

            <Text style={bodyText}>{greeting}</Text>

            <Text style={bodyText}>
              The reason for IT and telecom projects exceeding budget is the absence of a
              clear baseline. Accurate asset, cost, and contract data are crucial in
              averting costly surprises.
            </Text>

            <Text style={bodyText}>
              The Playbook's initial steps focus on documenting your current reality.
              I can assist in gathering data that may not be readily available within
              your organization.
            </Text>

            <Text style={bodyText}>
              Interested in a complimentary Data Gathering and Recommendations Report
              tailored for your organization?
            </Text>

            <Text style={bodyText}>
              Simply reply to this email to get started.
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

export default PlaybookFollowup1Email
