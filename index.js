import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors()); // Enable CORS for all routes

// Proxy endpoint for Instagram API
app.get('/api/instagram/followers', async (req, res) => {
    console.log('received user id is ', req.query.userID);
    try {
        const response = await axios.get(`https://www.instagram.com/api/v1/friendships/36112663357/followers/?query=${req.query.userID}`, {
            headers: {
                "accept" : "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cookie": "datr=aAgmZ1sNhxUMpkjB1_cQDsZZ; ig_did=26E54A82-CDC8-4DEF-B2F1-FB84FB667D00;  mid=ZyYIaAALAAGS1glMceRozg-q9lTz; csrftoken=29WD1nqJKUmqUnevdCq8eEwp9uZw9Bh4; ds_user_id=36112663357; sessionid=36112663357%3AN5pg5qoUO2wKLw%3A17%3AAYd4ZRqqvhoHt17IWF1htWj2rciKixwm8OcXGJ-oTQ; rur=\"CCO\\05436112663357\\0541762426061:01f700f6ebe2f43416190897fe6d57fe0f6ee9cbeb2cf78606775f26a85774f0a2c73131\";; csrftoken=ASmvYnk8JkRVqqiJutqSDIcMyT6u3QAf; ds_user_id=36112663357; ig_did=81D830B9-E80D-4E6F-92A1-3C9D77A1AB26; ig_nrcb=1; mid=ZytHfgAEAAEnSULetjbMCrkCDMS0; rur=\"CCO\\05436112663357\\0541762703822:01f77d5169c507f596da5d0db0ce66e22179cb48ece8cd07aba39211dff5e6eb28685c44\"",
                "referer": "https://www.instagram.com/imchandan__k/followers/",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
                "x-ig-app-id": "936619743392459",
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Instagram:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});
