# Dan Weihmiller Real Estate Website

A professional real estate website for Dan Weihmiller, Realtor® with eXp Realty in Colorado Springs, Colorado. The site showcases property listings, provides information about Dan's services, and offers a contact form for potential clients.

![Dan Weihmiller Real Estate Website](public/images/og-image.jpg)

## Features

- Property listings with search and filtering functionality
- Detailed property pages with images, specifications, and virtual tours
- Contact form for property inquiries
- About page with agent information
- Admin dashboard for managing listings and inquiries
- Responsive design for all devices
- SEO optimized with meta tags and Open Graph support

## Technology Stack

- **Frontend**: React 19, React Router 7, Emotion (styled components)
- **Backend**: Express.js, Node.js
- **Storage**: AWS S3 for property images
- **Authentication**: AWS Cognito
- **Database**: AWS DynamoDB
- **Hosting**: Nginx, Ubuntu, Vultr VPS
- **Build Tool**: Vite
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm (v7.x or later)
- AWS account with S3, Cognito, and DynamoDB set up

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd danweihmiller
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` with your own API keys and credentials
   ```bash
   cp .env.example .env
   # Edit the .env file with your credentials
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The site will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to a web server.

## Deployment

For detailed deployment instructions, see the [deployment guide](deployment-guide.md).

## Project Structure

```
danweihmiller/
├── public/            # Static files
│   ├── images/        # Images including OG image
│   ├── favicon.ico    # Favicon
│   └── robots.txt     # SEO configuration
├── src/
│   ├── components/    # React components
│   │   ├── admin/     # Admin dashboard components
│   │   ├── contact/   # Contact form components
│   │   ├── layout/    # Layout components (header, footer)
│   │   └── shared/    # Shared/reusable components
│   ├── pages/         # Page components
│   ├── services/      # API service files
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main app component
│   └── main.jsx       # Entry point
├── server.js          # Express backend server
├── vite.config.js     # Vite configuration
└── nginx.conf         # Nginx configuration for deployment
```

## License

This project is licensed under the CC0 1.0 Universal License - see below for details.

### CC0 1.0 Universal Summary

No Copyright

The person who associated a work with this deed has dedicated the work to the public domain by waiving all of their rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. See [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) for more information.

## Acknowledgments

- Design inspiration from modern real estate websites
- eXp Realty for brand assets
- Contributors and open-source projects utilized in this website

---

© 2023-2024 Dan Weihmiller | Website developed by [HH6 Influential](https://hh6influential.com/)
