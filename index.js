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
                password: 'ATATT3xFfGF0um0jGAYZlP3R5O3RPZ-aoJYZ8gcz3IQH17jy98uQfpTW3Hxfsd5Q55waJmHuotNmtYWkWv1gfxI-0Geg-Y2U1a1wV8e5tHcvV08tRMNe9-yjQlXEXObl9PNJbpS7hexUy0tEHGAvu4M2XE8cWABbuur39uhI3q-QcbiGoW83yUk=DB5D5B3B',
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
                password: 'ATATT3xFfGF0um0jGAYZlP3R5O3RPZ-aoJYZ8gcz3IQH17jy98uQfpTW3Hxfsd5Q55waJmHuotNmtYWkWv1gfxI-0Geg-Y2U1a1wV8e5tHcvV08tRMNe9-yjQlXEXObl9PNJbpS7hexUy0tEHGAvu4M2XE8cWABbuur39uhI3q-QcbiGoW83yUk=DB5D5B3B',
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
