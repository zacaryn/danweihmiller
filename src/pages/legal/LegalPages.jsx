import SEO from '../../components/shared/SEO';
import {
  AGENT_EMAIL,
  AGENT_EMAIL_HREF,
  AGENT_PHONE,
  AGENT_PHONE_HREF,
  BROKERAGE_NAME,
  CB_AGENT_PROFILE_URL,
  OFFICE_ADDRESS,
  OFFICE_PHONE,
} from '../../config/agent';
import {
  PageRoot,
  PageHeader,
  PageMain,
  PagePanel,
  Prose,
} from '../../components/layout/PageShell';

function LegalPage({ seoTitle, seoDescription, eyebrow, title, children }) {
  return (
    <>
      <SEO pageName={title} title={seoTitle} description={seoDescription} />
      <PageRoot>
        <PageHeader eyebrow={eyebrow} title={title} solid />
        <PageMain>
          <PagePanel $narrow>
            <Prose>{children}</Prose>
          </PagePanel>
        </PageMain>
      </PageRoot>
    </>
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      seoTitle="Privacy Policy | Dan Weihmiller"
      seoDescription="Privacy policy for danweihmiller.com — how Dan Weihmiller collects, uses, and protects your information as a Coldwell Banker affiliated Colorado Springs Realtor."
      eyebrow="Legal"
      title="Privacy Policy"
    >
      <p>
        <strong>Effective date:</strong> {new Date().getFullYear()}. This Privacy Policy describes how
        Dan Weihmiller (&quot;Dan,&quot; &quot;we,&quot; &quot;us&quot;) collects and uses information when you visit
        danweihmiller.com or contact us about real estate services in Colorado.
      </p>
      <h2>Information we collect</h2>
      <p>
        We may collect information you provide directly, such as your name, email address, phone number,
        property interests, and messages submitted through contact forms. We may also collect standard
        technical data (browser type, pages visited, approximate location) through analytics and server logs.
      </p>
      <h2>How we use information</h2>
      <ul>
        <li>Respond to inquiries and provide real estate services</li>
        <li>Send requested information about listings, market updates, or appointments</li>
        <li>Improve website performance, security, and user experience</li>
        <li>Comply with legal and brokerage obligations</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We do not sell your personal information. We may share information with service providers
        (hosting, email, CRM, MLS/IDX partners) as needed to operate this site and serve clients, and when
        required by law. Property search tools may be provided by third-party MLS vendors subject to their
        policies.
      </p>
      <h2>Your choices</h2>
      <p>
        You may request access, correction, or deletion of personal information we maintain, subject to legal
        and contractual retention requirements. To opt out of non-essential communications, contact us using
        the details on the Contact page.
      </p>
      <h2>Contact</h2>
      <p>
        Dan Weihmiller — <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a> ·{' '}
        <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a>
      </p>
    </LegalPage>
  );
}

export function TermsOfUsePage() {
  return (
    <LegalPage
      seoTitle="Terms of Use | Dan Weihmiller"
      seoDescription="Terms of use for danweihmiller.com, the real estate website of Dan Weihmiller, Colorado Springs Realtor with Coldwell Banker."
      eyebrow="Legal"
      title="Terms of Use"
    >
      <p>
        By using danweihmiller.com, you agree to these Terms of Use. If you do not agree, please do not use
        this site.
      </p>
      <h2>Real estate information</h2>
      <p>
        Listing data, photos, prices, and availability are deemed reliable but not guaranteed and may change
        without notice. All information is provided for personal, non-commercial use. No professional
        relationship is created until you enter into a written agreement with a licensed agent.
      </p>
      <h2>No warranty</h2>
      <p>
        This website is provided &quot;as is.&quot; We make reasonable efforts to keep content accurate but do not
        warrant completeness or fitness for a particular purpose.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Dan Weihmiller and affiliated parties are not liable for
        damages arising from use of this site or reliance on its content.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Colorado.</p>
    </LegalPage>
  );
}

export function FairHousingPage() {
  return (
    <LegalPage
      seoTitle="Fair Housing | Dan Weihmiller"
      seoDescription="Fair Housing and Equal Opportunity statement for Dan Weihmiller, Colorado Springs Realtor with Coldwell Banker."
      eyebrow="Legal"
      title="Fair Housing & Equal Opportunity"
    >
      <p>
        Dan Weihmiller is committed to compliance with the Fair Housing Act and all applicable federal,
        state, and local fair housing laws.
      </p>
      <p>
        We do not discriminate on the basis of race, color, religion, sex, disability, familial status,
        national origin, sexual orientation, gender identity, or any other protected class. Equal housing
        opportunity is a fundamental principle of our practice.
      </p>
      <p>
        If you believe you have experienced discrimination in housing, you may contact the U.S. Department of
        Housing and Urban Development (HUD) or the Colorado Civil Rights Division.
      </p>
    </LegalPage>
  );
}

export function AccessibilityPage() {
  return (
    <LegalPage
      seoTitle="Accessibility | Dan Weihmiller"
      seoDescription="Accessibility statement for danweihmiller.com."
      eyebrow="Legal"
      title="Accessibility Statement"
    >
      <p>
        We strive to make danweihmiller.com accessible to visitors with disabilities and aim to conform to
        widely recognized accessibility guidelines where practicable.
      </p>
      <p>
        If you encounter difficulty using this site or need listing information in an alternative format,
        please contact Dan at <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a> or{' '}
        <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a> and we will work with you to
        provide reasonable assistance.
      </p>
    </LegalPage>
  );
}

export function MlsDisclaimerPage() {
  return (
    <LegalPage
      seoTitle="MLS & IDX Disclaimer | Dan Weihmiller"
      seoDescription="MLS and IDX disclaimer for property listings displayed on danweihmiller.com."
      eyebrow="Legal"
      title="MLS & IDX Disclaimer"
    >
      <p>
        Listing information is provided in part by the Pikes Peak REALTOR® Services Corp. (PPAR) / MLS
        Matrix IDX program for consumer personal, non-commercial use. Data is deemed reliable but is not
        guaranteed accurate by the MLS or Dan Weihmiller.
      </p>
      <p>
        IDX information is provided exclusively for consumers&apos; personal, non-commercial use and may not be
        used for any purpose other than to identify prospective properties consumers may be interested in
        purchasing. Display of MLS data is subject to MLS rules and may require registration or agreement
        with the listing broker.
      </p>
      <p>
        Copyright © {new Date().getFullYear()} Pikes Peak REALTOR® Services Corp. All rights reserved.
      </p>
    </LegalPage>
  );
}

export function BrokerageDisclosurePage() {
  return (
    <LegalPage
      seoTitle="Brokerage Disclosure | Dan Weihmiller"
      seoDescription="Brokerage affiliation and consumer disclosure for Dan Weihmiller, Coldwell Banker affiliated agent in Colorado Springs."
      eyebrow="Legal"
      title="Brokerage Disclosure"
    >
      <p>
        Dan Weihmiller is a real estate licensee in the State of Colorado, affiliated with {BROKERAGE_NAME}.
        Dan has been affiliated with Coldwell Banker since 1985. Office: {OFFICE_ADDRESS}. Office phone:{' '}
        {OFFICE_PHONE}. Agent phone: <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a>. Email:{' '}
        <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a>. Official agent profile:{' '}
        <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          coldwellbanker.com
        </a>
        .
      </p>
      <p>
        Coldwell Banker® and the Coldwell Banker logos are registered and unregistered service marks owned
        by Coldwell Banker Real Estate LLC. The Coldwell Banker System fully supports the principles of the
        Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated.
      </p>
      <p>
        This website is owned and operated by Dan Weihmiller for professional real estate services. It is not
        the corporate website of Coldwell Banker Real Estate LLC. For corporate information, visit{' '}
        <a href="https://www.coldwellbanker.com" target="_blank" rel="noopener noreferrer">
          coldwellbanker.com
        </a>
        .
      </p>
      <p>
        Colorado real estate transactions are subject to state licensing law, brokerage agreements, and
        consumer disclosure requirements. A written agency disclosure will be provided as required before
        representation begins.
      </p>
    </LegalPage>
  );
}
