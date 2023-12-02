const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

app.get('/assigned-count', async (req, res) => {
    try {
        // Replace 'yourJiraInstance' and 'yourJiraProjectKey' with your Jira instance and project details
        const jiraResponse = await axios.get('https://smitchaute.atlassian.net/rest/api/2/search', {
            params: {
                jql: 'assignee=currentuser() AND project=KAN',
            },
            auth: {
                username: 'smitchaute2@gmail.com',
                password: 'ATATT3xFfGF0vyc865tDYB2Ty3dREZdd58QS01E0xphLybZ8NkfovTAcrMg4nSfl9FL1yAsgz1Ws5l2txeyVqfifwY6BKKX9U8AnRQ4Sg-p9f_GpnnLrVSwMhqmQU0S4IsEYaqWOW9k_dLbwMcD-4rhyMfJ4k8N1UOUDUFNKz08tlIjriqZrIt0=FBF9E8A9',
            },
        });

        const assignedCount = jiraResponse.data.total;
        res.json({ count: assignedCount });
    } catch (error) {
        console.error('Error fetching assigned count from Jira:', error.message);
        res.status(500).json({ error: 'Failed to fetch assigned count from Jira' });
    }
});
app.get('/unAssigned-count', async (req, res) => {
    try {
        // Replace 'yourJiraInstance' and 'yourJiraProjectKey' with your Jira instance and project details
        const jiraResponse = await axios.get('https://smitchaute.atlassian.net/rest/api/2/search', {
            params: {
                jql: 'assignee=null AND project=KAN',
            },
            auth: {
                username: 'smitchaute2@gmail.com',
                password: 'ATATT3xFfGF0vyc865tDYB2Ty3dREZdd58QS01E0xphLybZ8NkfovTAcrMg4nSfl9FL1yAsgz1Ws5l2txeyVqfifwY6BKKX9U8AnRQ4Sg-p9f_GpnnLrVSwMhqmQU0S4IsEYaqWOW9k_dLbwMcD-4rhyMfJ4k8N1UOUDUFNKz08tlIjriqZrIt0=FBF9E8A9',
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
