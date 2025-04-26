
export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  sourceLink?: string;
  codeSnippet?: string;
  tags: string[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  projects: ProjectIdea[];
}

// Mock data for project domains and ideas
export const domains: Domain[] = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Build intelligent systems that can learn from data.",
    icon: "brain",
    color: "#6366F1", // Indigo
    projects: [
      {
        id: "ml-1",
        title: "Image Classification with CNN",
        description: "Build a Convolutional Neural Network (CNN) to classify images into different categories. This project will teach you the fundamentals of computer vision and deep learning.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        sourceLink: "https://github.com/tensorflow/examples",
        codeSnippet: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])`,
        tags: ["Deep Learning", "Computer Vision", "Python", "TensorFlow"]
      },
      {
        id: "ml-2",
        title: "Sentiment Analysis",
        description: "Create a model that can analyze the sentiment (positive, negative, neutral) of text data such as reviews or social media posts.",
        difficulty: "beginner",
        timeEstimate: "1-2 weeks",
        codeSnippet: `from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis")
result = sentiment_analyzer("I love this product! It works amazingly well.")
print(result)
# Output: [{'label': 'POSITIVE', 'score': 0.9998}]`,
        tags: ["NLP", "Text Analysis", "Python", "Transformers"]
      },
      {
        id: "ml-3",
        title: "Recommendation System",
        description: "Build a recommendation engine that suggests items based on user preferences and behavior. The perfect project to understand collaborative and content-based filtering.",
        difficulty: "advanced",
        timeEstimate: "3-4 weeks",
        sourceLink: "https://github.com/microsoft/recommenders",
        tags: ["Recommender Systems", "Python", "Collaborative Filtering"]
      }
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Create modern, responsive web applications and services.",
    icon: "code",
    color: "#8B5CF6", // Purple
    projects: [
      {
        id: "web-1",
        title: "Real-time Chat Application",
        description: "Build a chat application with real-time messaging using WebSockets. This project will teach you about client-server communication in real-time.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        sourceLink: "https://github.com/socketio/socket.io",
        codeSnippet: `// Server-side code (Node.js with Socket.io)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});`,
        tags: ["JavaScript", "Node.js", "Socket.io", "React"]
      },
      {
        id: "web-2",
        title: "E-commerce Platform",
        description: "Create an online store with product listings, shopping cart, and payment integration. Learn about state management and payment processing.",
        difficulty: "advanced",
        timeEstimate: "4-6 weeks",
        tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"]
      },
      {
        id: "web-3",
        title: "Personal Portfolio Website",
        description: "Build a professional portfolio website to showcase your projects, skills, and experience. Great for learning responsive design.",
        difficulty: "beginner",
        timeEstimate: "1-2 weeks",
        tags: ["HTML", "CSS", "JavaScript", "Responsive Design"]
      }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Protect systems and data from digital attacks.",
    icon: "shield",
    color: "#10B981", // Emerald
    projects: [
      {
        id: "sec-1",
        title: "Password Strength Checker",
        description: "Build a tool that analyzes password strength based on length, complexity, and common patterns. Learn about security best practices.",
        difficulty: "beginner",
        timeEstimate: "1 week",
        codeSnippet: `function checkPasswordStrength(password) {
  let strength = 0;
  
  // Check length
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // Check complexity
  if (/[0-9]/.test(password)) strength += 1; // Has number
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1; // Has mixed case
  if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special chars
  
  return {
    score: strength,
    label: ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength]
  };
}`,
        tags: ["JavaScript", "Security", "Frontend"]
      },
      {
        id: "sec-2",
        title: "Network Traffic Analyzer",
        description: "Create a tool that captures and analyzes network packets to detect suspicious activity.",
        difficulty: "advanced",
        timeEstimate: "3-4 weeks",
        sourceLink: "https://github.com/wireshark/wireshark",
        tags: ["Python", "Networking", "Wireshark", "Security"]
      },
      {
        id: "sec-3",
        title: "Web Application Vulnerability Scanner",
        description: "Build a scanner that checks web applications for common security vulnerabilities like SQL injection and XSS.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        tags: ["Python", "Web Security", "OWASP"]
      }
    ]
  },
  {
    id: "mobile-development",
    name: "Mobile Development",
    description: "Create native and cross-platform mobile applications.",
    icon: "smartphone",
    color: "#F59E0B", // Amber
    projects: [
      {
        id: "mob-1",
        title: "Fitness Tracking App",
        description: "Develop an app that tracks workouts, steps, and health metrics. Learn about mobile sensors and health APIs.",
        difficulty: "intermediate",
        timeEstimate: "3-4 weeks",
        tags: ["React Native", "Flutter", "Mobile Sensors", "Health APIs"]
      },
      {
        id: "mob-2",
        title: "Location-Based Reminder",
        description: "Build an app that reminds users of tasks when they enter or leave specific locations. Great for learning geolocation features.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        codeSnippet: `// React Native Geolocation Example
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation();
    }
  } catch (err) {
    console.warn(err);
  }
}

function getCurrentLocation() {
  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      console.log('Current position:', { latitude, longitude });
      // Check if any reminders are near this location
    },
    error => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}`,
        tags: ["React Native", "Geolocation", "Mobile", "JavaScript"]
      },
      {
        id: "mob-3",
        title: "Mobile Social Network",
        description: "Create a social networking app with profiles, posts, and messaging functionality.",
        difficulty: "advanced",
        timeEstimate: "6-8 weeks",
        tags: ["Flutter", "Firebase", "Mobile", "UI/UX"]
      }
    ]
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyze and visualize data to extract insights.",
    icon: "bar-chart",
    color: "#EC4899", // Pink
    projects: [
      {
        id: "data-1",
        title: "COVID-19 Data Dashboard",
        description: "Build an interactive dashboard to visualize and track COVID-19 statistics globally or for specific regions.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        sourceLink: "https://github.com/CSSEGISandData/COVID-19",
        codeSnippet: `import pandas as pd
import plotly.express as px

# Load COVID-19 data
df = pd.read_csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')

# Create visualization
fig = px.line(
    df[df['location']=='United States'], 
    x='date', 
    y='new_cases_smoothed', 
    title='New COVID-19 Cases in the US (7-day avg)'
)
fig.show()`,
        tags: ["Python", "Data Visualization", "Pandas", "Plotly"]
      },
      {
        id: "data-2",
        title: "Stock Price Predictor",
        description: "Use historical stock market data to build a model that predicts future stock prices.",
        difficulty: "advanced",
        timeEstimate: "4-5 weeks",
        tags: ["Python", "Time Series Analysis", "Prophet", "Financial Data"]
      },
      {
        id: "data-3",
        title: "Customer Segmentation Analysis",
        description: "Analyze customer data to identify distinct groups based on purchasing behavior and demographics.",
        difficulty: "intermediate",
        timeEstimate: "2-3 weeks",
        tags: ["Python", "Clustering", "Pandas", "Business Analytics"]
      }
    ]
  }
];

// Service functions
export const getDomainsService = () => {
  return new Promise<Domain[]>((resolve) => {
    setTimeout(() => {
      resolve(domains);
    }, 500);
  });
};

export const getDomainByIdService = (id: string) => {
  return new Promise<Domain | undefined>((resolve) => {
    setTimeout(() => {
      resolve(domains.find(domain => domain.id === id));
    }, 300);
  });
};

export const getProjectByIdService = (domainId: string, projectId: string) => {
  return new Promise<ProjectIdea | undefined>((resolve) => {
    setTimeout(() => {
      const domain = domains.find(d => d.id === domainId);
      const project = domain?.projects.find(p => p.id === projectId);
      resolve(project);
    }, 300);
  });
};
