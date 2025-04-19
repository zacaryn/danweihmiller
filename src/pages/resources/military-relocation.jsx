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

const MilitaryRelocationPage = () => {
  return (
    <ArticleLayout
      title="Military Relocation Guide: PCSing to Colorado Springs"
      description="Your comprehensive guide to military relocation in Colorado Springs - from choosing the right neighborhood to understanding BAH rates and military benefits."
    >
      <Section>
        <Paragraph>
          Colorado Springs stands as one of America's premier military communities, hosting five major installations and offering an unparalleled quality of life for service members and their families. Whether you're PCSing to Fort Carson, Peterson SFB, or any of our other bases, this guide will help you navigate your move to the Pikes Peak region.
        </Paragraph>

        <Highlight>
          <HighlightText>
            As a military-friendly city with over 80,000 veterans and active duty service members, Colorado Springs offers extensive support networks, competitive BAH rates, and diverse housing options for military families.
          </HighlightText>
        </Highlight>
      </Section>

      <Section>
        <SectionTitle>Military Installations</SectionTitle>
        <Paragraph>
          Each military installation in Colorado Springs serves a unique mission and offers distinct advantages for service members and their families:
        </Paragraph>
        <List>
          <ListItem>
            <ItemTitle>Fort Carson</ItemTitle>
            <ItemDescription>
              Home of the 4th Infantry Division, located on the south side of Colorado Springs. Features extensive training areas, modern family housing, and comprehensive base amenities.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Peterson Space Force Base</ItemTitle>
            <ItemDescription>
              Located on the east side, home to Space Operations Command. Shares facilities with the Colorado Springs Airport and offers excellent amenities for military families.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>U.S. Air Force Academy</ItemTitle>
            <ItemDescription>
              Situated on the north side of Colorado Springs, offering stunning mountain views and access to top-rated District 20 schools. Known for its exceptional quality of life.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Schriever Space Force Base</ItemTitle>
            <ItemDescription>
              Located east of the city, focusing on space operations and missile defense. Growing community with newer housing developments and expanding facilities.
            </ItemDescription>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Popular Military Neighborhoods</SectionTitle>
        <Paragraph>
          Colorado Springs offers diverse neighborhoods that cater to military families, each with unique advantages based on your assigned installation:
        </Paragraph>
        <List>
          <ListItem>
            <ItemTitle>Powers Area (East)</ItemTitle>
            <ItemDescription>
              Ideal for Peterson and Schriever personnel, featuring newer developments, shopping centers, and a strong military community. Quick access to base facilities and amenities.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Fountain (South)</ItemTitle>
            <ItemDescription>
              Popular with Fort Carson families, offering affordable housing options and a tight-knit military community. Easy commute to post and growing amenities.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Briargate (North)</ItemTitle>
            <ItemDescription>
              Preferred by Air Force Academy families, featuring excellent schools, master-planned communities, and premium shopping. Known for its family-friendly atmosphere.
            </ItemDescription>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Planning Your PCS</SectionTitle>
        <Paragraph>
          A successful move to Colorado Springs requires careful planning and consideration of several key factors:
        </Paragraph>
        <List>
          <ListItem>
            <ItemTitle>Research BAH Rates</ItemTitle>
            <ItemDescription>
              Colorado Springs offers competitive BAH rates that vary by rank and dependency status. Understanding your rate helps narrow down suitable neighborhoods and housing options.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>School Enrollment</ItemTitle>
            <ItemDescription>
              The area features several highly-rated school districts. Many offer priority enrollment for military families and understand the unique needs of military children.
            </ItemDescription>
          </ListItem>
          <ListItem>
            <ItemTitle>Housing Options</ItemTitle>
            <ItemDescription>
              Choose from on-base housing, off-base rentals, or home purchase using your VA loan benefit. Each option offers distinct advantages based on your family's needs.
            </ItemDescription>
          </ListItem>
        </List>

        <Highlight>
          <HighlightText>
            Pro Tip: The summer months (May-August) are peak PCS season in Colorado Springs. Start your housing search early to ensure the best selection and rates.
          </HighlightText>
        </Highlight>
      </Section>

      <Section>
        <SectionTitle>Ready to Start Your Move?</SectionTitle>
        <Paragraph>
          As a military relocation specialist in Colorado Springs, I understand the unique challenges of PCSing to our area. From finding the perfect neighborhood that matches your BAH rate to connecting you with military-friendly resources, I'm here to make your transition smooth and successful.
        </Paragraph>
        <ButtonContainer>
          <CTAButton href="/contact">
            Schedule Your Relocation Consultation
          </CTAButton>
        </ButtonContainer>
      </Section>
    </ArticleLayout>
  );
};

export default MilitaryRelocationPage; 