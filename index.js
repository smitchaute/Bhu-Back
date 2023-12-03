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
                password: 'ATATT3xFfGF0DZET0wXyacAXL23umUTXokolaSzoi1gemjkCMU4Ki6aE__8bzY4H-O72PoLg_FZA09AqTxEIbT0wV8UWK_ZCfi-WHvL9Vd8v2vXkUAUJdneuhNuF4fKk8ZCTHe4S8KCqxLSNYaQBHf-TB7EUVW6iJJw_VKCfOsmYvTalxfEvVx4=4E6A7DC6',
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
                password: 'ATATT3xFfGF0DZET0wXyacAXL23umUTXokolaSzoi1gemjkCMU4Ki6aE__8bzY4H-O72PoLg_FZA09AqTxEIbT0wV8UWK_ZCfi-WHvL9Vd8v2vXkUAUJdneuhNuF4fKk8ZCTHe4S8KCqxLSNYaQBHf-TB7EUVW6iJJw_VKCfOsmYvTalxfEvVx4=4E6A7DC6',
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
