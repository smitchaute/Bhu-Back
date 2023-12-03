const express = require('express');
const axios = require('axios');
const cors = require('cors');
const env = require("./env.json")

const app = express();
app.use(cors());
const port = 3001;
app.get('/assigned-count', async (req, res) => {
    try {
        const jiraResponse = await axios.get('https://smitchaute.atlassian.net/rest/api/2/search', {
            params: {
                jql: 'assignee=currentuser() AND project=KAN',
            },
            auth: {
                username: 'smitchaute2@gmail.com',
                password: env.token
            },
        });

        const assignedCount = jiraResponse.data.total;
        res.json({ count: assignedCount });
    } catch (error) {
        console.error('Error fetching assigned count from Jira:', error);
        res.status(500).json({ error: 'Failed to fetch assigned count from Jira' });
    }
});
app.get('/unAssigned-count', async (req, res) => {
    try {
        const jiraResponse = await axios.get('https://smitchaute.atlassian.net/rest/api/2/search', {
            params: {
                jql: 'assignee=null AND project=KAN',
            },
            auth: {
                username: 'smitchaute2@gmail.com',
                password: env.token,
            },
        });

        const assignedCount = jiraResponse.data.total;
        res.json({ count: assignedCount });
    } catch (error) {
        console.error('Error fetching assigned count from Jira:', error.message);
        res.status(500).json({ error: 'Failed to fetch assigned count from Jira' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
