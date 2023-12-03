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
                password: 'ATATT3xFfGF08TM9nQFNEwHZlpFG1461NeVw6vj1HyD_jMoxbnftguiyvbyLXFbQHfCUwGT7UZSB6fiMNdPDNK5r8-lkOhN6lxh-ecDySuFqcMAncdx-DP27Y-XvD8zaC6MX_d__iDnDyahYuf2PE3e8Dru_H-jYZ2QKLyxqs63HfuQR8PEqfpA=F8BB4767',
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
                password: 'ATATT3xFfGF08TM9nQFNEwHZlpFG1461NeVw6vj1HyD_jMoxbnftguiyvbyLXFbQHfCUwGT7UZSB6fiMNdPDNK5r8-lkOhN6lxh-ecDySuFqcMAncdx-DP27Y-XvD8zaC6MX_d__iDnDyahYuf2PE3e8Dru_H-jYZ2QKLyxqs63HfuQR8PEqfpA=F8BB4767',
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
