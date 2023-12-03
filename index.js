const express = require('express');
const axios = require('axios');
const cors = require('cors');

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
                password: 'ATATT3xFfGF0srVGSInc8QyZ4crjxnI8S2B-xVpBa7PLQ0JYd2i0onyg5wWIVdTwl_uZ7De8qykM1GxcYGqm8l0zfXBGbpee4fyOm5VXuEy7krBeS4n7lcrhBoau5CUFo8lDtLOcnoCyV3_gAbCWnZzhHrND08-8STI4EIj6MTcirKmMYKxaJqw=5E6AFAAB',
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
                password: 'ATATT3xFfGF0srVGSInc8QyZ4crjxnI8S2B-xVpBa7PLQ0JYd2i0onyg5wWIVdTwl_uZ7De8qykM1GxcYGqm8l0zfXBGbpee4fyOm5VXuEy7krBeS4n7lcrhBoau5CUFo8lDtLOcnoCyV3_gAbCWnZzhHrND08-8STI4EIj6MTcirKmMYKxaJqw=5E6AFAAB',
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
