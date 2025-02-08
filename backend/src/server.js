import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Initialize AI models
const openAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-4-turbo-preview',
});

const anthropic = new ChatAnthropic({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    modelName: 'claude-3-opus-20240229',
});

// Routes
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend is connected with hot reloading!',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openAI.invoke([
            {
                role: 'user',
                content: message
            }
        ]);

        res.json({
            success: true,
            message: response.content
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process message'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Start server
app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', `🚀 Server running on http://localhost:${port}`);
    console.log('\x1b[32m%s\x1b[0m', '👀 Hot reloading enabled!');
    console.log('\x1b[33m%s\x1b[0m', `📝 Environment: ${process.env.NODE_ENV}`);
});