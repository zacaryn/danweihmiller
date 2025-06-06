import React from 'react';
import ArticleLayout from '../../components/ArticleLayout';
import {
  Section,
  SectionTitle,
  Paragraph,
  List,
  ListItem,
  ItemTitle,
  ItemDescription,
  Highlight,
  HighlightText,
  ButtonContainer,
  CTAButton
} from '../../components/articles/ArticleComponents';

const ListingAgentPage = () => {
  return (
    <ArticleLayout
      title="Why Work with a Listing Agent in Colorado Springs?"
      description="Learn how a professional listing agent can maximize your home's value and streamline the selling process in Colorado Springs' competitive market."
      keywords="listing agent Colorado Springs, sell your home, real estate agent, home selling process, property marketing, home valuation, listing price strategy, real estate negotiation, home staging, Colorado Springs real estate market"
    >
      <Section>
        <Paragraph>
          When selling your home in Colorado Springs, choosing the right listing agent makes all the difference. With over 35 years of helping people sell their homes in this market, I bring the kind of practical experience and local knowledge that you can't get from a textbook or an app.
        </Paragraph>

        <Highlight>
          <HighlightText>
            I've seen every kind of market cycle in Colorado Springs, and I know what works. My approach is straightforward - I combine old-school real estate knowledge with modern marketing tools to get your home sold for the best possible price.
          </HighlightText>
        </Highlight>
      </Section>

      <Section>
        <SectionTitle>Why Work With Me as Your Listing Agent</SectionTitle>
        <List>
          <ListItem>
            <ItemTitle>Local Knowledge That Matters</ItemTitle>
            <ItemDescription>
              After 35 years of selling homes in Colorado Springs, I know our neighborhoods inside and out. I understand what buyers are looking for and how to present your home to attract the right offers.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Straight Talk, Real Results</ItemTitle>
            <ItemDescription>
              I'll give you honest, practical advice about pricing and preparing your home for sale. No gimmicks or empty promises - just solid guidance based on what actually works in our market.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Personal Attention</ItemTitle>
            <ItemDescription>
              When you work with me, you get me - not a team of assistants. I handle your listing personally because I believe that's how you get the best results for my clients.
            </ItemDescription>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>How I Market Your Home</SectionTitle>
        <Paragraph>
          My marketing approach combines tried-and-true methods with today's technology to get your home seen by the right buyers:
        </Paragraph>
        <List>
          <ListItem>
            <ItemTitle>Online Presence</ItemTitle>
            <ItemDescription>
              I make sure your home looks great on all the major real estate websites and social media platforms. Good photos and well-written descriptions make a big difference in attracting serious buyers.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Quality Photography</ItemTitle>
            <ItemDescription>
              I work with experienced photographers who know how to showcase your home's best features. Great photos are essential in today's market where most buyers start their search online.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Local Connections</ItemTitle>
            <ItemDescription>
              After decades in this market, I know most of the active agents in town. When your home hits the market, I make sure they know about it - especially those who have buyers looking in your area.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Effective Open Houses</ItemTitle>
            <ItemDescription>
              When appropriate for your home, I conduct open houses that attract serious buyers. I'm there personally to highlight your home's features and follow up with interested buyers.
            </ItemDescription>
          </ListItem>
        </List>

        <Highlight>
          <HighlightText>
            My approach is simple but effective - I focus on what actually sells homes in our market, not fancy gimmicks or complicated systems.
          </HighlightText>
        </Highlight>
      </Section>

      <Section>
        <SectionTitle>The Selling Process</SectionTitle>
        <Paragraph>
          I keep things straightforward and focused on what matters:
        </Paragraph>
        <List>
          <ListItem>
            <ItemTitle>First Meeting</ItemTitle>
            <ItemDescription>
              We'll walk through your home together, and I'll share honest feedback about pricing and any improvements that might help it sell. You'll get clear, practical advice based on what buyers in our market are actually looking for.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Getting Ready</ItemTitle>
            <ItemDescription>
              If your home needs any work before listing, I can recommend reliable local contractors I've worked with over the years. No need to over-improve - we'll focus on what really matters to buyers.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Smart Pricing</ItemTitle>
            <ItemDescription>
              I'll show you what similar homes have sold for and help you set a price that makes sense for the current market. No complex algorithms - just practical market knowledge and experience.
            </ItemDescription>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Ready to Sell Your Home?</SectionTitle>
        <Paragraph>
          If you're looking for an experienced agent who'll give you straight talk and personal attention throughout your home sale, let's talk. After 35 years of helping people sell their homes in Colorado Springs, I know what works and what doesn't.
        </Paragraph>
        <Paragraph>
          Let's have a conversation about your plans and how I can help you get your home sold.
        </Paragraph>
        <ButtonContainer>
          <CTAButton href="/contact">
            Let's Talk About Selling Your Home
          </CTAButton>
        </ButtonContainer>
      </Section>
    </ArticleLayout>
  );
};

export default ListingAgentPage; 