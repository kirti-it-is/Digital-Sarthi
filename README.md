# Digital Sarthi - AI-Powered Teaching Assistant

A frontend-only Vite + React web application for teachers to interact with an AI-powered teaching assistant. This is a design prototype suitable for hackathon demos or presentation purposes.

## Features

### For Admins
- Dashboard with platform statistics
- Teacher management (view, add, remove)
- Curriculum upload interface
- Curriculum library management
- Platform insights and analytics
- Settings management

### For Teachers
- Pre-assessment quiz (prerequisite before AI chat access)
- WhatsApp-style AI chat interface for lesson planning
- Generated course plans with detailed sections
- Teaching activities suggestions
- Performance insights
- Personalized settings

## Technology Stack

- **Framework**: Vite + React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm run build
```

Preview the production build:
```bash
pnpm run preview
```

## Demo Credentials

- **Email**: Use any email address
- **Password**: Use any password
- **Role**: Select either "Admin" or "Teacher"

## Project Structure

```
src/
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── AdminDashboard.tsx
│   ├── TeacherDashboard.tsx
│   ├── TeacherQuiz.tsx
│   ├── AIChat.tsx
│   └── CoursePlan.tsx
├── lib/                # Utilities and mock data
│   ├── types.ts
│   └── mock-data.ts
├── App.tsx             # Main app component with routing
└── index.css           # Tailwind CSS setup

```

## Features to Note

### Mock Data
All data is hardcoded in the frontend. There are no API calls or database interactions.

### Quiz System
Teachers must complete a short quiz before accessing the AI chat. This demonstrates a prerequisite workflow.

### WhatsApp-Style Chat
The AI chat interface mimics WhatsApp's design with:
- Message bubbles (user on right in blue, AI on left in gray)
- Text input with send button
- Microphone icon (visual only)
- Quick suggestion buttons

### Responsive Design
The application is fully responsive and works on mobile, tablet, and desktop screens.

## Limitations

- **No Backend**: This is a frontend-only prototype
- **No Real AI**: AI responses are pre-written mock messages
- **No Authentication**: Role selection is stored in component state only
- **No Data Persistence**: All data resets on page reload
- **No File Upload**: File upload components are UI-only

## Future Enhancements

- Integrate with a real backend API
- Connect to an AI service (e.g., OpenAI, Groq)
- Add database for persistent data storage
- Implement proper authentication
- Add email notifications
- Create mobile app version

---

Built with love for educational technology 📚✨
