# Nimbus Weather Tracking - Frontend

A real-time weather tracking web application built with React, featuring interactive weather insights and data visualization.

## 🌟 Live Demo
[Visit Nimbus Weather App](#) <!--https://nimbus.merinphilamin.site/-->

## 🚀 Features

- Real-time weather data visualization
- Location-based weather tracking
- Google Places integration for location search
- Geolocation-based auto-detection
- Interactive charts using Chart.js
  - Bar charts for temperature trends
  - Line graphs for weather patterns
  - Data tables for detailed analytics
- Role-based access control (Admin/User)
- Google OAuth authentication

## 💻 Tech Stack

- React.js
- Chart.js for data visualization
- Google Places API
- Google Geolocation API
- Tailwind CSS for styling

## 🛠️ AWS Deployment Setup

1. **Clone Repository**
```bash
git clone <your-frontend-repo>
cd nimbus-frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Production Build**
```bash
npm run build
```

4. **Set Up Directory Structure**
```bash
sudo mkdir -p /var/www/vhosts/frontend/
sudo cp -R build/ /var/www/vhosts/frontend/
```

5. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        autoindex on;
        root /var/www/vhosts/frontend/build;
        try_files $uri $uri/ /index.html;
    }
}
```

## ⚙️ Environment Variables

Create `.env` file:
```env
REACT_APP_BACKEND_URL=http://api.your-domain.com
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## 📦 Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

## 🧪 Testing

```bash
npm test
```

