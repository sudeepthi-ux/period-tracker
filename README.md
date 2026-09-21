# period-tracker
🌸 Flow &amp; Mood - A comprehensive period tracking and wellness app built with React and Vite. Track your cycle, log daily moods, manage cramps, enjoy mood-lifting games, and get personalized insights. Features include period predictions, symptom tracking, motivational quotes, and a beautiful, user-friendly interface. 
# Flow & Mood - Period Tracker App 🌸

A comprehensive period tracking and wellness app built with React and Vite. Track your cycle, log daily moods, manage cramps, enjoy mood-lifting games, and get personalized insights. All data is stored locally on your device for complete privacy.

**Live Demo:** [https://period-tracker-kohl.vercel.app](https://period-tracker-kohl.vercel.app)

---

## ✨ Features

### 📅 **Period Tracking**
- Calendar view to mark period start and end dates
- Visual indication of period days
- Automatic cycle length calculation
- Next period prediction
- Cycle statistics overview

### 😊 **Mood Tracker**
- Daily mood logging with emoji selector (5-point scale)
- Connect mood to cycle phases (pre-period, during, post-period)
- Mood history and trends
- Mood calendar heatmap

### 🩹 **Symptom Tracking**
- Log cramps intensity (1-10 scale)
- Track additional symptoms: headaches, bloating, fatigue, acne, nausea
- Daily symptom notes
- Symptom patterns and history

### 💊 **Cramps Management**
When cramps are logged, the app suggests:
- Heating pad therapy tips
- Light stretching exercises
- Hydration reminders
- Breathing exercises
- Pain relief information
- When to seek medical advice

### 💪 **Mood-Lifting Games**
1. **Breathing Exercise** - Visual breathing guide with calming animations
2. **Gratitude Jar** - Write and save gratitude notes
3. **Mood Booster Game** - Simple matching game to earn wellness points
4. **Stretching Guide** - 5 period-friendly stretches with timers
5. **Affirmation Spinner** - Spin wheel for positive affirmations

### 💭 **Motivational Quotes**
- Random inspirational quotes on app opening
- Category-based quotes (inspiration, strength, self-care, humor)
- Easy quote refresh button
- Women's health and wellness themed

---

## 🛠️ Tech Stack

- **Frontend:** React 18.2.0
- **Build Tool:** Vite 4.3.9
- **Styling:** Tailwind CSS 3.3.0
- **State Management:** React Hooks
- **Storage:** Browser localStorage (for privacy)
- **Hosting:** Vercel

---

## 📦 Installation

### Prerequisites
- Node.js (v20.x or higher)
- npm (comes with Node.js)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudeepthi-ux/period-tracker.git
   cd period-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Your app is now running locally!

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` folder.

---

## 🚀 Deployment

This app is deployed on **Vercel**. To deploy your own:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Your app will be live in 2-3 minutes!

---

## 📁 Project Structure

```
period-tracker/
├── src/
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── MoodTracker.jsx
│   │   ├── SymptomTracker.jsx
│   │   ├── CrampsHelper.jsx
│   │   ├── GamesHub.jsx
│   │   ├── QuoteDisplay.jsx
│   │   └── Shell.jsx
│   ├── context/
│   │   └── TrackerContext.jsx
│   ├── utils/
│   │   ├── cyclestats.js
│   │   └── dates.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 💾 Data Privacy

All your data is stored **locally on your device** using browser's localStorage. No data is sent to any server. Your period information, moods, and symptoms are completely private and only accessible on your device.

---

## 🎮 How to Use

### 1. **Log Your Period**
- Click on calendar dates to mark period start and end
- The app automatically calculates your cycle length
- See your next predicted period

### 2. **Track Your Mood**
- Select your daily mood using emoji buttons
- Your mood connects to your cycle phase
- Watch your mood patterns over time

### 3. **Log Symptoms**
- Rate your cramps on a 1-10 scale
- Select other symptoms you're experiencing
- Add daily notes

### 4. **Get Cramps Relief Tips**
- When cramps are high (>6/10), get instant suggestions
- Access stretching guides and breathing exercises
- Learn self-care techniques

### 5. **Play Games & Get Inspired**
- Play 5 different mood-lifting games
- Read motivational quotes
- Earn wellness points and achievements

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📋 Future Enhancements

- [ ] Data export (CSV, PDF)
- [ ] Dark mode toggle
- [ ] Notifications for cycle predictions
- [ ] Community features (share tips, experiences)
- [ ] Integration with fitness trackers
- [ ] Period product tracker
- [ ] Doctor appointment reminders
- [ ] Personalized insights based on patterns

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💌 Feedback & Support

Have suggestions or found a bug? 

- Open an [Issue](https://github.com/sudeepthi-ux/period-tracker/issues)
- Create a [Discussion](https://github.com/sudeepthi-ux/period-tracker/discussions)
- Reach out with feedback

---

## 👩‍💻 Author

Built with 💜 by **Sudeepthi** - A comprehensive period tracking and wellness solution.

---

## 🌍 Live Demo

Try the app: [https://period-tracker-kohl.vercel.app](https://period-tracker-kohl.vercel.app)

---

## 📸 Screenshots

### Home Screen
Beautiful dashboard showing your cycle status, mood, and quick access to all features.

### Calendar & Period Tracking
Click dates to mark your period and see predictions.

### Mood Tracker
Log your daily mood with emoji selectors and track patterns.

### Games & Wellness
Play games, read quotes, and get mood-lifting activities.

### Cramps Helper
Get relief tips and self-care suggestions when you need them.

---

## 🎯 Quick Start

```bash
# Clone
git clone https://github.com/sudeepthi-ux/period-tracker.git

# Install
cd period-tracker
npm install

# Run
npm run dev

# Visit http://localhost:5173 in your browser
```

---

**Enjoy tracking your flow with Flow & Mood!** 🌸✨
